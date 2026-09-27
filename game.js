// ================= Constants =================
// v1.27 world scale: 20% larger than the previous 6000 x 3680 arena.
const WORLD_W = 7200, WORLD_H = 4416;
// The previous camera already showed 15% more world. Apply the requested
// additional 15% multiplicatively: 1.15 * 1.15 = 1.3225.
const CAMERA_FOV_MULT = 1.3225;
const GROUND_Y = WORLD_H - 150;   // sea surface / crash boundary
const MAX_PLAYERS = 8;

const PLANE_SPEED = 285;          // px/s forward, constant auto-flight
const BOOST_MULT = 1.95;
const BOOST_MAX = 100, BOOST_DRAIN = 55, BOOST_REGEN = 22; // per second
const TURN_RATE = 2.1;            // rad/s the plane turns to face the mouse cursor — deliberately sluggish
const BOOST_TURN_MULT = 0.55;     // turning gets noticeably harder while boosting (speed vs. agility trade-off)
const AIRBRAKE_MULT = 0.58;
const AIRBRAKE_TURN_MULT = 0.82;  // Shift slows turning instead of making air-braking over-agile
const GRAVITY_ACCEL = 180;        // very forgiving climb penalty; diving still gains speed
const TOP_BOUNDARY_GRAVITY = 1250; // strong downward pull once the plane crosses the top edge
const TOP_BOUNDARY_DEPTH = 260;
const MIN_FLIGHT_SPEED = -220, MAX_FLIGHT_SPEED = 720;
// High-speed flight tuning. The assist only engages after the aircraft has
// already reached the threshold, so ordinary handling stays unchanged.
const HIGH_SPEED_THRESHOLD = 600;
const HIGH_SPEED_ACCELERATION = 88;
const HIGH_SPEED_MAX_SPEED = 900;
const HIGH_SPEED_FOV_MULT = 1.518;
const HIGH_SPEED_FOV_SMOOTHING = 5.5;
const SONIC_BOOM_COOLDOWN_MS = 1800;
const TURN_ACCEL = 9.5, TURN_DAMPING = 3.8;
const BARREL_ROLL_DURATION = 720, BARREL_ROLL_SPEED = Math.PI * 2.8, BARREL_ROLL_COOLDOWN = 900;
const STALL_SPIN_SPEED = 5.2, FALL_GRAVITY = 420;
const STALL_DELAY = 320; // brief warning window before a sustained stall becomes uncontrolled

const BULLET_SPEED = 1850, BULLET_GRAVITY = 260, BULLET_LIFE = Infinity, FIRE_COOLDOWN = 32, BULLET_DAMAGE = 7;
const BULLET_SIGHT_TIME = .42;
const HIT_RADIUS = 30, BULLET_RADIUS = 1.65;

// Gun heat: ultra-fast RPM, but holding fire builds heat until it locks out.
const HEAT_MAX = 300, HEAT_PER_SHOT = 5, HEAT_DECAY = 26, HEAT_DECAY_OVERHEAT = 44;
const OVERHEAT_RESET_FRAC = 0.1;  // must cool back down to 10% heat before firing again

// Homing missiles: limited ammo, regenerates slowly, turns faster than a
// plane can (so out-turning one alone is hard) but can be decoyed by a flare.
const MISSILE_INITIAL_SPEED = 760;
const MISSILE_MAX_SPEED = 1120;
const MISSILE_ACCELERATION = 145;
const MISSILE_TURN_RATE = 5.4, MISSILE_LIFE = 4200, MISSILE_DAMAGE = 55;
const MISSILE_LOCK_DELAY = 1000;  // continuous facing time required for a lock
const MISSILE_LOCK_HOLD_MS = 2000; // completed lock remains usable this long
const MISSILE_HIT_RADIUS = 36, MISSILE_LOCK_RANGE = Infinity, MISSILE_LOCK_CONE = Math.PI / 3;
const MISSILE_MAX = 4, MISSILE_REGEN_MS = 5000, MISSILE_COOLDOWN = 900;
const BOMB_SPEED = 240, BOMB_GRAVITY = 420, BOMB_LIFE = 2200, BOMB_DAMAGE = 62;
const BOMB_MAX = 2, BOMB_REGEN_MS = 8500, BOMB_COOLDOWN = 850, BOMB_HIT_RADIUS = 42;
const BOMB_PROXIMITY_RADIUS = 108, SHRAPNEL_COUNT = 10, SHRAPNEL_SPEED = 430;
const SHRAPNEL_GRAVITY = 120, SHRAPNEL_LIFE = 650, SHRAPNEL_DAMAGE = 14, SHRAPNEL_HIT_RADIUS = 18;

// Flares: a limited-charge countermeasure that redirects a locked missile
// within FLARE_BREAK_RADIUS onto the actual moving flare.
const FLARE_MAX = 3, FLARE_REGEN_MS = 7000, FLARE_MIN_INTERVAL = 400;
const FLARE_BREAK_RADIUS = 320, FLARE_ACTIVE_MS = 1400, FLARE_SALVO_COUNT = 6;
const FLARE_SPAWN_INTERVAL_MS = 200; // delay between each two-sided flare wave
const CRITICAL_HEALTH_FRACTION = 0.30; // start the attached fire trail below 30% HP

const REMOTE_SMOOTH = 12;         // how fast other players' rendered planes catch up to network updates
const SOUND_MAX_DISTANCE = 1400;  // world units; sounds beyond this are silent
const CLOUD_COUNT = 45;           // lighter background coverage; easy to tune
const CLOUD_BANK_COUNT = 4;       // fewer dense concealment zones

// Visual-only effects: short-lived radial bursts drawn at an (x,y) for a
// fixed lifetime, used for gun/missile impacts, launches, and kills.
const FX = {
  spark:  { life: 220, r: 16, colors: ['rgba(255,255,255,0.98)',  'rgba(255,150,60,0.9)', 'rgba(255,55,25,0)'] },
  blast:  { life: 620, r: 88, colors: ['rgba(255,255,255,1)', 'rgba(255,150,35,0.95)', 'rgba(255,35,10,0)'] },
  crash:  { life: 850, r: 120, colors: ['rgba(255,255,255,1)', 'rgba(255,105,25,0.95)', 'rgba(40,10,5,0)'] },
  muzzle: { life: 115, r: 18, colors: ['rgba(255,255,230,1)', 'rgba(255,190,75,0.82)', 'rgba(255,70,20,0)'] },
  launch: { life: 420, r: 34, colors: ['rgba(255,255,255,0.95)', 'rgba(110,220,255,0.7)', 'rgba(25,95,150,0)'] },
  shock:  { life: 360, r: 72, colors: ['rgba(255,225,140,0.9)', 'rgba(255,90,30,0.5)', 'rgba(255,30,10,0)'] },
  bomb:   { life: 420, r: 82, colors: ['rgba(255,248,205,1)', 'rgba(255,140,45,0.92)', 'rgba(105,25,10,0)'] },
};

const MAX_HEALTH = 100, RESPAWN_DELAY = 2200, INVULN_TIME = 1500;
const DEFAULT_BOT_COUNT = 5;
let botCount = DEFAULT_BOT_COUNT;
const BOT_RESPAWN_DELAY = RESPAWN_DELAY;
const BOT_FIRE_RANGE = 1050;
const BOT_GUN_CONE = Math.PI / 10;
const BOT_BOMB_CONE = Math.PI / 5;
const BOT_FIRE_COOLDOWN = 85; // keeps five local pilots readable and prevents projectile floods
const BOT_MISSILE_RANGE = 950;
const BOT_BOMB_RANGE = 520;
const BOT_AI_TICK_MS = 90;
const KILL_SCORE = 50;

const COLORS = ['#ff6b6b', '#4dd0e1', '#ffd166', '#9d7bff', '#6fe08a', '#ff9f43', '#5ea8ff', '#f472b6'];

// ================= Shared state =================
let peer = null, isHost = false, botMode = false, myId = null, myName = 'Player';
let connections = {};             // host: {id -> DataConnection}; client: {host -> DataConnection}
let players = {};                 // id -> {id,name,connected,alive,x,y,angle,health,score,kills,color}
let bullets = [];                 // {id,ownerId,x,y,angle,born}
let missiles = [];                // {id,ownerId,targetId,x,y,angle,born,trail}
let bombs = [];                   // {id,ownerId,x,y,vx,vy,born}
let shrapnels = [];               // short-lived radial bomb fragments
let flares = [];                  // {x,y,born} — cosmetic + decoy trigger
let explosions = [];              // {x,y,born,kind} — see FX above
let specialEffects = [];           // imported impact/death/water effects
let clouds = [];
let cloudBanks = [];
let started = false, nextBulletId = 0, nextMissileId = 0;
let lastClientInputSend = 0, clientInputSeq = 0, clientActionSeq = 0;

let myState = null;               // local authoritative plane state
let killFeedEl, lbListEl, scoreValEl, killsValEl, hpFillEl, boostFillEl, heatFillEl, heatValueEl;
let missileCountEl, bombCountEl, flareCountEl, lockWarningEl, speedValueEl, speedNeedleEl, speedFillEl;
let respawnOverlay, respawnMsgEl, respawnTimerEl;
let statusEl, lobbyList, startBtn, botsBtn, botCountInputEl, botCountValueEl, networkStatusEl, chooseRole, lobby, menu, gameArea, waitHint;
let skyCanvas, skyCtx, miniCanvas, miniCtx;
let audioCtx = null, masterGain = null;
let audioBank = {}, audioAssetsStarted = false;
let engineCruiseAudio = null, engineBoostAudio = null;
let screenShake = 0, recoilKick = 0, lastIncomingLock = false;
let currentCameraFovMult = CAMERA_FOV_MULT;
let localFlareScheduleGeneration = 0;
const seenImpactKeys = new Set();
let lastNetworkActivityAt = 0;

const AUDIO_ASSETS = {
  // GitHub Pages currently serves the uploaded audio files from the repo root.
  // Keep these paths flat so the deployed game can actually resolve them.
  cannon: 'shoot_01.ogg',
  missile: 'missile-launch.ogg',
  explosion: 'airplane-explosion.ogg',
  impact: 'heavy-impact.ogg',
  flare: 'freesound_community-firecracker-104159.mp3',
  chaff: 'chaff_flare.mp3',
  lock: 'lock-alarm.ogg',
  cruise: 'airplane-cruise.mp3',
  boost: 'airplane-boost.mp3',
  sonicBoom: 'sonic-boom.mp3',
};

// ================= World helpers =================
function rand(min, max) { return min + Math.random() * (max - min); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }
function pointSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  const t = lenSq ? clamp(((px - x1) * dx + (py - y1) * dy) / lenSq, 0, 1) : 0;
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}
function colorFor(id) { return COLORS[id % COLORS.length]; }
// Shortest signed angular distance from `from` to `to`, in (-PI, PI].
function angleDiff(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

// Small procedural sound rig: it starts only after a user gesture and keeps
// the game self-contained. The cannon uses layered low oscillators + clipped
// noise to suggest a fast, heavy rotary cannon without shipping an audio file.
function unlockAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      audioCtx = new AC();
      masterGain = audioCtx.createGain(); masterGain.gain.value = 0.24; masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  if (!audioAssetsStarted) {
    audioAssetsStarted = true;
    Object.entries(AUDIO_ASSETS).forEach(([name, src]) => {
      const a = new Audio(src); a.preload = 'auto'; audioBank[name] = a;
    });
  }
}
function ensureEngineAudio() {
  if (!audioAssetsStarted || engineCruiseAudio || !audioBank.cruise) return;
  engineCruiseAudio = audioBank.cruise.cloneNode();
  engineCruiseAudio.loop = true; engineCruiseAudio.volume = 0;
  engineBoostAudio = audioBank.boost.cloneNode();
  engineBoostAudio.loop = true; engineBoostAudio.volume = 0;
}
function updateEngineAudio() {
  if (!audioAssetsStarted) return;
  ensureEngineAudio();
  if (!engineCruiseAudio || !engineBoostAudio) return;
  const active = !!(myState && myState.alive);
  const boosting = active && !!myState.boosting;
  const cruiseTarget = active ? (boosting ? .04 : .18) : 0;
  const boostTarget = boosting ? .25 : 0;
  // Smooth the mix so boost input does not create clicks or abrupt volume
  // jumps when the player taps the key near the speed threshold.
  engineCruiseAudio.volume += (cruiseTarget - engineCruiseAudio.volume) * .18;
  engineBoostAudio.volume += (boostTarget - engineBoostAudio.volume) * .18;
  if (active) {
    if (engineCruiseAudio.paused) engineCruiseAudio.play().catch(() => {});
    if (engineBoostAudio.paused) engineBoostAudio.play().catch(() => {});
  } else {
    engineCruiseAudio.pause(); engineBoostAudio.pause();
  }
}
function playAsset(name, volume = .65, rate = 1) {
  const source = audioBank[name]; if (!source) return false;
  const a = source.cloneNode(); a.src = source.src; a.volume = clamp(volume, 0, 1); a.playbackRate = rate;
  a.load(); a.play().catch(() => {}); return true;
}
function proximityVolume(x, y, baseVolume) {
  if (!myState || !Number.isFinite(x) || !Number.isFinite(y)) return baseVolume;
  const distance = dist(myState.x, myState.y, x, y);
  if (distance >= SOUND_MAX_DISTANCE) return 0;
  const near = 1 - distance / SOUND_MAX_DISTANCE;
  return baseVolume * near * near;
}
function tone(freq, duration, volume, type = 'sine', slide = 0) {
  if (!audioCtx || !masterGain) return;
  const t = audioCtx.currentTime, o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + duration);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(volume, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + duration);
  o.connect(g); g.connect(masterGain); o.start(t); o.stop(t + duration + .02);
}
function noiseBurst(duration, volume, filterType = 'bandpass', frequency = 900) {
  if (!audioCtx || !masterGain) return;
  const length = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
  const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate), data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** .35;
  const source = audioCtx.createBufferSource(), filter = audioCtx.createBiquadFilter(), g = audioCtx.createGain();
  source.buffer = buffer; filter.type = filterType; filter.frequency.value = frequency; filter.Q.value = .8;
  g.gain.setValueAtTime(volume, audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + duration);
  source.connect(filter); filter.connect(g); g.connect(masterGain); source.start();
}
function playCannonSound(x = null, y = null) {
  const volume = x == null || y == null ? .34 : proximityVolume(x, y, .34);
  if (volume <= .005) return;
  if (!playAsset('cannon', volume, 1.22)) { noiseBurst(.055, volume * .35, 'bandpass', 1100); tone(82, .09, volume * .26, 'sawtooth', -32); }
}
function playMissileLaunchSound(x = null, y = null) {
  const volume = x == null || y == null ? .36 : proximityVolume(x, y, .36);
  if (volume <= .005) return;
  if (!playAsset('missile', volume, 1.05)) { noiseBurst(.34, volume * .22, 'lowpass', 520); tone(92, .38, volume * .25, 'sawtooth', 240); }
}
function playExplosionSound(kind, x, y) {
  if (kind === 'blast' || kind === 'crash' || kind === 'shock') {
    const volume = proximityVolume(x, y, kind === 'crash' ? .42 : .3);
    if (volume <= .005) return;
    if (!playAsset('explosion', volume, kind === 'crash' ? .88 : 1)) { noiseBurst(kind === 'crash' ? .5 : .32, volume * .34, 'lowpass', 240); tone(kind === 'crash' ? 42 : 58, .52, volume * .29, 'sine', -34); }
  } else if (kind === 'spark') {
    const volume = proximityVolume(x, y, .2);
    if (volume > .005) playAsset('impact', volume, 1.08);
  }
}
function playLockSound() { if (!playAsset('lock', .22, 1.15)) tone(880, .08, .045, 'square', -220); }
function playSonicBoomSound(x, y) {
  const volume = proximityVolume(x, y, .52);
  if (volume > .005) playAsset('sonicBoom', volume, .98);
}

// World-space port of the supplied sonic-boom demo. The effect is attached
// to the aircraft's flight axis, so its shock rings, vapor, and streaks move
// behind the plane instead of looking like a generic radial explosion.
class SonicBoomEffect {
  constructor(x, y, angle) {
    this.x = x; this.y = y; this.angle = angle || 0; this.age = 0;
    this.dead = false; this.maxLife = 1.1; this.shake = 24; this.shakeTime = .3;
    this.rings = [0, .1].map((delay, i) => ({
      delay, life: 0, maxLife: .85 + i * .15, maxR: 95 + i * 35
    }));
    this.vapor = []; this.streaks = [];
    for (let i = 0; i < 22; i++) {
      const a = Math.random() * Math.PI * 2, speed = 30 + Math.random() * 70;
      this.vapor.push({ x: 0, y: 0, vx: Math.cos(a) * speed - 55,
        vy: Math.sin(a) * speed * .5, r: 9 + Math.random() * 20,
        life: 0, maxLife: .5 + Math.random() * .35 });
    }
    for (let i = 0; i < 18; i++) {
      const a = Math.PI + (Math.random() - .5) * .5, speed = 320 + Math.random() * 260;
      this.streaks.push({ x: 0, y: (Math.random() - .5) * 70, a,
        vx: Math.cos(a) * speed, vy: Math.sin(a) * speed * .15,
        len: 18 + Math.random() * 30, life: 0, maxLife: .2 + Math.random() * .16 });
    }
  }
  update(dt) {
    this.age += dt;
    this.rings.forEach(r => { if (r.delay > 0) r.delay -= dt; else r.life += dt; });
    this.vapor.forEach(v => { v.life += dt; v.x += v.vx * dt; v.y += v.vy * dt; v.vx *= .92; v.vy *= .9; v.r += dt * 26; });
    this.streaks.forEach(s => { s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .88; s.vy *= .88; });
    this.rings = this.rings.filter(r => r.life < r.maxLife);
    this.vapor = this.vapor.filter(v => v.life < v.maxLife);
    this.streaks = this.streaks.filter(s => s.life < s.maxLife);
    if (this.age > this.maxLife && !this.rings.length && !this.vapor.length && !this.streaks.length) this.dead = true;
  }
  draw(ctx) {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
    const flashT = Math.min(1, this.age / .1);
    if (flashT < 1) {
      ctx.globalAlpha = 1 - flashT;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 70);
      g.addColorStop(0, '#fff'); g.addColorStop(.5, 'rgba(220,245,255,.7)'); g.addColorStop(1, 'rgba(220,245,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 70, 42, 0, 0, Math.PI * 2); ctx.fill();
    }
    this.streaks.forEach(s => { const t = s.life / s.maxLife; ctx.globalAlpha = 1 - t; ctx.strokeStyle = 'rgba(225,248,255,.9)'; ctx.lineWidth = 2 * (1 - t) + .4; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - Math.cos(s.a) * s.len, s.y - Math.sin(s.a) * s.len); ctx.stroke(); });
    this.vapor.forEach(v => { const t = v.life / v.maxLife; ctx.globalAlpha = (1 - t) * .55; const g = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, v.r); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2); ctx.fill(); });
    this.rings.forEach(r => { if (r.delay > 0) return; const t = r.life / r.maxLife, eased = 1 - Math.pow(1 - t, 3), rad = 16 + eased * r.maxR; const cx = -(34 + t * 85); ctx.globalAlpha = (1 - t) * .7; ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 5 * (1 - t) + 1; ctx.beginPath(); ctx.ellipse(cx, 0, rad, rad * .4, -.55, 0, Math.PI * 2); ctx.stroke(); });
    ctx.restore();
  }
}

function triggerSonicBoom(x, y, angle) {
  specialEffects.push(new SonicBoomEffect(x, y, angle));
  screenShake = Math.max(screenShake, 12);
  playSonicBoomSound(x, y);
}

function spawnExplosion(x, y, kind, angle = -Math.PI / 2) {
  if (kind === 'blast') specialEffects.push(new ImpactExplosion(x, y, 'missile'));
  else if (kind === 'crash') specialEffects.push(new ImpactExplosion(x, y, 'death'));
  else if (kind === 'spark') specialEffects.push(new BulletHitEffect(x, y, angle));
  else if (kind === 'water') specialEffects.push(new WaterSplashEffect(x, y));
  else if (kind === 'planeWater') specialEffects.push(new WaterCrashEffect(x, y));
  else explosions.push({ x, y, born: performance.now(), kind });
  if (kind === 'blast' || kind === 'crash' || kind === 'planeWater') playExplosionSound(kind === 'planeWater' ? 'crash' : kind, x, y);
  else if (kind === 'spark' || kind === 'water') playExplosionSound('spark', x, y);
  else if (kind !== 'water') playExplosionSound(kind, x, y);
  if (kind === 'blast' || kind === 'crash' || kind === 'planeWater' || kind === 'shock') screenShake = Math.max(screenShake, kind === 'crash' || kind === 'planeWater' ? 22 : 11);
}
function pruneExplosions(now) {
  for (let i = explosions.length - 1; i >= 0; i--) {
    if (now - explosions[i].born > FX[explosions[i].kind].life) explosions.splice(i, 1);
  }
  for (let i = specialEffects.length - 1; i >= 0; i--) {
    if (specialEffects[i].dead) specialEffects.splice(i, 1);
  }
}
function updateSpecialEffects(dtSec) { specialEffects.forEach(e => e.update(dtSec)); }
// Used when another client reports a hit on a bullet/missile we're also
// tracking locally, so our copy disappears (with an effect) at the same time.
function removeProjectileLocal(kind, id) {
  const arr = kind === 'missile' ? missiles : kind === 'bomb' ? bombs : bullets;
  // Remove every local copy. This protects against a duplicated network shot
  // leaving a visual ghost after one copy already caused the damage.
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i].id === id) arr.splice(i, 1);
  }
}

