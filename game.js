// ================= Constants =================
const WORLD_W = 3000, WORLD_H = 3000;
const MAX_PLAYERS = 8;

const PLANE_SPEED = 230;          // px/s forward, constant auto-flight
const BOOST_MULT = 1.7;
const BOOST_MAX = 100, BOOST_DRAIN = 55, BOOST_REGEN = 22; // per second
const TURN_RATE = 2.2;            // rad/s (Lowered significantly for heavier F-16 steering)

const BULLET_SPEED = 620, BULLET_LIFE = 750, FIRE_COOLDOWN = 90, BULLET_DAMAGE = 8;
const HIT_RADIUS = 24, BULLET_RADIUS = 4;

// Missile & Flare Constants
const MISSILE_SPEED = 340, MISSILE_TURN = 2.5, MISSILE_LIFE = 4000, MISSILE_COOLDOWN = 1500, MISSILE_DAMAGE = 40;
const FLARE_LIFE = 2000, FLARE_COOLDOWN = 800;

// Gun heat: ultra-fast RPM, but holding fire builds heat until it locks out.
const HEAT_MAX = 100, HEAT_PER_SHOT = 8, HEAT_DECAY = 24, HEAT_DECAY_OVERHEAT = 40;
const OVERHEAT_RESET_FRAC = 0.1;  // must cool back down to 10% heat before firing again

const REMOTE_SMOOTH = 12;         // how fast other players' rendered planes catch up to network updates

const MAX_HEALTH = 100, RESPAWN_DELAY = 2200, INVULN_TIME = 1500;
const COIN_CAP = 16, COIN_VALUE = 10, COIN_PICKUP_RADIUS = 30, COIN_SPAWN_EVERY = 1800;
const KILL_SCORE = 50;

const COLORS = ['#ff6b6b', '#4dd0e1', '#ffd166', '#9d7bff', '#6fe08a', '#ff9f43', '#5ea8ff', '#f472b6'];

// ================= Shared state =================
let peer = null, isHost = false, myId = null, myName = 'Player';
let connections = {};             
let players = {};                 
let coins = [];                   
let bullets = [];                 
let missiles = [];
let flares = [];
let clouds = [];
let started = false, coinCounter = 0, nextBulletId = 0, nextMissileId = 0, nextFlareId = 0;

let myState = null;               
let killFeedEl, lbListEl, scoreValEl, killsValEl, hpFillEl, boostFillEl, heatFillEl;
let respawnOverlay, respawnMsgEl, respawnTimerEl;
let statusEl, lobbyList, startBtn, chooseRole, lobby, menu, gameArea, waitHint;
let skyCanvas, skyCtx, miniCanvas, miniCtx;
let lastSpawnTick = 0;