function projectileExists(kind, id) {
  const arr = kind === 'missile' ? missiles : kind === 'bomb' ? bombs : bullets;
  return arr.some(p => p.id === id);
}

function rememberImpact(kind, id) {
  const key = String(kind) + ':' + String(id);
  if (seenImpactKeys.has(key)) return false;
  seenImpactKeys.add(key);
  // Keep the dedupe set bounded during long multiplayer sessions.
  if (seenImpactKeys.size > 1200) {
    const first = seenImpactKeys.values().next().value;
    seenImpactKeys.delete(first);
  }
  return true;
}

function setNetworkStatus(text, tone = 'ok') {
  if (!networkStatusEl) return;
  if (networkStatusEl.textContent === text && networkStatusEl.dataset.tone === tone) return;
  networkStatusEl.textContent = text;
  networkStatusEl.dataset.tone = tone;
}

// ================= Imported impact effects =================
// These effects are world-space versions of the five effects supplied in
// explosion-effect.html. They intentionally own their particles and lifetime
// so projectile/death gameplay code stays separate from rendering.
class ImpactExplosion {
  constructor(x, y, type = 'missile') {
    this.x = x; this.y = y; this.type = type; this.age = 0; this.dead = false;
    const big = type === 'death';
    this.maxLife = big ? 1.45 : .85;
    this.shockwaveMax = big ? 165 : 40;
    this.flashAlpha = big ? .78 : .4;
    this.particles = []; this.debris = []; this.smoke = []; this.fireballs = [];
    const fireballCount = big ? 3 : 1;
    for (let i = 0; i < fireballCount; i++) this.fireballs.push({
      delay: i * .05, life: 0, maxLife: (big ? .45 : .3) + i * .08,
      maxR: (big ? 60 : 34) + i * (big ? 22 : 10)
    });
    const coreCount = big ? 58 : 30;
    for (let i = 0; i < coreCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = (big ? 80 : 55) + Math.random() * (big ? 330 : 220);
      this.particles.push({ x: 0, y: 0, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
        r: (big ? 4.3 : 3) + Math.random() * (big ? 10 : 6), life: 0,
        maxLife: (big ? .7 : .45) + Math.random() * .5, hue: 15 + Math.random() * 35,
        spark: Math.random() < .3 });
    }
    const debrisCount = big ? 18 : 0;
    for (let i = 0; i < debrisCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 120 + Math.random() * 230;
      this.debris.push({ x: 0, y: 0, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed - 55,
        rot: Math.random() * Math.PI * 2, vrot: (Math.random() - .5) * 12,
        len: 9 + Math.random() * 16, life: 0, maxLife: 1 + Math.random() * .8 });
    }
    const smokeCount = big ? 25 : 12;
    for (let i = 0; i < smokeCount; i++) {
      const a = Math.random() * Math.PI * 2;
      this.smoke.push({ x: 0, y: 0, vx: Math.cos(a) * (big ? 40 : 25),
        vy: Math.sin(a) * (big ? 40 : 25) - (big ? 30 : 16),
        r: (big ? 14 : 8) + Math.random() * (big ? 29 : 16), life: 0,
        maxLife: (big ? 1.4 : .9) + Math.random() * .7, delay: Math.random() * .2 });
    }
  }
  update(dt) {
    this.age += dt;
    this.fireballs.forEach(f => { if (f.delay > 0) f.delay -= dt; else f.life += dt; });
    this.particles.forEach(p => { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .94; p.vy = p.vy * .94 + 40 * dt; });
    this.particles = this.particles.filter(p => p.life < p.maxLife);
    this.debris.forEach(d => { d.life += dt; d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 220 * dt; d.rot += d.vrot * dt; });
    this.debris = this.debris.filter(d => d.life < d.maxLife);
    this.smoke.forEach(s => { if (s.delay > 0) s.delay -= dt; else { s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.r += dt * (this.type === 'death' ? 28 : 16); } });
    this.smoke = this.smoke.filter(s => s.life < s.maxLife);
    this.dead = this.age > this.maxLife && !this.particles.length && !this.debris.length && !this.smoke.length;
  }
  draw(ctx) {
    const big = this.type === 'death';
    ctx.save(); ctx.translate(this.x, this.y);
    const swT = Math.min(1, this.age / (this.maxLife * .55));
    if (swT < 1) {
      const r = (1 - Math.pow(1 - swT, 2)) * this.shockwaveMax;
      ctx.globalAlpha = (1 - swT) * .7; ctx.strokeStyle = '#ffe3a0'; ctx.lineWidth = 6 * (1 - swT) + 1.5;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    }
    this.smoke.forEach(s => { if (s.delay > 0) return; const t = s.life / s.maxLife; ctx.globalAlpha = (1 - t) * .35; const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r); g.addColorStop(0, 'rgba(90,90,95,.9)'); g.addColorStop(1, 'rgba(90,90,95,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
    this.fireballs.forEach(f => { if (f.delay > 0 || f.life > f.maxLife) return; const t = f.life / f.maxLife; const r = f.maxR * Math.sqrt(Math.sin(t * Math.PI * .5 + .001)); ctx.globalAlpha = (1 - t) * .9; const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, 'rgba(255,244,214,.95)'); g.addColorStop(.35, 'rgba(255,150,40,.85)'); g.addColorStop(.7, 'rgba(255,60,20,.5)'); g.addColorStop(1, 'rgba(255,60,20,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill(); });
    this.particles.forEach(p => { const t = p.life / p.maxLife; ctx.globalAlpha = 1 - t; ctx.fillStyle = `hsl(${p.hue},100%,${p.spark ? 75 : 55 - t * 30}%)`; ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.5, p.r * (1 - t * .6)), 0, Math.PI * 2); ctx.fill(); });
    const flashT = Math.min(1, this.age / .2);
    if (flashT < 1) { ctx.globalAlpha = (1 - flashT) * this.flashAlpha * 2; const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.shockwaveMax * .75); g.addColorStop(0, '#fff'); g.addColorStop(.4, '#fff7dd'); g.addColorStop(1, 'rgba(255,180,40,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, this.shockwaveMax * .75, 0, Math.PI * 2); ctx.fill(); }
    this.debris.forEach(d => { const t = d.life / d.maxLife; ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.rot); ctx.globalAlpha = 1 - t; ctx.fillStyle = '#8a8f96'; ctx.fillRect(-d.len / 2, -1.5, d.len, 3); ctx.restore(); });
    ctx.restore();
  }
}

class BulletHitEffect {
  constructor(x, y, angle = -Math.PI / 2) {
    this.x = x; this.y = y; this.age = 0; this.maxLife = .28; this.dead = false; this.flashLife = 0; this.sparks = [];
    const count = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) { const a = angle + Math.PI + (Math.random() - .5) * 1.6; const speed = 90 + Math.random() * 160; this.sparks.push({ x: 0, y: 0, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, len: 3 + Math.random() * 6, life: 0, maxLife: .12 + Math.random() * .16 }); }
  }
  update(dt) { this.age += dt; this.flashLife += dt; this.sparks.forEach(s => { s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .9; s.vy = s.vy * .9 + 260 * dt; }); this.sparks = this.sparks.filter(s => s.life < s.maxLife); this.dead = this.age > this.maxLife && !this.sparks.length; }
  draw(ctx) { ctx.save(); ctx.translate(this.x, this.y); if (this.flashLife < .07) { const t = this.flashLife / .07; ctx.globalAlpha = 1 - t; const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 10); g.addColorStop(0, '#fffbe8'); g.addColorStop(1, 'rgba(255,220,120,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); } this.sparks.forEach(s => { const t = s.life / s.maxLife; ctx.globalAlpha = 1 - t; ctx.strokeStyle = `hsl(${45 + Math.random() * 10},100%,${70 - t * 20}%)`; ctx.lineWidth = 1.6 * (1 - t) + .4; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * .02, s.y - s.vy * .02); ctx.stroke(); }); ctx.restore(); }
}

class WaterSplashEffect {
  constructor(x, y) { this.x = x; this.y = y; this.age = 0; this.dead = false; this.drops = []; this.rings = [0, .08].map(delay => ({ delay, life: 0, maxLife: .5, maxR: 16 + Math.random() * 6 })); this.mist = []; for (let i = 0; i < 5; i++) this.mist.push({ x: (Math.random() - .5) * 4, r: 2 + Math.random() * 3, life: 0, maxLife: .25 + Math.random() * .15 }); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (Math.random() - .5) * 1.7, speed = 45 + Math.random() * 95; this.drops.push({ x: 0, y: 0, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, r: .9 + Math.random() * 1.5, life: 0, maxLife: .3 + Math.random() * .25 }); } }
  update(dt) { this.age += dt; this.drops.forEach(d => { d.life += dt; d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 380 * dt; }); this.drops = this.drops.filter(d => d.life < d.maxLife && d.y < 40); this.rings.forEach(r => { if (r.delay > 0) r.delay -= dt; else r.life += dt; }); this.rings = this.rings.filter(r => r.life < r.maxLife); this.mist.forEach(m => { m.life += dt; m.r += dt * 30; }); this.mist = this.mist.filter(m => m.life < m.maxLife); this.dead = this.age > .9 && !this.drops.length && !this.rings.length && !this.mist.length; }
  draw(ctx) { ctx.save(); ctx.translate(this.x, this.y); this.rings.forEach(r => { if (r.delay > 0) return; const t = r.life / r.maxLife; ctx.globalAlpha = (1 - t) * .55; ctx.strokeStyle = '#dff6ff'; ctx.lineWidth = 2 * (1 - t) + .5; ctx.beginPath(); ctx.ellipse(0, 0, t * r.maxR, t * r.maxR * .35, 0, 0, Math.PI * 2); ctx.stroke(); }); this.mist.forEach(m => { const t = m.life / m.maxLife; ctx.globalAlpha = (1 - t) * .5; ctx.fillStyle = '#eefbff'; ctx.beginPath(); ctx.ellipse(m.x, -m.r * .15, m.r, m.r * .6, 0, 0, Math.PI * 2); ctx.fill(); }); this.drops.forEach(d => { const t = d.life / d.maxLife; ctx.globalAlpha = 1 - t; ctx.fillStyle = '#bfeaff'; ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(.6, d.r * (1 - t * .4)), 0, Math.PI * 2); ctx.fill(); }); ctx.restore(); }
}

class WaterCrashEffect {
  constructor(x, y) { this.x = x; this.y = y; this.age = 0; this.dead = false; this.spikes = []; this.drops = []; this.rings = [0, .06, .16, .3, .46].map(delay => ({ delay, life: 0, maxLife: 1.3, maxR: 145 + Math.random() * 35 })); this.flames = []; this.steam = []; this.debris = []; for (let i = 0; i < 16; i++) { const a = -Math.PI / 2 + (Math.random() - .5) * .5, speed = 260 + Math.random() * 290; this.spikes.push({ x: (Math.random() - .5) * 14, y: 0, vx: Math.cos(a) * speed * .35, vy: Math.sin(a) * speed, r: 4 + Math.random() * 5.5, life: 0, maxLife: .55 + Math.random() * .4 }); } for (let i = 0; i < 60; i++) { const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, speed = 120 + Math.random() * 340; this.drops.push({ x: 0, y: 0, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, r: 1.3 + Math.random() * 3.3, life: 0, maxLife: .55 + Math.random() * .55 }); } for (let i = 0; i < 28; i++) { const a = Math.random() * Math.PI * 2, speed = 55 + Math.random() * 160; this.flames.push({ x: 0, y: -8, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed * .5 - 40, r: 4 + Math.random() * 8, life: 0, maxLife: .16 + Math.random() * .22, hue: 20 + Math.random() * 30 }); } for (let i = 0; i < 30; i++) this.steam.push({ x: 0, y: 0, vx: (Math.random() - .5) * 52, vy: -38 - Math.random() * 36, r: 11 + Math.random() * 22, life: 0, maxLife: 1.1 + Math.random(), delay: .1 + Math.random() * .4 }); for (let i = 0; i < 12; i++) { const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 75; this.debris.push({ x: Math.cos(a) * d * .3, y: 0, tx: Math.cos(a) * d, rot: Math.random() * Math.PI * 2, vrot: (Math.random() - .5) * 3, len: 8 + Math.random() * 13, life: 0, maxLife: 1.8 + Math.random() * .5, settle: .3 + Math.random() * .2 }); } }
  update(dt) { this.age += dt; this.spikes.forEach(s => { s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 500 * dt; }); this.spikes = this.spikes.filter(s => s.life < s.maxLife && s.y < 20); this.drops.forEach(d => { d.life += dt; d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 420 * dt; }); this.drops = this.drops.filter(d => d.life < d.maxLife && d.y < 30); this.rings.forEach(r => { if (r.delay > 0) r.delay -= dt; else r.life += dt; }); this.rings = this.rings.filter(r => r.life < r.maxLife); this.flames.forEach(f => { f.life += dt; f.x += f.vx * dt; f.y += f.vy * dt; f.vx *= .9; f.vy *= .9; }); this.flames = this.flames.filter(f => f.life < f.maxLife); this.steam.forEach(s => { if (s.delay > 0) s.delay -= dt; else { s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .98; s.r += dt * 14; } }); this.steam = this.steam.filter(s => s.life < s.maxLife); this.debris.forEach(d => { d.life += dt; const t = Math.min(1, d.life / d.settle), eased = 1 - Math.pow(1 - t, 3); d.x += (d.tx - d.x) * eased * .3; d.rot += d.vrot * dt * (1 - eased * .8); }); this.debris = this.debris.filter(d => d.life < d.maxLife); this.dead = this.age > 2.3 && !this.spikes.length && !this.drops.length && !this.rings.length && !this.flames.length && !this.steam.length && !this.debris.length; }
  draw(ctx) { ctx.save(); ctx.translate(this.x, this.y); this.rings.forEach(r => { if (r.delay > 0) return; const t = r.life / r.maxLife; ctx.globalAlpha = (1 - t) * .5; ctx.strokeStyle = '#dff6ff'; ctx.lineWidth = 2.5 * (1 - t) + .5; ctx.beginPath(); ctx.ellipse(0, 0, t * r.maxR, t * r.maxR * .32, 0, 0, Math.PI * 2); ctx.stroke(); }); this.debris.forEach(d => { const t = d.life / d.maxLife; ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.rot); ctx.globalAlpha = Math.min(1, (1 - t) * 1.4); ctx.fillStyle = '#6f757c'; ctx.fillRect(-d.len / 2, -1.5, d.len, 3); ctx.restore(); }); this.flames.forEach(f => { const t = f.life / f.maxLife; ctx.globalAlpha = 1 - t; ctx.fillStyle = `hsl(${f.hue},100%,${60 - t * 20}%)`; ctx.beginPath(); ctx.arc(f.x, f.y, Math.max(.5, f.r * (1 - t * .7)), 0, Math.PI * 2); ctx.fill(); }); this.steam.forEach(s => { if (s.delay > 0) return; const t = s.life / s.maxLife; ctx.globalAlpha = (1 - t) * .4; const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r); g.addColorStop(0, 'rgba(230,238,240,.9)'); g.addColorStop(1, 'rgba(230,238,240,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); }); this.spikes.forEach(s => { const t = s.life / s.maxLife; ctx.globalAlpha = 1 - t; ctx.fillStyle = '#cdeeff'; ctx.beginPath(); ctx.arc(s.x, s.y, Math.max(.6, s.r * (1 - t * .3)), 0, Math.PI * 2); ctx.fill(); }); this.drops.forEach(d => { const t = d.life / d.maxLife; ctx.globalAlpha = 1 - t; ctx.fillStyle = '#bfeaff'; ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(.5, d.r * (1 - t * .4)), 0, Math.PI * 2); ctx.fill(); }); ctx.restore(); }
}

function buildClouds() {
  clouds = [];
  cloudBanks = [];
  for (let i = 0; i < CLOUD_COUNT; i++) {
    clouds.push({
      x: rand(0, WORLD_W), y: rand(0, GROUND_Y - 40),
      r: rand(30, 90), a: rand(0.08, 0.22)
    });
  }
  // Fixed coordinates keep cloud concealment and missile line-of-sight
  // identical on every multiplayer client.
  const bankLayout = [
    [.16, .20, 300, 180], [.38, .31, 350, 220],
    [.62, .18, 280, 170], [.82, .36, 330, 210]
  ];
  cloudBanks = bankLayout.slice(0, CLOUD_BANK_COUNT).map(([nx, ny, rx, ry], i) => ({
    x: WORLD_W * nx, y: (GROUND_Y - 160) * ny + 180, rx, ry, alpha: .72 + (i % 3) * .07
  }));
}

function isInCloudBank(x, y) {
  return cloudBanks.some(b => {
    const dx = (x - b.x) / b.rx, dy = (y - b.y) / b.ry;
    return dx * dx + dy * dy < 1;
  });
}

function randomSpawnPoint() {
  return { x: rand(200, WORLD_W - 200), y: rand(120, GROUND_Y - 160) };
}

function freshPlayerState(id, name) {
  const p = randomSpawnPoint();
  const angle = rand(0, Math.PI * 2);
  return {
    id, name, connected: true, alive: true,
    x: p.x, y: p.y, angle,
    tx: p.x, ty: p.y, tangle: angle, synced: false, // network target for smoothing remote planes
    health: MAX_HEALTH, score: 0, kills: 0, deaths: 0,
    color: colorFor(id), invulnUntil: performance.now() + INVULN_TIME
  };
}

// ================= Local plane simulation =================
function createLocalState() {
  const base = freshPlayerState(myId, myName);
  return Object.assign(base, {
    boost: BOOST_MAX, heat: 0, overheated: false, fireTimer: 0, respawnAt: 0, airbraking: false,
    speed: PLANE_SPEED, verticalVelocity: 0, turnVelocity: 0,
    stallTime: 0, stallRecoverTime: 0,
    roll: 0, barrelRollUntil: 0, barrelRollCooldown: 0, barrelRollDirection: 1,
    falling: false, stalled: false, deathKiller: null, fallSpinVelocity: 0,
    highSpeedActive: false, sonicBoomReadyAt: 0,
    missiles: MISSILE_MAX, missileCooldown: 0, missileRegenTimer: 0,
    bombs: BOMB_MAX, bombCooldown: 0, bombRegenTimer: 0,
    flares: FLARE_MAX, flareCooldown: 0, flareRegenTimer: 0,
    networkInput: { aimX: 1, aimY: 0, boost: false, airbrake: false, shoot: false },
    networkInputSeq: 0, networkActionSeq: 0,
    hostLockTargetId: null, hostLockProgress: 0, hostLockExpiresAt: 0
  });
}

function isNetworkClient() { return started && !botMode && !isHost; }

function createBotState(id, name, skill = .7) {
  const base = freshPlayerState(id, name);
  return Object.assign(base, {
    isBot: true, botSkill: skill, botTargetId: null, botTargetLockUntil: 0, botLockTargetId: null,
    botLockProgress: 0, botNextThink: performance.now() + rand(120, 520),
    botOrbitSign: id % 2 ? 1 : -1, botScheduleGeneration: 0,
    boost: BOOST_MAX, heat: 0, overheated: false, fireTimer: 0, respawnAt: 0, airbraking: false,
    speed: PLANE_SPEED, verticalVelocity: 0, turnVelocity: 0,
    stallTime: 0, stallRecoverTime: 0,
    roll: 0, barrelRollUntil: 0, barrelRollCooldown: 0, barrelRollDirection: 1,
    falling: false, stalled: false, deathKiller: null, fallSpinVelocity: 0,
    highSpeedActive: false, sonicBoomReadyAt: 0,
    missiles: MISSILE_MAX, missileCooldown: 0, missileRegenTimer: 0,
    bombs: BOMB_MAX, bombCooldown: 0, bombRegenTimer: 0,
    flares: FLARE_MAX, flareCooldown: 0, flareRegenTimer: 0
  });
}

function spawnBotSquadron(count = botCount) {
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    players[id] = createBotState(id, ['RAVEN', 'VIPER', 'NOVA', 'FALCON', 'WRAITH'][i], .58 + i * .055);
  }
}

function respawnLocal() {
  const p = randomSpawnPoint();
  myState.x = p.x; myState.y = p.y;
  myState.angle = rand(0, Math.PI * 2);
  myState.health = MAX_HEALTH;
  myState.heat = 0;
  myState.overheated = false;
  myState.speed = PLANE_SPEED; myState.verticalVelocity = 0; myState.turnVelocity = 0;
  myState.stallTime = 0;
  myState.roll = 0; myState.barrelRollUntil = 0; myState.barrelRollCooldown = 0; myState.barrelRollDirection = 1;
  myState.falling = false; myState.stalled = false; myState.stallRecoverTime = 0; myState.deathKiller = null; myState.fallSpinVelocity = 0;
  myState.highSpeedActive = false;
  myState.sonicBoomReadyAt = 0;
  localFlareScheduleGeneration++;
  myState.boosting = false;
  currentCameraFovMult = CAMERA_FOV_MULT;
  myState.missiles = MISSILE_MAX; myState.missileCooldown = 0; myState.missileRegenTimer = 0;
  myState.bombs = BOMB_MAX; myState.bombCooldown = 0; myState.bombRegenTimer = 0;
  myState.flares = FLARE_MAX; myState.flareCooldown = 0; myState.flareRegenTimer = 0;
  myState.alive = true;
  myState.invulnUntil = performance.now() + INVULN_TIME;
  respawnOverlay.style.display = 'none';
}

function respawnBot(bot) {
  const p = randomSpawnPoint();
  bot.x = p.x; bot.y = p.y; bot.angle = rand(0, Math.PI * 2);
  bot.health = MAX_HEALTH; bot.alive = true; bot.connected = true;
  bot.falling = false; bot.stalled = false; bot.deathKiller = null;
  bot.speed = PLANE_SPEED; bot.verticalVelocity = 0; bot.turnVelocity = 0;
  bot.stallTime = 0; bot.stallRecoverTime = 0; bot.roll = 0;
  bot.barrelRollUntil = 0; bot.barrelRollCooldown = 0; bot.barrelRollDirection = 1;
  bot.highSpeedActive = false; bot.sonicBoomReadyAt = 0;
  bot.botTargetId = null; bot.botTargetLockUntil = 0; bot.botLockTargetId = null; bot.botLockProgress = 0;
  bot.botNextThink = performance.now() + rand(100, 450);
  bot.botScheduleGeneration++;
  bot.heat = 0; bot.overheated = false; bot.fireTimer = 0; bot.airbraking = false;
  bot.missiles = MISSILE_MAX; bot.missileCooldown = 0; bot.missileRegenTimer = 0;
  bot.bombs = BOMB_MAX; bot.bombCooldown = 0; bot.bombRegenTimer = 0;
  bot.flares = FLARE_MAX; bot.flareCooldown = 0; bot.flareRegenTimer = 0;
  bot.respawnAt = 0; bot.invulnUntil = performance.now() + INVULN_TIME;
}

function beginBotDeathFall(bot, killerId) {
  if (!bot || !bot.alive || bot.falling) return;
  bot.health = 0; bot.falling = true; bot.stalled = false; bot.boosting = false;
  bot.deathKiller = killerId; bot.speed = 0; bot.turnVelocity = 0;
  bot.verticalVelocity = Math.max(45, bot.verticalVelocity);
  bot.fallSpinVelocity = STALL_SPIN_SPEED * (bot.id % 2 ? 1 : -1);
  bot.botScheduleGeneration++;
}

function finishBotDeath(bot) {
  if (!bot || !bot.alive) return;
  bot.alive = false; bot.falling = false; bot.boosting = false;
  bot.respawnAt = performance.now() + BOT_RESPAWN_DELAY;
  handleDied(bot.id, bot.deathKiller);
}

function updateBotDeathFall(bot, dtSec) {
  bot.verticalVelocity += FALL_GRAVITY * dtSec;
  bot.speed = 0; bot.turnVelocity = 0;
  bot.roll += bot.fallSpinVelocity * dtSec;
  bot.y += bot.verticalVelocity * dtSec;
  if (bot.y >= GROUND_Y - 12) finishBotDeath(bot);
}

function crashLocal(message = 'You crashed.') {
  finishDeath(null, message, 'planeWater');
}

function beginDeathFall(killerId, message = 'Aircraft disabled') {
  if (!myState || !myState.alive || myState.falling) return;
  myState.health = 0;
  myState.falling = true;
  myState.stalled = false;
  myState.boosting = false;
  localFlareScheduleGeneration++;
  myState.deathKiller = killerId;
  // Once uncontrolled, forward flight physics and steering are disabled. The
  // aircraft must not drift toward the cursor, even if its previous speed was
  // negative because of a stall.
  myState.speed = 0;
  myState.turnVelocity = 0;
  myState.verticalVelocity = Math.max(45, myState.verticalVelocity);
  myState.fallSpinVelocity = STALL_SPIN_SPEED * (Math.random() < .5 ? -1 : 1);
  respawnMsgEl.textContent = message;
}

function finishDeath(killerId, message = 'Shot down!', deathEffect = 'crash') {
  if (!myState || !myState.alive) return;
  const now = performance.now();
  myState.health = 0; myState.alive = false; myState.falling = false;
  myState.deaths = (myState.deaths || 0) + 1;
  respawnMsgEl.textContent = message;
  respawnOverlay.style.display = 'flex';
  myState.respawnAt = now + RESPAWN_DELAY;
  spawnExplosion(myState.x, Math.min(myState.y, GROUND_Y - 10), deathEffect);
  sendEvent({ type: 'died', by: killerId });
}

function updateDeathFall(dtSec) {
  myState.verticalVelocity += FALL_GRAVITY * dtSec;
  // Falling is intentionally screen-vertical: do not integrate angle or
  // speed into X. Roll is visual only and has no influence on movement.
  myState.speed = 0;
  myState.turnVelocity = 0;
  myState.roll += myState.fallSpinVelocity * dtSec;
  myState.y += myState.verticalVelocity * dtSec;
  if (myState.y >= GROUND_Y - 12) finishDeath(myState.deathKiller, 'Aircraft lost', 'planeWater');
}

// A stall is recoverable. The player can still point the nose down and regain
// airspeed, but the aircraft is never allowed to travel backward. This is
// deliberately separate from updateDeathFall(), which is used after fatal
// damage and remains fully uncontrollable.
function updateStalledFlight(dtSec, keys) {
  myState.barrelRollCooldown = Math.max(0, myState.barrelRollCooldown - dtSec * 1000);
  myState.roll += myState.fallSpinVelocity * dtSec;
  const targetAngle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
  const diff = angleDiff(myState.angle, targetAngle);
  const desiredTurn = clamp(diff * 4.8, -TURN_RATE * 1.15, TURN_RATE * 1.15);
  myState.turnVelocity += (desiredTurn - myState.turnVelocity) * clamp(TURN_ACCEL * 1.15 * dtSec, 0, 1);
  myState.turnVelocity *= Math.max(0, 1 - TURN_DAMPING * .75 * dtSec);
  myState.turnVelocity = clamp(myState.turnVelocity, -TURN_RATE * 1.25, TURN_RATE * 1.25);
  myState.angle += myState.turnVelocity * dtSec;

  const boosting = keys.boost && !keys.airbrake;
  const gravityAlongFlight = GRAVITY_ACCEL * Math.sin(myState.angle);
  const drag = (myState.speed - PLANE_SPEED) * .82;
  const thrust = boosting ? 250 : 0;
  myState.speed = clamp(myState.speed + (thrust + gravityAlongFlight - drag) * dtSec, 0, MAX_FLIGHT_SPEED);
  myState.boosting = boosting && myState.speed > 0;

  // While stalled, gravity pulls the aircraft down. Once the nose points into
  // the dive and speed is rebuilt, normal flight resumes.
  if (myState.speed < 55 || Math.sin(myState.angle) <= .08) {
    myState.verticalVelocity += FALL_GRAVITY * dtSec;
  } else {
    myState.verticalVelocity *= Math.max(0, 1 - 5 * dtSec);
  }
  myState.x = clamp(myState.x + Math.cos(myState.angle) * myState.speed * dtSec, 30, WORLD_W - 30);
  myState.y += Math.sin(myState.angle) * myState.speed * dtSec + myState.verticalVelocity * dtSec;

  if (myState.speed >= 90 && Math.sin(myState.angle) > .22) {
    myState.stallRecoverTime += dtSec * 1000;
  } else {
    myState.stallRecoverTime = 0;
  }
  if (myState.stallRecoverTime >= 700) {
    myState.stalled = false;
    myState.stallRecoverTime = 0;
    myState.roll *= .35;
    myState.verticalVelocity = 0;
  }
  if (myState.y >= GROUND_Y - 12) crashLocal('You hit the sea.');
}

function checkFallingHits() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.ownerId === myId) continue;
    if (pointSegmentDistance(myState.x, myState.y, b.prevX ?? b.x, b.prevY ?? b.y, b.x, b.y) < HIT_RADIUS) {
      removeProjectileLocal('bullet', b.id); spawnExplosion(b.x, b.y, 'spark', b.angle);
      sendEvent({ type: 'impact', kind: 'bullet', id: b.id, x: b.x, y: b.y });
      finishDeath(b.ownerId, 'Aircraft destroyed'); return;
    }
  }
  for (let i = missiles.length - 1; i >= 0; i--) {
    const m = missiles[i];
    if (m.ownerId === myId || (m.targetId != null && m.targetId !== myId)) continue;
    if (dist(myState.x, myState.y, m.x, m.y) < MISSILE_HIT_RADIUS) {
      removeProjectileLocal('missile', m.id); spawnExplosion(m.x, m.y, 'blast');
      sendEvent({ type: 'impact', kind: 'missile', id: m.id, x: m.x, y: m.y });
      finishDeath(m.ownerId, 'Aircraft destroyed'); return;
    }
  }
  for (let i = bombs.length - 1; i >= 0; i--) {
    const b = bombs[i];
    if (b.ownerId === myId) continue;
    if (dist(myState.x, myState.y, b.x, b.y) < BOMB_HIT_RADIUS) {
      detonateBomb(b);
      sendEvent({ type: 'impact', kind: 'bomb', id: b.id, x: b.x, y: b.y });
      finishDeath(b.ownerId, 'Aircraft destroyed'); return;
    }
  }
}

function updateLocalPlane(dtSec, keys) {
  // Recover from invalid local coordinates instead of letting NaN values
  // make the camera, plane, and aiming reticles disappear permanently.
  if (!Number.isFinite(myState.x) || !Number.isFinite(myState.y) || !Number.isFinite(myState.angle)) {
    const safe = randomSpawnPoint();
    myState.x = safe.x; myState.y = safe.y; myState.angle = 0;
    myState.speed = PLANE_SPEED; myState.verticalVelocity = 0;
    myState.turnVelocity = 0; myState.falling = false; myState.stallTime = 0;
  }
  if (!myState.alive) {
    // Was returning before this check ever ran, so nobody ever respawned.
    if (myState.respawnAt && performance.now() >= myState.respawnAt) {
      myState.respawnAt = 0;
      respawnLocal();
    }
    return;
  }
  if (myState.falling) {
    updateDeathFall(dtSec);
    if (myState.alive) checkFallingHits();
    return;
  }
  if (myState.stalled) {
    updateStalledFlight(dtSec, keys);
    return;
  }

  // Steer toward the mouse cursor with angular momentum. The plane no longer
  // snaps toward the cursor: speed, air-brake input, and turn inertia matter.
  const boosting = keys.boost && myState.boost > 0 && !keys.airbrake;
  const airbraking = keys.airbrake && !boosting;
  const targetAngle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
  const diff = angleDiff(myState.angle, targetAngle);
  const speedRatio = clamp(myState.speed / HIGH_SPEED_MAX_SPEED, .2, 1);
  const speedTurnPenalty = .72 + (1 - speedRatio) * .52;
  const turnAuthority = airbraking ? AIRBRAKE_TURN_MULT : boosting ? BOOST_TURN_MULT : 1;
  const desiredTurn = clamp(diff * 5.5, -TURN_RATE, TURN_RATE) * speedTurnPenalty * turnAuthority;
  myState.turnVelocity += (desiredTurn - myState.turnVelocity) * clamp(TURN_ACCEL * dtSec, 0, 1);
  myState.turnVelocity *= Math.max(0, 1 - TURN_DAMPING * dtSec);
  myState.turnVelocity = clamp(myState.turnVelocity, -TURN_RATE * 1.15, TURN_RATE * 1.15);
  myState.angle += myState.turnVelocity * dtSec;

  // Boost is intentionally unlimited. The tradeoff is speed: boosting makes
  // the aircraft faster but also reduces turn authority through the flight
  // model above.
  myState.boost = BOOST_MAX;
  myState.boosting = boosting;

  const now = performance.now();
  myState.barrelRollCooldown = Math.max(0, myState.barrelRollCooldown - dtSec * 1000);
  if (now < myState.barrelRollUntil) {
    myState.roll += myState.barrelRollDirection * BARREL_ROLL_SPEED * dtSec;
  } else if (myState.speed < 0) {
    // A stalled aircraft loses control and tumbles until it recovers or falls.
    myState.roll += STALL_SPIN_SPEED * dtSec;
  } else {
    myState.roll *= Math.max(0, 1 - 7 * dtSec);
  }
  myState.x = clamp(myState.x, 30, WORLD_W - 30);
  const gravityAlongFlight = GRAVITY_ACCEL * Math.sin(myState.angle);
  const drag = (myState.speed - PLANE_SPEED) * .82;
  const thrust = boosting ? 250 : airbraking ? -300 : 0;
  const highSpeedAssist = myState.speed >= HIGH_SPEED_THRESHOLD ? HIGH_SPEED_ACCELERATION : 0;
  myState.speed = clamp(myState.speed + (thrust + gravityAlongFlight + highSpeedAssist - drag) * dtSec, MIN_FLIGHT_SPEED, HIGH_SPEED_MAX_SPEED);
  const atHighSpeed = myState.speed >= HIGH_SPEED_THRESHOLD;
  if (atHighSpeed && !myState.highSpeedActive && performance.now() >= (myState.sonicBoomReadyAt || 0)) {
    triggerSonicBoom(myState.x, myState.y, myState.angle);
    sendEvent({ type: 'sonicBoom', x: myState.x, y: myState.y, angle: myState.angle });
    myState.sonicBoomReadyAt = performance.now() + SONIC_BOOM_COOLDOWN_MS;
  }
  myState.highSpeedActive = atHighSpeed;
  // A prolonged climb can push the simulated airspeed below zero. At that
  // point the aircraft is stalled and enters the same uncontrolled state as a
  // disabled plane; from here on, cursor input and negative speed are ignored.
  if (myState.speed < 0) {
    myState.stallTime += dtSec * 1000;
    if (myState.stallTime >= STALL_DELAY) {
      myState.speed = 0;
      myState.stalled = true;
      myState.stallRecoverTime = 0;
      myState.boosting = false;
      myState.turnVelocity = 0;
      myState.verticalVelocity = Math.max(45, myState.verticalVelocity);
      myState.fallSpinVelocity = STALL_SPIN_SPEED * (Math.random() < .5 ? -1 : 1);
      return;
    }
  } else {
    myState.stallTime = 0;
  }
  if (myState.y < 0) {
    const depth = clamp(-myState.y / TOP_BOUNDARY_DEPTH, .2, 1);
    myState.verticalVelocity += TOP_BOUNDARY_GRAVITY * depth * dtSec;
  } else {
    myState.verticalVelocity *= Math.max(0, 1 - 4.5 * dtSec);
  }
  myState.x += Math.cos(myState.angle) * myState.speed * dtSec;
  myState.y += Math.sin(myState.angle) * myState.speed * dtSec + myState.verticalVelocity * dtSec;
  if (myState.y >= GROUND_Y - 12) {
    crashLocal('You hit the sea.');
    return;
  }

  // Weapon heat: cools passively when you let off the trigger; maxing it
  // out locks the gun until it drops back down, so you can't just hold fire.
  if (myState.overheated) {
    myState.heat = Math.max(0, myState.heat - HEAT_DECAY_OVERHEAT * dtSec);
    if (myState.heat <= HEAT_MAX * OVERHEAT_RESET_FRAC) myState.overheated = false;
  } else if (!keys.shoot) {
    myState.heat = Math.max(0, myState.heat - HEAT_DECAY * dtSec);
  }

  myState.fireTimer = Math.max(0, myState.fireTimer - dtSec * 1000);
  if (keys.shoot && !myState.overheated && myState.fireTimer <= 0) {
    myState.fireTimer = FIRE_COOLDOWN;
    fireBullet();
    myState.heat = Math.min(HEAT_MAX, myState.heat + HEAT_PER_SHOT);
    if (myState.heat >= HEAT_MAX) myState.overheated = true;
  }

  // Missile & flare cooldowns and slow passive regen.
  myState.missileCooldown = Math.max(0, myState.missileCooldown - dtSec * 1000);
  myState.missileRegenTimer += dtSec * 1000;
  if (myState.missiles < MISSILE_MAX && myState.missileRegenTimer >= MISSILE_REGEN_MS) {
    myState.missileRegenTimer = 0;
    myState.missiles++;
  }
  myState.flareCooldown = Math.max(0, myState.flareCooldown - dtSec * 1000);
  myState.flareRegenTimer += dtSec * 1000;
  if (myState.flares < FLARE_MAX && myState.flareRegenTimer >= FLARE_REGEN_MS) {
    myState.flareRegenTimer = 0;
    myState.flares++;
  }
  myState.bombCooldown = Math.max(0, myState.bombCooldown - dtSec * 1000);
  myState.bombRegenTimer += dtSec * 1000;
  if (myState.bombs < BOMB_MAX && myState.bombRegenTimer >= BOMB_REGEN_MS) {
    myState.bombRegenTimer = 0;
    myState.bombs++;
  }

  // incoming bullet damage (only bullets NOT owned by me)
  const invuln = now < myState.invulnUntil;
  if (!invuln) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (b.ownerId === myId) continue;
      if (pointSegmentDistance(myState.x, myState.y, b.prevX ?? b.x, b.prevY ?? b.y, b.x, b.y) < HIT_RADIUS) {
        removeProjectileLocal('bullet', b.id);
        spawnExplosion(b.x, b.y, 'spark', b.angle);
        sendEvent({ type: 'impact', kind: 'bullet', id: b.id, x: b.x, y: b.y });
        const rearHit = Math.abs(angleDiff(myState.angle, b.angle)) < Math.PI / 3;
        myState.health -= BULLET_DAMAGE * (rearHit ? 1.35 : 1);
        if (myState.health <= 0) {
          beginDeathFall(b.ownerId, 'Aircraft disabled');
        }
        break;
      }
    }
  }

  // Bombs are ballistic and cannot chase you. Their danger comes from
  // predicting where the target will be, especially near the waterline.
  if (!invuln && myState.alive) {
    for (let i = bombs.length - 1; i >= 0; i--) {
      const b = bombs[i];
      if (b.ownerId === myId) continue;
      if (dist(myState.x, myState.y, b.x, b.y) < BOMB_HIT_RADIUS) {
        detonateBomb(b);
        sendEvent({ type: 'impact', kind: 'bomb', id: b.id, x: b.x, y: b.y });
        myState.health -= BOMB_DAMAGE;
        if (myState.health <= 0) {
          beginDeathFall(b.ownerId, 'Aircraft disabled');
        }
        break;
      }
    }
  }

  // incoming missile damage: only the locked target checks it, or anyone if
  // it's gone dumb-fire (no target — e.g. its own target died mid-flight)
  if (!invuln && myState.alive) {
    for (let i = missiles.length - 1; i >= 0; i--) {
      const m = missiles[i];
      if (m.ownerId === myId) continue;
      if (m.targetId != null && m.targetId !== myId) continue;
      if (dist(myState.x, myState.y, m.x, m.y) < MISSILE_HIT_RADIUS) {
        removeProjectileLocal('missile', m.id);
        spawnExplosion(m.x, m.y, 'blast');
        sendEvent({ type: 'impact', kind: 'missile', id: m.id, x: m.x, y: m.y });
        myState.health -= MISSILE_DAMAGE;
        if (myState.health <= 0) {
          beginDeathFall(m.ownerId, 'Aircraft disabled');
        }
        break;
      }
    }
  }
}

function fireBulletFor(state, ownerId, replicate = false) {
  const nose = 38;
  const b = {
    id: ownerId + '-' + (nextBulletId++), ownerId,
    x: state.x + Math.cos(state.angle) * nose,
    y: state.y + Math.sin(state.angle) * nose,
    prevX: state.x, prevY: state.y, angle: state.angle,
    vx: Math.cos(state.angle) * BULLET_SPEED,
    vy: Math.sin(state.angle) * BULLET_SPEED,
    born: performance.now()
  };
  bullets.push(b);
  spawnExplosion(b.x, b.y, 'muzzle');
  playCannonSound(ownerId === myId ? null : b.x, ownerId === myId ? null : b.y);
  if (ownerId === myId) recoilKick = Math.min(10, recoilKick + 3.2);
  if (replicate) {
    const packet = { type: 'shoot', id: b.id, x: b.x, y: b.y, angle: b.angle };
    if (isHost && ownerId !== myId) broadcast({ ...packet, from: ownerId });
    else sendEvent(packet);
  }
  return b;
}

function fireBullet() {
  if (!myState) return;
  if (isNetworkClient()) { sendClientAction({ type: 'shootOnce' }); return; }
  unlockAudio();
  fireBulletFor(myState, myId, true);
}

function tryBarrelRoll(direction = 1) {
  if (!myState || !myState.alive || myState.falling || myState.stalled || myState.barrelRollCooldown > 0) return;
  if (isNetworkClient()) { sendClientAction({ type: 'roll', direction: direction < 0 ? -1 : 1 }); return; }
  myState.barrelRollCooldown = BARREL_ROLL_COOLDOWN;
  myState.barrelRollUntil = performance.now() + BARREL_ROLL_DURATION;
  myState.barrelRollDirection = direction < 0 ? -1 : 1;
}

function testDeathOrReset() {
  if (!myState) return;
  if (isNetworkClient()) { sendClientAction({ type: 'testReset' }); return; }
  if (myState.alive) {
    beginDeathFall(null, 'TEST — uncontrolled fall');
  } else if (myState.respawnAt) {
    myState.respawnAt = 0;
    respawnLocal();
  }
}

function dropBombFor(state, ownerId, replicate = false) {
  if (!state || !state.alive || state.bombCooldown > 0 || state.bombs <= 0) return null;
  state.bombCooldown = BOMB_COOLDOWN;
  state.bombs--;
  const angle = state.angle;
  const b = {
    id: ownerId + '-b' + (nextBulletId++), ownerId,
    x: state.x - Math.cos(angle) * 18, y: state.y - Math.sin(angle) * 18,
    vx: Math.cos(angle) * BOMB_SPEED, vy: Math.sin(angle) * BOMB_SPEED,
    born: performance.now()
  };
  bombs.push(b);
  spawnExplosion(b.x, b.y, 'launch');
  if (replicate) {
    const packet = { type: 'bomb', id: b.id, x: b.x, y: b.y, vx: b.vx, vy: b.vy };
    if (isHost && ownerId !== myId) broadcast({ ...packet, from: ownerId });
    else sendEvent(packet);
  }
  return b;
}