// ================= World helpers =================
function rand(min, max) { return min + Math.random() * (max - min); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }
function colorFor(id) { return COLORS[id % COLORS.length]; }
function angleDiff(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

function buildClouds() {
  clouds = [];
  for (let i = 0; i < 70; i++) {
    clouds.push({ x: rand(0, WORLD_W), y: rand(0, WORLD_H), r: rand(30, 90), a: rand(0.08, 0.22) });
  }
}

function randomSpawnPoint() {
  return { x: rand(150, WORLD_W - 150), y: rand(150, WORLD_H - 150) };
}

function freshPlayerState(id, name) {
  const p = randomSpawnPoint();
  const angle = rand(0, Math.PI * 2);
  return {
    id, name, connected: true, alive: true,
    x: p.x, y: p.y, angle,
    tx: p.x, ty: p.y, tangle: angle, synced: false, 
    health: MAX_HEALTH, score: 0, kills: 0, deaths: 0,
    color: colorFor(id), invulnUntil: performance.now() + INVULN_TIME
  };
}

// ================= Local plane simulation =================
function createLocalState() {
  const base = freshPlayerState(myId, myName);
  return Object.assign(base, { 
    boost: BOOST_MAX, heat: 0, overheated: false, 
    fireTimer: 0, missileTimer: 0, flareTimer: 0, respawnAt: 0 
  });
}

function respawnLocal() {
  const p = randomSpawnPoint();
  myState.x = p.x; myState.y = p.y;
  myState.angle = rand(0, Math.PI * 2);
  myState.health = MAX_HEALTH;
  myState.heat = 0;
  myState.overheated = false;
  myState.alive = true;
  myState.fireTimer = 0;
  myState.missileTimer = 0;
  myState.flareTimer = 0;
  myState.invulnUntil = performance.now() + INVULN_TIME;
  respawnOverlay.style.display = 'none';
}

function updateLocalPlane(dtSec, keys) {
  if (!myState.alive) {
    if (myState.respawnAt && performance.now() >= myState.respawnAt) {
      myState.respawnAt = 0;
      respawnLocal();
    }
    return;
  }

  const targetAngle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
  const turnStep = TURN_RATE * dtSec;
  const diff = angleDiff(myState.angle, targetAngle);
  myState.angle += Math.abs(diff) < turnStep ? diff : Math.sign(diff) * turnStep;

  const boosting = keys.boost && myState.boost > 0;
  if (boosting) myState.boost = Math.max(0, myState.boost - BOOST_DRAIN * dtSec);
  else myState.boost = Math.min(BOOST_MAX, myState.boost + BOOST_REGEN * dtSec);

  const speed = PLANE_SPEED * (boosting ? BOOST_MULT : 1);
  myState.x += Math.cos(myState.angle) * speed * dtSec;
  myState.y += Math.sin(myState.angle) * speed * dtSec;
  myState.x = clamp(myState.x, 30, WORLD_W - 30);
  myState.y = clamp(myState.y, 30, WORLD_H - 30);

  if (myState.overheated) {
    myState.heat = Math.max(0, myState.heat - HEAT_DECAY_OVERHEAT * dtSec);
    if (myState.heat <= HEAT_MAX * OVERHEAT_RESET_FRAC) myState.overheated = false;
  } else if (!keys.shoot) {
    myState.heat = Math.max(0, myState.heat - HEAT_DECAY * dtSec);
  }

  // Weapons Cooldowns
  myState.fireTimer = Math.max(0, myState.fireTimer - dtSec * 1000);
  myState.missileTimer = Math.max(0, myState.missileTimer - dtSec * 1000);
  myState.flareTimer = Math.max(0, myState.flareTimer - dtSec * 1000);

  if (keys.shoot && !myState.overheated && myState.fireTimer <= 0) {
    myState.fireTimer = FIRE_COOLDOWN;
    fireBullet();
    myState.heat = Math.min(HEAT_MAX, myState.heat + HEAT_PER_SHOT);
    if (myState.heat >= HEAT_MAX) myState.overheated = true;
  }

  if (keys.missile && myState.missileTimer <= 0) {
    myState.missileTimer = MISSILE_COOLDOWN;
    fireMissile();
  }

  if (keys.flare && myState.flareTimer <= 0) {
    myState.flareTimer = FLARE_COOLDOWN;
    dropFlare();
  }

  // coin pickup 
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    if (dist(myState.x, myState.y, c.x, c.y) < COIN_PICKUP_RADIUS) {
      coins.splice(i, 1);
      sendEvent({ type: 'collect', id: c.id });
    }
  }

  const now = performance.now();
  const invuln = now < myState.invulnUntil;
  if (!invuln) {
    const takeDamage = (dmg, attackerId) => {
      myState.health -= dmg;
      if (myState.health <= 0) {
        myState.health = 0;
        myState.alive = false;
        myState.deaths = (myState.deaths || 0) + 1;
        respawnMsgEl.textContent = 'Shot down!';
        respawnOverlay.style.display = 'flex';
        myState.respawnAt = now + RESPAWN_DELAY;
        sendEvent({ type: 'died', by: attackerId });
      }
    };

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (b.ownerId === myId) continue;
      if (dist(myState.x, myState.y, b.x, b.y) < HIT_RADIUS) {
        bullets.splice(i, 1);
        takeDamage(BULLET_DAMAGE, b.ownerId);
        if (!myState.alive) break;
      }
    }

    for (let i = missiles.length - 1; i >= 0; i--) {
      const m = missiles[i];
      if (m.ownerId === myId) continue;
      if (dist(myState.x, myState.y, m.x, m.y) < HIT_RADIUS) {
        missiles.splice(i, 1);
        takeDamage(MISSILE_DAMAGE, m.ownerId);
        if (!myState.alive) break;
      }
    }
  }
}