function tryDropBomb() {
  if (!myState) return;
  if (isNetworkClient()) { sendClientAction({ type: 'bomb' }); return; }
  unlockAudio();
  dropBombFor(myState, myId, true);
}

function updateBullets(dtSec) {
  const now = performance.now();
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    // Rounds persist indefinitely and are removed only when they reach the sea.
    if (b.y >= GROUND_Y - 8) {
      spawnExplosion(b.x, GROUND_Y - 8, 'water');
      if (isHost) broadcast({ type: 'impact', from: b.ownerId, kind: 'bullet', id: b.id, x: b.x, y: GROUND_Y - 8 });
      removeProjectileLocal('bullet', b.id); continue;
    }
    b.prevX = b.x; b.prevY = b.y;
    if (b.vx == null) {
      b.vx = Math.cos(b.angle) * BULLET_SPEED;
      b.vy = Math.sin(b.angle) * BULLET_SPEED;
    }
    b.vy += BULLET_GRAVITY * dtSec;
    b.x += b.vx * dtSec;
    b.y += b.vy * dtSec;
    b.angle = Math.atan2(b.vy, b.vx);
  }
}

function spawnBombShrapnel(x, y, ownerId) {
  const born = performance.now();
  for (let i = 0; i < SHRAPNEL_COUNT; i++) {
    const angle = (Math.PI * 2 * i) / SHRAPNEL_COUNT + rand(-.12, .12);
    const speed = SHRAPNEL_SPEED * rand(.78, 1.12);
    shrapnels.push({
      id: ownerId + '-s' + (nextBulletId++), ownerId, x, y, prevX: x, prevY: y,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, born
    });
  }
}

function detonateBomb(b) {
  if (!b) return;
  const burstY = Math.min(b.y, GROUND_Y - 8);
  // Bombs use a lightweight burst instead of the full missile/death particle
  // explosion. The shrapnel remains gameplay-active, but detonation no longer
  // allocates dozens of smoke/debris particles for every bot bomb.
  spawnExplosion(b.x, burstY, 'bomb');
  playExplosionSound('blast', b.x, burstY);
  screenShake = Math.max(screenShake, 5);
  spawnBombShrapnel(b.x, burstY, b.ownerId);
  if (isHost) broadcast({ type: 'impact', from: b.ownerId, kind: 'bomb', id: b.id, x: b.x, y: burstY });
  removeProjectileLocal('bomb', b.id);
}

function updateBombs(dtSec) {
  const now = performance.now();
  const authoritative = isHost || botMode;
  for (let i = bombs.length - 1; i >= 0; i--) {
    const b = bombs[i];
    if (authoritative && (now - b.born > BOMB_LIFE || b.y >= GROUND_Y - 8)) {
      detonateBomb(b);
      continue;
    }
    if (!authoritative && now - b.born > BOMB_LIFE + 900) {
      // The host owns detonation. This only removes a stale visual copy if a
      // packet was lost for an unusually long time, without inventing FX.
      bombs.splice(i, 1);
      continue;
    }
    b.vy += BOMB_GRAVITY * dtSec;
    b.x += b.vx * dtSec;
    b.y += b.vy * dtSec;
    if (!authoritative) continue;

    // Proximity detonation makes the bomb useful against moving aircraft
    // without turning it into a homing weapon.
    const proximitySq = BOMB_PROXIMITY_RADIUS * BOMB_PROXIMITY_RADIUS;
    const nearTarget = Object.values(players).some(p => {
      if (p.id === b.ownerId || p.connected === false || p.alive === false || p.falling) return false;
      const dx = p.x - b.x, dy = p.y - b.y;
      return dx * dx + dy * dy <= proximitySq;
    });
    if (authoritative && nearTarget) detonateBomb(b);
  }
}

function updateShrapnels(dtSec) {
  const now = performance.now();
  for (let i = shrapnels.length - 1; i >= 0; i--) {
    const s = shrapnels[i];
    if (now - s.born > SHRAPNEL_LIFE || s.y >= GROUND_Y - 8) {
      shrapnels.splice(i, 1);
      continue;
    }
    s.prevX = s.x; s.prevY = s.y;
    s.vy += SHRAPNEL_GRAVITY * dtSec;
    s.x += s.vx * dtSec; s.y += s.vy * dtSec;

    if ((isHost || botMode) && s.ownerId !== myId && myState && myState.alive && !myState.falling &&
        performance.now() >= (myState.invulnUntil || 0) &&
        pointSegmentDistance(myState.x, myState.y, s.prevX, s.prevY, s.x, s.y) < SHRAPNEL_HIT_RADIUS) {
      shrapnels.splice(i, 1);
      spawnExplosion(s.x, s.y, 'spark', Math.atan2(s.vy, s.vx));
      myState.health -= SHRAPNEL_DAMAGE;
      if (myState.health <= 0) beginDeathFall(s.ownerId, 'Aircraft disabled');
      continue;
    }

    let hitBot = false;
    Object.values(players).forEach(p => {
      if (hitBot || !p.isBot || p.id === s.ownerId || !p.alive || p.falling ||
          performance.now() < (p.invulnUntil || 0)) return;
      if (pointSegmentDistance(p.x, p.y, s.prevX, s.prevY, s.x, s.y) >= SHRAPNEL_HIT_RADIUS) return;
      hitBot = true;
      spawnExplosion(s.x, s.y, 'spark', Math.atan2(s.vy, s.vx));
      damageBot(p, SHRAPNEL_DAMAGE, s.ownerId);
    });
    if (hitBot) shrapnels.splice(i, 1);
  }
}

// ================= Missiles & flares =================
function isInPlayerVision(p) {
  const halfW = window.innerWidth * currentCameraFovMult * .5;
  const halfH = window.innerHeight * currentCameraFovMult * .5;
  return Math.abs(p.x - myState.x) <= halfW && Math.abs(p.y - myState.y) <= halfH;
}

function findMissileLockTarget(requireFacing = true) {
  let bestId = null, bestDist = MISSILE_LOCK_RANGE;
  Object.values(players).forEach(p => {
    if (p.id === myId || p.connected === false || p.alive === false) return;
    if (isInCloudBank(p.x, p.y)) return;
    if (!isInPlayerVision(p)) return;
    const dx = p.x - myState.x, dy = p.y - myState.y;
    const d = Math.hypot(dx, dy);
    if (d > bestDist) return;
    const angToTarget = Math.atan2(dy, dx);
    if (requireFacing && Math.abs(angleDiff(myState.angle, angToTarget)) > MISSILE_LOCK_CONE) return;
    bestDist = d; bestId = p.id;
  });
  return bestId;
}

function updateMissileLock(dtSec) {
  const now = performance.now();
  if (!myState || !myState.alive || myState.falling || myState.missiles <= 0) {
    missileLockTargetId = null; missileLockAcquireId = null; missileLockCandidateId = null;
    missileLockCandidateAligned = false; missileLockProgress = 0; missileLockExpiresAt = 0;
    return;
  }

  if (isNetworkClient()) {
    const hostTarget = myState.hostLockTargetId;
    const remaining = Math.max(0, (myState.hostLockRemaining || 0) - (now - (myState.hostLockUpdatedAt || now)));
    missileLockCandidateId = hostTarget;
    missileLockCandidateAligned = hostTarget != null;
    missileLockAcquireId = hostTarget;
    missileLockProgress = clamp((myState.hostLockProgress || 0) / MISSILE_LOCK_DELAY, 0, 1);
    if (hostTarget != null && remaining > 0) {
      missileLockTargetId = hostTarget;
      missileLockProgress = 1;
      missileLockExpiresAt = now + remaining;
    } else {
      missileLockTargetId = null;
      missileLockExpiresAt = 0;
    }
    return;
  }

  // A completed lock remains valid for a short launch window, even if the
  // player stops looking directly at the target.
  if (missileLockTargetId != null && now < missileLockExpiresAt) {
    const locked = players[missileLockTargetId];
    if (!locked || locked.alive === false || locked.connected === false) {
      missileLockTargetId = null; missileLockProgress = 0; missileLockExpiresAt = 0;
    } else {
      missileLockProgress = 1;
      return;
    }
  }
  if (missileLockTargetId != null && now >= missileLockExpiresAt) {
    missileLockTargetId = null; missileLockProgress = 0; missileLockExpiresAt = 0;
  }

  const hintId = findMissileLockTarget(false);
  const targetId = findMissileLockTarget(true);
  missileLockCandidateId = hintId;
  missileLockCandidateAligned = targetId != null && targetId === hintId;
  if (targetId == null) {
    missileLockAcquireId = null;
    missileLockProgress = 0;
    return;
  }
  if (targetId !== missileLockAcquireId) {
    missileLockAcquireId = targetId;
    missileLockProgress = 0;
  }
  missileLockProgress = clamp(missileLockProgress + dtSec * 1000 / MISSILE_LOCK_DELAY, 0, 1);
  if (missileLockProgress >= 1) {
    missileLockTargetId = targetId;
    missileLockAcquireId = null;
    missileLockExpiresAt = now + MISSILE_LOCK_HOLD_MS;
  }
}

function fireMissileFor(state, ownerId, targetId = null, replicate = false) {
  if (!state || !state.alive || state.falling || state.missileCooldown > 0 || state.missiles <= 0) return null;
  state.missileCooldown = MISSILE_COOLDOWN;
  state.missiles--;
  const nose = 22;
  const m = {
    id: ownerId + '-m' + (nextMissileId++), ownerId, targetId,
    x: state.x + Math.cos(state.angle) * nose,
    y: state.y + Math.sin(state.angle) * nose,
    angle: state.angle, speed: MISSILE_INITIAL_SPEED, born: performance.now(),
    lockReadyAt: performance.now(), trail: [], exhaust: 1
  };
  missiles.push(m);
  spawnExplosion(m.x, m.y, 'launch');
  playMissileLaunchSound(m.x, m.y); screenShake = Math.max(screenShake, ownerId === myId ? 7 : 3);
  if (replicate) {
    const packet = { type: 'missile', id: m.id, targetId, x: m.x, y: m.y, angle: m.angle, speed: m.speed, locked: targetId != null };
    if (isHost && ownerId !== myId) broadcast({ ...packet, from: ownerId });
    else sendEvent(packet);
  }
  return m;
}

function tryFireMissile() {
  if (!myState) return;
  if (isNetworkClient()) { sendClientAction({ type: 'missile' }); return; }
  unlockAudio();
  // Releasing before the lock completes still fires, but the missile is
  // dumb/unguided. A completed facing lock is the only thing that grants a
  // target and homing behavior.
  const targetId = missileLockTargetId != null && missileLockExpiresAt > performance.now() ? missileLockTargetId : null;
  fireMissileFor(myState, myId, targetId, true);
}

function deployFlareFor(state, ownerId, replicate = false) {
  if (!state || !state.alive || state.falling || state.flareCooldown > 0 || state.flares <= 0) return false;
  state.flareCooldown = FLARE_MIN_INTERVAL;
  state.flares--;
  const volume = ownerId === myId ? .34 : proximityVolume(state.x, state.y, .34);
  if (volume > .005) playAsset('chaff', volume, 1);
  spawnFlareSalvo(state.x, state.y, state.angle, ownerId);
  if (replicate) {
    const packet = { type: 'flare', x: state.x, y: state.y, angle: state.angle };
    if (isHost && ownerId !== myId) broadcast({ ...packet, from: ownerId });
    else sendEvent(packet);
  }
  return true;
}

function tryDeployFlare() {
  if (!myState) return;
  if (isNetworkClient()) { sendClientAction({ type: 'flare' }); return; }
  unlockAudio();
  deployFlareFor(myState, myId, true);
}

function spawnFlareSalvo(x, y, angle, ownerId = myId) {
  const ownerState = players[ownerId];
  const scheduleGeneration = ownerId === myId
    ? localFlareScheduleGeneration
    : ownerState && ownerState.isBot ? ownerState.botScheduleGeneration : null;
  for (let flareNumber = 0; flareNumber < FLARE_SALVO_COUNT; flareNumber++) {
    // Only create the flare at its launch time. Previously all objects were
    // inserted immediately with future timestamps, which made the salvo look
    // like every flare spawned on top of the first one.
    setTimeout(() => {
      if (ownerId === myId && scheduleGeneration !== localFlareScheduleGeneration) return;
      if (ownerState && ownerState.isBot && scheduleGeneration !== ownerState.botScheduleGeneration) return;
      const born = performance.now();
      // Re-read the aircraft at launch time. This makes every flare originate
      // from the plane's current position, even while the plane is turning or
      // moving during the rest of the salvo.
      const source = ownerId === myId && myState
        ? myState
        : (players[ownerId] || { x, y, angle });
      const launchX = Number.isFinite(source.x) ? source.x : x;
      const launchY = Number.isFinite(source.y) ? source.y : y;
      const launchAngle = Number.isFinite(source.angle) ? source.angle : angle;
      const sideX = -Math.sin(launchAngle), sideY = Math.cos(launchAngle);
      const rearX = -Math.cos(launchAngle), rearY = -Math.sin(launchAngle);
      [-1, 1].forEach(side => {
        const f = {
          ownerId,
          x: launchX + sideX * side * 10,
          y: launchY + sideY * side * 10,
          vx: sideX * side * (35 + flareNumber * 7) + rearX * 55,
          vy: sideY * side * (35 + flareNumber * 7) + rearY * 55,
          born
        };
        flares.push(f);
        resolveFlare(ownerId, f.x, f.y, f);
        const volume = proximityVolume(f.x, f.y, .18);
        if (volume > .005) playAsset('flare', volume, 1.02 + flareNumber * .015);
      });
    }, flareNumber * FLARE_SPAWN_INTERVAL_MS);
  }
}

// A nearby locked missile is redirected to the actual flare object. It keeps
// homing on that moving flare and detonates only when it reaches it.
function resolveFlare(fromId, fx, fy, flare = null) {
  for (let i = missiles.length - 1; i >= 0; i--) {
    const m = missiles[i];
    if (m.targetId === fromId && !m.decoyTarget && dist(m.x, m.y, fx, fy) < FLARE_BREAK_RADIUS) {
      m.decoyTarget = flare || { x: fx, y: fy };
      m.decoyed = true;
      m.targetId = null;
    }
  }
}

function updateMissiles(dtSec) {
  const now = performance.now();
  const authoritative = isHost || botMode;
  for (let i = missiles.length - 1; i >= 0; i--) {
    const m = missiles[i];
    if (now - m.born > MISSILE_LIFE) {
      // Used to just vanish here with no feedback at all if it never caught
      // its target — now it detonates in place so a miss is at least visible.
      if (authoritative) {
        spawnExplosion(m.x, m.y, 'blast');
        if (isHost) broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id, x: m.x, y: m.y });
        removeProjectileLocal('missile', m.id);
      } else if (now - m.born > MISSILE_LIFE + 900) {
        // Wait for the host's impact packet instead of inventing a second FX
        // event locally. This is only a silent stale-copy fallback.
        removeProjectileLocal('missile', m.id);
        continue;
      }
    }

    if (!m.decoyTarget && m.targetId != null) {
      const nearbyFlare = flares.find(f => f.ownerId === m.targetId && dist(m.x, m.y, f.x, f.y) < FLARE_BREAK_RADIUS);
      if (nearbyFlare) {
        m.decoyTarget = nearbyFlare;
        m.decoyed = true;
        m.targetId = null;
      }
    }

    // A flare redirects the missile to the flare itself. The missile remains
    // active until it physically reaches that flare, then explodes there.
    if (m.decoyTarget) {
      const decoyDistance = dist(m.x, m.y, m.decoyTarget.x, m.decoyTarget.y);
      if (decoyDistance < MISSILE_HIT_RADIUS && authoritative) {
        spawnExplosion(m.decoyTarget.x, m.decoyTarget.y, 'blast');
        if (isHost) broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id, x: m.decoyTarget.x, y: m.decoyTarget.y });
        removeProjectileLocal('missile', m.id);
        continue;
      }
      const desired = Math.atan2(m.decoyTarget.y - m.y, m.decoyTarget.x - m.x);
      const step = MISSILE_TURN_RATE * dtSec;
      const diff = angleDiff(m.angle, desired);
      m.angle += Math.abs(diff) < step ? diff : Math.sign(diff) * step;
    } else if (m.targetId != null && now >= (m.lockReadyAt || m.born)) {
      const target = players[m.targetId];
      if (target && target.alive !== false && target.connected !== false) {
        const desired = Math.atan2(target.y - m.y, target.x - m.x);
        const step = MISSILE_TURN_RATE * dtSec;
        const diff = angleDiff(m.angle, desired);
        m.angle += Math.abs(diff) < step ? diff : Math.sign(diff) * step;
      } else {
        m.targetId = null; // target died or left: missile goes dumb/ballistic
        m.decoyed = true;
      }
    }

    m.speed = Math.min(MISSILE_MAX_SPEED, (Number.isFinite(m.speed) ? m.speed : MISSILE_INITIAL_SPEED) + MISSILE_ACCELERATION * dtSec);
    m.trail.push({ x: m.x, y: m.y });
    if (m.trail.length > 20) m.trail.shift();

    m.x += Math.cos(m.angle) * m.speed * dtSec;
    m.y += Math.sin(m.angle) * m.speed * dtSec;
  }
}

function updateFlares(dtSec) {
  const now = performance.now();
  flares.forEach(f => {
    if (now < f.born) return;
    f.x += (f.vx || 0) * dtSec;
    f.y += (f.vy || 0) * dtSec;
    f.vx *= Math.max(0, 1 - 1.8 * dtSec);
    f.vy *= Math.max(0, 1 - 1.8 * dtSec);
  });
}

function pruneFlares(now) {
  for (let i = flares.length - 1; i >= 0; i--) {
    if (now - flares[i].born > FLARE_ACTIVE_MS) flares.splice(i, 1);
  }
}

// ================= Bot sortie AI =================
function chooseBotTarget(bot) {
  let best = null, bestScore = Infinity;
  Object.values(players).forEach(p => {
    if (p.id === bot.id || p.connected === false || p.alive === false || p.falling) return;
    const d = dist(bot.x, bot.y, p.x, p.y);
    // Prefer nearby targets, but add a small alternating bias so bots do not
    // all stack onto the same player every frame.
    const score = d + (p.id === myId ? -90 : 0) + ((p.id + bot.id) % 3) * 35;
    if (score < bestScore) { bestScore = score; best = p; }
  });
  return best;
}

function botCanEngage(bot, target) {
  return !!target && target.alive !== false && target.connected !== false &&
    !target.falling && !isInCloudBank(target.x, target.y);
}

function botThink(bot, now) {
  const currentTarget = players[bot.botTargetId];
  const currentTargetValid = currentTarget && currentTarget.connected !== false && currentTarget.alive !== false && !currentTarget.falling;
  const target = currentTargetValid && now < bot.botTargetLockUntil ? currentTarget : chooseBotTarget(bot);
  bot.botTargetId = target ? target.id : null;
  if (target && (!currentTargetValid || target.id !== currentTarget.id || now >= bot.botTargetLockUntil)) {
    bot.botTargetLockUntil = now + rand(900, 1800);
  }
  const targetDistance = target ? dist(bot.x, bot.y, target.x, target.y) : Infinity;
  const targetAngle = target ? Math.atan2(target.y - bot.y, target.x - bot.x) : bot.angle;
  const facing = target && Math.abs(angleDiff(bot.angle, targetAngle)) <= MISSILE_LOCK_CONE;
  const visible = botCanEngage(bot, target);

  const incoming = missiles.some(m => m.ownerId !== bot.id && m.targetId === bot.id && dist(bot.x, bot.y, m.x, m.y) < FLARE_BREAK_RADIUS * 2.4);
  if (incoming && bot.flares > 0 && bot.flareCooldown <= 0) deployFlareFor(bot, bot.id, false);

  if (target && visible) {
    if (bot.botLockTargetId === target.id && facing && targetDistance <= MISSILE_LOCK_RANGE) {
      bot.botLockProgress = clamp(bot.botLockProgress + BOT_AI_TICK_MS, 0, MISSILE_LOCK_DELAY);
    } else {
      bot.botLockTargetId = target.id;
      bot.botLockProgress = facing && targetDistance <= MISSILE_LOCK_RANGE ? BOT_AI_TICK_MS : 0;
    }

    if (bot.botLockProgress >= MISSILE_LOCK_DELAY && bot.missiles > 0 && bot.missileCooldown <= 0) {
      fireMissileFor(bot, bot.id, target.id, false);
      bot.botLockProgress = 0;
      bot.botLockTargetId = null;
    } else if (targetDistance <= BOT_MISSILE_RANGE && bot.missiles > 0 && bot.missileCooldown <= 0 && Math.random() < .08) {
      // Bots occasionally release early, creating the same dumb-fire threat
      // a human creates by firing before the one-second lock completes.
      fireMissileFor(bot, bot.id, null, false);
      bot.botLockProgress = 0;
    }

    const gunFacing = target && Math.abs(angleDiff(bot.angle, targetAngle)) <= BOT_GUN_CONE;
    if (gunFacing && targetDistance <= BOT_FIRE_RANGE && !bot.overheated && bot.fireTimer <= 0 && Math.random() < bot.botSkill) {
      fireBulletFor(bot, bot.id, false);
      bot.fireTimer = BOT_FIRE_COOLDOWN;
      bot.heat = Math.min(HEAT_MAX, bot.heat + HEAT_PER_SHOT);
      if (bot.heat >= HEAT_MAX) bot.overheated = true;
    }

    const bombFacing = target && Math.abs(angleDiff(bot.angle, targetAngle)) <= BOT_BOMB_CONE;
    if (bombFacing && targetDistance <= BOT_BOMB_RANGE && bot.bombs > 0 && bot.bombCooldown <= 0 && Math.random() < .12) {
      dropBombFor(bot, bot.id, false);
    }
  } else {
    bot.botLockTargetId = null;
    bot.botLockProgress = 0;
  }

  if ((incoming || bot.health <= MAX_HEALTH * .32) && bot.barrelRollCooldown <= 0 && Math.random() < .55) {
    bot.barrelRollCooldown = BARREL_ROLL_COOLDOWN;
    bot.barrelRollUntil = now + BARREL_ROLL_DURATION;
    bot.barrelRollDirection = bot.botOrbitSign;
  }

  bot.boosting = !!target && (targetDistance > 650 || (facing && bot.speed < HIGH_SPEED_THRESHOLD));
  bot.airbraking = !!target && !bot.boosting && (targetDistance < 260 || Math.abs(angleDiff(bot.angle, targetAngle)) > 1.15) && bot.speed > 360;
  if (bot.speed > HIGH_SPEED_MAX_SPEED * .94 && Math.random() < .35) bot.boosting = false;
  if (bot.airbraking) bot.boosting = false;
  bot.botNextThink = now + BOT_AI_TICK_MS + rand(-15, 25);
}

function updateOneBot(bot, dtSec, now) {
  // A bad network-style value must not poison the shared render loop. Bots
  // are local, so recovering this one aircraft is safer than freezing the
  // entire sortie when a projectile/effect produces invalid coordinates.
  if (!Number.isFinite(bot.x) || !Number.isFinite(bot.y) || !Number.isFinite(bot.angle) ||
      !Number.isFinite(bot.speed) || !Number.isFinite(bot.verticalVelocity)) {
    respawnBot(bot);
    return;
  }
  if (!bot.alive) {
    if (bot.respawnAt && now >= bot.respawnAt) respawnBot(bot);
    return;
  }
  if (bot.falling) {
    updateBotDeathFall(bot, dtSec);
    return;
  }

  if (now >= bot.botNextThink) botThink(bot, now);
  const target = players[bot.botTargetId];
  if (botCanEngage(bot, target)) {
    const direct = Math.atan2(target.y - bot.y, target.x - bot.x);
    const orbitOffset = Math.sin(now / 900 + bot.id) * .12 * bot.botOrbitSign;
    const diff = angleDiff(bot.angle, direct + orbitOffset);
    const desiredTurn = clamp(diff * 4.8, -TURN_RATE, TURN_RATE);
    bot.turnVelocity += (desiredTurn - bot.turnVelocity) * clamp(TURN_ACCEL * dtSec, 0, 1);
    bot.turnVelocity *= Math.max(0, 1 - TURN_DAMPING * dtSec);
    bot.turnVelocity = clamp(bot.turnVelocity, -TURN_RATE * 1.15, TURN_RATE * 1.15);
    bot.angle += bot.turnVelocity * dtSec;
  } else {
    bot.botLockTargetId = null;
    bot.botLockProgress = 0;
    bot.angle += bot.botOrbitSign * .18 * dtSec;
  }

  if (now < bot.barrelRollUntil) bot.roll += bot.barrelRollDirection * BARREL_ROLL_SPEED * dtSec;
  else bot.roll *= Math.max(0, 1 - 7 * dtSec);
  bot.barrelRollCooldown = Math.max(0, bot.barrelRollCooldown - dtSec * 1000);

  const gravityAlongFlight = GRAVITY_ACCEL * Math.sin(bot.angle);
  const drag = (bot.speed - PLANE_SPEED) * .82;
  const thrust = bot.boosting ? 250 : bot.airbraking ? -300 : 0;
  const highSpeedAssist = bot.speed >= HIGH_SPEED_THRESHOLD ? HIGH_SPEED_ACCELERATION : 0;
  bot.speed = clamp(bot.speed + (thrust + gravityAlongFlight + highSpeedAssist - drag) * dtSec, 0, HIGH_SPEED_MAX_SPEED);
  const atHighSpeed = bot.speed >= HIGH_SPEED_THRESHOLD;
  if (atHighSpeed && !bot.highSpeedActive && now >= bot.sonicBoomReadyAt) {
    triggerSonicBoom(bot.x, bot.y, bot.angle);
    bot.sonicBoomReadyAt = now + SONIC_BOOM_COOLDOWN_MS;
  }
  bot.highSpeedActive = atHighSpeed;
  bot.x = clamp(bot.x + Math.cos(bot.angle) * bot.speed * dtSec, 30, WORLD_W - 30);
  bot.y += Math.sin(bot.angle) * bot.speed * dtSec;
  if (bot.y < 0) bot.verticalVelocity += TOP_BOUNDARY_GRAVITY * clamp(-bot.y / TOP_BOUNDARY_DEPTH, .2, 1) * dtSec;
  else bot.verticalVelocity *= Math.max(0, 1 - 4.5 * dtSec);
  bot.y += bot.verticalVelocity * dtSec;
  if (bot.y >= GROUND_Y - 12) { beginBotDeathFall(bot, null); return; }

  bot.fireTimer = Math.max(0, bot.fireTimer - dtSec * 1000);
  if (bot.overheated) {
    bot.heat = Math.max(0, bot.heat - HEAT_DECAY_OVERHEAT * dtSec);
    if (bot.heat <= HEAT_MAX * OVERHEAT_RESET_FRAC) bot.overheated = false;
  } else {
    bot.heat = Math.max(0, bot.heat - HEAT_DECAY * dtSec);
  }
  bot.missileCooldown = Math.max(0, bot.missileCooldown - dtSec * 1000);
  bot.missileRegenTimer += dtSec * 1000;
  if (bot.missiles < MISSILE_MAX && bot.missileRegenTimer >= MISSILE_REGEN_MS) { bot.missiles++; bot.missileRegenTimer = 0; }
  bot.flareCooldown = Math.max(0, bot.flareCooldown - dtSec * 1000);
  bot.flareRegenTimer += dtSec * 1000;
  if (bot.flares < FLARE_MAX && bot.flareRegenTimer >= FLARE_REGEN_MS) { bot.flares++; bot.flareRegenTimer = 0; }
  bot.bombCooldown = Math.max(0, bot.bombCooldown - dtSec * 1000);
  bot.bombRegenTimer += dtSec * 1000;
  if (bot.bombs < BOMB_MAX && bot.bombRegenTimer >= BOMB_REGEN_MS) { bot.bombs++; bot.bombRegenTimer = 0; }

}

function updateBots(dtSec, now) {
  if (!botMode) return;
  Object.values(players).forEach(p => {
    if (!p.isBot) return;
    try {
      updateOneBot(p, dtSec, now);
    } catch (error) {
      console.error('Bot update recovered:', error);
      respawnBot(p);
    }
  });
}

function damageBot(bot, amount, killerId) {
  if (!bot || !bot.alive || bot.falling) return;
  bot.health -= amount;
  if (bot.health <= 0) beginBotDeathFall(bot, killerId);
}

function updateBotHits() {
  if (!botMode) return;
  Object.values(players).forEach(bot => {
    if (!bot.isBot || !bot.alive || performance.now() < (bot.invulnUntil || 0)) return;
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (b.ownerId === bot.id) continue;
      if (pointSegmentDistance(bot.x, bot.y, b.prevX ?? b.x, b.prevY ?? b.y, b.x, b.y) >= HIT_RADIUS) continue;
      removeProjectileLocal('bullet', b.id); spawnExplosion(b.x, b.y, 'spark', b.angle);
      sendEvent({ type: 'impact', kind: 'bullet', id: b.id, x: b.x, y: b.y });
      if (bot.falling) finishBotDeath(bot); else damageBot(bot, BULLET_DAMAGE, b.ownerId);
      break;
    }
    if (!bot.alive) return;
    for (let i = missiles.length - 1; i >= 0; i--) {
      const m = missiles[i];
      if (m.ownerId === bot.id || m.decoyTarget || (m.targetId != null && m.targetId !== bot.id)) continue;
      if (dist(bot.x, bot.y, m.x, m.y) >= MISSILE_HIT_RADIUS) continue;
      removeProjectileLocal('missile', m.id); spawnExplosion(m.x, m.y, 'blast');
      sendEvent({ type: 'impact', kind: 'missile', id: m.id, x: m.x, y: m.y });
      if (bot.falling) finishBotDeath(bot); else damageBot(bot, MISSILE_DAMAGE, m.ownerId);
      break;
    }
    if (!bot.alive) return;
    for (let i = bombs.length - 1; i >= 0; i--) {
      const b = bombs[i];
      if (b.ownerId === bot.id || dist(bot.x, bot.y, b.x, b.y) >= BOMB_HIT_RADIUS) continue;
      detonateBomb(b);
      sendEvent({ type: 'impact', kind: 'bomb', id: b.id, x: b.x, y: b.y });
      if (bot.falling) finishBotDeath(bot); else damageBot(bot, BOMB_DAMAGE, b.ownerId);
      break;
    }
  });
}

// ================= Host-authoritative player simulation =================
// Network clients never decide their world position, projectile creation, or
// damage. They submit input and one-shot actions; the host advances these
// states and broadcasts the result.
function respawnNetworkPlayer(p) {
  const point = randomSpawnPoint();
  p.x = point.x; p.y = point.y; p.angle = rand(0, Math.PI * 2);
  p.health = MAX_HEALTH; p.alive = true; p.connected = true;
  p.falling = false; p.stalled = false; p.deathKiller = null;
  p.speed = PLANE_SPEED; p.verticalVelocity = 0; p.turnVelocity = 0;
  p.stallTime = 0; p.stallRecoverTime = 0; p.roll = 0;
  p.barrelRollUntil = 0; p.barrelRollCooldown = 0; p.barrelRollDirection = 1;
  p.highSpeedActive = false; p.sonicBoomReadyAt = 0;
  p.heat = 0; p.overheated = false; p.fireTimer = 0;
  p.missiles = MISSILE_MAX; p.missileCooldown = 0; p.missileRegenTimer = 0;
  p.bombs = BOMB_MAX; p.bombCooldown = 0; p.bombRegenTimer = 0;
  p.flares = FLARE_MAX; p.flareCooldown = 0; p.flareRegenTimer = 0;
  p.hostLockTargetId = null; p.hostLockProgress = 0; p.hostLockExpiresAt = 0;
  p.respawnAt = 0; p.invulnUntil = performance.now() + INVULN_TIME;
}

function beginRemoteDeathFall(p, killerId, message = 'Aircraft disabled') {
  if (!p || !p.alive || p.falling) return;
  p.health = 0; p.falling = true; p.stalled = false; p.boosting = false;
  p.deathKiller = killerId; p.speed = 0; p.turnVelocity = 0;
  p.verticalVelocity = Math.max(45, p.verticalVelocity);
  p.fallSpinVelocity = STALL_SPIN_SPEED * (p.id % 2 ? 1 : -1);
  p.deathMessage = message;
}

function finishRemoteDeath(p) {
  if (!p || !p.alive) return;
  p.alive = false; p.falling = false; p.boosting = false;
  p.respawnAt = performance.now() + RESPAWN_DELAY;
  handleDied(p.id, p.deathKiller);
}

function updateRemoteDeathFall(p, dtSec) {
  p.verticalVelocity += FALL_GRAVITY * dtSec;
  p.speed = 0; p.turnVelocity = 0;
  p.roll += p.fallSpinVelocity * dtSec;
  p.y += p.verticalVelocity * dtSec;
  if (p.y >= GROUND_Y - 12) finishRemoteDeath(p);
}

function findHostLockTarget(p) {
  let best = null, bestDistance = Infinity;
  Object.values(players).forEach(target => {
    if (target.id === p.id || target.connected === false || target.alive === false || target.falling) return;
    if (isInCloudBank(target.x, target.y)) return;
    const d = dist(p.x, p.y, target.x, target.y);
    const targetAngle = Math.atan2(target.y - p.y, target.x - p.x);
    if (d >= bestDistance || Math.abs(angleDiff(p.angle, targetAngle)) > MISSILE_LOCK_CONE) return;
    best = target; bestDistance = d;
  });
  return best ? best.id : null;
}

function updateHostLock(p, dtSec) {
  const targetId = findHostLockTarget(p);
  if (targetId == null) {
    p.hostLockTargetId = null; p.hostLockProgress = 0; p.hostLockExpiresAt = 0;
    return;
  }
  if (p.hostLockTargetId !== targetId) {
    p.hostLockTargetId = targetId; p.hostLockProgress = 0;
  }
  p.hostLockProgress = clamp(p.hostLockProgress + dtSec * 1000, 0, MISSILE_LOCK_DELAY);
  if (p.hostLockProgress >= MISSILE_LOCK_DELAY) p.hostLockExpiresAt = performance.now() + MISSILE_LOCK_HOLD_MS;
}

function updateOneNetworkPlayer(p, dtSec, now) {
  if (!p || p.isBot || p.id === myId || p.connected === false) return;
  if (!p.alive) {
    if (p.respawnAt && now >= p.respawnAt) respawnNetworkPlayer(p);
    return;
  }
  if (p.falling) { updateRemoteDeathFall(p, dtSec); return; }
  const input = p.networkInput || { aimX: 1, aimY: 0, boost: false, airbrake: false, shoot: false };
  const targetAngle = Math.atan2(input.aimY || 0, input.aimX || 1);
  const diff = angleDiff(p.angle, targetAngle);
  const boosting = !!input.boost && !input.airbrake;
  const airbraking = !!input.airbrake && !boosting;
  const speedRatio = clamp(p.speed / HIGH_SPEED_MAX_SPEED, .2, 1);
  const speedTurnPenalty = .72 + (1 - speedRatio) * .52;
  const turnAuthority = airbraking ? AIRBRAKE_TURN_MULT : boosting ? BOOST_TURN_MULT : 1;
  const desiredTurn = clamp(diff * 5.5, -TURN_RATE, TURN_RATE) * speedTurnPenalty * turnAuthority;
  p.turnVelocity += (desiredTurn - p.turnVelocity) * clamp(TURN_ACCEL * dtSec, 0, 1);
  p.turnVelocity *= Math.max(0, 1 - TURN_DAMPING * dtSec);
  p.turnVelocity = clamp(p.turnVelocity, -TURN_RATE * 1.15, TURN_RATE * 1.15);
  p.angle += p.turnVelocity * dtSec;
  p.boosting = boosting;
  p.boost = BOOST_MAX;
  p.barrelRollCooldown = Math.max(0, p.barrelRollCooldown - dtSec * 1000);
  if (now < p.barrelRollUntil) p.roll += p.barrelRollDirection * BARREL_ROLL_SPEED * dtSec;
  else p.roll *= Math.max(0, 1 - 7 * dtSec);

  const gravityAlongFlight = GRAVITY_ACCEL * Math.sin(p.angle);
  const drag = (p.speed - PLANE_SPEED) * .82;
  const thrust = boosting ? 250 : airbraking ? -300 : 0;
  const highSpeedAssist = p.speed >= HIGH_SPEED_THRESHOLD ? HIGH_SPEED_ACCELERATION : 0;
  p.speed = clamp(p.speed + (thrust + gravityAlongFlight + highSpeedAssist - drag) * dtSec, 0, HIGH_SPEED_MAX_SPEED);
  const atHighSpeed = p.speed >= HIGH_SPEED_THRESHOLD;
  if (atHighSpeed && !p.highSpeedActive && now >= (p.sonicBoomReadyAt || 0)) {
    triggerSonicBoom(p.x, p.y, p.angle);
    broadcast({ type: 'sonicBoom', from: p.id, x: p.x, y: p.y, angle: p.angle });
    p.sonicBoomReadyAt = now + SONIC_BOOM_COOLDOWN_MS;
  }
  p.highSpeedActive = atHighSpeed;
  if (p.y < 0) p.verticalVelocity += TOP_BOUNDARY_GRAVITY * clamp(-p.y / TOP_BOUNDARY_DEPTH, .2, 1) * dtSec;
  else p.verticalVelocity *= Math.max(0, 1 - 4.5 * dtSec);
  p.x = clamp(p.x + Math.cos(p.angle) * Math.max(0, p.speed) * dtSec, 30, WORLD_W - 30);
  p.y += Math.sin(p.angle) * Math.max(0, p.speed) * dtSec + p.verticalVelocity * dtSec;
  if (p.y >= GROUND_Y - 12) { beginRemoteDeathFall(p, null, 'You hit the sea.'); return; }

  if (p.overheated) {
    p.heat = Math.max(0, p.heat - HEAT_DECAY_OVERHEAT * dtSec);
    if (p.heat <= HEAT_MAX * OVERHEAT_RESET_FRAC) p.overheated = false;
  } else if (!input.shoot) p.heat = Math.max(0, p.heat - HEAT_DECAY * dtSec);
  p.fireTimer = Math.max(0, p.fireTimer - dtSec * 1000);
  if (input.shoot && !p.overheated && p.fireTimer <= 0) {
    p.fireTimer = FIRE_COOLDOWN;
    fireBulletFor(p, p.id, true);
    p.heat = Math.min(HEAT_MAX, p.heat + HEAT_PER_SHOT);
    if (p.heat >= HEAT_MAX) p.overheated = true;
  }
  p.missileCooldown = Math.max(0, p.missileCooldown - dtSec * 1000);
  p.missileRegenTimer += dtSec * 1000;
  if (p.missiles < MISSILE_MAX && p.missileRegenTimer >= MISSILE_REGEN_MS) { p.missiles++; p.missileRegenTimer = 0; }
  p.flareCooldown = Math.max(0, p.flareCooldown - dtSec * 1000);
  p.flareRegenTimer += dtSec * 1000;
  if (p.flares < FLARE_MAX && p.flareRegenTimer >= FLARE_REGEN_MS) { p.flares++; p.flareRegenTimer = 0; }
  p.bombCooldown = Math.max(0, p.bombCooldown - dtSec * 1000);
  p.bombRegenTimer += dtSec * 1000;
  if (p.bombs < BOMB_MAX && p.bombRegenTimer >= BOMB_REGEN_MS) { p.bombs++; p.bombRegenTimer = 0; }
  updateHostLock(p, dtSec);
}

function updateNetworkPlayers(dtSec, now) {
  if (!isHost || botMode) return;
  Object.values(players).forEach(p => updateOneNetworkPlayer(p, dtSec, now));
}

function applyHostDamage(target, amount, killerId) {
  if (!target || !target.alive || target.falling || performance.now() < (target.invulnUntil || 0)) return;
  target.health -= amount;
  if (target.health <= 0) beginRemoteDeathFall(target, killerId);
}

function updateHostCombat() {
  if (!isHost || botMode || !started) return;
  const now = performance.now();
  Object.values(players).forEach(target => {
    if (!target.alive || target.falling || now < (target.invulnUntil || 0)) return;
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (b.ownerId === target.id) continue;
      if (pointSegmentDistance(target.x, target.y, b.prevX ?? b.x, b.prevY ?? b.y, b.x, b.y) >= HIT_RADIUS) continue;
      removeProjectileLocal('bullet', b.id); spawnExplosion(b.x, b.y, 'spark', b.angle);
      broadcast({ type: 'impact', from: b.ownerId, kind: 'bullet', id: b.id, x: b.x, y: b.y });
      const rearHit = Math.abs(angleDiff(target.angle, b.angle)) < Math.PI / 3;
      applyHostDamage(target, BULLET_DAMAGE * (rearHit ? 1.35 : 1), b.ownerId);
      break;
    }
    if (!target.alive || target.falling) return;
    for (let i = missiles.length - 1; i >= 0; i--) {
      const m = missiles[i];
      if (m.ownerId === target.id || (m.targetId != null && m.targetId !== target.id)) continue;
      if (dist(target.x, target.y, m.x, m.y) >= MISSILE_HIT_RADIUS) continue;
      removeProjectileLocal('missile', m.id); spawnExplosion(m.x, m.y, 'blast');
      broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id, x: m.x, y: m.y });
      applyHostDamage(target, MISSILE_DAMAGE, m.ownerId);
      break;
    }
  });
  for (let i = shrapnels.length - 1; i >= 0; i--) {
    const s = shrapnels[i];
    let hit = false;
    Object.values(players).forEach(target => {
      if (hit || target.id === s.ownerId || !target.alive || target.falling || now < (target.invulnUntil || 0)) return;
      if (pointSegmentDistance(target.x, target.y, s.prevX ?? s.x, s.prevY ?? s.y, s.x, s.y) >= SHRAPNEL_HIT_RADIUS) return;
      hit = true; spawnExplosion(s.x, s.y, 'spark', Math.atan2(s.vy, s.vx));
      applyHostDamage(target, SHRAPNEL_DAMAGE, s.ownerId);
    });
    if (hit) shrapnels.splice(i, 1);
  }
}

// ================= Networking: host side =================
function startHost() {
  unlockAudio();
  seenImpactKeys.clear(); lastNetworkActivityAt = performance.now();
  setNetworkStatus('P2P // HOSTING', 'ok');
  isHost = true; botMode = false; myId = 0;
  players[0] = freshPlayerState(0, myName);
  peer = new Peer();
  peer.on('error', err => {
    const message = err && err.type === 'unavailable-id'
      ? 'That room code is unavailable. Try hosting again.'
      : 'Network error — check the connection and try again.';
    statusEl.textContent = message;
    setNetworkStatus('P2P // ERROR', 'bad');
    startBtn.style.display = 'none'; waitHint.style.display = 'block';
  });
  peer.on('disconnected', () => {
    statusEl.textContent = 'Disconnected from the signaling server.';
    setNetworkStatus('P2P // SIGNAL LOST', 'bad');
    startBtn.style.display = 'none'; waitHint.style.display = 'block';
  });
  peer.on('open', id => {
    statusEl.textContent = 'Share this code: ' + id;
    setNetworkStatus('HOST // ' + id.slice(0, 8), 'ok');
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
      if (started) c.send({ type: 'start' });
      broadcastRoster();
    });
    c.on('data', data => handleHostReceive(id, data));
    c.on('close', () => { if (players[id]) players[id].connected = false; broadcastRoster(); });
    c.on('error', () => {
      if (players[id]) players[id].connected = false;
      broadcastRoster();
    });
  });
  startBtn.onclick = () => {
    if (started) return;
    started = true; buildClouds();
    broadcast({ type: 'start' });
    beginLocalGame();
  };
}