function fireBullet() {
  const nose = 24;
  const b = {
    id: myId + '-b' + (nextBulletId++), ownerId: myId,
    x: myState.x + Math.cos(myState.angle) * nose,
    y: myState.y + Math.sin(myState.angle) * nose,
    angle: myState.angle, born: performance.now()
  };
  bullets.push(b);
  sendEvent({ type: 'shoot', id: b.id, x: b.x, y: b.y, angle: b.angle });
}

function fireMissile() {
  const m = {
    id: myId + '-m' + (nextMissileId++), ownerId: myId,
    x: myState.x + Math.cos(myState.angle) * 20,
    y: myState.y + Math.sin(myState.angle) * 20,
    angle: myState.angle, born: performance.now()
  };
  missiles.push(m);
  sendEvent({ type: 'missile', id: m.id, x: m.x, y: m.y, angle: m.angle });
}

function dropFlare() {
  const f = {
    id: myId + '-f' + (nextFlareId++), ownerId: myId,
    x: myState.x - Math.cos(myState.angle) * 15,
    y: myState.y - Math.sin(myState.angle) * 15,
    born: performance.now()
  };
  flares.push(f);
  sendEvent({ type: 'flare', id: f.id, x: f.x, y: f.y });
}

function updateWeapons(dtSec) {
  const now = performance.now();
  
  // Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (now - b.born > BULLET_LIFE) { bullets.splice(i, 1); continue; }
    b.x += Math.cos(b.angle) * BULLET_SPEED * dtSec;
    b.y += Math.sin(b.angle) * BULLET_SPEED * dtSec;
  }

  // Flares
  for (let i = flares.length - 1; i >= 0; i--) {
    if (now - flares[i].born > FLARE_LIFE) flares.splice(i, 1);
  }

  // Homing Missiles
  for (let i = missiles.length - 1; i >= 0; i--) {
    const m = missiles[i];
    if (now - m.born > MISSILE_LIFE) { missiles.splice(i, 1); continue; }

    let target = null;
    let bestDist = Infinity;

    // 1. Flares take absolute priority if close (Decoy)
    flares.forEach(f => {
      const d = dist(m.x, m.y, f.x, f.y);
      if (d < 300 && d < bestDist) { bestDist = d; target = f; }
    });

    // 2. Otherwise lock onto nearest enemy
    if (!target) {
      Object.values(players).forEach(p => {
        if (p.id === m.ownerId || !p.alive || p.connected === false) return;
        const d = dist(m.x, m.y, p.x, p.y);
        if (d < 700 && d < bestDist) { bestDist = d; target = p; }
      });
    }

    if (target) {
      const targetAngle = Math.atan2(target.y - m.y, target.x - m.x);
      const turnStep = MISSILE_TURN * dtSec;
      const diff = angleDiff(m.angle, targetAngle);
      m.angle += Math.abs(diff) < turnStep ? diff : Math.sign(diff) * turnStep;
    }

    m.x += Math.cos(m.angle) * MISSILE_SPEED * dtSec;
    m.y += Math.sin(m.angle) * MISSILE_SPEED * dtSec;
  }
}