function startBotMode() {
  unlockAudio();
  setNetworkStatus('SKIRMISH // LOCAL', 'ok');
  // Bots run locally as a private host-like sortie. No PeerJS connection is
  // created, so starting this mode never interferes with room multiplayer.
  isHost = true; botMode = true; myId = 0; peer = null; connections = {};
  seenImpactKeys.clear(); lastNetworkActivityAt = performance.now();
  players = {}; bullets = []; missiles = []; bombs = []; shrapnels = []; flares = [];
  explosions = []; specialEffects = []; started = true;
  players[0] = freshPlayerState(0, myName);
  botCount = clamp(Number.parseInt(botCountInputEl?.value, 10) || DEFAULT_BOT_COUNT, 1, MAX_PLAYERS - 1);
  buildClouds(); spawnBotSquadron(botCount);
  renderLeaderboard();
  beginLocalGame();
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
  if (started && !botMode && isHost) {
    const linked = Object.values(connections).filter(c => c.open).length;
    setNetworkStatus('HOST // ' + linked + ' LINKED', 'ok');
  }
  broadcast({
    type: 'roster',
    roster: Object.values(players).map(p => ({
      id: p.id, name: p.name, connected: p.connected, alive: p.alive,
      score: p.score, kills: p.kills, deaths: p.deaths, color: p.color
    }))
  });
}

function handleHostReceive(fromId, data) {
  lastNetworkActivityAt = performance.now();
  if (!data || typeof data.type !== 'string') return;
  if (fromId !== myId && (!players[fromId] || players[fromId].connected === false)) return;
  // A client may submit only input/actions. World state, projectile spawns,
  // impacts, deaths, and effects are host-owned and cannot be claimed by a
  // remote packet.
  if (fromId !== myId && ['state', 'shoot', 'missile', 'bomb', 'flare', 'sonicBoom', 'impact', 'died'].includes(data.type)) return;
  if (data.type === 'input') handleClientInput(fromId, data);
  else if (data.type === 'action') handleClientAction(fromId, data);
  else if (data.type === 'state') { if (fromId === myId) handleState(fromId, data); }
  else if (data.type === 'shoot') handleShoot(fromId, data);
  else if (data.type === 'missile') handleMissile(fromId, data);
  else if (data.type === 'bomb') handleBomb(fromId, data);
  else if (data.type === 'flare') handleFlare(fromId, data);
  else if (data.type === 'sonicBoom') handleSonicBoom(fromId, data);
  else if (data.type === 'impact') handleImpact(fromId, data);
  else if (data.type === 'died') handleDied(fromId, data.by);
  else if (data.type === 'name') { if (players[fromId]) { players[fromId].name = data.name; broadcastRoster(); } }
}

function validNetworkInput(data) {
  return data && Number.isInteger(data.seq) && Number.isFinite(data.aimX) && Number.isFinite(data.aimY) &&
    Math.abs(data.aimX) < 10000 && Math.abs(data.aimY) < 10000;
}

function handleClientInput(fromId, data) {
  const p = players[fromId];
  if (!p || fromId === myId || !validNetworkInput(data) || data.seq <= (p.networkInputSeq || 0)) return;
  p.networkInputSeq = data.seq;
  p.networkInput = {
    aimX: clamp(data.aimX, -window.innerWidth * 2, window.innerWidth * 2),
    aimY: clamp(data.aimY, -window.innerHeight * 2, window.innerHeight * 2),
    boost: !!data.boost, airbrake: !!data.airbrake, shoot: !!data.shoot
  };
}

function handleClientAction(fromId, data) {
  const p = players[fromId];
  if (!p || fromId === myId || !Number.isInteger(data.seq) || data.seq <= (p.networkActionSeq || 0)) return;
  p.networkActionSeq = data.seq;
  const action = data.action || {};
  if (!p.alive && action.type !== 'testReset') return;
  if (action.type === 'roll') {
    if (!p.falling && !p.stalled && p.barrelRollCooldown <= 0) {
      p.barrelRollCooldown = BARREL_ROLL_COOLDOWN;
      p.barrelRollUntil = performance.now() + BARREL_ROLL_DURATION;
      p.barrelRollDirection = action.direction < 0 ? -1 : 1;
    }
  } else if (action.type === 'shootOnce') {
    if (!p.falling && p.alive && !p.overheated && p.fireTimer <= 0) {
      p.fireTimer = FIRE_COOLDOWN;
      fireBulletFor(p, p.id, true);
      p.heat = Math.min(HEAT_MAX, p.heat + HEAT_PER_SHOT);
      if (p.heat >= HEAT_MAX) p.overheated = true;
    }
  } else if (action.type === 'missile') {
    const lockedTarget = p.hostLockExpiresAt > performance.now() ? p.hostLockTargetId : null;
    fireMissileFor(p, p.id, lockedTarget, true);
  } else if (action.type === 'bomb') {
    dropBombFor(p, p.id, true);
  } else if (action.type === 'flare') {
    deployFlareFor(p, p.id, true);
  } else if (action.type === 'testReset') {
    if (p.alive) beginRemoteDeathFall(p, null, 'TEST — uncontrolled fall');
    else if (p.respawnAt) respawnNetworkPlayer(p);
  }
}

// Position/angle updates only arrive ~15 times/sec over the network. Instead
// of snapping the remote plane straight to each update (which looks choppy,
// like the game is running at 15fps), we store the update as a target and
// glide the rendered plane toward it every frame in interpolateRemotePlayers().
function applyRemoteState(p, data) {
  if (!p || ![data.x, data.y, data.angle, data.health].every(Number.isFinite)) return;
  if (!p.synced) {
    // First update we've ever gotten for this player: snap immediately so
    // it doesn't visibly slide in from its placeholder spawn point.
    p.x = data.x; p.y = data.y; p.angle = data.angle;
    p.synced = true;
  }
  if (p.id === myId) {
    // The local network player is rendered directly from the host snapshot;
    // remote pilots use interpolation below. Leaving this branch out makes
    // the player's camera remain at the spawn point while the minimap moves.
    p.x = data.x; p.y = data.y; p.angle = data.angle;
  }
  p.tx = data.x; p.ty = data.y; p.tangle = data.angle;
  p.health = data.health; p.alive = data.alive;
  p.falling = !!data.falling;
  p.stalled = !!data.stalled;
  p.boosting = !!data.boosting;
  if (data.roll != null) p.roll = data.roll;
  ['speed', 'heat', 'overheated', 'boost', 'missiles', 'bombs', 'flares', 'score', 'kills', 'deaths', 'respawnAt'].forEach(key => {
    if (data[key] !== undefined) p[key] = data[key];
  });
  if (data.lockTargetId !== undefined) {
    p.hostLockTargetId = data.lockTargetId;
    p.hostLockProgress = data.lockProgress || 0;
    p.hostLockExpiresAt = data.lockExpiresAt || 0;
    p.hostLockRemaining = data.lockRemaining || 0;
    p.hostLockUpdatedAt = performance.now();
  }
  if (p.id === myId && respawnOverlay) {
    if (p.alive === false) {
      respawnOverlay.style.display = 'flex';
      respawnMsgEl.textContent = 'AIRCRAFT LOST';
    } else if (p.alive) {
      respawnOverlay.style.display = 'none';
    }
  }
}

function handleState(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.angle) ||
      !Number.isFinite(data.health)) return;
  const p = players[fromId];
  if (p) applyRemoteState(p, data);
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'state', from: fromId, x: data.x, y: data.y, angle: data.angle, health: data.health, alive: data.alive, falling: data.falling, stalled: data.stalled, boosting: data.boosting, roll: data.roll });
  });
}

function broadcastAuthoritativeSnapshot() {
  if (!isHost) return;
  Object.values(players).forEach(p => {
    broadcast({
      type: 'state', from: p.id, x: p.x, y: p.y, angle: p.angle,
      health: p.health, alive: p.alive, falling: p.falling, stalled: p.stalled,
      boosting: p.boosting, roll: p.roll, speed: p.speed, heat: p.heat,
      overheated: p.overheated, boost: p.boost, missiles: p.missiles,
      bombs: p.bombs, flares: p.flares, score: p.score, kills: p.kills,
      deaths: p.deaths, respawnAt: p.respawnAt || 0,
      lockTargetId: p.hostLockTargetId, lockProgress: p.hostLockProgress || 0,
      lockExpiresAt: p.hostLockExpiresAt || 0,
      lockRemaining: Math.max(0, (p.hostLockExpiresAt || 0) - performance.now())
    });
  });
  broadcastAuthoritativeProjectiles();
}

function broadcastAuthoritativeProjectiles() {
  if (!isHost) return;
  const now = performance.now();
  const age = p => Math.max(0, now - (p.born || now));
  broadcast({
    type: 'projectiles',
    bullets: bullets.map(b => ({ id: b.id, ownerId: b.ownerId, x: b.x, y: b.y, prevX: b.prevX, prevY: b.prevY, angle: b.angle, vx: b.vx, vy: b.vy, age: age(b) })),
    missiles: missiles.map(m => ({ id: m.id, ownerId: m.ownerId, targetId: m.targetId, x: m.x, y: m.y, angle: m.angle, speed: m.speed, decoyed: !!m.decoyed, decoyTarget: m.decoyTarget ? { x: m.decoyTarget.x, y: m.decoyTarget.y } : null, age: age(m) })),
    bombs: bombs.map(b => ({ id: b.id, ownerId: b.ownerId, x: b.x, y: b.y, vx: b.vx, vy: b.vy, age: age(b) })),
    shrapnels: shrapnels.map(s => ({ id: s.id, ownerId: s.ownerId, x: s.x, y: s.y, prevX: s.prevX, prevY: s.prevY, vx: s.vx, vy: s.vy, age: age(s) }))
  });
}

function reconcileAuthoritativeProjectiles(data) {
  const now = performance.now();
  const valid = (p, required) => p && p.id != null && required.every(key => Number.isFinite(p[key]));
  const sync = (kind, incoming, required, build) => {
    if (!Array.isArray(incoming)) return;
    const current = kind === 'bullet' ? bullets : kind === 'missile' ? missiles : kind === 'bomb' ? bombs : shrapnels;
    const oldById = new Map(current.map(p => [String(p.id), p]));
    const next = incoming.filter(p => valid(p, required)).map(p => build(p, oldById.get(String(p.id)), now));
    if (kind === 'bullet') bullets = next;
    else if (kind === 'missile') missiles = next;
    else if (kind === 'bomb') bombs = next;
    else shrapnels = next;
  };
  sync('bullet', data.bullets, ['x', 'y', 'angle', 'vx', 'vy'], (p, old, t) => ({ ...p, born: t - (p.age || 0) }));
  sync('missile', data.missiles, ['x', 'y', 'angle', 'speed'], (p, old, t) => ({
    ...p, born: t - (p.age || 0), lockReadyAt: t, trail: old?.trail || [], exhaust: 1,
    decoyTarget: p.decoyTarget && Number.isFinite(p.decoyTarget.x) && Number.isFinite(p.decoyTarget.y) ? p.decoyTarget : null
  }));
  sync('bomb', data.bombs, ['x', 'y', 'vx', 'vy'], (p, old, t) => ({ ...p, born: t - (p.age || 0) }));
  sync('shrapnel', data.shrapnels, ['x', 'y', 'vx', 'vy'], (p, old, t) => ({ ...p, born: t - (p.age || 0) }));
}

function handleShoot(fromId, data) {
  // The host is a player too, but this only runs on the host machine. When the
  // shot comes from a connected client, the host's own bullets array never
  // got it before (fireBullet() only pushes locally for whoever fired), so
  // the host neither rendered it nor could take damage from it. Skip the push
  // when the host is the shooter (fromId === myId) since fireBullet() already
  // added it there.
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.angle)) return;
  if (fromId !== myId && data.id != null && !projectileExists('bullet', data.id)) {
    bullets.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, prevX: data.x, prevY: data.y, angle: data.angle, vx: Math.cos(data.angle) * BULLET_SPEED, vy: Math.sin(data.angle) * BULLET_SPEED, born: performance.now() });
    spawnExplosion(data.x, data.y, 'muzzle');
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'shoot', from: fromId, id: data.id, x: data.x, y: data.y, angle: data.angle });
  });
}

function handleMissile(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.angle)) return;
  if (fromId !== myId && data.id != null && !projectileExists('missile', data.id)) {
    missiles.push({ id: data.id, ownerId: fromId, targetId: data.targetId, x: data.x, y: data.y, angle: data.angle, speed: Number.isFinite(data.speed) ? data.speed : MISSILE_INITIAL_SPEED, born: performance.now(), lockReadyAt: performance.now(), trail: [] });
    spawnExplosion(data.x, data.y, 'launch');
    playMissileLaunchSound(data.x, data.y);
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'missile', from: fromId, id: data.id, targetId: data.targetId, x: data.x, y: data.y, angle: data.angle, speed: data.speed, locked: true });
  });
}

function handleBomb(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.vx) || !Number.isFinite(data.vy)) return;
  if (fromId !== myId && data.id != null && !projectileExists('bomb', data.id)) {
    bombs.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, vx: data.vx, vy: data.vy, born: performance.now() });
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'bomb', from: fromId, id: data.id, x: data.x, y: data.y, vx: data.vx, vy: data.vy });
  });
}

function handleFlare(fromId, data) {
  if (fromId !== myId) {
    spawnFlareSalvo(data.x, data.y, data.angle || 0, fromId);
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'flare', from: fromId, x: data.x, y: data.y, angle: data.angle || 0 });
  });
}

function handleSonicBoom(fromId, data) {
  if (fromId !== myId) triggerSonicBoom(data.x, data.y, data.angle || 0);
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'sonicBoom', from: fromId, x: data.x, y: data.y, angle: data.angle || 0 });
  });
}

// A bullet or missile just hit whoever it was aimed at (data.x/y is where).
// The victim's client already removed its own copy and sent this so every
// other client's copy of that same projectile disappears with an explosion
// at the same moment, instead of lingering until it times out on its own.
function handleImpact(fromId, data) {
  if (!data || data.id == null || !['bullet', 'missile', 'bomb'].includes(data.kind) ||
      !Number.isFinite(data.x) || !Number.isFinite(data.y) || !rememberImpact(data.kind, data.id)) return;
  if (fromId !== myId) {
    if (data.kind === 'bomb') {
      const bomb = bombs.find(b => b.id === data.id);
      if (bomb) detonateBomb(bomb);
      else {
        spawnExplosion(data.x, data.y, 'bomb');
        playExplosionSound('blast', data.x, data.y);
        spawnBombShrapnel(data.x, data.y, fromId);
      }
    } else {
      removeProjectileLocal(data.kind, data.id);
      spawnExplosion(data.x, data.y, data.kind === 'missile' ? 'blast' : 'spark');
    }
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'impact', from: fromId, kind: data.kind, id: data.id, x: data.x, y: data.y });
  });
}

function handleDied(fromId, killerId) {
  if (players[fromId]) { players[fromId].alive = false; players[fromId].deaths = (players[fromId].deaths || 0) + 1; }
  if (players[killerId] && killerId !== fromId) {
    players[killerId].kills = (players[killerId].kills || 0) + 1;
    players[killerId].score += KILL_SCORE;
  }
  broadcast({ type: 'killed', victim: fromId, killer: killerId });
  onKilled(killerId, fromId);
  broadcastRoster();
}

// ================= Networking: client side =================
function startJoin() {
  unlockAudio();
  seenImpactKeys.clear(); lastNetworkActivityAt = performance.now();
  setNetworkStatus('P2P // CONNECTING', 'warn');
  botMode = false;
  const hostId = document.getElementById('hostIdInput').value.trim();
  if (!hostId) return;
  peer = new Peer();
  peer.on('error', err => {
    const message = err && err.type === 'peer-unavailable'
      ? 'Room not found. Check the room code.'
      : 'Unable to connect to the network.';
    statusEl.textContent = message;
    chooseRole.style.display = 'flex'; lobby.style.display = 'none';
  });
  peer.on('disconnected', () => {
    statusEl.textContent = 'Disconnected from the signaling server.';
    setNetworkStatus('P2P // SIGNAL LOST', 'bad');
  });
  peer.on('open', () => {
    const conn = peer.connect(hostId, { reliable: true });
    connections.host = conn;
    conn.on('open', () => {
      chooseRole.style.display = 'none'; lobby.style.display = 'flex';
      statusEl.textContent = 'Connected — waiting for host...';
      setNetworkStatus('P2P // CONNECTED', 'ok');
      startBtn.style.display = 'none'; waitHint.style.display = 'block';
    });
    conn.on('data', handleClientReceive);
    conn.on('error', () => {
      statusEl.textContent = 'Connection failed. Check the room code and try again.';
      setNetworkStatus('P2P // ERROR', 'bad');
      chooseRole.style.display = 'flex'; lobby.style.display = 'none';
    });
    conn.on('close', () => {
      statusEl.textContent = 'Host connection closed.';
      setNetworkStatus('P2P // HOST LOST', 'bad');
      if (!started) { chooseRole.style.display = 'flex'; lobby.style.display = 'none'; }
    });
  });
}

function handleClientReceive(data) {
  lastNetworkActivityAt = performance.now();
  if (!data || typeof data.type !== 'string') return;
  if (data.type === 'full') { statusEl.textContent = 'That lobby is full.'; }
  else if (data.type === 'welcome') {
    myId = data.id;
    players[myId] = freshPlayerState(myId, myName);
    connections.host.send({ type: 'name', name: myName });
  }
  else if (data.type === 'roster') {
    data.roster.forEach(p => { players[p.id] = players[p.id] || {}; Object.assign(players[p.id], p); });
    if (started && !botMode) setNetworkStatus('P2P // ' + data.roster.filter(p => p.connected !== false).length + ' PILOTS', 'ok');
    renderLobby(); renderLeaderboard();
  }
  else if (data.type === 'start') { started = true; buildClouds(); beginLocalGame(); }
  else if (data.type === 'projectiles') {
    reconcileAuthoritativeProjectiles(data);
  }
  else if (data.type === 'state') {
    const p = players[data.from] = players[data.from] || freshPlayerState(data.from, 'Player ' + (data.from + 1));
    applyRemoteState(p, data);
  }
  else if (data.type === 'shoot') {
    if (data.from !== myId && data.id != null && !projectileExists('bullet', data.id)) {
      bullets.push({ id: data.id, ownerId: data.from, x: data.x, y: data.y, prevX: data.x, prevY: data.y, angle: data.angle, vx: Math.cos(data.angle) * BULLET_SPEED, vy: Math.sin(data.angle) * BULLET_SPEED, born: performance.now() });
      spawnExplosion(data.x, data.y, 'muzzle');
    }
  }
  else if (data.type === 'missile') {
    if (data.from !== myId && data.id != null && !projectileExists('missile', data.id)) {
      missiles.push({ id: data.id, ownerId: data.from, targetId: data.targetId, x: data.x, y: data.y, angle: data.angle, speed: Number.isFinite(data.speed) ? data.speed : MISSILE_INITIAL_SPEED, born: performance.now(), lockReadyAt: performance.now(), trail: [] });
      spawnExplosion(data.x, data.y, 'launch');
      playMissileLaunchSound(data.x, data.y);
    }
  }
  else if (data.type === 'bomb') {
    if (data.from !== myId && data.id != null && !projectileExists('bomb', data.id)) {
      bombs.push({ id: data.id, ownerId: data.from, x: data.x, y: data.y, vx: data.vx, vy: data.vy, born: performance.now() });
    }
  }
  else if (data.type === 'flare') {
    if (data.from !== myId) {
      spawnFlareSalvo(data.x, data.y, data.angle || 0, data.from);
    }
  }
  else if (data.type === 'sonicBoom') {
    if (data.from !== myId) triggerSonicBoom(data.x, data.y, data.angle || 0);
  }
  else if (data.type === 'impact') {
    if (data.from !== myId && rememberImpact(data.kind, data.id)) {
      if (data.kind === 'bomb') {
        const bomb = bombs.find(b => b.id === data.id);
        if (bomb) detonateBomb(bomb);
        else {
          spawnExplosion(data.x, data.y, 'bomb');
          playExplosionSound('blast', data.x, data.y);
          spawnBombShrapnel(data.x, data.y, data.from);
        }
      } else {
      removeProjectileLocal(data.kind, data.id);
      spawnExplosion(data.x, data.y, data.kind === 'missile' ? 'blast' : 'spark');
      }
    }
  }
  else if (data.type === 'killed') onKilled(data.killer, data.victim);
}