// ================= Networking: host side =================
function startHost() {
  isHost = true; myId = 0;
  players[0] = freshPlayerState(0, myName);
  peer = new Peer();
  peer.on('open', id => {
    statusEl.textContent = 'Share this code: ' + id;
    chooseRole.style.display = 'none'; lobby.style.display = 'flex';
    startBtn.style.display = 'inline-block'; waitHint.style.display = 'none';
    renderLobby();
  });
  peer.on('connection', c => {
    const id = nextFreeId();
    if (id === null) { c.on('open', () => c.send({ type: 'full' })); return; }
    connections[id] = c;
    players[id] = freshPlayerState(id, 'Player ' + (id + 1));
    players[id].connected = true;
    c.on('open', () => {
      c.send({ type: 'welcome', id });
      c.send({ type: 'coins', list: coins });
      broadcastRoster();
    });
    c.on('data', data => handleHostReceive(id, data));
    c.on('close', () => { if (players[id]) players[id].connected = false; broadcastRoster(); });
  });
  startBtn.onclick = () => {
    if (started) return;
    started = true; buildClouds(); spawnInitialCoins();
    broadcast({ type: 'start' });
    broadcast({ type: 'coins', list: coins });
    beginLocalGame();
  };
}

function nextFreeId() {
  for (let i = 1; i < MAX_PLAYERS; i++) if (!players[i] || players[i].connected === false) return i;
  return null;
}

function broadcast(msg) {
  Object.values(connections).forEach(c => { if (c.open) c.send(msg); });
}

function broadcastRoster() {
  renderLobby(); renderLeaderboard();
  broadcast({
    type: 'roster',
    roster: Object.values(players).map(p => ({
      id: p.id, name: p.name, connected: p.connected, alive: p.alive,
      score: p.score, kills: p.kills, deaths: p.deaths, color: p.color
    }))
  });
}

function handleHostReceive(fromId, data) {
  if (data.type === 'state') handleState(fromId, data);
  else if (data.type === 'shoot') handleShoot(fromId, data);
  else if (data.type === 'missile') handleMissile(fromId, data);
  else if (data.type === 'flare') handleFlare(fromId, data);
  else if (data.type === 'collect') handleCollect(fromId, data.id);
  else if (data.type === 'died') handleDied(fromId, data.by);
  else if (data.type === 'name') { if (players[fromId]) { players[fromId].name = data.name; broadcastRoster(); } }
}

function applyRemoteState(p, data) {
  if (!p.synced) {
    p.x = data.x; p.y = data.y; p.angle = data.angle;
    p.synced = true;
  }
  p.tx = data.x; p.ty = data.y; p.tangle = data.angle;
  p.health = data.health; p.alive = data.alive;
}

function handleState(fromId, data) {
  const p = players[fromId];
  if (p) applyRemoteState(p, data);
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'state', from: fromId, x: data.x, y: data.y, angle: data.angle, health: data.health, alive: data.alive });
  });
}

function handleShoot(fromId, data) {
  if (fromId !== myId) bullets.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, angle: data.angle, born: performance.now() });
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'shoot', from: fromId, id: data.id, x: data.x, y: data.y, angle: data.angle });
  });
}

function handleMissile(fromId, data) {
  if (fromId !== myId) missiles.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, angle: data.angle, born: performance.now() });
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'missile', from: fromId, id: data.id, x: data.x, y: data.y, angle: data.angle });
  });
}

function handleFlare(fromId, data) {
  if (fromId !== myId) flares.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, born: performance.now() });
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'flare', from: fromId, id: data.id, x: data.x, y: data.y });
  });
}

function handleCollect(fromId, coinId) {
  const idx = coins.findIndex(c => c.id === coinId);
  if (idx === -1) return;
  coins.splice(idx, 1);
  if (players[fromId]) players[fromId].score += COIN_VALUE;
  broadcast({ type: 'coinRemove', id: coinId });
  broadcastRoster();
}

function handleDied(fromId, killerId) {
  if (players[fromId]) { players[fromId].alive = false; players[fromId].deaths = (players[fromId].deaths || 0) + 1; }
  if (players[killerId] && killerId !== fromId) {
    players[killerId].kills = (players[killerId].kills || 0) + 1;
    players[killerId].score += KILL_SCORE;
  }
  broadcast({ type: 'killed', victim: fromId, killer: killerId });
  pushKillFeed(killerId, fromId);
  broadcastRoster();
}

function spawnInitialCoins() {
  coins = [];
  for (let i = 0; i < COIN_CAP; i++) spawnOneCoin();
}
function spawnOneCoin() {
  const p = randomSpawnPoint();
  const coin = { id: 'c' + (coinCounter++), x: p.x, y: p.y };
  coins.push(coin);
  return coin;
}
function hostMaybeSpawnCoin(ts) {
  if (!isHost || !started) return;
  if (ts - lastSpawnTick < COIN_SPAWN_EVERY) return;
  lastSpawnTick = ts;
  if (coins.length < COIN_CAP) {
    const coin = spawnOneCoin();
    broadcast({ type: 'coinAdd', coin });
  }
}

// ================= Networking: client side =================
function startJoin() {
  const hostId = document.getElementById('hostIdInput').value.trim();
  if (!hostId) return;
  peer = new Peer();
  peer.on('open', () => {
    const conn = peer.connect(hostId, { reliable: true });
    connections.host = conn;
    conn.on('open', () => {
      chooseRole.style.display = 'none'; lobby.style.display = 'flex';
      statusEl.textContent = 'Connected — waiting for host...';
      startBtn.style.display = 'none'; waitHint.style.display = 'block';
    });
    conn.on('data', handleClientReceive);
  });
}

function handleClientReceive(data) {
  if (data.type === 'full') { statusEl.textContent = 'That lobby is full.'; }
  else if (data.type === 'welcome') {
    myId = data.id;
    players[myId] = freshPlayerState(myId, myName);
    connections.host.send({ type: 'name', name: myName });
  }
  else if (data.type === 'roster') {
    data.roster.forEach(p => { players[p.id] = players[p.id] || {}; Object.assign(players[p.id], p); });
    renderLobby(); renderLeaderboard();
  }
  else if (data.type === 'coins') coins = data.list;
  else if (data.type === 'coinAdd') coins.push(data.coin);
  else if (data.type === 'coinRemove') coins = coins.filter(c => c.id !== data.id);
  else if (data.type === 'start') { started = true; buildClouds(); beginLocalGame(); }
  else if (data.type === 'state') {
    const p = players[data.from] = players[data.from] || freshPlayerState(data.from, 'Player ' + (data.from + 1));
    applyRemoteState(p, data);
  }
  else if (data.type === 'shoot') {
    if (data.from !== myId) bullets.push({ id: data.id, ownerId: data.from, x: data.x, y: data.y, angle: data.angle, born: performance.now() });
  }
  else if (data.type === 'missile') {
    if (data.from !== myId) missiles.push({ id: data.id, ownerId: data.from, x: data.x, y: data.y, angle: data.angle, born: performance.now() });
  }
  else if (data.type === 'flare') {
    if (data.from !== myId) flares.push({ id: data.id, ownerId: data.from, x: data.x, y: data.y, born: performance.now() });
  }
  else if (data.type === 'killed') pushKillFeed(data.killer, data.victim);
}

function sendEvent(msg) {
  if (isHost) {
    if (msg.type === 'state') handleState(0, msg);
    else if (msg.type === 'shoot') handleShoot(0, msg);
    else if (msg.type === 'missile') handleMissile(0, msg);
    else if (msg.type === 'flare') handleFlare(0, msg);
    else if (msg.type === 'collect') handleCollect(0, msg.id);
    else if (msg.type === 'died') handleDied(0, msg.by);
  } else if (connections.host && connections.host.open) {
    connections.host.send(msg);
  }
}

// ================= UI: lobby / leaderboard / kill feed =================
function renderLobby() {
  lobbyList.innerHTML = '';
  Object.values(players).sort((a, b) => a.id - b.id).forEach(p => {
    const li = document.createElement('li');
    if (p.connected === false) li.className = 'offline';
    li.innerHTML = `<span>${escapeHtml(p.name || ('Player ' + (p.id + 1)))}</span><span>${p.connected === false ? 'left' : 'ready'}</span>`;
    lobbyList.appendChild(li);
  });
}

function renderLeaderboard() {
  if (!lbListEl) return;
  const top = Object.values(players).filter(p => p.connected !== false).sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 6);
  lbListEl.innerHTML = '';
  top.forEach(p => {
    const li = document.createElement('li');
    if (p.id === myId) li.className = 'me';
    li.innerHTML = `<span>${escapeHtml(p.name || 'Player')}</span><span>${p.score || 0}</span>`;
    lbListEl.appendChild(li);
  });
}