function sendEvent(msg) {
  if (isHost) {
    if (msg.type === 'state') handleState(0, msg);
    else if (msg.type === 'shoot') handleShoot(0, msg);
    else if (msg.type === 'missile') handleMissile(0, msg);
    else if (msg.type === 'bomb') handleBomb(0, msg);
    else if (msg.type === 'flare') handleFlare(0, msg);
    else if (msg.type === 'sonicBoom') handleSonicBoom(0, msg);
    else if (msg.type === 'impact') handleImpact(0, msg);
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

// Runs once per client per death (see handleDied and the 'killed' branch of
// handleClientReceive) so the kill feed message and crash explosion always
// fire together, exactly once, on every machine including the victim's own.
function onKilled(killerId, victimId) {
  pushKillFeed(killerId, victimId);
  const v = players[victimId];
  if (v) spawnExplosion(v.x, v.y, v.y >= GROUND_Y - 20 ? 'planeWater' : 'crash');
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

// ================= Input =================
const keysHeld = { boost: false, airbrake: false, shoot: false };
let missileLockTargetId = null, missileLockAcquireId = null, missileLockCandidateId = null;
let missileLockCandidateAligned = false, missileLockProgress = 0, missileLockExpiresAt = 0;
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2 - 150; // aim point; steering targets this each frame

function resetAllInput() { keysHeld.boost = false; keysHeld.airbrake = false; keysHeld.shoot = false; }
function sendClientAction(action) {
  if (!isNetworkClient() || !connections.host || !connections.host.open) return;
  clientActionSeq++;
  connections.host.send({ type: 'action', seq: clientActionSeq, action });
}

function sendClientInput(ts) {
  if (!isNetworkClient() || !connections.host || !connections.host.open) return;
  if (ts - lastClientInputSend < 50) return;
  lastClientInputSend = ts;
  clientInputSeq++;
  const aimX = mouseX - window.innerWidth / 2;
  const aimY = mouseY - window.innerHeight / 2;
  connections.host.send({
    type: 'input', seq: clientInputSeq,
    aimX: Number.isFinite(aimX) ? aimX : 1,
    aimY: Number.isFinite(aimY) ? aimY : 0,
    boost: !!keysHeld.boost, airbrake: !!keysHeld.airbrake, shoot: !!keysHeld.shoot
  });
}
window.addEventListener('blur', resetAllInput);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetAllInput(); });

function wireKeyboard() {
  document.addEventListener('keydown', e => {
    unlockAudio();
    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W': keysHeld.boost = true; break;
      case 'ArrowDown': case 's': case 'S': case 'Shift': keysHeld.airbrake = true; break;
      case ' ': keysHeld.shoot = true; e.preventDefault(); break;
      case 'q': case 'Q': tryBarrelRoll(-1); break;
      case 'f': case 'F': tryDeployFlare(); break;
      case 'e': case 'E': tryBarrelRoll(1); break;
      case 'r': case 'R': testDeathOrReset(); break;
      case 'b': case 'B': tryDropBomb(); break;
    }
  });
  document.addEventListener('keyup', e => {
    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W': keysHeld.boost = false; break;
      case 'ArrowDown': case 's': case 'S': case 'Shift': keysHeld.airbrake = false; break;
      case ' ': keysHeld.shoot = false; break;
    }
  });
}

function wireMouse() {
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener('mousedown', e => {
    unlockAudio();
    if (e.button === 0) keysHeld.shoot = true;
    else if (e.button === 2) { tryFireMissile(); e.preventDefault(); }
  });
  window.addEventListener('mouseup', e => {
    if (e.button === 0) keysHeld.shoot = false;
    if (e.button === 2) e.preventDefault();
  });
  window.addEventListener('contextmenu', e => e.preventDefault());
}

// ================= Rendering =================
function resizeCanvas() {
  skyCanvas.width = window.innerWidth;
  skyCanvas.height = window.innerHeight;
}

// ---- Multi-view vector plane -------------------------------------------------
// The original raster F-16 was beautiful but too detailed for a 74px sprite.
// This compact silhouette is drawn at runtime, so it stays sharp, readable,
// and easy to tint for every pilot without needing an external image asset.
const PLANE_SPRITE_LEN = 88;
function drawPlaneSprite(ctx, color, alive, boosting, visualRoll = 0, falling = false, onFire = false) {
  const main = alive ? color : '#566875';
  const dark = alive ? '#082238' : '#273844';
  const highlight = alive ? '#d8f5ff' : '#83939a';
  ctx.save();
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.shadowColor = alive ? color : 'transparent'; ctx.shadowBlur = alive ? 9 : 0;
  if (falling || onFire) {
    // Fatal uncontrolled aircraft burn while descending. The trail is drawn
    // in the aircraft's local space, so it remains attached while the plane
    // spins visually and does not affect its falling movement.
    const pulse = .82 + Math.sin(performance.now() / 70) * .12;
    const length = falling ? 62 + pulse * 34 : 42 + pulse * 22;
    const fire = ctx.createLinearGradient(-24, 0, -length, 0);
    fire.addColorStop(0, 'rgba(255,255,220,.98)');
    fire.addColorStop(.22, 'rgba(255,205,75,.95)');
    fire.addColorStop(.58, 'rgba(255,82,25,.72)');
    fire.addColorStop(1, 'rgba(80,18,8,0)');
    ctx.fillStyle = fire;
    ctx.beginPath();
    ctx.moveTo(-22, -5); ctx.lineTo(-length, Math.sin(performance.now() / 55) * 5);
    ctx.lineTo(-22, 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = falling ? 'rgba(55,58,62,.42)' : 'rgba(55,58,62,.25)';
    ctx.beginPath(); ctx.arc(-length * .72, -7, 4 + pulse * 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-length * .86, 6, 3 + pulse * 2, 0, Math.PI * 2); ctx.fill();
  }
  if (alive && onFire && !falling) {
    // Critical-health fire is attached to the engine bay and flickers around
    // the fuselage, while the longer trail above is reserved for a crash.
    const t = performance.now() / 52;
    ctx.fillStyle = 'rgba(255,247,190,.95)';
    ctx.beginPath(); ctx.moveTo(-16,-3); ctx.lineTo(-31, Math.sin(t) * 4 - 5); ctx.lineTo(-24,0); ctx.lineTo(-31, Math.cos(t * .8) * 4 + 5); ctx.lineTo(-16,3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,92,27,.72)';
    ctx.beginPath(); ctx.moveTo(-21,-2); ctx.lineTo(-39, Math.sin(t * .72) * 7); ctx.lineTo(-24,3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(55,58,62,.3)';
    ctx.beginPath(); ctx.arc(-38, -7 + Math.sin(t * .6) * 3, 4.5, 0, Math.PI * 2); ctx.arc(-45, 5 + Math.cos(t * .5) * 3, 3.2, 0, Math.PI * 2); ctx.fill();
  }
  // Visual-only exhaust trail; the matching engine/boost audio is managed by
  // updateEngineAudio() so it remains separate from rendering.
  if (alive && boosting) {
    const exhaustLength = 80;
    const exhaust = ctx.createLinearGradient(-27, 0, -exhaustLength, 0);
    exhaust.addColorStop(0, 'rgba(255,244,184,.95)');
    exhaust.addColorStop(.42, 'rgba(255,145,65,.7)');
    exhaust.addColorStop(1, 'rgba(255,70,25,0)');
    ctx.fillStyle = exhaust;
    ctx.beginPath(); ctx.moveTo(-27,-4.5); ctx.lineTo(-exhaustLength,0); ctx.lineTo(-27,4.5); ctx.closePath(); ctx.fill();
  }
  ctx.shadowBlur = 0;
  // A barrel roll is rendered as a sequence of changing drawn views. The
  // wing projection narrows through the side view, while the lighting and
  // panel details switch between top and underside as the roll crosses 180°.
  // This keeps the flight vector independent from the visual roll.
  const rollDepth = Math.cos(visualRoll);
  const topView = Math.max(0, rollDepth);
  const undersideView = Math.max(0, -rollDepth);
  const wingProfile = .14 + .86 * Math.abs(rollDepth);
  ctx.scale(1, wingProfile);

  // wings and tailplane
  ctx.fillStyle = undersideView > .2 ? '#172b3a' : dark;
  ctx.strokeStyle = 'rgba(217,247,255,.7)'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(8,-3); ctx.lineTo(-8,-25); ctx.lineTo(-18,-24); ctx.lineTo(-11,-4); ctx.lineTo(-33,-11); ctx.lineTo(-37,-8); ctx.lineTo(-19,1); ctx.lineTo(-37,8); ctx.lineTo(-33,11); ctx.lineTo(-11,4); ctx.lineTo(-18,24); ctx.lineTo(-8,25); ctx.lineTo(8,3); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Fuselage with a subtle metallic gradient.
  const body = ctx.createLinearGradient(0,-6,0,6);
  body.addColorStop(0, highlight); body.addColorStop(.18, main); body.addColorStop(.82, main); body.addColorStop(1, dark);
  ctx.fillStyle = body; ctx.strokeStyle = highlight;
  ctx.beginPath(); ctx.moveTo(42,0); ctx.quadraticCurveTo(28,-5,10,-5); ctx.lineTo(-23,-4); ctx.lineTo(-35,0); ctx.lineTo(-23,4); ctx.lineTo(10,5); ctx.quadraticCurveTo(28,5,42,0); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Canopy and center spine. During the inverted half of the roll, the
  // canopy highlight is replaced by an underside panel so the view reads as
  // an aircraft rotating in depth rather than a flat sprite spinning.
  ctx.fillStyle = undersideView > .2 ? (alive ? '#0b1724' : '#263238') : (alive ? '#183c5a' : '#37484f');
  ctx.strokeStyle = 'rgba(225,250,255,.75)';
  ctx.beginPath(); ctx.moveTo(18,-4); ctx.quadraticCurveTo(9,-13,-3,-5); ctx.lineTo(7,-2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = undersideView > .2 ? 'rgba(255,170,105,.36)' : 'rgba(255,255,255,.38)';
  ctx.beginPath(); ctx.moveTo(-27,0); ctx.lineTo(29,0); ctx.stroke();
  // nose point and tail fin
  ctx.fillStyle = highlight; ctx.beginPath(); ctx.moveTo(42,0); ctx.lineTo(29,-2); ctx.lineTo(29,2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = dark; ctx.beginPath(); ctx.moveTo(-20,-4); ctx.lineTo(-13,-16); ctx.lineTo(-7,-5); ctx.closePath(); ctx.fill();
  // Fine wing panel seams and navigation lights make the jet read better at
  // the small in-game scale without relying on a blurry raster sprite.
  ctx.strokeStyle = undersideView > .2 ? 'rgba(255,170,105,.48)' : (alive ? 'rgba(110,231,255,.5)' : 'rgba(190,210,215,.35)'); ctx.lineWidth = .8;
  ctx.beginPath();
  ctx.moveTo(-9,-20); ctx.lineTo(2,-4); ctx.moveTo(-9,20); ctx.lineTo(2,4);
  ctx.moveTo(-29,-8); ctx.lineTo(-12,-2); ctx.moveTo(-29,8); ctx.lineTo(-12,2);
  ctx.stroke();
  if (alive) {
    ctx.fillStyle = '#ff6b61'; ctx.beginPath(); ctx.arc(-34,8,1.5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#6ee7ff'; ctx.beginPath(); ctx.arc(-34,-8,1.5,0,Math.PI*2); ctx.fill();
  }
  // Bright top-facing panel and darker underside panel are intentionally
  // different drawn details, visible as the roll passes through each view.
  if (topView > .35) {
    ctx.strokeStyle = 'rgba(255,255,255,.42)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(8,-3); ctx.lineTo(22,-1); ctx.stroke();
  } else if (undersideView > .35) {
    ctx.strokeStyle = 'rgba(255,155,90,.55)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(8,3); ctx.lineTo(22,1); ctx.stroke();
  }
  ctx.restore();
}

function drawPlane(ctx, p, isMe, now) {
  if (isInCloudBank(p.x, p.y)) return;
  const flicker = now < p.invulnUntil && Math.floor(now / 100) % 2 === 0;
  ctx.save();
  const kick = isMe ? recoilKick : 0;
  ctx.translate(p.x - Math.cos(p.angle) * kick, p.y - Math.sin(p.angle) * kick);
  ctx.rotate(p.angle);
  const roll = p.roll || 0;
  const health = p.health == null ? MAX_HEALTH : p.health;
  const onFire = p.falling === true || (p.alive !== false && health <= MAX_HEALTH * CRITICAL_HEALTH_FRACTION);
  ctx.globalAlpha = flicker ? 0.4 : 1;
  drawPlaneSprite(ctx, p.color || colorFor(p.id), p.alive !== false, p.boosting === true, roll, p.falling === true, onFire);
  ctx.restore();

  ctx.globalAlpha = 1;
  ctx.fillStyle = '#fff';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((p.isBot ? 'AI // ' : '') + (p.name || 'Player'), p.x, p.y - 34);

  const w = 30, h = 4, frac = clamp((p.health != null ? p.health : 100) / MAX_HEALTH, 0, 1);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(p.x - w / 2, p.y - 28, w, h);
  ctx.fillStyle = frac > 0.4 ? '#6fe08a' : '#ff6b6b';
  ctx.fillRect(p.x - w / 2, p.y - 28, w * frac, h);
}

function drawBullet(ctx, b) {
  ctx.save();
  ctx.strokeStyle = b.ownerId === myId ? 'rgba(255,244,155,.7)' : 'rgba(255,125,90,.55)';
  ctx.lineWidth = 1; ctx.lineCap = 'round';
  const tail = 9;
  ctx.beginPath(); ctx.moveTo(b.x - Math.cos(b.angle) * tail, b.y - Math.sin(b.angle) * tail); ctx.lineTo(b.x, b.y); ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.angle);
  ctx.shadowColor = b.ownerId === myId ? '#fff59d' : '#ff6548'; ctx.shadowBlur = 5;
  ctx.fillStyle = b.ownerId === myId ? '#fffbd0' : '#ff987d';
  ctx.beginPath();
  ctx.ellipse(0, 0, BULLET_RADIUS * 2.2, BULLET_RADIUS, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMissile(ctx, m) {
  const incoming = m.targetId === myId && m.ownerId !== myId;
  if (incoming) {
    const pulse = 22 + Math.sin(performance.now() / 90) * 5;
    ctx.save(); ctx.globalAlpha = .28; ctx.strokeStyle = '#ff4558'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(m.x, m.y, pulse, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
  for (let i = 0; i < m.trail.length; i++) {
    const t = m.trail[i];
    const frac = (i + 1) / (m.trail.length + 1);
    ctx.fillStyle = `rgba(255,${Math.round(125 + frac * 100)},${Math.round(55 + frac * 80)},${frac * .55})`;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 2 + frac * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(m.x, m.y);
  ctx.rotate(m.angle);
  ctx.shadowColor = m.decoyed ? '#9aa5b1' : '#ff9d5c'; ctx.shadowBlur = 14;
  ctx.fillStyle = m.decoyed ? '#9aa5b1' : '#1b2934';
  ctx.strokeStyle = m.decoyed ? '#d6e0e5' : '#d3e7ed'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(1, 0, 12, 4.1, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0;
  // Bomb-like orange nose and rear fins, plus a center stripe for a more
  // readable high-speed silhouette.
  ctx.fillStyle = m.decoyed ? '#b9c3ca' : '#ff9d5c';
  ctx.beginPath(); ctx.moveTo(-8,-3); ctx.lineTo(-22,0); ctx.lineTo(-8,3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = m.decoyed ? '#87949d' : '#ffd08a';
  ctx.beginPath();
  ctx.moveTo(4, -3); ctx.lineTo(-2, -8); ctx.lineTo(-5, -3); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(4, 3); ctx.lineTo(-2, 8); ctx.lineTo(-5, 3); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,226,160,.72)'; ctx.lineWidth = 1.1;
  ctx.beginPath(); ctx.moveTo(-1, -2.2); ctx.lineTo(8, -2.2); ctx.stroke();
  ctx.fillStyle = m.decoyed ? '#b9c3ca' : '#ffb347';
  ctx.beginPath(); ctx.moveTo(-7, -1.3); ctx.lineTo(-13, 0); ctx.lineTo(-7, 1.3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawShrapnel(ctx, s) {
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(Math.atan2(s.vy, s.vx));
  ctx.shadowColor = '#ffb45c'; ctx.shadowBlur = 7;
  ctx.fillStyle = '#ffd58a'; ctx.strokeStyle = '#fff0c2'; ctx.lineWidth = .8;
  ctx.beginPath();
  ctx.moveTo(7, 0); ctx.lineTo(-4, -2.2); ctx.lineTo(-7, 0); ctx.lineTo(-4, 2.2); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawBomb(ctx, b) {
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(Math.atan2(b.vy, b.vx));
  ctx.shadowColor = '#ff9d5c'; ctx.shadowBlur = 10;
  ctx.fillStyle = '#1b2934'; ctx.strokeStyle = '#d3e7ed'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(0, 0, 8, 4.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ff9d5c';
  ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-15, 0); ctx.lineTo(-7, 3); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawFlare(ctx, f, now) {
  const frac = clamp(1 - (now - f.born) / FLARE_ACTIVE_MS, 0, 1);
  if (frac <= 0 || now < f.born) return;
  ctx.save();
  ctx.globalAlpha = frac;
  const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 24);
  grad.addColorStop(0, 'rgba(255,255,225,1)');
  grad.addColorStop(.25, 'rgba(255,205,85,.95)');
  grad.addColorStop(1, 'rgba(255,105,35,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(f.x, f.y, 24, 0, Math.PI * 2);
  ctx.fill();
  // Game-like flare body: a bright core, cross-shaped burning element, and a
  // short drifting ember trail instead of a generic glowing circle.
  ctx.translate(f.x, f.y);
  ctx.strokeStyle = '#fff5bb'; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-8,0); ctx.lineTo(8,0); ctx.moveTo(0,-8); ctx.lineTo(0,8); ctx.stroke();
  ctx.fillStyle = '#fffbd5'; ctx.beginPath(); ctx.arc(0,0,3.2,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,145,55,.75)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-f.vx * .08, -f.vy * .08); ctx.lineTo(-f.vx * .28, -f.vy * .28); ctx.stroke();
  ctx.restore();
}

function drawExplosion(ctx, e, now) {
  const cfg = FX[e.kind];
  const t = clamp((now - e.born) / cfg.life, 0, 1);
  const r = cfg.r * (0.3 + t * 0.7);
  ctx.save();
  ctx.globalAlpha = 1 - t;
  const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, r);
  grad.addColorStop(0, cfg.colors[0]);
  grad.addColorStop(0.45, cfg.colors[1]);
  grad.addColorStop(1, cfg.colors[2]);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
  ctx.fill();
  if (e.kind === 'blast' || e.kind === 'bomb' || e.kind === 'crash' || e.kind === 'shock') {
    ctx.globalAlpha = (1 - t) * .85; ctx.strokeStyle = e.kind === 'shock' ? '#9ceeff' : '#ffbd5d'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(e.x, e.y, r * (.55 + t * .65), 0, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();
}

function drawGround(ctx) {
  const grad = ctx.createLinearGradient(0, GROUND_Y, 0, WORLD_H);
  grad.addColorStop(0, '#3f8c91');
  grad.addColorStop(.35, '#246875');
  grad.addColorStop(1, '#102f42');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, WORLD_H);
  ctx.lineTo(0, GROUND_Y);
  const step = 120;
  for (let x = 0; x <= WORLD_W; x += step) {
    const h = Math.sin(x / 260) * 6 + Math.sin(x / 90 + 1.3) * 3;
    ctx.lineTo(x, GROUND_Y + h);
  }
  ctx.lineTo(WORLD_W, GROUND_Y);
  ctx.lineTo(WORLD_W, WORLD_H);
  ctx.closePath();
  ctx.fill();

  // Wave-line highlight along the surface
  ctx.strokeStyle = 'rgba(173,238,226,0.30)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= WORLD_W; x += step) {
    const h = Math.sin(x / 260) * 6 + Math.sin(x / 90 + 1.3) * 3;
    if (x === 0) ctx.moveTo(x, GROUND_Y + h); else ctx.lineTo(x, GROUND_Y + h);
  }
  ctx.stroke();

  // A couple of fainter, slightly submerged wave lines for texture
  ctx.strokeStyle = 'rgba(173,238,226,0.11)';
  ctx.lineWidth = 1.5;
  [18, 40].forEach((depth, di) => {
    ctx.beginPath();
    for (let x = 0; x <= WORLD_W; x += step) {
      const h = Math.sin(x / 260 + di + 1) * 5 + Math.sin(x / 100 + di * 2) * 3;
      if (x === 0) ctx.moveTo(x, GROUND_Y + depth + h); else ctx.lineTo(x, GROUND_Y + depth + h);
    }
    ctx.stroke();
  });
}

function drawSkyBackdrop(ctx, camX, camY, W, H) {
  const horizon = GROUND_Y - 520;
  const sunX = WORLD_W * .72, sunY = 560;
  if (sunX > camX - 220 && sunX < camX + W + 220 && sunY > camY - 220 && sunY < camY + H + 220) {
    const sun = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 210);
    sun.addColorStop(0, 'rgba(255,246,190,.9)'); sun.addColorStop(.18, 'rgba(255,215,120,.35)'); sun.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(sunX, sunY, 210, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,246,200,.85)'; ctx.beginPath(); ctx.arc(sunX, sunY, 34, 0, Math.PI * 2); ctx.fill();
  }
  const start = Math.floor((camX - 260) / 150) * 150;
  const end = camX + W + 260;
  const drawRange = (base, color, scale, offset) => {
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(start, WORLD_H);
    ctx.lineTo(start, base);
    for (let x = start; x <= end; x += 150) {
      const peak = base - 100 - Math.abs(Math.sin(x / 390 + offset)) * 230 * scale - Math.abs(Math.sin(x / 170 + offset * 2)) * 70 * scale;
      ctx.lineTo(x + 75, peak); ctx.lineTo(x + 150, base + Math.sin(x / 210) * 12);
    }
    ctx.lineTo(end, WORLD_H); ctx.closePath(); ctx.fill();
  };
  drawRange(horizon + 250, 'rgba(38,88,99,.48)', .65, .5);
  drawRange(horizon + 330, 'rgba(18,50,60,.78)', .9, 1.8);
  ctx.fillStyle = 'rgba(188,232,226,.10)'; ctx.fillRect(start, horizon + 280, end - start, 180);
}

function drawCloudBanks(ctx, now, camX, camY, viewW, viewH) {
  cloudBanks.forEach((b, index) => {
    if (b.x + b.rx < camX - 80 || b.x - b.rx > camX + viewW + 80 || b.y + b.ry < camY - 80 || b.y - b.ry > camY + viewH + 80) return;
    ctx.save();
    ctx.translate(b.x, b.y);
    const pulse = .96 + Math.sin(now / 900 + index) * .04;
    ctx.scale(pulse, 1);
    const g = ctx.createRadialGradient(0, -b.ry * .12, b.ry * .08, 0, 0, b.rx);
    g.addColorStop(0, `rgba(239,252,250,${b.alpha})`);
    g.addColorStop(.55, `rgba(201,231,232,${b.alpha * .78})`);
    g.addColorStop(1, 'rgba(165,205,211,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, 0, b.rx, b.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(241,255,253,${b.alpha * .28})`;
    ctx.beginPath(); ctx.ellipse(-b.rx * .28, -b.ry * .15, b.rx * .34, b.ry * .42, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(b.rx * .2, -b.ry * .08, b.rx * .42, b.ry * .35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  });
}

function drawSpeedLines(ctx, now) {
  if (!myState || !keysHeld.boost || !myState.alive) return;
  ctx.save();
  ctx.translate(myState.x, myState.y); ctx.rotate(myState.angle);
  ctx.globalAlpha = .24 + Math.sin(now / 90) * .05;
  for (let i = 0; i < 9; i++) {
    const y = (i - 4) * 13 + Math.sin(now / 170 + i) * 4;
    const length = 20 + ((i * 17) % 33);
    ctx.strokeStyle = i % 2 ? '#b9f8ff' : '#6edff2'; ctx.lineWidth = i % 3 === 0 ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(-48 - length, y); ctx.lineTo(-48, y); ctx.stroke();
  }
  ctx.restore();
}

function drawLockReticle(ctx, x, y, progress, locked, now, label, hint = false) {
  const pulse = 1 + Math.sin(now / (locked ? 105 : 150)) * (locked ? .08 : .035);
  const outer = (locked ? 30 : hint ? 54 : 68 - progress * 38) * pulse;
  const inner = (locked ? 14 : hint ? 25 : 30 - progress * 14) * pulse;
  const color = hint ? '#ffc45d' : '#ff4d5d';
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(locked ? now / 1800 : -now / 2400);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowColor = hint ? 'rgba(255,184,70,.8)' : 'rgba(255,45,70,.9)';
  ctx.shadowBlur = locked ? 18 : 12;
  ctx.lineWidth = locked ? 2 : 1.7;
  ctx.lineCap = 'round';

  // Four contracting brackets create the familiar game-style lock-on read.
  const bracket = Math.max(7, outer * .27);
  ctx.beginPath();
  ctx.moveTo(-outer, -outer + bracket); ctx.lineTo(-outer, -outer); ctx.lineTo(-outer + bracket, -outer);
  ctx.moveTo(outer - bracket, -outer); ctx.lineTo(outer, -outer); ctx.lineTo(outer, -outer + bracket);
  ctx.moveTo(outer, outer - bracket); ctx.lineTo(outer, outer); ctx.lineTo(outer - bracket, outer);
  ctx.moveTo(-outer + bracket, outer); ctx.lineTo(-outer, outer); ctx.lineTo(-outer, outer - bracket);
  ctx.stroke();

  ctx.setLineDash(locked ? [5, 4] : hint ? [2, 5] : [3, 6]);
  ctx.beginPath(); ctx.arc(0, 0, inner, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = locked ? 2.4 : 1.4;
  ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(7, 0); ctx.moveTo(0, -7); ctx.lineTo(0, 7); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, locked ? 3 : 2.2, 0, Math.PI * 2); ctx.fill();

  ctx.rotate(-(locked ? now / 1800 : -now / 2400));
  ctx.shadowBlur = 0;
  ctx.font = '8px Space Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(label, 0, outer + 15);
  ctx.restore();
}

function drawCrosshair(ctx, now, camX, camY, viewScale) {
  if (!started || !myState || !myState.alive) return;
  const hasLock = missileLockTargetId != null && missileLockExpiresAt > now;
  const targetId = hasLock ? missileLockTargetId : (missileLockAcquireId ?? missileLockCandidateId);
  const target = targetId == null ? null : players[targetId];
  if (target && target.alive !== false && target.connected !== false) {
    const W = skyCanvas.width, H = skyCanvas.height;
    const rawX = (target.x - camX) * viewScale;
    const rawY = (target.y - camY) * viewScale;
    const margin = 34;
    const x = clamp(rawX, margin, W - margin);
    const y = clamp(rawY, margin, H - margin);
    const progress = hasLock ? 1 : clamp(missileLockProgress, 0, 1);
    const hint = !hasLock && missileLockAcquireId == null && !missileLockCandidateAligned;
    const label = hasLock
      ? 'LOCKED ' + Math.max(0, (missileLockExpiresAt - now) / 1000).toFixed(1) + 's'
      : hint ? 'ALIGN TO LOCK' : 'LOCKING ' + Math.round(progress * 100) + '%';
    drawLockReticle(ctx, x, y, progress, hasLock, now, label, hint);
    return;
  }

  // Normal steering crosshair remains visible when no target is being locked.
  const x = clamp(mouseX, 18, window.innerWidth - 18);
  const y = clamp(mouseY, 18, window.innerHeight - 18);
  const boosting = keysHeld.boost && myState.boost > 0;
  const pulse = 1 + Math.sin(now / 160) * .06;
  const color = boosting ? '#9cf3ed' : '#bcefff';
  const glow = boosting ? 'rgba(100,235,255,.65)' : 'rgba(150,235,255,.58)';
  const gap = 8 * pulse, arm = 15 * pulse, radius = 19;
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.shadowColor = glow; ctx.shadowBlur = 8; ctx.lineWidth = 1.35; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-gap - arm, 0); ctx.lineTo(-gap, 0); ctx.moveTo(gap, 0); ctx.lineTo(gap + arm, 0);
  ctx.moveTo(0, -gap - arm); ctx.lineTo(0, -gap); ctx.moveTo(0, gap); ctx.lineTo(0, gap + arm); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 2.2, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.font = '8px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = color; ctx.fillText('GO', 0, 34); ctx.restore();
}

function drawFlightReticles(ctx, now, camX, camY, viewScale) {
  if (!myState || !myState.alive) return;
  const cx = (myState.x - camX) * viewScale, cy = (myState.y - camY) * viewScale;
  const noseRange = 210 * viewScale;
  const noseX = cx + Math.cos(myState.angle) * noseRange;
  const noseY = cy + Math.sin(myState.angle) * noseRange;
  const shotT = BULLET_SIGHT_TIME;
  const shotX = cx + Math.cos(myState.angle) * BULLET_SPEED * shotT * viewScale;
  const shotY = cy + (Math.sin(myState.angle) * BULLET_SPEED * shotT + .5 * BULLET_GRAVITY * shotT * shotT) * viewScale;

  const mark = (x, y, color, label, size, dashed = false) => {
    if (x < -40 || y < -40 || x > skyCanvas.width + 40 || y > skyCanvas.height + 40) return;
    ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.fillStyle = color;
    ctx.shadowColor = color; ctx.shadowBlur = 8; ctx.lineWidth = 1.4;
    if (dashed) ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-size - 5, 0); ctx.lineTo(-size + 1, 0); ctx.moveTo(size - 1, 0); ctx.lineTo(size + 5, 0); ctx.moveTo(0, -size - 5); ctx.lineTo(0, -size + 1); ctx.moveTo(0, size - 1); ctx.lineTo(0, size + 5); ctx.stroke();
    ctx.setLineDash([]); ctx.shadowBlur = 0; ctx.font = '8px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText(label, 0, size + 14);
    ctx.restore();
  };

  // NOSE is where the aircraft/guns are currently pointing.
  mark(noseX, noseY, 'rgba(238,250,255,.9)', 'NOSE', 8);
  // SHOT is where a bullet fired now will be after the sighting interval,
  // including gravity drop. Align this marker with the target lead marker.
  mark(shotX, shotY, '#ffd166', 'SHOT', 10, true);
  ctx.save(); ctx.strokeStyle = 'rgba(255,209,102,.18)'; ctx.lineWidth = 1; ctx.setLineDash([2, 5]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(shotX, shotY); ctx.stroke(); ctx.restore();
}

function drawAimAssist(ctx, now, camX, camY, viewScale) {
  if (!myState || !myState.alive) return;
  let chosen = null, chosenDist = Infinity;
  Object.values(players).forEach(p => {
    if (p.id === myId || p.connected === false || p.alive === false) return;
    const d = dist(myState.x, myState.y, p.x, p.y);
    const angleToTarget = Math.atan2(p.y - myState.y, p.x - myState.x);
    if (d > 950 || Math.abs(angleDiff(myState.angle, angleToTarget)) > Math.PI * .78 || d >= chosenDist) return;
    chosen = p; chosenDist = d;
  });
  if (!chosen) return;
  const leadTime = clamp(chosenDist / BULLET_SPEED, .06, .42);
  const leadX = chosen.x + Math.cos(chosen.angle) * PLANE_SPEED * leadTime;
  const leadY = chosen.y + Math.sin(chosen.angle) * PLANE_SPEED * leadTime + .5 * BULLET_GRAVITY * leadTime * leadTime;
  const sx = (leadX - camX) * viewScale, sy = (leadY - camY) * viewScale;
  if (sx < -30 || sy < -30 || sx > skyCanvas.width + 30 || sy > skyCanvas.height + 30) return;
  const size = 7 + Math.sin(now / 140) * 1.2;
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = 'rgba(255,229,133,.9)'; ctx.lineWidth = 1.4; ctx.shadowColor = '#ffd166'; ctx.shadowBlur = 8;
  ctx.strokeRect(-size / 2, -size / 2, size, size);
  ctx.rotate(-Math.PI / 4); ctx.shadowBlur = 0; ctx.font = '8px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffe9a3'; ctx.fillText('AIM', 0, size + 12);
  ctx.restore();
}

function drawEnemyDirectionArrows(ctx, now, camX, camY, viewScale) {
  if (!myState || !myState.alive) return;
  const W = skyCanvas.width, H = skyCanvas.height;
  Object.values(players).forEach(p => {
    if (p.id === myId || p.connected === false || p.alive === false) return;
    const sx = (p.x - camX) * viewScale, sy = (p.y - camY) * viewScale;
    const hidden = isInCloudBank(p.x, p.y);
    const onScreen = sx > 28 && sy > 28 && sx < W - 28 && sy < H - 28;
    if (onScreen && !hidden) return;
    const angle = Math.atan2(sy - H / 2, sx - W / 2);
    const radius = Math.max(45, Math.min(W, H) * .5 - 42);
    const x = clamp(W / 2 + Math.cos(angle) * radius, 28, W - 28);
    const y = clamp(H / 2 + Math.sin(angle) * radius, 28, H - 28);
    const pulse = 1 + Math.sin(now / 180 + p.id) * .08;
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.scale(pulse, pulse);
    ctx.globalAlpha = hidden ? .82 : .68;
    ctx.fillStyle = hidden ? '#d4f5f0' : '#ff9d8c';
    ctx.shadowColor = hidden ? '#73e0d2' : '#ff625e'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(13, 0); ctx.lineTo(-8, -7); ctx.lineTo(-4, 0); ctx.lineTo(-8, 7); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0; ctx.font = '8px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#eafcff';
    ctx.fillText(Math.round(dist(myState.x, myState.y, p.x, p.y)), 0, 19);
    ctx.restore();
  });
}

function render(now) {
  const ctx = skyCtx;
  const W = skyCanvas.width, H = skyCanvas.height;

  // Reset the main canvas every frame. Without this, a leaked transform from
  // a plane/effect drawing pass can leave the world view visually frozen while
  // the simulation and minimap continue to update.
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, W, H);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#07131d'); grad.addColorStop(.46, '#173f4c'); grad.addColorStop(1, '#78afb1');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Atmospheric bands make the arena feel deeper before the camera moves.
  const glow = ctx.createRadialGradient(W * .7, H * .25, 0, W * .7, H * .25, H * .75);
  glow.addColorStop(0, 'rgba(115,224,210,.13)'); glow.addColorStop(1, 'rgba(115,224,210,0)');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  const shakeX = (Math.random() - .5) * screenShake;
  const shakeY = (Math.random() - .5) * screenShake;
  const viewW = W * currentCameraFovMult, viewH = H * currentCameraFovMult;
  const viewScale = 1 / currentCameraFovMult;
  const camX = myState.x - viewW / 2, camY = myState.y - viewH / 2;
  ctx.save();
  ctx.translate(W / 2 + shakeX, H / 2 + shakeY);
  ctx.scale(viewScale, viewScale);
  ctx.translate(-myState.x, -myState.y);

  clouds.forEach(c => {
    if (c.x < camX - 100 || c.x > camX + viewW + 100 || c.y < camY - 100 || c.y > camY + viewH + 100) return;
    ctx.fillStyle = `rgba(255,255,255,${c.a})`;
    ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
  });

  drawSkyBackdrop(ctx, camX, camY, viewW, viewH);

  drawGround(ctx);

  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(0, WORLD_H);
  ctx.moveTo(WORLD_W, 0); ctx.lineTo(WORLD_W, WORLD_H);
  ctx.moveTo(0, 0); ctx.lineTo(WORLD_W, 0);
  ctx.stroke();

  flares.forEach(f => drawFlare(ctx, f, now));
  bullets.forEach(b => drawBullet(ctx, b));
  missiles.forEach(m => drawMissile(ctx, m));
  bombs.forEach(b => drawBomb(ctx, b));
  shrapnels.forEach(s => drawShrapnel(ctx, s));

  Object.values(players).forEach(p => {
    if (p.id === myId) return;
    if (p.connected === false) return;
    drawPlane(ctx, p, false, now);
  });
  drawPlane(ctx, myState, true, now);

  explosions.forEach(e => drawExplosion(ctx, e, now));
  specialEffects.forEach(e => e.draw(ctx));
  // The foreground veil conceals planes and effects inside a cloud bank.
  drawCloudBanks(ctx, now, camX, camY, viewW, viewH);

  ctx.restore();

  drawMinimap(now);
  drawFlightReticles(ctx, now, camX, camY, viewScale);
  drawAimAssist(ctx, now, camX, camY, viewScale);
  drawEnemyDirectionArrows(ctx, now, camX, camY, viewScale);
  drawCrosshair(ctx, now, camX, camY, viewScale);
}

function drawMinimap(now) {
  const ctx = miniCtx, W = miniCanvas.width, H = miniCanvas.height;
  const scaleX = W / WORLD_W, scaleY = H / WORLD_H;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,30,50,0.4)';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(31,95,143,0.7)';
  ctx.fillRect(0, GROUND_Y * scaleY, W, H - GROUND_Y * scaleY);

  Object.values(players).forEach(p => {
    if (p.connected === false || p.alive === false) return;
    ctx.fillStyle = p.id === myId ? '#fff' : (p.color || colorFor(p.id));
    ctx.beginPath();
    ctx.arc(p.x * scaleX, p.y * scaleY, p.id === myId ? 3 : 2.2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function interpolateRemotePlayers(dtSec) {
  const t = Math.min(1, REMOTE_SMOOTH * dtSec);
  Object.values(players).forEach(p => {
    if (p.id === myId || p.isBot || p.connected === false || p.tx === undefined) return;
    p.x += (p.tx - p.x) * t;
    p.y += (p.ty - p.y) * t;
    p.angle += angleDiff(p.angle, p.tangle) * t;
  });
}

// ================= Game loop =================
function beginLocalGame() {
  // A duplicated start packet must not create duplicate keyboard listeners
  // or a second animation loop, both of which can make the game appear frozen.
  if (myState) return;
  menu.style.display = 'none'; gameArea.style.display = 'block';
  myState = createLocalState();
  players[myId] = myState;
  wireKeyboard();
  wireMouse();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(loop);
}

let lastTime = 0, lastBroadcast = 0, lastRuntimeErrorAt = 0;

// Keep one bad bot/effect frame from permanently stopping requestAnimationFrame.
// The original error is still logged for diagnosis, but the sortie continues.
function loop(ts) {
  try {
    loopFrame(ts);
  } catch (error) {
    if (ts - lastRuntimeErrorAt > 1000) {
      lastRuntimeErrorAt = ts;
      console.error('Wings Arena frame recovered:', error);
    }
    requestAnimationFrame(loop);
  }
}

function loopFrame(ts) {
  const dt = Math.min(lastTime ? ts - lastTime : 16, 60);
  lastTime = ts;
  const dtSec = dt / 1000;
  screenShake = Math.max(0, screenShake - dtSec * 34);
  recoilKick = Math.max(0, recoilKick - dtSec * 28);
  if (isHost || botMode) updateLocalPlane(dtSec, keysHeld);
  else sendClientInput(ts);
  updateNetworkPlayers(dtSec, ts);
  updateBots(dtSec, ts);
  const fovTarget = myState && myState.speed >= HIGH_SPEED_THRESHOLD ? HIGH_SPEED_FOV_MULT : CAMERA_FOV_MULT;
  currentCameraFovMult += (fovTarget - currentCameraFovMult) * clamp(dtSec * HIGH_SPEED_FOV_SMOOTHING, 0, 1);
  updateEngineAudio();
  // Update smoothed remote positions before lock and homing calculations so
  // targeting uses the same positions the player sees on screen.
  interpolateRemotePlayers(dtSec);
  updateMissileLock(dtSec);
  updateBullets(dtSec);
  updateMissiles(dtSec);
  updateBombs(dtSec);
  updateShrapnels(dtSec);
  updateFlares(dtSec);
  updateHostCombat();
  updateBotHits();
  updateSpecialEffects(dtSec);
  pruneFlares(ts);
  pruneExplosions(ts);
  if (ts - lastBroadcast > 66) {
    lastBroadcast = ts;
    if (isHost) broadcastAuthoritativeSnapshot();
  }

  hpFillEl.style.width = clamp((myState.health / MAX_HEALTH) * 100, 0, 100) + '%';
  boostFillEl.style.width = clamp((myState.boost / BOOST_MAX) * 100, 0, 100) + '%';
  heatFillEl.style.width = clamp((myState.heat / HEAT_MAX) * 100, 0, 100) + '%';
  heatValueEl.textContent = Math.round(myState.heat) + '/' + HEAT_MAX;
  heatFillEl.classList.toggle('overheat', myState.overheated);
  scoreValEl.textContent = myState.score || 0;
  killsValEl.textContent = myState.kills || 0;
  missileCountEl.textContent = 'MISSILES  ' + myState.missiles + '/' + MISSILE_MAX;
  bombCountEl.textContent = 'BOMBS  ' + myState.bombs + '/' + BOMB_MAX;
  flareCountEl.textContent = 'FLARES  ' + myState.flares + '/' + FLARE_MAX;
  const speedRatio = clamp((myState.speed - MIN_FLIGHT_SPEED) / (HIGH_SPEED_MAX_SPEED - MIN_FLIGHT_SPEED), 0, 1);
  speedValueEl.textContent = Math.round(myState.speed);
  speedFillEl.style.width = (speedRatio * 100) + '%';
  speedNeedleEl.style.transform = `rotate(${-112 + speedRatio * 224}deg)`;

  const incomingLock = !isInCloudBank(myState.x, myState.y) && missiles.some(m => m.targetId === myId && m.ownerId !== myId && performance.now() >= (m.lockReadyAt || m.born));
  if (incomingLock && !lastIncomingLock) { unlockAudio(); playLockSound(); }
  lastIncomingLock = incomingLock;
  lockWarningEl.style.display = incomingLock ? 'block' : 'none';
  gameArea.classList.toggle('missile-lock', incomingLock);

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
  botsBtn = document.getElementById('botsBtn');
  botCountInputEl = document.getElementById('botCountInput');
  botCountValueEl = document.getElementById('botCountValue');
  waitHint = document.getElementById('waitHint');

  skyCanvas = document.getElementById('sky');
  skyCtx = skyCanvas.getContext('2d');
  miniCanvas = document.getElementById('minimap');
  miniCtx = miniCanvas.getContext('2d');

  hpFillEl = document.getElementById('hpFill');
  boostFillEl = document.getElementById('boostFill');
  heatFillEl = document.getElementById('heatFill');
  heatValueEl = document.getElementById('heatValue');
  speedValueEl = document.getElementById('speedValue');
  speedNeedleEl = document.getElementById('speedNeedle');
  speedFillEl = document.getElementById('speedFill');
  scoreValEl = document.getElementById('scoreVal');
  killsValEl = document.getElementById('killsVal');
  missileCountEl = document.getElementById('missileCount');
  bombCountEl = document.getElementById('bombCount');
  flareCountEl = document.getElementById('flareCount');
  lockWarningEl = document.getElementById('lockWarning');
  networkStatusEl = document.getElementById('networkStatus');
  lbListEl = document.getElementById('lbList');
  killFeedEl = document.getElementById('killFeed');
  respawnOverlay = document.getElementById('respawnOverlay');
  respawnMsgEl = document.getElementById('respawnMsg');
  respawnTimerEl = document.getElementById('respawnTimer');

  document.getElementById('hostBtn').onclick = () => { captureName(); startHost(); };
  document.getElementById('joinBtn').onclick = () => { captureName(); startJoin(); };
  botsBtn.onclick = () => { captureName(); startBotMode(); };
  botCountInputEl.addEventListener('input', () => {
    botCountValueEl.textContent = botCountInputEl.value;
  });
});

function captureName() {
  const v = document.getElementById('nameInput').value.trim();
  if (v) myName = v.slice(0, 14);
}