function pushKillFeed(killerId, victimId) {
  if (!killFeedEl) return;
  const killer = players[killerId], victim = players[victimId];
  const kName = killer ? killer.name : 'Someone';
  const vName = victim ? victim.name : 'someone';
  const div = document.createElement('div');
  div.className = 'kill-msg';
  div.textContent = (killerId === victimId || killerId == null) ? `${vName} crashed` : `${kName} shot down ${vName}`;
  killFeedEl.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

// ================= Input =================
const keysHeld = { boost: false, shoot: false, missile: false, flare: false };
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2 - 150; 

function resetAllInput() { keysHeld.boost = false; keysHeld.shoot = false; keysHeld.missile = false; keysHeld.flare = false; }
window.addEventListener('blur', resetAllInput);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetAllInput(); });

function wireKeyboard() {
  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W': keysHeld.boost = true; break;
      case ' ': keysHeld.shoot = true; e.preventDefault(); break;
      case 'Shift': case 'm': case 'M': keysHeld.missile = true; break;
      case 'f': case 'F': keysHeld.flare = true; break;
    }
  });
  document.addEventListener('keyup', e => {
    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W': keysHeld.boost = false; break;
      case ' ': keysHeld.shoot = false; break;
      case 'Shift': case 'm': case 'M': keysHeld.missile = false; break;
      case 'f': case 'F': keysHeld.flare = false; break;
    }
  });
}

function wireMouse() {
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener('mousedown', e => { 
    if (e.button === 0) keysHeld.shoot = true; 
    if (e.button === 2) keysHeld.missile = true; 
  });
  window.addEventListener('mouseup', e => { 
    if (e.button === 0) keysHeld.shoot = false; 
    if (e.button === 2) keysHeld.missile = false; 
  });
  window.addEventListener('contextmenu', e => e.preventDefault());
}

// ================= Rendering =================
function resizeCanvas() {
  skyCanvas.width = window.innerWidth;
  skyCanvas.height = window.innerHeight;
}

function drawPlaneShape(ctx, color, alive) {
  const pColor = alive ? color : 'rgba(120,120,120,0.6)';
  
  // Custom F-16 Top-Down Shape
  ctx.fillStyle = '#6a7885'; // Grey Fuselage
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  
  // Nose
  ctx.moveTo(22, 0);
  ctx.lineTo(8, 2);
  
  // Right Wing
  ctx.lineTo(-4, 16);
  ctx.lineTo(-12, 16);
  ctx.lineTo(-8, 3);
  
  // Right Rear Stabilizer
  ctx.lineTo(-16, 3);
  ctx.lineTo(-20, 8);
  ctx.lineTo(-22, 8);
  ctx.lineTo(-20, 1);
  
  // Engine
  ctx.lineTo(-20, -1);
  
  // Left Rear Stabilizer
  ctx.lineTo(-22, -8);
  ctx.lineTo(-20, -8);
  ctx.lineTo(-16, -3);
  
  // Left Wing
  ctx.lineTo(-8, -3);
  ctx.lineTo(-12, -16);
  ctx.lineTo(-4, -16);
  
  // Return to nose
  ctx.lineTo(8, -2);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  
  // Add Player Color Accents on wings
  ctx.fillStyle = pColor;
  ctx.beginPath();
  ctx.moveTo(2, 4); ctx.lineTo(-4, 14); ctx.lineTo(-10, 14); ctx.lineTo(-6, 4);
  ctx.moveTo(2, -4); ctx.lineTo(-4, -14); ctx.lineTo(-10, -14); ctx.lineTo(-6, -4);
  ctx.fill();

  // Cockpit canopy
  if (alive) {
    ctx.fillStyle = '#7ec8ff';
    ctx.beginPath();
    ctx.ellipse(4, 0, 6, 2.5, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }
}

function drawPlane(ctx, p, isMe, now) {
  const flicker = now < p.invulnUntil && Math.floor(now / 100) % 2 === 0;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.globalAlpha = flicker ? 0.4 : 1;
  drawPlaneShape(ctx, p.color || colorFor(p.id), p.alive !== false);
  ctx.restore();

  ctx.globalAlpha = 1;
  ctx.fillStyle = '#fff';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((isMe ? '' : '') + (p.name || 'Player'), p.x, p.y - 30);

  const w = 30, h = 4, frac = clamp((p.health != null ? p.health : 100) / MAX_HEALTH, 0, 1);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(p.x - w / 2, p.y - 24, w, h);
  ctx.fillStyle = frac > 0.4 ? '#6fe08a' : '#ff6b6b';
  ctx.fillRect(p.x - w / 2, p.y - 24, w * frac, h);
}

function drawCoin(ctx, c, now) {
  const bob = Math.sin(now / 300 + c.x) * 2;
  ctx.save();
  ctx.translate(c.x, c.y + bob);
  ctx.fillStyle = '#ffd166';
  ctx.strokeStyle = '#a9700a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a1 = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const a2 = a1 + Math.PI / 5;
    ctx.lineTo(Math.cos(a1) * 8, Math.sin(a1) * 8);
    ctx.lineTo(Math.cos(a2) * 3.2, Math.sin(a2) * 3.2);
  }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawBullet(ctx, b) {
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.angle);
  ctx.fillStyle = b.ownerId === myId ? '#fff59d' : '#ffab91';
  ctx.beginPath();
  ctx.ellipse(0, 0, BULLET_RADIUS * 2, BULLET_RADIUS, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMissile(ctx, m) {
  ctx.save();
  ctx.translate(m.x, m.y);
  ctx.rotate(m.angle);
  // Rocket body
  ctx.fillStyle = '#eee';
  ctx.fillRect(-6, -2, 14, 4);
  // Rocket tip
  ctx.fillStyle = '#ff2d2d';
  ctx.beginPath();
  ctx.moveTo(8, -2); ctx.lineTo(12, 0); ctx.lineTo(8, 2);
  ctx.fill();
  // Engine flame
  ctx.fillStyle = '#ff9f43';
  ctx.beginPath();
  ctx.moveTo(-6, -1.5); ctx.lineTo(-14, 0); ctx.lineTo(-6, 1.5);
  ctx.fill();
  ctx.restore();
}

function drawFlare(ctx, f, now) {
  const flicker = (Math.floor(now / 50) % 2 === 0) ? 1.0 : 0.6;
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.fillStyle = `rgba(255, 140, 0, ${flicker})`;
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Outer glow
  ctx.fillStyle = `rgba(255, 100, 0, ${flicker * 0.3})`;
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function render(now) {
  const ctx = skyCtx;
  const W = skyCanvas.width, H = skyCanvas.height;

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#3a6bb5'); grad.addColorStop(1, '#a9d4ef');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const camX = myState.x - W / 2, camY = myState.y - H / 2;
  ctx.save();
  ctx.translate(-camX, -camY);

  clouds.forEach(c => {
    if (c.x < camX - 100 || c.x > camX + W + 100 || c.y < camY - 100 || c.y > camY + H + 100) return;
    ctx.fillStyle = `rgba(255,255,255,${c.a})`;
    ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
  });

  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, WORLD_W, WORLD_H);

  coins.forEach(c => drawCoin(ctx, c, now));
  flares.forEach(f => drawFlare(ctx, f, now));
  bullets.forEach(b => drawBullet(ctx, b));
  missiles.forEach(m => drawMissile(ctx, m));

  Object.values(players).forEach(p => {
    if (p.id === myId) return;
    if (p.connected === false) return;
    drawPlane(ctx, p, false, now);
  });
  drawPlane(ctx, myState, true, now);

  ctx.restore();
  drawMinimap(now);
}

function drawMinimap(now) {
  const ctx = miniCtx, S = miniCanvas.width;
  ctx.clearRect(0, 0, S, S);
  ctx.fillStyle = 'rgba(20,30,50,0.4)';
  ctx.fillRect(0, 0, S, S);
  const scale = S / WORLD_W;

  coins.forEach(c => {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(c.x * scale - 1, c.y * scale - 1, 2, 2);
  });
  Object.values(players).forEach(p => {
    if (p.connected === false || p.alive === false) return;
    ctx.fillStyle = p.id === myId ? '#fff' : (p.color || colorFor(p.id));
    ctx.beginPath();
    ctx.arc(p.x * scale, p.y * scale, p.id === myId ? 3.5 : 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function interpolateRemotePlayers(dtSec) {
  const t = Math.min(1, REMOTE_SMOOTH * dtSec);
  Object.values(players).forEach(p => {
    if (p.id === myId || p.connected === false || p.tx === undefined) return;
    p.x += (p.tx - p.x) * t;
    p.y += (p.ty - p.y) * t;
    p.angle += angleDiff(p.angle, p.tangle) * t;
  });
}

// ================= Game loop =================
function beginLocalGame() {
  menu.style.display = 'none'; gameArea.style.display = 'block';
  myState = createLocalState();
  players[myId] = myState;
  wireKeyboard();
  wireMouse();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(loop);
}

let lastTime = 0, lastBroadcast = 0;

function loop(ts) {
  const dt = Math.min(lastTime ? ts - lastTime : 16, 60);
  lastTime = ts;
  const dtSec = dt / 1000;

  updateLocalPlane(dtSec, keysHeld);
  updateWeapons(dtSec);
  interpolateRemotePlayers(dtSec);
  hostMaybeSpawnCoin(ts);

  if (ts - lastBroadcast > 66) {
    lastBroadcast = ts;
    sendEvent({ type: 'state', x: myState.x, y: myState.y, angle: myState.angle, health: myState.health, alive: myState.alive });
  }

  hpFillEl.style.width = clamp((myState.health / MAX_HEALTH) * 100, 0, 100) + '%';
  boostFillEl.style.width = clamp((myState.boost / BOOST_MAX) * 100, 0, 100) + '%';
  heatFillEl.style.width = clamp((myState.heat / HEAT_MAX) * 100, 0, 100) + '%';
  heatFillEl.classList.toggle('overheat', myState.overheated);
  scoreValEl.textContent = myState.score || 0;
  killsValEl.textContent = myState.kills || 0;

  if (!myState.alive && myState.respawnAt) {
    const remain = Math.max(0, myState.respawnAt - performance.now());
    respawnTimerEl.textContent = 'Respawning in ' + (remain / 1000).toFixed(1) + 's';
  }

  render(ts);
  requestAnimationFrame(loop);
}

// ================= Boot =================
window.addEventListener('DOMContentLoaded', () => {
  chooseRole = document.getElementById('chooseRole');
  lobby = document.getElementById('lobby');
  menu = document.getElementById('menu');
  gameArea = document.getElementById('gameArea');
  statusEl = document.getElementById('status');
  lobbyList = document.getElementById('lobbyList');
  startBtn = document.getElementById('startBtn');
  waitHint = document.getElementById('waitHint');

  skyCanvas = document.getElementById('sky');
  skyCtx = skyCanvas.getContext('2d');
  miniCanvas = document.getElementById('minimap');
  miniCtx = miniCanvas.getContext('2d');

  hpFillEl = document.getElementById('hpFill');
  boostFillEl = document.getElementById('boostFill');
  heatFillEl = document.getElementById('heatFill');
  scoreValEl = document.getElementById('scoreVal');
  killsValEl = document.getElementById('killsVal');
  lbListEl = document.getElementById('lbList');
  killFeedEl = document.getElementById('killFeed');
  respawnOverlay = document.getElementById('respawnOverlay');
  respawnMsgEl = document.getElementById('respawnMsg');
  respawnTimerEl = document.getElementById('respawnTimer');

  document.getElementById('hostBtn').onclick = () => { captureName(); startHost(); };
  document.getElementById('joinBtn').onclick = () => { captureName(); startJoin(); };
});

function captureName() {
  const v = document.getElementById('nameInput').value.trim();
  if (v) myName = v.slice(0, 14);
}
