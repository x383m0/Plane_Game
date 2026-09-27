// ================= Constants =================
// v1.27 world scale: 20% larger than the previous 6000 x 3680 arena.
// v1.52.0 adds world-anchored Red Canyon and Storm Front arena art.
const WORLD_W = 7200, WORLD_H = 4416;
// The previous camera already showed 15% more world. Apply the requested
// additional 15% multiplicatively: 1.15 * 1.15 = 1.3225.
const CAMERA_FOV_MULT = 1.3225;
const GROUND_Y = WORLD_H - 150;   // sea surface / crash boundary
// The visible world continues beyond the playable rectangle so the city and
// ocean never terminate on a hard vertical seam. Aircraft may enter this fog
// buffer briefly before the boundary timer disables them.
const BORDER_FOG_DEPTH = 340;
const BORDER_WARNING_MS = 5000;
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
// A level, settled aircraft should be able to build speed without needing a
// dive or boost. This is scaled by turn rate so hard manoeuvres still trade
// speed for agility, while a straight run can naturally reach sonic speed.
const STRAIGHT_FLIGHT_TURN_LIMIT = 0.55;
const STRAIGHT_FLIGHT_PROPULSION = 285;
const HIGH_SPEED_FOV_MULT = 1.518;
const HIGH_SPEED_FOV_SMOOTHING = 5.5;
const SONIC_BOOM_COOLDOWN_MS = 1800;
const TURN_ACCEL = 9.5, TURN_DAMPING = 3.8;
const BARREL_ROLL_DURATION = 720, BARREL_ROLL_SPEED = Math.PI * 2.8, BARREL_ROLL_COOLDOWN = 900;
const STALL_SPIN_SPEED = 5.2, FALL_GRAVITY = 420;
const STALL_DELAY = 320; // brief warning window before a sustained stall becomes uncontrolled

const BULLET_SPEED = 1850, BULLET_GRAVITY = 260, BULLET_LIFE = Infinity, FIRE_COOLDOWN = 32, BULLET_DAMAGE = 4.5;
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
const BOMB_SPEED = 240, BOMB_GRAVITY = 420, BOMB_LIFE = 2200, BOMB_DAMAGE = 82;
const BOMB_MAX = 2, BOMB_REGEN_MS = 8500, BOMB_COOLDOWN = 850, BOMB_HIT_RADIUS = 42;
const BOMB_PROXIMITY_RADIUS = 132, BOMB_BLAST_RADIUS = 156, BOMB_BLAST_DAMAGE = 92;
const SHRAPNEL_COUNT = 16, SHRAPNEL_SPEED = 500;
const SHRAPNEL_GRAVITY = 120, SHRAPNEL_LIFE = 800, SHRAPNEL_DAMAGE = 18, SHRAPNEL_HIT_RADIUS = 22;
const WATER_WEAPON_DETONATION_DELAY = 1.1;
const MAX_ACTIVE_WATER_WEAPON_EFFECTS = 24;

// Flares: a limited-charge countermeasure that redirects a locked missile
// within FLARE_BREAK_RADIUS onto the actual moving flare.
const FLARE_MAX = 3, FLARE_REGEN_MS = 7000, FLARE_MIN_INTERVAL = 400;
const FLARE_BREAK_RADIUS = 320, FLARE_ACTIVE_MS = 1400, FLARE_SALVO_COUNT = 6;
const FLARE_SPAWN_INTERVAL_MS = 200; // delay between each two-sided flare wave
const CRITICAL_HEALTH_FRACTION = 0.30; // start the attached fire trail below 30% HP
// Near-water wake tuning. The wake is visual/audio only; it never changes
// flight physics or the water crash boundary.
const WATER_WAKE_MIN_ALTITUDE = 18;
const WATER_WAKE_MAX_ALTITUDE = 220;
const WATER_WAKE_MIN_SPEED = 360;
const WATER_WAKE_MAX_TRAIL = 280;
// Sonic-boom water-wave tuning. The wave is only emitted when the boom is
// close enough to the flat ocean to disturb it; it travels opposite the
// aircraft's horizontal flight direction, like the supplied reference FX.
const SONIC_WAVE_MIN_ALTITUDE = 18;
const SONIC_WAVE_MAX_ALTITUDE = 280;
const SONIC_WAVE_MIN_AMPLITUDE = 18;
const SONIC_WAVE_MAX_AMPLITUDE = 60;

const REMOTE_SMOOTH = 12;         // how fast other players' rendered planes catch up to network updates
const NETWORK_INPUT_TIMEOUT_MS = 900; // tolerate short WebRTC jitter without dropping steering
const NETWORK_SNAPSHOT_BUFFER_LIMIT = 48000;
const NETWORK_PROJECTILE_SNAPSHOT_MS = 250; // projectiles extrapolate between authoritative updates
const NETWORK_BULLETS_PER_SNAPSHOT = 48; // nearby bullet corrections; spawns/impacts use reliable events
const SOUND_MAX_DISTANCE = 1400;  // world units; sounds beyond this are silent
const CLOUD_COUNT = 45;
const CLOUD_MIN_RADIUS = 22, CLOUD_MAX_RADIUS = 148;
const CLOUD_BANK_COUNT = 4;
const MAP_THEMES = {
  city: { label: 'NEON CITY', cloudBanks: 4 },
  canyon: { label: 'RED CANYON', cloudBanks: 3 },
  storm: { label: 'STORM FRONT', cloudBanks: 5 },
  islands: { label: 'ISLAND CHAIN', cloudBanks: 3 }
};
// Fixed world-space concealment zones keep the map's routes and missile
// line-of-sight rules identical for every player in a match.
const MAP_CLOUD_BANK_LAYOUTS = {
  city: [
    [.16, .20, 300, 180], [.38, .31, 350, 220],
    [.62, .18, 280, 170], [.82, .36, 330, 210]
  ],
  canyon: [
    [.19, .23, 320, 185], [.51, .48, 290, 170], [.82, .58, 330, 195]
  ],
  storm: [
    [.12, .28, 350, 220], [.32, .52, 340, 220], [.53, .35, 370, 230],
    [.73, .59, 330, 210], [.91, .43, 350, 220]
  ],
  islands: [
    [.22, .26, 300, 180], [.54, .19, 320, 190], [.82, .34, 300, 180]
  ]
};
const MAP_PALETTES = {
  city: ['#07131d', '#173f4c', '#78afb1'],
  canyon: ['#1a1720', '#70464a', '#c28769'],
  storm: ['#050b18', '#152a43', '#466f86'],
  islands: ['#082031', '#1b6173', '#80c4bd']
};

// Visual-only effects: short-lived radial bursts drawn at an (x,y) for a
// fixed lifetime, used for gun/missile impacts, launches, and kills.
const FX = {
  spark:  { life: 220, r: 16, colors: ['rgba(255,255,255,0.98)',  'rgba(255,150,60,0.9)', 'rgba(255,55,25,0)'] },
  blast:  { life: 620, r: 88, colors: ['rgba(255,255,255,1)', 'rgba(255,150,35,0.95)', 'rgba(255,35,10,0)'] },
  crash:  { life: 850, r: 120, colors: ['rgba(255,255,255,1)', 'rgba(255,105,25,0.95)', 'rgba(40,10,5,0)'] },
  muzzle: { life: 115, r: 18, colors: ['rgba(255,255,230,1)', 'rgba(255,190,75,0.82)', 'rgba(255,70,20,0)'] },
  launch: { life: 420, r: 34, colors: ['rgba(255,255,255,0.95)', 'rgba(110,220,255,0.7)', 'rgba(25,95,150,0)'] },
  shock:  { life: 360, r: 72, colors: ['rgba(255,225,140,0.9)', 'rgba(255,90,30,0.5)', 'rgba(255,30,10,0)'] },
  bomb:   { life: 620, r: 148, colors: ['rgba(255,255,225,1)', 'rgba(255,145,35,0.95)', 'rgba(105,25,10,0)'] },
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
let realtimeConnections = {};     // host: fast channel for replaceable input and state
let realtimeRetryTimer = null, nextStateSeq = 0;
const lastStateSeqByPlayer = new Map();
let lastRealtimeRxAt = 0, lastRealtimeOpenAt = 0;
let lastProjectileSnapshotAt = 0;
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
let keyboardWired = false, mouseWired = false, resizeWired = false;
let lastClientInputSend = 0, clientInputSeq = 0, clientActionSeq = 0;
let clientInputTimer = null, lastProjectileBroadcast = 0;
let lastHostInputAck = 0, lastHostActionAck = 0;
let lastInputSendErrorAt = 0;

let myState = null;               // local authoritative plane state
let killFeedEl, lbListEl, scoreValEl, killsValEl, hpFillEl, boostFillEl, heatFillEl, heatValueEl;
let missileCountEl, bombCountEl, flareCountEl, lockWarningEl, boundaryWarningEl, boundaryTimerEl, speedValueEl, speedNeedleEl, speedFillEl;
let respawnOverlay, respawnMsgEl, respawnTimerEl;
let statusEl, lobbyList, startBtn, botsBtn, botCountInputEl, botCountValueEl, mapSelectEl, networkStatusEl, chooseRole, lobby, menu, gameArea, waitHint;
let skyCanvas, skyCtx, miniCanvas, miniCtx;
let audioCtx = null, masterGain = null;
let audioBank = {}, audioAssetsStarted = false;
let engineCruiseAudio = null, engineBoostAudio = null;
let waterWakeChurnAudio = null, waterWakeSprayAudio = null;
let screenShake = 0, recoilKick = 0, lastIncomingLock = false;
let currentCameraFovMult = CAMERA_FOV_MULT;
let selectedMapId = 'city';
let activeMapId = 'city';
let localFlareScheduleGeneration = 0;
const seenImpactKeys = new Set();
let lastNetworkActivityAt = 0;
const DEBUG_LOG_LIMIT = 300;
let debugLogs = [];
let debugPanelEl, debugSummaryEl, debugLogEl, debugActionStatusEl, debugToggleEl;
let debugPanelOpen = false;
let lastDebugRenderAt = 0;
let lastDebugNoConnectionLogAt = 0;

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
  waterWakeChurn: 'freesound_community-waterfall-2-27954.mp3',
  waterWakeSpray: 'freesound_community-little-waterfall-26768.mp3',
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
function samePlayerId(a, b) {
  return a === b || (a != null && b != null && String(a) === String(b));
}
// Shortest signed angular distance from `from` to `to`, in (-PI, PI].
function angleDiff(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
function straightFlightPropulsion(turnVelocity, airbraking, angle = 0) {
  if (airbraking || !Number.isFinite(turnVelocity) || !Number.isFinite(angle)) return 0;
  const stability = 1 - clamp(Math.abs(turnVelocity) / STRAIGHT_FLIGHT_TURN_LIMIT, 0, 1);
  // Propulsion is for a straight, level run. Without this levelness factor,
  // pointing straight up still counts as "stable" and receives the full
  // forward assist, which feels like an unexplained vertical speed boost.
  const levelness = clamp(Math.abs(Math.cos(angle)), 0, 1);
  return STRAIGHT_FLIGHT_PROPULSION * stability * levelness;
}
function highSpeedPropulsion(angle, speed) {
  if (!Number.isFinite(angle) || !Number.isFinite(speed) || speed < HIGH_SPEED_THRESHOLD) return 0;
  return HIGH_SPEED_ACCELERATION * clamp(Math.abs(Math.cos(angle)), 0, 1);
}
function waterSurfaceY(x) {
  // Keep the ocean surface level. It is also the crash boundary and the
  // reference plane for the high-speed wake effect.
  return GROUND_Y;
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
function ensureWaterWakeAudio() {
  if (!audioAssetsStarted || waterWakeChurnAudio || !audioBank.waterWakeChurn || !audioBank.waterWakeSpray) return;
  waterWakeChurnAudio = audioBank.waterWakeChurn.cloneNode();
  waterWakeSprayAudio = audioBank.waterWakeSpray.cloneNode();
  [waterWakeChurnAudio, waterWakeSprayAudio].forEach(a => {
    a.loop = true;
    a.volume = 0;
    a.preload = 'auto';
    // Let the speed-linked playback rate change the character of the water
    // without preserving the original pitch.
    a.preservesPitch = false;
    a.mozPreservesPitch = false;
    a.webkitPreservesPitch = false;
  });
}
function updateWaterWakeAudio(intensity, speedFactor, dtSec = 1 / 60) {
  if (!audioAssetsStarted) return;
  ensureWaterWakeAudio();
  if (!waterWakeChurnAudio || !waterWakeSprayAudio) return;
  const c = clamp(Number.isFinite(intensity) ? intensity : 0, 0, 1);
  const s = clamp(Number.isFinite(speedFactor) ? speedFactor : 0, 0, 1);
  const near = c > 0.008;
  const churnTarget = near ? c * (.18 + s * .12) : 0;
  const sprayTarget = near ? c * (.10 + s * .14) : 0;
  const blend = clamp(dtSec * 9, 0, 1);
  waterWakeChurnAudio.volume += (churnTarget - waterWakeChurnAudio.volume) * blend;
  waterWakeSprayAudio.volume += (sprayTarget - waterWakeSprayAudio.volume) * blend;
  waterWakeChurnAudio.playbackRate = .72 + s * .58;
  waterWakeSprayAudio.playbackRate = 1.0 + s * .95;
  if (near) {
    if (waterWakeChurnAudio.paused) waterWakeChurnAudio.play().catch(() => {});
    if (waterWakeSprayAudio.paused) waterWakeSprayAudio.play().catch(() => {});
  } else if (waterWakeChurnAudio.volume < .002 && waterWakeSprayAudio.volume < .002) {
    waterWakeChurnAudio.pause(); waterWakeChurnAudio.currentTime = 0;
    waterWakeSprayAudio.pause(); waterWakeSprayAudio.currentTime = 0;
  }
}
function stopWaterWakeAudio() {
  [waterWakeChurnAudio, waterWakeSprayAudio].forEach(a => {
    if (!a) return;
    a.pause(); a.currentTime = 0; a.volume = 0;
  });
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

// Adapted from the supplied sonic-boom-water-wave-effect.html. Unlike the
// standalone screen demo, this version lives in world coordinates, follows
// the game's flat water surface, and scales with the boom's altitude and
// speed. The wave is kept separate from flight physics: it is visual only.
class SonicWaterWaveEffect {
  constructor(x, baseY, direction, amplitude, speedFactor) {
    this.center = x;
    this.baseY = baseY;
    this.direction = direction >= 0 ? 1 : -1;
    this.amplitude = amplitude;
    this.speed = 280 + speedFactor * 160;
    this.age = 0;
    this.maxLife = 2.8;
    this.dead = false;
    this.spray = [];
    this.mist = [];
    this.foam = [];
    for (let i = 0; i < 24; i++) {
      const a = -Math.PI / 2 + rand(-.82, .82);
      const launchSpeed = rand(55, 210) * (.72 + speedFactor * .28);
      this.spray.push({
        x, y: baseY - rand(0, 8),
        vx: Math.cos(a) * launchSpeed * .48 + this.direction * rand(25, 100),
        vy: Math.sin(a) * launchSpeed,
        radius: rand(.9, 2.8), age: 0, maxAge: rand(.5, .95)
      });
    }
    for (let i = 0; i < 7; i++) {
      this.foam.push({ along: (i / 6 - .45) * 1.25, length: rand(5, 15), rise: rand(1, 3) });
      this.mist.push({
        x: x + rand(-18, 18), y: baseY - rand(0, 10),
        vx: this.direction * rand(5, 32) + rand(-12, 12),
        vy: -rand(8, 34), radius: rand(6, 14), age: 0, maxAge: rand(.4, .7)
      });
    }
  }
  update(dtSec) {
    this.age += dtSec;
    this.center += this.direction * this.speed * dtSec;
    this.baseY = waterSurfaceY(this.center);
    this.spray.forEach(p => {
      p.age += dtSec; p.x += p.vx * dtSec; p.y += p.vy * dtSec;
      p.vy += 410 * dtSec; p.vx *= Math.exp(-dtSec * .36);
    });
    this.spray = this.spray.filter(p => p.age < p.maxAge && p.y < WORLD_H + 30);
    this.mist.forEach(p => {
      p.age += dtSec; p.x += p.vx * dtSec; p.y += p.vy * dtSec;
      p.radius += dtSec * 22; p.vx *= Math.exp(-dtSec * .8);
    });
    this.mist = this.mist.filter(p => p.age < p.maxAge);
    if (this.age > this.maxLife && !this.spray.length && !this.mist.length) this.dead = true;
  }
  heightAt(x) {
    const ahead = (x - this.center) * this.direction;
    const front = 32 + this.age * 12;
    const back = 66 + this.age * 14;
    const sigma = ahead >= 0 ? front : back;
    const crest = this.amplitude * Math.exp(-.5 * (ahead / sigma) ** 2);
    const trailingSwell = this.amplitude * .24 * Math.exp(-.5 * ((ahead + back * 1.45) / (back * .68)) ** 2);
    const pulledTrough = -this.amplitude * .13 * Math.exp(-.5 * ((ahead - front * 1.35) / (front * .8)) ** 2);
    const fade = 1 - .3 * clamp((this.age - 1.2) / 1.6, 0, 1);
    return (crest + trailingSwell + pulledTrough) * fade;
  }
  surfaceY(x) { return this.baseY - this.heightAt(x); }
  draw(ctx) {
    const front = 32 + this.age * 12;
    const back = 66 + this.age * 14;
    const fade = 1 - .36 * clamp(this.age / this.maxLife, 0, 1);
    ctx.save();

    // A translucent raised-water body makes the wave readable against the
    // existing ocean without replacing the game's flat water fill.
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const ahead = -back * 1.3 + (i / 40) * (back * 1.3 + front * 1.15);
      const x = this.center + this.direction * ahead;
      const y = this.surfaceY(x);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.lineTo(this.center + this.direction * front * 1.15, this.baseY + 10);
    ctx.lineTo(this.center - this.direction * back * 1.3, this.baseY + 10);
    ctx.closePath();
    const body = ctx.createLinearGradient(0, this.baseY - this.amplitude, 0, this.baseY + 10);
    body.addColorStop(0, `rgba(206,248,255,${.22 * fade})`);
    body.addColorStop(.45, `rgba(92,188,205,${.14 * fade})`);
    body.addColorStop(1, 'rgba(44,126,151,0)');
    ctx.fillStyle = body; ctx.fill();

    ctx.globalAlpha = fade * .62;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const ahead = -back * 1.3 + (i / 40) * (back * 1.3 + front * 1.15);
      const x = this.center + this.direction * ahead;
      const y = this.surfaceY(x) - 1.2;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    const foam = ctx.createLinearGradient(
      this.center - this.direction * back, this.baseY,
      this.center + this.direction * front, this.baseY
    );
    foam.addColorStop(0, 'rgba(205,246,255,0)');
    foam.addColorStop(.42, 'rgba(218,250,255,.86)');
    foam.addColorStop(1, 'rgba(172,232,245,.12)');
    ctx.strokeStyle = foam; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.globalAlpha = fade * .42;
    ctx.strokeStyle = '#d8f5fa'; ctx.lineWidth = .9;
    this.foam.forEach(mark => {
      const x = this.center - this.direction * mark.along * back;
      const y = this.surfaceY(x) - 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - this.direction * mark.length, y - mark.rise);
      ctx.stroke();
    });

    this.mist.forEach(p => {
      const t = p.age / p.maxAge;
      ctx.save(); ctx.globalAlpha = (1 - t) * .34;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      g.addColorStop(0, 'rgba(230,251,255,.88)');
      g.addColorStop(.55, 'rgba(179,232,242,.44)');
      g.addColorStop(1, 'rgba(152,220,235,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
    this.spray.forEach(p => {
      const t = p.age / p.maxAge;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx));
      ctx.globalAlpha = 1 - t; ctx.fillStyle = t < .3 ? '#ecfcff' : '#b9eaf3';
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(.7, p.radius * (1 - t * .4)) * 1.55, Math.max(.45, p.radius * .62), 0, 0, Math.PI * 2);
      ctx.fill(); ctx.restore();
    });
    ctx.restore();
  }
}

// Adapted from the supplied HIGH SPEED WAKE demo. This is deliberately a
// world-space effect: the wake sits on the water surface while the aircraft
// remains above it, so the wake can lag behind a fast plane without affecting
// the plane's position or collision physics.
class HighSpeedWakeEffect {
  constructor() {
    this.trail = [];
    this.bubbles = [];
    this.spray = [];
    this.foam = [];
    this.emitAccumulator = 0;
  }
  reset() {
    this.trail.length = 0;
    this.bubbles.length = 0;
    this.spray.length = 0;
    this.foam.length = 0;
    this.emitAccumulator = 0;
  }
  emit(x, y, heading, speedFactor, intensity, dtSec) {
    const s = clamp(speedFactor, 0, 1);
    const c = clamp(intensity, 0, 1);
    if (c < .02 || s < .03) return;
    this.emitAccumulator += dtSec * (18 + s * 32);
    while (this.emitAccumulator >= 1) {
      this.emitAccumulator -= 1;
      const delay = s * .14;
      const maxAge = 1.15 + s * 2.55;
      this.trail.push({ x, y, heading, speed: s, intensity: c, age: 0, delay, maxAge });

      const bubbleCount = 1 + Math.floor(s * 5);
      for (let i = 0; i < bubbleCount; i++) {
        const back = heading + Math.PI;
        const spread = back + (Math.random() - .5) * (1.1 + s * .8);
        const distance = Math.random() * (8 + s * 24);
        this.bubbles.push({
          x: x + Math.cos(spread) * distance,
          y: y + Math.sin(spread) * distance * .28,
          radius: 1 + Math.random() * (1.4 + s * 2.8),
          age: 0,
          maxAge: .5 + Math.random() * .65 + s * .55,
          intensity: c
        });
      }

      if (Math.random() < .3 + s * .55) {
        const back = heading + Math.PI;
        const sprayAngle = back + (Math.random() - .5) * 1.2;
        const spraySpeed = 48 + s * 190;
        this.spray.push({
          x, y,
          vx: Math.cos(sprayAngle) * spraySpeed,
          vy: -Math.abs(Math.sin(sprayAngle)) * spraySpeed * .45 - s * 92,
          radius: 1.1 + Math.random() * (1.6 + s * 2.3),
          age: 0,
          maxAge: .28 + Math.random() * .36,
          intensity: c
        });
      }

      if (s > .32 && Math.random() < .48) {
        this.foam.push({ x, y, heading, speed: s, age: 0, maxAge: .24 + Math.random() * .2, intensity: c });
      }
    }
  }
  update(dtSec) {
    this.trail.forEach(p => { p.age += dtSec; });
    this.trail = this.trail.filter(p => p.age < p.delay + p.maxAge);
    if (this.trail.length > WATER_WAKE_MAX_TRAIL) this.trail.splice(0, this.trail.length - WATER_WAKE_MAX_TRAIL);
    this.bubbles.forEach(p => { p.age += dtSec; });
    this.bubbles = this.bubbles.filter(p => p.age < p.maxAge);
    if (this.bubbles.length > 620) this.bubbles.splice(0, this.bubbles.length - 620);
    this.spray.forEach(p => { p.age += dtSec; p.x += p.vx * dtSec; p.y += p.vy * dtSec; p.vy += 260 * dtSec; });
    this.spray = this.spray.filter(p => p.age < p.maxAge);
    if (this.spray.length > 160) this.spray.splice(0, this.spray.length - 160);
    this.foam.forEach(p => { p.age += dtSec; });
    this.foam = this.foam.filter(p => p.age < p.maxAge);
  }
  edgeWidth(p) {
    const t = clamp((p.age - p.delay) / p.maxAge, 0, 1);
    const base = (3.5 + p.speed * 15) * (.5 + t * 2.25);
    const wave = Math.sin(p.age * 9 + p.x * .04) * (1.2 + t * 2.8) * p.speed;
    return Math.max(1.3, base + wave) * (.55 + p.intensity * .45);
  }
  draw(ctx) {
    ctx.save();
    const visible = this.trail.filter(p => p.age >= p.delay);
    if (visible.length >= 2) {
      ctx.beginPath();
      visible.forEach((p, i) => {
        const w = this.edgeWidth(p), perp = p.heading + Math.PI / 2;
        const x = p.x + Math.cos(perp) * -w;
        const y = p.y + Math.sin(perp) * -w * .34;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      for (let i = visible.length - 1; i >= 0; i--) {
        const p = visible[i], w = this.edgeWidth(p), perp = p.heading + Math.PI / 2;
        ctx.lineTo(p.x + Math.cos(perp) * w, p.y + Math.sin(perp) * w * .34);
      }
      ctx.closePath();
      ctx.globalAlpha = .09 + visible[visible.length - 1].intensity * .13;
      ctx.fillStyle = '#eefbff';
      ctx.fill();

      [-1, 1].forEach(side => {
        ctx.beginPath();
        visible.forEach((p, i) => {
          const w = this.edgeWidth(p), perp = p.heading + Math.PI / 2;
          const x = p.x + Math.cos(perp) * w * side;
          const y = p.y + Math.sin(perp) * w * side * .34;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        const newest = visible[visible.length - 1];
        const newestT = clamp((newest.age - newest.delay) / newest.maxAge, 0, 1);
        ctx.globalAlpha = (.24 + newest.intensity * .32) * (1 - newestT * .35);
        ctx.strokeStyle = '#e7fbff';
        ctx.lineWidth = 1.2 + newest.speed * 1.2;
        ctx.stroke();
      });
    }

    this.bubbles.forEach(p => {
      const t = p.age / p.maxAge;
      ctx.globalAlpha = (1 - t) * (.22 + p.intensity * .4);
      ctx.fillStyle = '#eefbff';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * (1 - t * .32), 0, Math.PI * 2); ctx.fill();
    });
    this.foam.forEach(p => {
      const t = p.age / p.maxAge;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.heading);
      ctx.globalAlpha = (1 - t) * (.3 + p.intensity * .4);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.2 + p.speed;
      ctx.beginPath(); ctx.arc(0, 0, 7 + p.speed * 12 + t * 14, .15 * Math.PI, .85 * Math.PI); ctx.stroke();
      ctx.restore();
    });
    this.spray.forEach(p => {
      const t = p.age / p.maxAge;
      ctx.globalAlpha = (1 - t) * (.35 + p.intensity * .65);
      ctx.fillStyle = '#bfeaff';
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.4, p.radius * (1 - t * .4)), 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  }
}

const highSpeedWake = new HighSpeedWakeEffect();

function updateHighSpeedWake(dtSec) {
  highSpeedWake.update(dtSec);
  const p = myState;
  if (!p || !p.alive || p.falling || !Number.isFinite(p.x) || !Number.isFinite(p.y)) {
    updateWaterWakeAudio(0, 0, dtSec);
    return;
  }

  const surfaceY = waterSurfaceY(p.x);
  const altitude = surfaceY - p.y;
  const nearWater = clamp(
    (WATER_WAKE_MAX_ALTITUDE - altitude) /
      (WATER_WAKE_MAX_ALTITUDE - WATER_WAKE_MIN_ALTITUDE),
    0, 1
  );
  const speedFactor = clamp(
    (Math.max(0, p.speed) - WATER_WAKE_MIN_SPEED) /
      (HIGH_SPEED_MAX_SPEED - WATER_WAKE_MIN_SPEED),
    0, 1
  );
  const intensity = altitude >= WATER_WAKE_MIN_ALTITUDE && altitude <= WATER_WAKE_MAX_ALTITUDE
    ? nearWater * speedFactor
    : 0;

  if (intensity > .01) {
    // At higher speed the aircraft gets farther ahead of the newest wake
    // sample, making the effect read as a delayed high-speed water trail.
    const lag = 20 + speedFactor * 86;
    const wakeX = p.x - Math.cos(p.angle) * lag;
    highSpeedWake.emit(wakeX, surfaceY, p.angle, speedFactor, intensity, dtSec);
  }
  updateWaterWakeAudio(intensity, speedFactor, dtSec);
}

function spawnSonicWaterWave(x, y, angle, speed = HIGH_SPEED_THRESHOLD) {
  const altitude = waterSurfaceY(x) - y;
  if (!Number.isFinite(altitude) || altitude < SONIC_WAVE_MIN_ALTITUDE || altitude > SONIC_WAVE_MAX_ALTITUDE) return;
  const nearWater = clamp(
    (SONIC_WAVE_MAX_ALTITUDE - altitude) /
      (SONIC_WAVE_MAX_ALTITUDE - SONIC_WAVE_MIN_ALTITUDE),
    0, 1
  );
  const speedFactor = clamp(
    (speed - HIGH_SPEED_THRESHOLD) /
      (HIGH_SPEED_MAX_SPEED - HIGH_SPEED_THRESHOLD),
    0, 1
  );
  const amplitude = SONIC_WAVE_MIN_AMPLITUDE + nearWater *
    (SONIC_WAVE_MAX_AMPLITUDE - SONIC_WAVE_MIN_AMPLITUDE) * (.72 + speedFactor * .28);
  // The wave runs along the water surface, so use the sign of the plane's
  // horizontal travel and send the surge in the opposite direction.
  const waveDirection = Math.cos(angle) >= 0 ? -1 : 1;
  specialEffects.push(new SonicWaterWaveEffect(
    x, waterSurfaceY(x), waveDirection, amplitude, speedFactor
  ));
}

function triggerSonicBoom(x, y, angle, speed = HIGH_SPEED_THRESHOLD) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  specialEffects.push(new SonicBoomEffect(x, y, angle));
  spawnSonicWaterWave(x, y, Number.isFinite(angle) ? angle : 0, Number.isFinite(speed) ? speed : HIGH_SPEED_THRESHOLD);
  screenShake = Math.max(screenShake, 12);
  playSonicBoomSound(x, y);
}

function spawnExplosion(x, y, kind, angle = -Math.PI / 2) {
  const validKind = ['blast', 'crash', 'spark', 'water', 'planeWater', 'muzzle', 'launch', 'shock', 'bomb'].includes(kind);
  if (!validKind || !Number.isFinite(x) || !Number.isFinite(y)) return;
  // Water rings belong to the visible waterline even if an old/late network
  // impact sends a point slightly above or below the surface.
  if (kind === 'water') y = waterSurfaceY(x);
  angle = Number.isFinite(angle) ? angle : -Math.PI / 2;
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
    const e = explosions[i];
    const life = FX[e?.kind]?.life;
    if (!e || !Number.isFinite(e.x) || !Number.isFinite(e.y) || !Number.isFinite(e.born) || !life || now - e.born > life) {
      explosions.splice(i, 1);
    }
  }
  for (let i = specialEffects.length - 1; i >= 0; i--) {
    const e = specialEffects[i];
    if (!e || e.dead || typeof e.draw !== 'function') specialEffects.splice(i, 1);
  }
}
function updateSpecialEffects(dtSec) {
  specialEffects.forEach(e => {
    if (e && typeof e.update === 'function') e.update(dtSec);
    else if (e) e.dead = true;
  });
}
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

// ================= In-game diagnostics =================
// The diagnostics console is intentionally local-only. It never sends log
// contents over PeerJS; it records enough connection/input state to explain
// issues such as a joiner not sending input or the host rejecting snapshots.
function debugDetails(details) {
  if (details == null) return '';
  if (typeof details === 'string') return ' // ' + details;
  try { return ' // ' + JSON.stringify(details); } catch (_) { return ' // [details unavailable]'; }
}

function debugLog(category, message, details = null) {
  const stamp = new Date().toISOString().slice(11, 23);
  const line = `[${stamp}] ${String(category).toUpperCase()} ${message}${debugDetails(details)}`;
  debugLogs.push(line);
  if (debugLogs.length > DEBUG_LOG_LIMIT) debugLogs.splice(0, debugLogs.length - DEBUG_LOG_LIMIT);
  console.info('[Wings Arena]', line);
  if (debugPanelOpen) renderDebugPanel();
}

function debugConnectionState() {
  if (isHost) {
    const open = Object.values(connections).filter(c => c && c.open).length;
    return `HOST // ${open} client connection(s)`;
  }
  const conn = connections.host;
  return `CLIENT // ${conn && conn.open ? 'host connected' : 'host disconnected'}`;
}

function debugSummaryText() {
  const now = performance.now();
  const local = myState && Number.isFinite(myState.x) && Number.isFinite(myState.y)
    ? `x=${Math.round(myState.x)} y=${Math.round(myState.y)} speed=${Math.round(myState.speed || 0)} hp=${Math.round(myState.health || 0)}`
    : 'not spawned';
  const lines = [
    `ROLE: ${botMode ? 'SKIRMISH' : isHost ? 'HOST' : 'JOINER'}   ROOM: ${peer?.id || 'none'}`,
    `LINK: ${debugConnectionState()}   LAST RX: ${lastNetworkActivityAt ? Math.round(now - lastNetworkActivityAt) + 'ms ago' : 'none'}`,
    `LOCAL: ${local}`,
    `INPUT TX: seq=${clientInputSeq} last=${lastClientInputSend ? Math.round(now - lastClientInputSend) + 'ms ago' : 'never'}`,
    `OBJECTS: players=${Object.keys(players).length} bullets=${bullets.length} missiles=${missiles.length} bombs=${bombs.length}`
  ];
  if (isHost) {
    const remoteInputs = Object.values(players)
      .filter(p => !samePlayerId(p.id, myId) && p.connected !== false)
      .map(p => {
        const age = p.networkInputAt ? Math.round(now - p.networkInputAt) + 'ms' : 'never';
        const state = Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.speed)
          ? `x=${Math.round(p.x)} y=${Math.round(p.y)} v=${Math.round(p.speed)}` : 'INVALID STATE';
        return `${p.name || 'Player ' + (p.id + 1)}#${p.id}: input=${p.networkInputSeq || 0} age=${age} ${state}`;
      });
    lines.push('REMOTE INPUTS: ' + (remoteInputs.length ? remoteInputs.join(' | ') : 'none'));
  } else {
    const backlog = Number(connections.host?.dataChannel?.bufferedAmount);
    lines.push(`HOST SNAPSHOT: ${myState ? 'received' : 'waiting'}   input ack=${lastHostInputAck}/${clientInputSeq}   action ack=${lastHostActionAck}/${clientActionSeq}`);
    lines.push(`FLIGHT LINK: ${connections.realtime?.open ? 'fast connected' : 'reliable fallback'}   last fast RX=${lastRealtimeRxAt ? Math.round(now - lastRealtimeRxAt) + 'ms ago' : 'never'}`);
    if (Number.isFinite(backlog)) lines.push(`OUTBOUND QUEUE: ${Math.round(backlog / 1024)} KiB`);
  }
  return lines.join('\n');
}

function renderDebugPanel() {
  if (!debugPanelEl || !debugSummaryEl || !debugLogEl) return;
  debugSummaryEl.textContent = debugSummaryText();
  debugLogEl.textContent = debugLogs.length ? debugLogs.join('\n') : 'No diagnostic events yet.';
  debugLogEl.scrollTop = debugLogEl.scrollHeight;
}

function toggleDebugPanel(force) {
  debugPanelOpen = force == null ? !debugPanelOpen : !!force;
  if (debugPanelEl) {
    debugPanelEl.classList.toggle('open', debugPanelOpen);
    debugPanelEl.setAttribute('aria-hidden', String(!debugPanelOpen));
  }
  if (debugPanelOpen) renderDebugPanel();
}

async function copyDebugLogs() {
  const text = debugSummaryText() + '\n\n' + (debugLogs.join('\n') || 'No diagnostic events yet.');
  try {
    await navigator.clipboard.writeText(text);
    if (debugActionStatusEl) debugActionStatusEl.textContent = 'Copied';
  } catch (_) {
    if (debugActionStatusEl) debugActionStatusEl.textContent = 'Copy blocked — use Download';
  }
}

function downloadDebugLogs() {
  const text = debugSummaryText() + '\n\n' + (debugLogs.join('\n') || 'No diagnostic events yet.');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'wings-arena-log-' + new Date().toISOString().replace(/[:.]/g, '-') + '.txt';
  document.body.appendChild(link); link.click(); link.remove();
  URL.revokeObjectURL(url);
  if (debugActionStatusEl) debugActionStatusEl.textContent = 'Downloaded';
}

function clearDebugLogs() {
  debugLogs = [];
  if (debugActionStatusEl) debugActionStatusEl.textContent = 'Cleared';
  renderDebugPanel();
}

function updateDebugPanel(ts) {
  if (!debugPanelOpen || ts - lastDebugRenderAt < 250) return;
  lastDebugRenderAt = ts;
  renderDebugPanel();
}

window.addEventListener('error', event => {
  debugLog('RUNTIME', 'Unhandled window error', { message: event.message, file: event.filename, line: event.lineno });
});
window.addEventListener('unhandledrejection', event => {
  const reason = event.reason && event.reason.message ? event.reason.message : String(event.reason);
  debugLog('RUNTIME', 'Unhandled promise rejection', { reason });
});

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
  draw(ctx, scale = 1) { ctx.save(); ctx.translate(this.x, this.y); ctx.scale(scale, scale); this.rings.forEach(r => { if (r.delay > 0) return; const t = r.life / r.maxLife; ctx.globalAlpha = (1 - t) * .55; ctx.strokeStyle = '#dff6ff'; ctx.lineWidth = 2 * (1 - t) + .5; ctx.beginPath(); ctx.ellipse(0, 0, t * r.maxR, t * r.maxR * .35, 0, 0, Math.PI * 2); ctx.stroke(); }); this.mist.forEach(m => { const t = m.life / m.maxLife; ctx.globalAlpha = (1 - t) * .5; ctx.fillStyle = '#eefbff'; ctx.beginPath(); ctx.ellipse(m.x, -m.r * .15, m.r, m.r * .6, 0, 0, Math.PI * 2); ctx.fill(); }); this.drops.forEach(d => { const t = d.life / d.maxLife; ctx.globalAlpha = 1 - t; ctx.fillStyle = '#bfeaff'; ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(.6, d.r * (1 - t * .4)), 0, Math.PI * 2); ctx.fill(); }); ctx.restore(); }
}

// Staged water strike adapted from delayed-water-bomb-effect.html. It is a
// visual-only effect: the regular weapon impact still owns damage and shrapnel.
// The compact particle counts keep repeated bot strikes inexpensive to draw.
class WaterWeaponImpactEffect {
  constructor(x, y, weapon = 'bomb', angle = -Math.PI / 2) {
    this.x = x;
    this.y = waterSurfaceY(x);
    this.weapon = weapon;
    this.angle = Number.isFinite(angle) ? angle : -Math.PI / 2;
    this.age = 0;
    this.delay = WATER_WEAPON_DETONATION_DELAY;
    this.phase = 'delay';
    this.bubbleClock = 0;
    this.splash = new WaterSplashEffect(this.x, this.y);
    this.waitBubbles = [];
    this.blastAge = 0;
    this.rings = [];
    this.spray = [];
    this.bubbles = [];
    this.mist = [];
    this.dead = false;
  }
  beginBlast() {
    this.phase = 'blast'; this.blastAge = 0;
    playExplosionSound('blast', this.x, this.y);
    screenShake = Math.max(screenShake, 5);
    this.rings = [0, .07, .18].map((delay, i) => ({ delay, life: 0, maxLife: .95, maxR: 42 + i * 8 + Math.random() * 8 }));
    for (let i = 0; i < 42; i++) {
      const a = -Math.PI / 2 + (Math.random() - .5) * 2.5;
      const speed = 120 + Math.random() * 280;
      this.spray.push({ x: 0, y: -1, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
        r: .9 + Math.random() * 2.5, life: 0, maxLife: .48 + Math.random() * .52 });
    }
    for (let i = 0; i < 18; i++) {
      this.bubbles.push({ x: rand(-34, 34), y: rand(16, 88), vx: rand(-22, 22),
        vy: -rand(58, 138), r: rand(1.8, 5), life: 0, maxLife: rand(.55, 1.05) });
    }
    for (let i = 0; i < 9; i++) {
      this.mist.push({ x: rand(-28, 28), y: -rand(0, 9), vx: rand(-23, 23),
        vy: -rand(24, 56), r: rand(8, 16), life: 0, maxLife: rand(.6, 1.05), delay: rand(0, .16) });
    }
  }
  update(dt) {
    this.age += dt;
    if (this.splash && !this.splash.dead) this.splash.update(dt);
    if (this.phase === 'delay') {
      this.bubbleClock += dt;
      while (this.bubbleClock >= .14) {
        this.bubbleClock -= .14;
        this.waitBubbles.push({ x: rand(-5, 5), y: rand(22, 64), r: rand(1.8, 3.6),
          vy: -rand(42, 78), life: 0, maxLife: .5 + Math.random() * .16 });
      }
      this.waitBubbles.forEach(b => { b.life += dt; b.y += b.vy * dt; });
      this.waitBubbles = this.waitBubbles.filter(b => b.life < b.maxLife && b.y > -2);
      if (this.age >= this.delay) this.beginBlast();
    } else if (this.phase === 'blast') {
      this.blastAge += dt;
      this.rings.forEach(r => { if (r.delay > 0) r.delay -= dt; else r.life += dt; });
      this.rings = this.rings.filter(r => r.life < r.maxLife);
      this.spray.forEach(p => { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 390 * dt; p.vx *= Math.exp(-dt * .3); });
      this.spray = this.spray.filter(p => p.life < p.maxLife && p.y < 46);
      this.bubbles.forEach(p => { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy *= Math.exp(-dt * .32); });
      this.bubbles = this.bubbles.filter(p => p.life < p.maxLife && p.y > -5);
      this.mist.forEach(p => { if (p.delay > 0) p.delay -= dt; else { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += dt * 12; } });
      this.mist = this.mist.filter(p => p.life < p.maxLife);
      if (this.blastAge > 1.35 && !this.rings.length && !this.spray.length && !this.bubbles.length && !this.mist.length) this.dead = true;
    }
  }
  surfaceHeightAt(x) {
    if (this.phase !== 'blast') return 0;
    const d = Math.abs(x - this.x), front = 22 + this.blastAge * 92, sigma = 14 + this.blastAge * 8;
    const crest = 13 * Math.exp(-.5 * ((d - front) / sigma) ** 2);
    const wake = 3.2 * Math.exp(-.5 * ((d - front - 24) / (sigma * .76)) ** 2);
    return (crest - wake) * (1 - clamp(this.blastAge / 1.5, 0, .8));
  }
  draw(ctx) {
    if (this.splash && !this.splash.dead) this.splash.draw(ctx, 1.9);
    ctx.save(); ctx.translate(this.x, this.y);
    if (this.phase === 'delay') {
      const progress = this.age / this.delay;
      ctx.save(); ctx.globalAlpha = .68 * (1 - progress * .42);
      ctx.translate(0, 10 + progress * 22); ctx.scale(1.3, 1.3); ctx.rotate(this.weapon === 'missile' ? this.angle : Math.PI / 2);
      ctx.fillStyle = '#43515a'; ctx.strokeStyle = '#c4d7dc'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(0, 0, this.weapon === 'missile' ? 11 : 10, this.weapon === 'missile' ? 3.4 : 4.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.restore();
      this.waitBubbles.forEach(b => { const t = b.life / b.maxLife; ctx.globalAlpha = (1 - t) * .62; ctx.fillStyle = 'rgba(219,248,255,.48)'; ctx.strokeStyle = '#e8fbff'; ctx.lineWidth = 1.15; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
    } else {
      const t = this.blastAge;
      if (t < .26) {
        ctx.globalAlpha = (1 - t / .26) * .68; ctx.globalCompositeOperation = 'lighter';
        const glow = ctx.createRadialGradient(0, 32, 0, 0, 32, 62 + t * 80);
        glow.addColorStop(0, 'rgba(239,253,255,.9)'); glow.addColorStop(.34, 'rgba(116,217,243,.58)'); glow.addColorStop(1, 'rgba(47,155,198,0)');
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, 32, 62 + t * 80, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      const front = 22 + t * 92, sigma = 14 + t * 8, fade = 1 - .35 * clamp(t / 1.5, 0, 1);
      ctx.globalAlpha = fade * .62; ctx.fillStyle = 'rgba(167,231,245,.52)';
      ctx.beginPath(); ctx.moveTo(-front - sigma, 0);
      for (let i = 0; i <= 28; i++) { const x = -front - sigma + i / 28 * (front + sigma) * 2; ctx.lineTo(x, -this.surfaceHeightAt(x)); }
      ctx.lineTo(front + sigma, 0); ctx.closePath(); ctx.fill();
      this.rings.forEach(r => { if (r.delay > 0) return; const f = r.life / r.maxLife; ctx.globalAlpha = (1 - f) * .46; ctx.strokeStyle = '#dff8ff'; ctx.lineWidth = 2.4 * (1 - f) + .45; ctx.beginPath(); ctx.ellipse(0, 0, f * r.maxR, f * r.maxR * .28, 0, 0, Math.PI * 2); ctx.stroke(); });
      ctx.save(); ctx.globalAlpha = fade * .8; ctx.strokeStyle = '#edfcff'; ctx.lineWidth = 2; ctx.lineCap = 'round';
      for (const dir of [-1, 1]) { const cx = dir * front; ctx.beginPath(); for (let i = 0; i <= 16; i++) { const x = cx - sigma + i / 16 * sigma * 1.7, y = -this.surfaceHeightAt(x) - 1; if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke(); }
      ctx.restore();
      this.mist.forEach(p => { if (p.delay > 0) return; const f = p.life / p.maxLife; ctx.globalAlpha = (1 - f) * .36; const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, 'rgba(233,248,250,.78)'); g.addColorStop(1, 'rgba(220,243,249,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); });
      this.spray.forEach(p => { const f = p.life / p.maxLife; ctx.globalAlpha = 1 - f; ctx.fillStyle = '#c5effb'; ctx.beginPath(); ctx.ellipse(p.x, p.y, Math.max(.55, p.r * (1 - f * .35)), Math.max(.8, p.r * 1.55), Math.atan2(p.vy, p.vx) - Math.PI / 2, 0, Math.PI * 2); ctx.fill(); });
      this.bubbles.forEach(p => { const f = p.life / p.maxLife; ctx.globalAlpha = (1 - f) * .55; ctx.strokeStyle = '#e1faff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (.7 + .3 * f), 0, Math.PI * 2); ctx.stroke(); });
    }
    ctx.restore();
  }
}

function spawnWaterWeaponImpact(x, y, weapon = 'bomb', angle = -Math.PI / 2) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  let active = 0;
  for (let i = 0; i < specialEffects.length; i++) {
    if (specialEffects[i] instanceof WaterWeaponImpactEffect) active++;
  }
  while (active >= MAX_ACTIVE_WATER_WEAPON_EFFECTS) {
    const oldest = specialEffects.findIndex(e => e instanceof WaterWeaponImpactEffect);
    if (oldest < 0) break;
    specialEffects.splice(oldest, 1); active--;
  }
  specialEffects.push(new WaterWeaponImpactEffect(x, waterSurfaceY(x), weapon, angle));
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
    const rx = rand(CLOUD_MIN_RADIUS, CLOUD_MAX_RADIUS);
    clouds.push({
      x: rand(0, WORLD_W), y: rand(0, GROUND_Y - 40),
      rx, ry: rx * rand(.28, .58), a: rand(.045, .16),
      lobe: rand(.28, .52), tilt: rand(-.12, .12)
    });
  }
  // Each arena gets a deliberate route through its concealment zones. The
  // coordinates are fixed in world space so host and joiners agree on cover.
  const mapId = validMapId(activeMapId);
  const bankLayout = MAP_CLOUD_BANK_LAYOUTS[mapId] || MAP_CLOUD_BANK_LAYOUTS.city;
  const bankCount = MAP_THEMES[mapId]?.cloudBanks || CLOUD_BANK_COUNT;
  cloudBanks = bankLayout.slice(0, bankCount).map(([nx, ny, rx, ry], i) => ({
    x: WORLD_W * nx, y: (GROUND_Y - 160) * ny + 180,
    rx, ry, alpha: .72 + (i % 3) * .07
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

function isOutsideArena(p) {
  return !!p && (p.x < 0 || p.x > WORLD_W || p.y < 0 || p.y > WORLD_H);
}

// Boundary state is part of the authoritative aircraft state. This means a
// joiner sees the same countdown as the host and cannot avoid the timer by
// rendering or simulating the plane locally.
function updateBoundaryState(p, now) {
  if (!p) return false;
  if (!p.alive || p.falling) {
    p.borderEnteredAt = 0;
    p.borderRemaining = 0;
    return false;
  }
  if (!isOutsideArena(p)) {
    if (p.borderEnteredAt) debugLog('BOUNDARY', 'Player returned to the arena', { id: p.id });
    p.borderEnteredAt = 0;
    p.borderRemaining = 0;
    p.borderWarningSeen = false;
    return false;
  }
  if (!p.borderEnteredAt) {
    p.borderEnteredAt = now;
    p.borderWarningSeen = false;
    debugLog('BOUNDARY', 'Player entered border fog', { id: p.id, x: Math.round(p.x), y: Math.round(p.y) });
  }
  p.borderRemaining = clamp(BORDER_WARNING_MS - (now - p.borderEnteredAt), 0, BORDER_WARNING_MS);
  if (!p.borderWarningSeen) p.borderWarningSeen = true;
  return p.borderRemaining <= 0;
}

function updateBoundaryWarningUI() {
  const remaining = myState && myState.alive && !myState.falling
    ? Math.max(0, Number(myState.borderRemaining) || 0)
    : 0;
  const warning = remaining > 0;
  if (boundaryWarningEl) boundaryWarningEl.style.display = warning ? 'flex' : 'none';
  if (boundaryTimerEl && warning) boundaryTimerEl.textContent = (remaining / 1000).toFixed(1);
  if (gameArea) gameArea.classList.toggle('boundary-warning', warning);
}

function freshPlayerState(id, name) {
  const p = randomSpawnPoint();
  const angle = rand(0, Math.PI * 2);
  return {
    id, name, connected: true, alive: true,
    x: p.x, y: p.y, angle,
    tx: p.x, ty: p.y, tangle: angle, synced: false, // network target for smoothing remote planes
    health: MAX_HEALTH, score: 0, kills: 0, deaths: 0,
    boost: BOOST_MAX, heat: 0, overheated: false, fireTimer: 0,
    respawnAt: 0, boosting: false, airbraking: false,
    borderEnteredAt: 0, borderRemaining: 0, borderWarningSeen: false,
    speed: PLANE_SPEED, verticalVelocity: 0, turnVelocity: 0,
    stallTime: 0, stallRecoverTime: 0, roll: 0,
    barrelRollUntil: 0, barrelRollCooldown: 0, barrelRollDirection: 1,
    falling: false, stalled: false, deathKiller: null, fallSpinVelocity: 0,
    highSpeedActive: false, sonicBoomReadyAt: 0,
    missiles: MISSILE_MAX, missileCooldown: 0, missileRegenTimer: 0,
    bombs: BOMB_MAX, bombCooldown: 0, bombRegenTimer: 0,
    flares: FLARE_MAX, flareCooldown: 0, flareRegenTimer: 0,
    networkInput: { aimX: 1, aimY: 0, boost: false, airbrake: false, shoot: false },
    networkInputSeq: 0, networkActionSeq: 0, networkInputAt: performance.now(),
    hostLockTargetId: null, hostLockProgress: 0, hostLockExpiresAt: 0,
    color: colorFor(id), invulnUntil: performance.now() + INVULN_TIME
  };
}

// Roster packets from older builds only contained display fields. Keep the
// host's simulation usable even if a player object was created before the
// current room code was loaded or a partial roster arrived first.
function ensureNetworkPlayerState(p) {
  if (!p) return null;
  if (p.connected == null) p.connected = true;
  if (p.alive == null) p.alive = true;
  if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) {
    const point = randomSpawnPoint();
    p.x = point.x; p.y = point.y; p.tx = point.x; p.ty = point.y; p.synced = false;
  }
  if (!Number.isFinite(p.angle)) p.angle = 0;
  if (!Number.isFinite(p.speed) || (p.alive !== false && !p.falling && p.speed < 1)) p.speed = PLANE_SPEED;
  if (!Number.isFinite(p.verticalVelocity)) p.verticalVelocity = 0;
  if (!Number.isFinite(p.turnVelocity)) p.turnVelocity = 0;
  if (!Number.isFinite(p.health)) p.health = MAX_HEALTH;
  if (!Number.isFinite(p.boost)) p.boost = BOOST_MAX;
  if (!Number.isFinite(p.heat)) p.heat = 0;
  if (!Number.isFinite(p.fireTimer)) p.fireTimer = 0;
  if (!Number.isFinite(p.missileCooldown)) p.missileCooldown = 0;
  if (!Number.isFinite(p.missileRegenTimer)) p.missileRegenTimer = 0;
  if (!Number.isFinite(p.bombCooldown)) p.bombCooldown = 0;
  if (!Number.isFinite(p.bombRegenTimer)) p.bombRegenTimer = 0;
  if (!Number.isFinite(p.flareCooldown)) p.flareCooldown = 0;
  if (!Number.isFinite(p.flareRegenTimer)) p.flareRegenTimer = 0;
  if (!Number.isFinite(p.missiles)) p.missiles = MISSILE_MAX;
  if (!Number.isFinite(p.bombs)) p.bombs = BOMB_MAX;
  if (!Number.isFinite(p.flares)) p.flares = FLARE_MAX;
  if (p.falling == null) p.falling = false;
  if (p.stalled == null) p.stalled = false;
  if (p.respawnAt == null) p.respawnAt = 0;
  if (!Number.isFinite(p.borderEnteredAt)) p.borderEnteredAt = 0;
  if (!Number.isFinite(p.borderRemaining)) p.borderRemaining = 0;
  if (p.borderWarningSeen == null) p.borderWarningSeen = false;
  if (!Number.isFinite(p.barrelRollCooldown)) p.barrelRollCooldown = 0;
  if (!Number.isFinite(p.barrelRollUntil)) p.barrelRollUntil = 0;
  if (!Number.isFinite(p.barrelRollDirection)) p.barrelRollDirection = 1;
  if (!p.networkInput || typeof p.networkInput !== 'object') {
    p.networkInput = { aimX: 1, aimY: 0, boost: false, airbrake: false, shoot: false };
  }
  if (!Number.isInteger(p.networkInputSeq)) p.networkInputSeq = 0;
  if (!Number.isFinite(p.networkInputAt)) p.networkInputAt = performance.now();
  if (!Number.isInteger(p.networkActionSeq)) p.networkActionSeq = 0;
  return p;
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
    networkInputSeq: 0, networkActionSeq: 0, networkInputAt: performance.now(),
    hostLockTargetId: null, hostLockProgress: 0, hostLockExpiresAt: 0
  });
}

function isNetworkClient() { return started && !botMode && !isHost; }
function validMapId(id) { return Object.prototype.hasOwnProperty.call(MAP_THEMES, id) ? id : 'city'; }

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
  myState.borderEnteredAt = 0; myState.borderRemaining = 0; myState.borderWarningSeen = false;
  localFlareScheduleGeneration++;
  myState.boosting = false;
  currentCameraFovMult = CAMERA_FOV_MULT;
  myState.missiles = MISSILE_MAX; myState.missileCooldown = 0; myState.missileRegenTimer = 0;
  myState.bombs = BOMB_MAX; myState.bombCooldown = 0; myState.bombRegenTimer = 0;
  myState.flares = FLARE_MAX; myState.flareCooldown = 0; myState.flareRegenTimer = 0;
  myState.alive = true;
  highSpeedWake.reset();
  stopWaterWakeAudio();
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
  bot.borderEnteredAt = 0; bot.borderRemaining = 0; bot.borderWarningSeen = false;
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
  bot.borderEnteredAt = 0; bot.borderRemaining = 0;
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
  highSpeedWake.reset();
  stopWaterWakeAudio();
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
  myState.borderEnteredAt = 0; myState.borderRemaining = 0;
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
  const straightPropulsion = straightFlightPropulsion(myState.turnVelocity, false, myState.angle);
  myState.speed = clamp(myState.speed + (thrust + straightPropulsion + gravityAlongFlight - drag) * dtSec, 0, MAX_FLIGHT_SPEED);
  myState.boosting = boosting && myState.speed > 0;

  // While stalled, gravity pulls the aircraft down. Once the nose points into
  // the dive and speed is rebuilt, normal flight resumes.
  if (myState.speed < 55 || Math.sin(myState.angle) <= .08) {
    myState.verticalVelocity += FALL_GRAVITY * dtSec;
  } else {
    myState.verticalVelocity *= Math.max(0, 1 - 5 * dtSec);
  }
  myState.x += Math.cos(myState.angle) * myState.speed * dtSec;
  myState.y += Math.sin(myState.angle) * myState.speed * dtSec + myState.verticalVelocity * dtSec;

  if (updateBoundaryState(myState, performance.now())) {
    beginDeathFall(null, 'Boundary lost — aircraft disabled');
    return;
  }

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
  const gravityAlongFlight = GRAVITY_ACCEL * Math.sin(myState.angle);
  const drag = (myState.speed - PLANE_SPEED) * .82;
  const thrust = boosting ? 250 : airbraking ? -300 : 0;
  const straightPropulsion = straightFlightPropulsion(myState.turnVelocity, airbraking, myState.angle);
  const highSpeedAssist = highSpeedPropulsion(myState.angle, myState.speed);
  myState.speed = clamp(myState.speed + (thrust + straightPropulsion + gravityAlongFlight + highSpeedAssist - drag) * dtSec, MIN_FLIGHT_SPEED, HIGH_SPEED_MAX_SPEED);
  const atHighSpeed = myState.speed >= HIGH_SPEED_THRESHOLD;
  if (atHighSpeed && !myState.highSpeedActive && performance.now() >= (myState.sonicBoomReadyAt || 0)) {
    triggerSonicBoom(myState.x, myState.y, myState.angle, myState.speed);
    sendEvent({ type: 'sonicBoom', x: myState.x, y: myState.y, angle: myState.angle, speed: myState.speed });
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
  if (updateBoundaryState(myState, performance.now())) {
    beginDeathFall(null, 'Boundary lost — aircraft disabled');
    return;
  }
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
      // The host's central blast already applied the authoritative damage.
      // This branch only remains for a non-authoritative local fallback.
      if (!isHost && !botMode) {
        myState.health -= BOMB_DAMAGE;
        if (myState.health <= 0) beginDeathFall(b.ownerId, 'Aircraft disabled');
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
  const nose = 44; // the drawn fuselage ends at x=42 in local plane space
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
    const packet = { type: 'shoot', id: b.id, x: b.x, y: b.y, angle: b.angle, shotAt: b.born };
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
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    const startX = b.x, startY = b.y;
    if (b.vx == null) {
      b.vx = Math.cos(b.angle) * BULLET_SPEED;
      b.vy = Math.sin(b.angle) * BULLET_SPEED;
    }
    b.prevX = startX; b.prevY = startY;
    const nextVy = b.vy + BULLET_GRAVITY * dtSec;
    const endX = startX + b.vx * dtSec;
    const endY = startY + nextVy * dtSec;
    // Test the swept segment so a fast round splashes at the actual crossing
    // in this frame, rather than a frame later at an elevated fixed offset.
    const surfaceAtEnd = waterSurfaceY(endX);
    if (startY >= waterSurfaceY(startX) ||
        (endY >= surfaceAtEnd && endY > startY)) {
      const t = startY >= waterSurfaceY(startX) ? 0 :
        clamp((surfaceAtEnd - startY) / (endY - startY), 0, 1);
      const hitX = startX + (endX - startX) * t;
      const hitY = waterSurfaceY(hitX);
      if (isHost || rememberImpact('bullet', b.id)) spawnExplosion(hitX, hitY, 'water');
      if (isHost) broadcast({ type: 'impact', from: b.ownerId, kind: 'bullet', id: b.id,
        x: hitX, y: hitY, surface: 'water' });
      removeProjectileLocal('bullet', b.id);
      continue;
    }
    b.vy = nextVy;
    b.x = endX;
    b.y = endY;
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

function applyBombBlastDamage(x, y, ownerId) {
  if (!isHost && !botMode) return;
  Object.values(players).forEach(target => {
    if (!target || samePlayerId(target.id, ownerId) || target.connected === false || !target.alive) return;
    const distance = dist(target.x, target.y, x, y);
    if (distance >= BOMB_BLAST_RADIUS) return;
    const falloff = 1 - (distance / BOMB_BLAST_RADIUS) * .45;
    applyHostDamage(target, BOMB_BLAST_DAMAGE * falloff, ownerId);
  });
}

function detonateBomb(b, surface = null) {
  if (!b) return;
  const waterHit = surface === 'water';
  const burstY = waterHit ? waterSurfaceY(b.x) : Math.min(b.y, GROUND_Y - 8);
  // The center blast is authoritative and runs once on the host. Clients only
  // receive the visual/fragment event, preventing duplicate damage in P2P.
  if (isHost || botMode) applyBombBlastDamage(b.x, burstY, b.ownerId);
  if (waterHit) spawnWaterWeaponImpact(b.x, burstY, 'bomb');
  else spawnExplosion(b.x, burstY, 'bomb');
  if (!waterHit) playExplosionSound('blast', b.x, burstY);
  screenShake = Math.max(screenShake, waterHit ? 3 : 9);
  spawnBombShrapnel(b.x, burstY, b.ownerId);
  if (isHost) broadcast({ type: 'impact', from: b.ownerId, kind: 'bomb', id: b.id, x: b.x, y: burstY, surface: waterHit ? 'water' : null });
  removeProjectileLocal('bomb', b.id);
}

function updateBombs(dtSec) {
  const now = performance.now();
  const authoritative = isHost || botMode;
  for (let i = bombs.length - 1; i >= 0; i--) {
    const b = bombs[i];
    if (!authoritative && now - b.born > BOMB_LIFE + 900) {
      // The host owns detonation. This only removes a stale visual copy if a
      // packet was lost for an unusually long time, without inventing FX.
      bombs.splice(i, 1);
      continue;
    }
    b.vy += BOMB_GRAVITY * dtSec;
    const startX = b.x, startY = b.y;
    const endX = startX + b.vx * dtSec, endY = startY + b.vy * dtSec;
    if (authoritative && (startY >= waterSurfaceY(startX) ||
        (endY >= waterSurfaceY(endX) && endY > startY))) {
      const t = startY >= waterSurfaceY(startX) ? 0 :
        clamp((waterSurfaceY(startX) - startY) / (endY - startY), 0, 1);
      b.x = startX + (endX - startX) * t;
      b.y = waterSurfaceY(b.x);
      detonateBomb(b, 'water');
      continue;
    }
    b.x = endX; b.y = endY;
    if (!authoritative) continue;
    if (now - b.born > BOMB_LIFE) { detonateBomb(b); continue; }

    // Proximity detonation makes the bomb useful against moving aircraft
    // without turning it into a homing weapon.
    const proximitySq = BOMB_PROXIMITY_RADIUS * BOMB_PROXIMITY_RADIUS;
    const nearTarget = Object.values(players).some(p => {
      if (samePlayerId(p.id, b.ownerId) || p.connected === false || p.alive === false) return false;
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
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.angle)) return;
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
  const sessionGeneration = localFlareScheduleGeneration;
  const ownerState = players[ownerId];
  const scheduleGeneration = ownerId === myId
    ? localFlareScheduleGeneration
    : ownerState && ownerState.isBot ? ownerState.botScheduleGeneration : null;
  for (let flareNumber = 0; flareNumber < FLARE_SALVO_COUNT; flareNumber++) {
    // Only create the flare at its launch time. Previously all objects were
    // inserted immediately with future timestamps, which made the salvo look
    // like every flare spawned on top of the first one.
    setTimeout(() => {
      if (!started) return;
      if (sessionGeneration !== localFlareScheduleGeneration) return;
      if (ownerId === myId && scheduleGeneration !== localFlareScheduleGeneration) return;
      if (ownerState && ownerState.isBot && scheduleGeneration !== ownerState.botScheduleGeneration) return;
      if (ownerId !== myId && (!players[ownerId] || players[ownerId].connected === false)) return;
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
        continue;
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
    const startX = m.x, startY = m.y;
    const endX = startX + Math.cos(m.angle) * m.speed * dtSec;
    const endY = startY + Math.sin(m.angle) * m.speed * dtSec;
    const surfaceAtStart = waterSurfaceY(startX), surfaceAtEnd = waterSurfaceY(endX);
    if (authoritative && (startY >= surfaceAtStart ||
        (endY >= surfaceAtEnd && endY > startY))) {
      const t = startY >= surfaceAtStart ? 0 :
        clamp((surfaceAtStart - startY) / (endY - startY), 0, 1);
      const hitX = startX + (endX - startX) * t;
      const hitY = waterSurfaceY(hitX);
      spawnWaterWeaponImpact(hitX, hitY, 'missile', m.angle);
      screenShake = Math.max(screenShake, 3);
      if (isHost) broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id,
        x: hitX, y: hitY, surface: 'water' });
      removeProjectileLocal('missile', m.id);
      continue;
    }
    m.x = endX; m.y = endY;
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
  const straightPropulsion = straightFlightPropulsion(bot.turnVelocity, bot.airbraking, bot.angle);
  const highSpeedAssist = highSpeedPropulsion(bot.angle, bot.speed);
  bot.speed = clamp(bot.speed + (thrust + straightPropulsion + gravityAlongFlight + highSpeedAssist - drag) * dtSec, 0, HIGH_SPEED_MAX_SPEED);
  const atHighSpeed = bot.speed >= HIGH_SPEED_THRESHOLD;
  if (atHighSpeed && !bot.highSpeedActive && now >= bot.sonicBoomReadyAt) {
    triggerSonicBoom(bot.x, bot.y, bot.angle, bot.speed);
    bot.sonicBoomReadyAt = now + SONIC_BOOM_COOLDOWN_MS;
  }
  bot.highSpeedActive = atHighSpeed;
  bot.x += Math.cos(bot.angle) * bot.speed * dtSec;
  bot.y += Math.sin(bot.angle) * bot.speed * dtSec;
  if (bot.y < 0) bot.verticalVelocity += TOP_BOUNDARY_GRAVITY * clamp(-bot.y / TOP_BOUNDARY_DEPTH, .2, 1) * dtSec;
  else bot.verticalVelocity *= Math.max(0, 1 - 4.5 * dtSec);
  bot.y += bot.verticalVelocity * dtSec;
  if (updateBoundaryState(bot, now)) { beginBotDeathFall(bot, null); return; }
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
  ensureNetworkPlayerState(p);
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
  p.borderEnteredAt = 0; p.borderRemaining = 0; p.borderWarningSeen = false;
  p.respawnAt = 0; p.invulnUntil = performance.now() + INVULN_TIME;
}

function beginRemoteDeathFall(p, killerId, message = 'Aircraft disabled') {
  ensureNetworkPlayerState(p);
  if (!p || !p.alive || p.falling) return;
  p.health = 0; p.falling = true; p.stalled = false; p.boosting = false;
  p.deathKiller = killerId; p.speed = 0; p.turnVelocity = 0;
  p.verticalVelocity = Math.max(45, p.verticalVelocity);
  p.fallSpinVelocity = STALL_SPIN_SPEED * (p.id % 2 ? 1 : -1);
  p.borderEnteredAt = 0; p.borderRemaining = 0;
  p.networkInput = { aimX: 1, aimY: 0, boost: false, airbrake: false, shoot: false };
  p.networkInputAt = 0;
  p.deathMessage = message;
}

function finishRemoteDeath(p) {
  if (!p || !p.alive) return;
  p.alive = false; p.falling = false; p.boosting = false;
  p.respawnAt = performance.now() + RESPAWN_DELAY;
  handleDied(p.id, p.deathKiller);
}

function updateRemoteDeathFall(p, dtSec) {
  ensureNetworkPlayerState(p);
  if (!p || !p.alive || !p.falling) return;
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
    if (!Number.isFinite(target.x) || !Number.isFinite(target.y) || !Number.isFinite(target.angle)) return;
    if (isInCloudBank(target.x, target.y)) return;
    const d = dist(p.x, p.y, target.x, target.y);
    const targetAngle = Math.atan2(target.y - p.y, target.x - p.x);
    if (d >= bestDistance || Math.abs(angleDiff(p.angle, targetAngle)) > MISSILE_LOCK_CONE) return;
    best = target; bestDistance = d;
  });
  return best ? best.id : null;
}

function updateHostLock(p, dtSec) {
  const now = performance.now();
  if (p.hostLockTargetId != null && p.hostLockExpiresAt > now) {
    const heldTarget = players[p.hostLockTargetId];
    if (heldTarget && heldTarget.alive !== false && heldTarget.connected !== false) {
      // A completed lock is held even after the pilot looks away. Do not
      // refresh the timer every frame; it must genuinely expire.
      p.hostLockProgress = MISSILE_LOCK_DELAY;
      return;
    }
    p.hostLockTargetId = null; p.hostLockProgress = 0; p.hostLockExpiresAt = 0;
  }
  if (p.hostLockExpiresAt && p.hostLockExpiresAt <= now) {
    p.hostLockTargetId = null; p.hostLockProgress = 0; p.hostLockExpiresAt = 0;
  }
  const targetId = findHostLockTarget(p);
  if (targetId == null) {
    p.hostLockTargetId = null; p.hostLockProgress = 0; p.hostLockExpiresAt = 0;
    return;
  }
  if (p.hostLockTargetId !== targetId) {
    p.hostLockTargetId = targetId; p.hostLockProgress = 0;
  }
  p.hostLockProgress = clamp(p.hostLockProgress + dtSec * 1000, 0, MISSILE_LOCK_DELAY);
  if (p.hostLockProgress >= MISSILE_LOCK_DELAY && p.hostLockExpiresAt <= now) {
    p.hostLockExpiresAt = now + MISSILE_LOCK_HOLD_MS;
  }
}

function updateOneNetworkPlayer(p, dtSec, now) {
  if (!p || p.isBot || samePlayerId(p.id, myId) || p.connected === false) return;
  ensureNetworkPlayerState(p);
  // Recover safely if a player object came from an older room/session or a
  // partially delivered roster. Without these defaults, undefined physics
  // values become NaN and the client rejects every authoritative position.
  if (!Number.isFinite(p.speed) || (p.alive !== false && !p.falling && p.speed < 1)) p.speed = PLANE_SPEED;
  if (!Number.isFinite(p.verticalVelocity)) p.verticalVelocity = 0;
  if (!Number.isFinite(p.turnVelocity)) p.turnVelocity = 0;
  if (!Number.isFinite(p.heat)) p.heat = 0;
  if (!Number.isFinite(p.fireTimer)) p.fireTimer = 0;
  if (!Number.isFinite(p.missileCooldown)) p.missileCooldown = 0;
  if (!Number.isFinite(p.missileRegenTimer)) p.missileRegenTimer = 0;
  if (!Number.isFinite(p.bombCooldown)) p.bombCooldown = 0;
  if (!Number.isFinite(p.bombRegenTimer)) p.bombRegenTimer = 0;
  if (!Number.isFinite(p.flareCooldown)) p.flareCooldown = 0;
  if (!Number.isFinite(p.flareRegenTimer)) p.flareRegenTimer = 0;
  if (!Number.isFinite(p.missiles)) p.missiles = MISSILE_MAX;
  if (!Number.isFinite(p.bombs)) p.bombs = BOMB_MAX;
  if (!Number.isFinite(p.flares)) p.flares = FLARE_MAX;
  if (!p.alive) {
    if (p.respawnAt && now >= p.respawnAt) respawnNetworkPlayer(p);
    return;
  }
  if (p.falling) { updateRemoteDeathFall(p, dtSec); return; }
  const inputFresh = now - (p.networkInputAt || 0) < NETWORK_INPUT_TIMEOUT_MS;
  if (p.debugInputFresh !== inputFresh) {
    p.debugInputFresh = inputFresh;
    debugLog('INPUT', inputFresh ? 'Client input resumed' : 'Client input became stale', { id: p.id, seq: p.networkInputSeq || 0 });
  }
  const input = inputFresh
    ? (p.networkInput || { aimX: 1, aimY: 0, boost: false, airbrake: false, shoot: false })
    : { aimX: Math.cos(p.angle), aimY: Math.sin(p.angle), boost: false, airbrake: false, shoot: false };
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
  const straightPropulsion = straightFlightPropulsion(p.turnVelocity, airbraking, p.angle);
  const highSpeedAssist = highSpeedPropulsion(p.angle, p.speed);
  p.speed = clamp(p.speed + (thrust + straightPropulsion + gravityAlongFlight + highSpeedAssist - drag) * dtSec, 0, HIGH_SPEED_MAX_SPEED);
  const atHighSpeed = p.speed >= HIGH_SPEED_THRESHOLD;
  if (atHighSpeed && !p.highSpeedActive && now >= (p.sonicBoomReadyAt || 0)) {
    triggerSonicBoom(p.x, p.y, p.angle, p.speed);
    broadcast({ type: 'sonicBoom', from: p.id, x: p.x, y: p.y, angle: p.angle, speed: p.speed });
    p.sonicBoomReadyAt = now + SONIC_BOOM_COOLDOWN_MS;
  }
  p.highSpeedActive = atHighSpeed;
  if (p.y < 0) p.verticalVelocity += TOP_BOUNDARY_GRAVITY * clamp(-p.y / TOP_BOUNDARY_DEPTH, .2, 1) * dtSec;
  else p.verticalVelocity *= Math.max(0, 1 - 4.5 * dtSec);
  p.x += Math.cos(p.angle) * Math.max(0, p.speed) * dtSec;
  p.y += Math.sin(p.angle) * Math.max(0, p.speed) * dtSec + p.verticalVelocity * dtSec;
  if (updateBoundaryState(p, now)) { beginRemoteDeathFall(p, null, 'Boundary lost — aircraft disabled'); return; }
  if (p.y >= GROUND_Y - 12) { beginRemoteDeathFall(p, null, 'You hit the sea.'); return; }

  if (!p.debugSimulationSeen) {
    p.debugSimulationSeen = true;
    debugLog('SIM', 'Host advanced remote player', { id: p.id, x: Math.round(p.x), y: Math.round(p.y), speed: Math.round(p.speed) });
  }

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
  if (!target || !target.alive || performance.now() < (target.invulnUntil || 0)) return;
  if (target.falling) {
    // A crashing aircraft must still be finishable. Route the finalization to
    // the correct authority path for a host pilot, bot, or remote joiner.
    if (samePlayerId(target.id, myId)) finishDeath(killerId, 'Aircraft destroyed');
    else if (target.isBot) finishBotDeath(target);
    else finishRemoteDeath(target);
    return;
  }
  target.health -= amount;
  if (target.health <= 0) {
    if (samePlayerId(target.id, myId)) beginDeathFall(killerId);
    else if (target.isBot) beginBotDeathFall(target, killerId);
    else beginRemoteDeathFall(target, killerId);
  }
}

function updateHostCombat() {
  if (!isHost || botMode || !started) return;
  const now = performance.now();
  Object.values(players).forEach(target => {
    ensureNetworkPlayerState(target);
    // The local host is damaged by updateLocalPlane(). Host combat owns only
    // connected remote pilots; handling the local plane here would double-hit
    // it and makes the two authority paths disagree.
    if (samePlayerId(target.id, myId) || target.connected === false || !target.alive || now < (target.invulnUntil || 0)) return;
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (samePlayerId(b.ownerId, target.id)) continue;
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
      if (samePlayerId(m.ownerId, target.id) || (m.targetId != null && !samePlayerId(m.targetId, target.id))) continue;
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
      ensureNetworkPlayerState(target);
      if (hit || samePlayerId(target.id, s.ownerId) || samePlayerId(target.id, myId) || !target.alive || target.connected === false || now < (target.invulnUntil || 0)) return;
      if (pointSegmentDistance(target.x, target.y, s.prevX ?? s.x, s.prevY ?? s.y, s.x, s.y) >= SHRAPNEL_HIT_RADIUS) return;
      hit = true;
      const hitAngle = Math.atan2(s.vy, s.vx);
      spawnExplosion(s.x, s.y, 'spark', hitAngle);
      broadcast({ type: 'effect', kind: 'spark', x: s.x, y: s.y, angle: hitAngle });
      applyHostDamage(target, SHRAPNEL_DAMAGE, s.ownerId);
    });
    if (hit) shrapnels.splice(i, 1);
  }
}

// ================= Networking: host side =================
function acceptRealtimeConnection(c) {
  let ownerId = null;
  c.on('open', () => {
    // Bind the second channel to the existing reliable connection's PeerJS
    // identity. It never reserves a new pilot ID or creates a player.
    ownerId = Object.keys(connections).find(id =>
      connections[id]?.open && connections[id]?.peer === c.peer
    );
    if (ownerId == null) { c.close(); return; }
    const old = realtimeConnections[ownerId];
    realtimeConnections[ownerId] = c;
    if (old?.open && old !== c) old.close();
    debugLog('PEER', 'Fast flight channel opened', { id: ownerId });
  });
  c.on('data', data => {
    if (ownerId == null || realtimeConnections[ownerId] !== c || !connections[ownerId]?.open) return;
    if (data?.type === 'input') handleHostReceive(Number(ownerId), data);
  });
  const close = () => {
    if (ownerId != null && realtimeConnections[ownerId] === c) {
      delete realtimeConnections[ownerId];
      debugLog('PEER', 'Fast flight channel closed; reliable fallback', { id: ownerId });
    }
  };
  c.on('close', close);
  c.on('error', close);
}

function resetForNewSession() {
  resetAllInput();
  if (clientInputTimer) { clearInterval(clientInputTimer); clientInputTimer = null; }
  if (realtimeRetryTimer) { clearTimeout(realtimeRetryTimer); realtimeRetryTimer = null; }
  const stalePeer = peer;
  peer = null;
  if (stalePeer && !stalePeer.destroyed) {
    try { stalePeer.destroy(); } catch (_) { /* an already-closed peer is harmless */ }
  }
  started = false; isHost = false; botMode = false; myId = null; myState = null;
  players = {}; connections = {}; realtimeConnections = {};
  nextStateSeq = 0; lastStateSeqByPlayer.clear(); lastRealtimeRxAt = 0; lastRealtimeOpenAt = 0;
  lastProjectileSnapshotAt = 0;
  bullets = []; missiles = []; bombs = []; shrapnels = []; flares = [];
  explosions = []; specialEffects = []; seenImpactKeys.clear();
  highSpeedWake.reset();
  stopWaterWakeAudio();
  localFlareScheduleGeneration++;
  missileLockTargetId = null; missileLockAcquireId = null; missileLockCandidateId = null;
  missileLockCandidateAligned = false; missileLockProgress = 0; missileLockExpiresAt = 0;
  currentCameraFovMult = CAMERA_FOV_MULT;
  lastClientInputSend = 0; clientInputSeq = 0; clientActionSeq = 0; lastInputSendErrorAt = 0;
  lastHostInputAck = 0; lastHostActionAck = 0;
  lastTime = 0; lastBroadcast = 0; lastProjectileBroadcast = 0; lastRuntimeErrorAt = 0;
  lastIncomingLock = false;
  if (engineCruiseAudio) { engineCruiseAudio.pause(); engineCruiseAudio.currentTime = 0; }
  if (engineBoostAudio) { engineBoostAudio.pause(); engineBoostAudio.currentTime = 0; }
  if (boundaryWarningEl) boundaryWarningEl.style.display = 'none';
  if (gameArea) gameArea.classList.remove('boundary-warning', 'missile-lock');
  if (lockWarningEl) lockWarningEl.style.display = 'none';
  if (respawnOverlay) respawnOverlay.style.display = 'none';
}

function startHost() {
  resetForNewSession();
  unlockAudio();
  seenImpactKeys.clear(); lastNetworkActivityAt = performance.now();
  debugLog('SESSION', 'Starting host', { name: myName, map: validMapId(mapSelectEl?.value || selectedMapId) });
  setNetworkStatus('P2P // HOSTING', 'ok');
  isHost = true; botMode = false; myId = 0;
  players[0] = freshPlayerState(0, myName);
  peer = new Peer();
  peer.on('error', err => {
    debugLog('PEER', 'Host peer error', { type: err?.type, message: err?.message });
    const message = err && err.type === 'unavailable-id'
      ? 'That room code is unavailable. Try hosting again.'
      : 'Network error — check the connection and try again.';
    statusEl.textContent = message;
    setNetworkStatus('P2P // ERROR', 'bad');
    startBtn.style.display = 'none'; waitHint.style.display = 'block';
  });
  peer.on('disconnected', () => {
    debugLog('PEER', 'Host signaling disconnected');
    statusEl.textContent = 'Disconnected from the signaling server.';
    setNetworkStatus('P2P // SIGNAL LOST', 'bad');
    startBtn.style.display = 'none'; waitHint.style.display = 'block';
  });
  peer.on('open', id => {
    debugLog('PEER', 'Host room opened', { id });
    statusEl.textContent = 'Share this code: ' + id;
    setNetworkStatus('HOST // ' + id.slice(0, 8), 'ok');
    chooseRole.style.display = 'none'; lobby.style.display = 'flex';
    startBtn.style.display = 'inline-block'; waitHint.style.display = 'none';
    renderLobby();
  });
  peer.on('connection', c => {
    if (c.label === 'flight-state') { acceptRealtimeConnection(c); return; }
    const id = nextFreeId();
    debugLog('PEER', 'Incoming connection reserved', { id: id ?? 'full' });
    if (id === null) { c.on('open', () => c.send({ type: 'full' })); return; }
    connections[id] = c;
    players[id] = freshPlayerState(id, 'Player ' + (id + 1));
    players[id].connected = true;
    c.on('open', () => {
      debugLog('PEER', 'Client connection opened', { id });
      c.send({ type: 'welcome', id });
      if (started) c.send({ type: 'start', mapId: activeMapId });
      broadcastRoster();
    });
    c.on('data', data => handleHostReceive(id, data));
    c.on('close', () => {
      debugLog('PEER', 'Client connection closed', { id });
      if (realtimeConnections[id]) realtimeConnections[id].close();
      if (players[id]) players[id].connected = false;
      removePlayerArtifacts(id);
      broadcastRoster();
    });
    c.on('error', () => {
      debugLog('PEER', 'Client connection error', { id });
      if (realtimeConnections[id]) realtimeConnections[id].close();
      if (players[id]) players[id].connected = false;
      removePlayerArtifacts(id);
      broadcastRoster();
    });
  });
  startBtn.onclick = () => {
    if (started) return;
    activeMapId = validMapId(mapSelectEl?.value || selectedMapId);
    debugLog('SESSION', 'Host launched match', { map: activeMapId, players: Object.keys(players).length });
    started = true; buildClouds();
    broadcast({ type: 'start', mapId: activeMapId });
    beginLocalGame();
  };
}

function startBotMode() {
  resetForNewSession();
  unlockAudio();
  debugLog('SESSION', 'Starting skirmish', { bots: botCountInputEl?.value, map: validMapId(mapSelectEl?.value || selectedMapId) });
  setNetworkStatus('SKIRMISH // LOCAL', 'ok');
  // Bots run locally as a private host-like sortie. No PeerJS connection is
  // created, so starting this mode never interferes with room multiplayer.
  isHost = true; botMode = true; myId = 0; peer = null; connections = {};
  seenImpactKeys.clear(); lastNetworkActivityAt = performance.now();
  players = {}; bullets = []; missiles = []; bombs = []; shrapnels = []; flares = [];
  explosions = []; specialEffects = []; started = true;
  players[0] = freshPlayerState(0, myName);
  activeMapId = validMapId(mapSelectEl?.value || selectedMapId);
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
  const isSnapshot = msg?.type === 'states' || msg?.type === 'state' || msg?.type === 'projectiles';
  Object.entries(connections).forEach(([id, c]) => {
    if (!c?.open) return;
    const fast = msg?.type === 'states' || msg?.type === 'state' ? realtimeConnections[id] : null;
    if (fast?.open) {
      // Flight state is replaceable. When the fast channel is backed up,
      // drop this frame and let the next snapshot supersede it.
      if ((fast.dataChannel?.bufferedAmount || 0) < 8192) {
        try { fast.send(msg); } catch (error) {
          debugLog('PEER', 'Fast state send failed', { id, message: error?.message || String(error) });
        }
      }
      return;
    }
    // Send gunfire immediately on the fast link, with a reliable backup.
    // Duplicate packets share a bullet ID and are ignored by the receiver.
    if (msg?.type === 'shoot') {
      const visual = realtimeConnections[id];
      if (visual?.open && (visual.dataChannel?.bufferedAmount || 0) < 8192) {
        try { visual.send(msg); } catch (_) { /* reliable copy follows */ }
      }
    }
    // PeerJS exposes the underlying RTCDataChannel on current builds. When
    // its outbound queue grows, skip only replaceable snapshots; this lets
    // the channel drain instead of making reliable steering packets wait
    // behind stale world-state packets.
    const buffered = Number(c?.dataChannel?.bufferedAmount);
    if (isSnapshot && Number.isFinite(buffered) && buffered > NETWORK_SNAPSHOT_BUFFER_LIMIT) return;
    try { c.send(msg); } catch (error) {
      debugLog('PEER', 'Broadcast send failed', { type: msg?.type, message: error?.message || String(error) });
    }
  });
}

function removePlayerArtifacts(ownerId) {
  bullets = bullets.filter(p => p.ownerId !== ownerId);
  missiles = missiles.filter(p => p.ownerId !== ownerId);
  bombs = bombs.filter(p => p.ownerId !== ownerId);
  shrapnels = shrapnels.filter(p => p.ownerId !== ownerId);
  flares = flares.filter(p => p.ownerId !== ownerId);
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
  // Only the host-reserved, currently open connection may control this slot.
  // A stale roster flag can recover, but a disconnected connection must not
  // resurrect a ghost pilot by sending a delayed steering packet.
  if (!samePlayerId(fromId, myId) && !connections[fromId]?.open) return;
  if (data.type === 'input') {
    if (!players[fromId]) return;
    if (players[fromId].connected === false) players[fromId].connected = true;
    handleClientInput(fromId, data);
    return;
  }
  if (!samePlayerId(fromId, myId) && (!players[fromId] || players[fromId].connected === false)) return;
  // A client may submit only input/actions. World state, projectile spawns,
  // impacts, deaths, and effects are host-owned and cannot be claimed by a
  // remote packet.
  if (!samePlayerId(fromId, myId) && ['state', 'shoot', 'missile', 'bomb', 'flare', 'sonicBoom', 'impact', 'died'].includes(data.type)) return;
  if (data.type === 'action') handleClientAction(fromId, data);
  else if (data.type === 'state') { if (samePlayerId(fromId, myId)) handleState(fromId, data); }
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
  return data && Number.isSafeInteger(Number(data.seq)) && Number.isFinite(data.aimX) && Number.isFinite(data.aimY) &&
    Math.abs(data.aimX) < 10000 && Math.abs(data.aimY) < 10000;
}

function handleClientInput(fromId, data) {
  const p = players[fromId];
  const seq = Number(data?.seq);
  if (!p || samePlayerId(fromId, myId) || !validNetworkInput(data) || seq <= (p.networkInputSeq || 0)) return;
  ensureNetworkPlayerState(p);
  p.networkInputSeq = seq;
  p.networkInputAt = performance.now();
  if (!p.debugInputSeen) {
    p.debugInputSeen = true;
    debugLog('INPUT', 'First input received from client', { id: fromId, seq, aimX: Math.round(data.aimX), aimY: Math.round(data.aimY) });
  }
  p.networkInput = {
    aimX: clamp(data.aimX, -window.innerWidth * 2, window.innerWidth * 2),
    aimY: clamp(data.aimY, -window.innerHeight * 2, window.innerHeight * 2),
    boost: !!data.boost, airbrake: !!data.airbrake, shoot: !!data.shoot
  };
}

function handleClientAction(fromId, data) {
  const p = players[fromId];
  if (!p || samePlayerId(fromId, myId) || !Number.isInteger(data.seq) || data.seq <= (p.networkActionSeq || 0)) return;
  ensureNetworkPlayerState(p);
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
  if (!p || ![data.x, data.y, data.angle, data.health].every(Number.isFinite)) {
    const now = performance.now();
    if (!p || !p.debugInvalidStateAt || now - p.debugInvalidStateAt > 2000) {
      if (p) p.debugInvalidStateAt = now;
      debugLog('STATE', 'Rejected invalid authoritative snapshot', { id: data?.from, x: data?.x, y: data?.y, angle: data?.angle, health: data?.health });
    }
    return;
  }
  ensureNetworkPlayerState(p);
  if (!p.synced || (p.alive === false && data.alive === true) ||
      (!samePlayerId(p.id, myId) && dist(p.x, p.y, data.x, data.y) > 500)) {
    // First update we've ever gotten for this player: snap immediately so
    // it doesn't visibly slide in from its placeholder spawn point.
    p.x = data.x; p.y = data.y; p.angle = data.angle;
    p.turnVelocity = 0; p.verticalVelocity = 0;
    p.synced = true;
  }
  // The joiner's local plane predicts its visible movement between host
  // snapshots. The host position is stored as a correction target below.
  p.tx = data.x; p.ty = data.y; p.tangle = data.angle;
  p.lastStateAt = performance.now();
  p.health = data.health; p.alive = data.alive;
  p.falling = !!data.falling;
  p.stalled = !!data.stalled;
  p.boosting = !!data.boosting;
  if (data.roll != null) p.roll = data.roll;
  ['speed', 'heat', 'overheated', 'boost', 'missiles', 'bombs', 'flares', 'score', 'kills', 'deaths', 'borderEnteredAt', 'borderRemaining'].forEach(key => {
    if (data[key] !== undefined) p[key] = data[key];
  });
  // performance.now() has a different origin in each browser. Never compare
  // the host's absolute respawnAt directly to the joiner's local clock.
  if (Number.isFinite(data.respawnRemaining)) {
    p.respawnAt = data.alive === false ? performance.now() + Math.max(0, data.respawnRemaining) : 0;
  }
  if (samePlayerId(p.id, myId)) {
    if (Number.isSafeInteger(data.inputAck)) lastHostInputAck = Math.max(lastHostInputAck, data.inputAck);
    if (Number.isSafeInteger(data.actionAck)) lastHostActionAck = Math.max(lastHostActionAck, data.actionAck);
  }
  if (data.lockTargetId !== undefined) {
    p.hostLockTargetId = data.lockTargetId;
    p.hostLockProgress = data.lockProgress || 0;
    p.hostLockExpiresAt = data.lockExpiresAt || 0;
    p.hostLockRemaining = data.lockRemaining || 0;
    p.hostLockUpdatedAt = performance.now();
  }
  if (samePlayerId(p.id, myId) && respawnOverlay) {
    if (p.alive === false) {
      respawnOverlay.style.display = 'flex';
      respawnMsgEl.textContent = 'AIRCRAFT LOST';
    } else if (p.alive) {
      respawnOverlay.style.display = 'none';
    }
  }
}

function updateClientVisualPlane(dtSec) {
  const p = myState;
  if (!p?.synced) return;
  const now = performance.now();
  const age = Math.max(0, now - (p.lastStateAt || now)) / 1000;
  if (p.alive && !p.falling && !p.stalled) {
    // Predict only the picture/camera. No position or damage from this path
    // is sent to the host; the next authoritative snapshot corrects it.
    const boosting = keysHeld.boost && !keysHeld.airbrake;
    const airbraking = keysHeld.airbrake && !boosting;
    const targetAngle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
    const speedRatio = clamp(p.speed / HIGH_SPEED_MAX_SPEED, .2, 1);
    const speedTurnPenalty = .72 + (1 - speedRatio) * .52;
    const turnAuthority = airbraking ? AIRBRAKE_TURN_MULT : boosting ? BOOST_TURN_MULT : 1;
    const desiredTurn = clamp(angleDiff(p.angle, targetAngle) * 5.5, -TURN_RATE, TURN_RATE) * speedTurnPenalty * turnAuthority;
    p.turnVelocity += (desiredTurn - p.turnVelocity) * clamp(TURN_ACCEL * dtSec, 0, 1);
    p.turnVelocity *= Math.max(0, 1 - TURN_DAMPING * dtSec);
    p.turnVelocity = clamp(p.turnVelocity, -TURN_RATE * 1.15, TURN_RATE * 1.15);
    p.angle += p.turnVelocity * dtSec;
    const gravityAlongFlight = GRAVITY_ACCEL * Math.sin(p.angle);
    const drag = (p.speed - PLANE_SPEED) * .82;
    const thrust = boosting ? 250 : airbraking ? -300 : 0;
    p.speed = clamp(p.speed + (thrust + straightFlightPropulsion(p.turnVelocity, airbraking, p.angle) +
      gravityAlongFlight + highSpeedPropulsion(p.angle, p.speed) - drag) * dtSec, 0, HIGH_SPEED_MAX_SPEED);
    p.x += Math.cos(p.angle) * p.speed * dtSec;
    p.y += Math.sin(p.angle) * p.speed * dtSec;
  } else if (p.falling) {
    p.verticalVelocity += FALL_GRAVITY * dtSec;
    p.y += p.verticalVelocity * dtSec;
  }

  if (age < .65 && Number.isFinite(p.tx) && Number.isFinite(p.ty) && Number.isFinite(p.tangle)) {
    // Advance the last host position toward 'now' before correcting. Pulling
    // toward its old location every frame would make the joiner crawl.
    const horizon = Math.min(.24, age + .05);
    const projectedX = p.tx + (p.falling ? 0 : Math.cos(p.tangle) * p.speed * horizon);
    const projectedY = p.ty + (p.falling ? p.verticalVelocity * horizon : Math.sin(p.tangle) * p.speed * horizon);
    const blend = clamp(dtSec * 4.5, 0, .28);
    p.x += (projectedX - p.x) * blend;
    p.y += (projectedY - p.y) * blend;
    if (!p.falling) p.angle += angleDiff(p.angle, p.tangle + p.turnVelocity * horizon) * clamp(dtSec * 3, 0, .2);
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
  const stateSeq = ++nextStateSeq;
  // One packet per peer per tick keeps all pilots on the same host frame and
  // avoids the N separate messages per peer that used to congest the link.
  broadcast({ type: 'states', stateSeq, states: Object.values(players)
    .filter(p => p.connected !== false)
    .map(p => ({
      from: p.id, x: p.x, y: p.y, angle: p.angle,
      health: p.health, alive: p.alive, falling: p.falling, stalled: p.stalled,
      boosting: p.boosting, roll: p.roll, speed: p.speed, heat: p.heat,
      overheated: p.overheated, boost: p.boost, missiles: p.missiles,
      bombs: p.bombs, flares: p.flares, score: p.score, kills: p.kills,
      deaths: p.deaths,
      respawnRemaining: p.alive === false ? Math.max(0, (p.respawnAt || 0) - performance.now()) : 0,
      inputAck: p.networkInputSeq || 0, actionAck: p.networkActionSeq || 0,
      borderEnteredAt: p.borderEnteredAt || 0,
      borderRemaining: p.borderRemaining || 0,
      lockTargetId: p.hostLockTargetId, lockProgress: p.hostLockProgress || 0,
      lockExpiresAt: p.hostLockExpiresAt || 0,
      lockRemaining: Math.max(0, (p.hostLockExpiresAt || 0) - performance.now())
    })) });
}

function broadcastAuthoritativeProjectiles() {
  if (!isHost) return;
  const now = performance.now();
  const age = p => Math.max(0, now - (p.born || now));
  const nearest = (items, viewer, count) => items.length <= count ? items :
    [...items].sort((a, b) =>
      (a.x - viewer.x) ** 2 + (a.y - viewer.y) ** 2 -
      ((b.x - viewer.x) ** 2 + (b.y - viewer.y) ** 2)).slice(0, count);
  const other = {
    missiles: missiles.map(m => ({ id: m.id, ownerId: m.ownerId, targetId: m.targetId, x: m.x, y: m.y, angle: m.angle, speed: m.speed, decoyed: !!m.decoyed, decoyTarget: m.decoyTarget ? { x: m.decoyTarget.x, y: m.decoyTarget.y } : null, age: age(m) })),
    bombs: bombs.map(b => ({ id: b.id, ownerId: b.ownerId, x: b.x, y: b.y, vx: b.vx, vy: b.vy, age: age(b) })),
    shrapnels: shrapnels.map(s => ({ id: s.id, ownerId: s.ownerId, x: s.x, y: s.y, prevX: s.prevX, prevY: s.prevY, vx: s.vx, vy: s.vy, age: age(s) }))
  };
  Object.entries(connections).forEach(([id, c]) => {
    if (!c?.open || !players[id]) return;
    const packet = {
      type: 'projectiles', snapshotAt: now, bulletsPartial: bullets.length > NETWORK_BULLETS_PER_SNAPSHOT,
      bullets: nearest(bullets, players[id], NETWORK_BULLETS_PER_SNAPSHOT).map(b => ({
        id: b.id, ownerId: b.ownerId, x: b.x, y: b.y, prevX: b.prevX, prevY: b.prevY,
        angle: b.angle, vx: b.vx, vy: b.vy, age: age(b)
      })), ...other
    };
    // Never build a queue of stale world corrections ahead of actions or
    // hit events. Bullet creation/removal travels independently and reliably.
    if ((c.dataChannel?.bufferedAmount || 0) > 12000) return;
    try { c.send(packet); } catch (error) {
      debugLog('PEER', 'Projectile snapshot send failed', { id, message: error?.message || String(error) });
    }
  });
}

function reconcileAuthoritativeProjectiles(data) {
  const now = performance.now();
  if (Number.isFinite(data.snapshotAt)) {
    if (data.snapshotAt <= lastProjectileSnapshotAt) return;
    lastProjectileSnapshotAt = data.snapshotAt;
  }
  const valid = (p, required) => p && p.id != null && required.every(key => Number.isFinite(p[key]));
  const sync = (kind, incoming, required, build) => {
    if (!Array.isArray(incoming)) return;
    const current = kind === 'bullet' ? bullets : kind === 'missile' ? missiles : kind === 'bomb' ? bombs : shrapnels;
    const oldById = new Map(current.map(p => [String(p.id), p]));
    const next = incoming.filter(p => valid(p, required) &&
      (kind !== 'bullet' || !seenImpactKeys.has('bullet:' + String(p.id))))
      .map(p => build(p, oldById.get(String(p.id)), now));
    if (kind === 'bullet' && (data.bulletsPartial || Number.isFinite(data.snapshotAt))) {
      const included = new Set(next.map(p => String(p.id)));
      for (const old of current) {
        // Partial snapshots omit distant bullets on purpose. Full older
        // snapshots cannot erase a fast shot fired after they were made.
        if (!seenImpactKeys.has('bullet:' + String(old.id)) && !included.has(String(old.id)) &&
            (data.bulletsPartial || old.shotAt > data.snapshotAt)) next.push(old);
      }
    }
    if (kind === 'bullet') bullets = next;
    else if (kind === 'missile') missiles = next;
    else if (kind === 'bomb') bombs = next;
    else shrapnels = next;
  };
  sync('bullet', data.bullets, ['x', 'y', 'angle', 'vx', 'vy'], (p, old, t) => ({ ...p,
    born: t - (p.age || 0), renderDx: old?.renderDx || 0, renderDy: old?.renderDy || 0,
    renderAngle: old?.renderAngle || 0, visualBorn: old?.visualBorn || 0,
    shotAt: old?.shotAt || 0
  }));
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
  if (!samePlayerId(fromId, myId) && data.id != null && !projectileExists('bullet', data.id)) {
    bullets.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, prevX: data.x, prevY: data.y, angle: data.angle, vx: Math.cos(data.angle) * BULLET_SPEED, vy: Math.sin(data.angle) * BULLET_SPEED, born: performance.now() });
    spawnExplosion(data.x, data.y, 'muzzle');
  }
  broadcast({ type: 'shoot', from: fromId, id: data.id, x: data.x, y: data.y,
    angle: data.angle, shotAt: data.shotAt });
}

function handleMissile(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.angle)) return;
  if (!samePlayerId(fromId, myId) && data.id != null && !projectileExists('missile', data.id)) {
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
  if (!samePlayerId(fromId, myId) && data.id != null && !projectileExists('bomb', data.id)) {
    bombs.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, vx: data.vx, vy: data.vy, born: performance.now() });
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'bomb', from: fromId, id: data.id, x: data.x, y: data.y, vx: data.vx, vy: data.vy });
  });
}

function handleFlare(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y)) return;
  const angle = Number.isFinite(data.angle) ? data.angle : 0;
  if (!samePlayerId(fromId, myId)) {
    spawnFlareSalvo(data.x, data.y, angle, fromId);
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'flare', from: fromId, x: data.x, y: data.y, angle });
  });
}

function handleSonicBoom(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y)) return;
  const angle = Number.isFinite(data.angle) ? data.angle : 0;
  const speed = Number.isFinite(data.speed) ? data.speed : HIGH_SPEED_THRESHOLD;
  if (!samePlayerId(fromId, myId)) triggerSonicBoom(data.x, data.y, angle, speed);
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'sonicBoom', from: fromId, x: data.x, y: data.y, angle, speed });
  });
}

function handleRemoteEffect(data) {
  if (!data || !Number.isFinite(data.x) || !Number.isFinite(data.y)) return;
  if (data.kind === 'spark') spawnExplosion(data.x, data.y, 'spark', Number.isFinite(data.angle) ? data.angle : -Math.PI / 2);
}

// A bullet or missile just hit whoever it was aimed at (data.x/y is where).
// The victim's client already removed its own copy and sent this so every
// other client's copy of that same projectile disappears with an explosion
// at the same moment, instead of lingering until it times out on its own.
function handleImpact(fromId, data) {
  if (!data || data.id == null || !['bullet', 'missile', 'bomb'].includes(data.kind) ||
      !Number.isFinite(data.x) || !Number.isFinite(data.y) || !rememberImpact(data.kind, data.id)) return;
  if (!samePlayerId(fromId, myId)) {
    if (data.kind === 'bomb') {
      const bomb = bombs.find(b => b.id === data.id);
      if (bomb) detonateBomb(bomb, data.surface);
      else {
        if (data.surface === 'water') spawnWaterWeaponImpact(data.x, data.y, 'bomb');
        else spawnExplosion(data.x, data.y, 'bomb');
        if (data.surface !== 'water') playExplosionSound('blast', data.x, data.y);
        spawnBombShrapnel(data.x, data.y, fromId);
      }
    } else {
      removeProjectileLocal(data.kind, data.id);
      if (data.kind === 'missile' && data.surface === 'water') spawnWaterWeaponImpact(data.x, data.y, 'missile');
      else spawnExplosion(data.x, data.y, data.kind === 'missile' ? 'blast' : 'spark');
    }
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'impact', from: fromId, kind: data.kind, id: data.id, x: data.x, y: data.y, surface: data.surface || null });
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
function scheduleRealtimeRetry(hostId) {
  if (realtimeRetryTimer || !peer || !connections.host?.open) return;
  const sessionPeer = peer;
  realtimeRetryTimer = setTimeout(() => {
    realtimeRetryTimer = null;
    if (peer === sessionPeer && connections.host?.open && !connections.realtime?.open) openRealtimeLink(hostId);
  }, 2500);
}

function openRealtimeLink(hostId) {
  if (!peer || !connections.host?.open || connections.realtime?.open) return;
  const sessionPeer = peer;
  let c;
  try { c = peer.connect(hostId, { label: 'flight-state', serialization: 'json', reliable: false }); }
  catch (error) {
    debugLog('PEER', 'Fast flight channel unavailable', { message: error?.message || String(error) });
    scheduleRealtimeRetry(hostId);
    return;
  }
  connections.realtime = c;
  c.on('open', () => {
    if (peer !== sessionPeer || connections.realtime !== c) { c.close(); return; }
    lastRealtimeOpenAt = performance.now();
    lastRealtimeRxAt = 0;
    debugLog('PEER', 'Fast flight channel connected');
    lastClientInputSend = 0;
    sendClientInput(performance.now());
  });
  c.on('data', data => {
    if (peer !== sessionPeer || connections.realtime !== c || !['states', 'state', 'shoot'].includes(data?.type)) return;
    if (data.type === 'states' || data.type === 'state') lastRealtimeRxAt = performance.now();
    handleClientReceive(data);
  });
  const fallback = () => {
    if (connections.realtime !== c) return;
    connections.realtime = null;
    debugLog('PEER', 'Fast flight channel lost; using reliable fallback');
    scheduleRealtimeRetry(hostId);
  };
  c.on('close', fallback);
  c.on('error', fallback);
  setTimeout(() => {
    if (peer === sessionPeer && connections.realtime === c && !c.open) {
      c.close();
      fallback();
    }
  }, 5000);
}

function startJoin() {
  resetForNewSession();
  unlockAudio();
  seenImpactKeys.clear(); lastNetworkActivityAt = performance.now();
  debugLog('SESSION', 'Starting join', { host: document.getElementById('hostIdInput').value.trim(), name: myName });
  setNetworkStatus('P2P // CONNECTING', 'warn');
  isHost = false;
  botMode = false;
  const hostId = document.getElementById('hostIdInput').value.trim();
  if (!hostId) return;
  peer = new Peer();
  peer.on('error', err => {
    debugLog('PEER', 'Join peer error', { type: err?.type, message: err?.message });
    const message = err && err.type === 'peer-unavailable'
      ? 'Room not found. Check the room code.'
      : 'Unable to connect to the network.';
    statusEl.textContent = message;
    chooseRole.style.display = 'flex'; lobby.style.display = 'none';
  });
  peer.on('disconnected', () => {
    debugLog('PEER', 'Join signaling disconnected');
    statusEl.textContent = 'Disconnected from the signaling server.';
    setNetworkStatus('P2P // SIGNAL LOST', 'bad');
  });
  peer.on('open', () => {
    debugLog('PEER', 'Join peer opened; connecting to host', { host: hostId });
    const conn = peer.connect(hostId, { reliable: true });
    connections.host = conn;
    conn.on('open', () => {
      debugLog('PEER', 'Host connection opened');
      chooseRole.style.display = 'none'; lobby.style.display = 'flex';
      statusEl.textContent = 'Connected — waiting for host...';
      setNetworkStatus('P2P // CONNECTED', 'ok');
      startBtn.style.display = 'none'; waitHint.style.display = 'block';
    });
    conn.on('data', handleClientReceive);
    conn.on('error', () => {
      debugLog('PEER', 'Host connection error');
      statusEl.textContent = 'Connection failed. Check the room code and try again.';
      setNetworkStatus('P2P // ERROR', 'bad');
      chooseRole.style.display = 'flex'; lobby.style.display = 'none';
    });
    conn.on('close', () => {
      debugLog('PEER', 'Host connection closed');
      if (started) returnToMenuAfterNetworkLoss('Host connection closed. Start or join another room.');
      else {
        statusEl.textContent = 'Host connection closed.';
        setNetworkStatus('P2P // HOST LOST', 'bad');
        chooseRole.style.display = 'flex'; lobby.style.display = 'none';
      }
    });
  });
}

function returnToMenuAfterNetworkLoss(message) {
  resetForNewSession();
  if (gameArea) gameArea.style.display = 'none';
  if (menu) menu.style.display = 'block';
  if (chooseRole) chooseRole.style.display = 'flex';
  if (lobby) lobby.style.display = 'none';
  if (startBtn) startBtn.style.display = 'none';
  if (waitHint) waitHint.style.display = 'none';
  if (statusEl) statusEl.textContent = message;
  setNetworkStatus('P2P // OFFLINE', 'bad');
}

function handleClientReceive(data) {
  lastNetworkActivityAt = performance.now();
  if (!data || typeof data.type !== 'string') return;
  if (data.type === 'full') { statusEl.textContent = 'That lobby is full.'; }
  else if (data.type === 'welcome') {
    if (!Number.isInteger(data.id) || data.id < 1 || data.id >= MAX_PLAYERS || !connections.host) return;
    myId = data.id;
    debugLog('SESSION', 'Received player assignment', { id: myId });
    players[myId] = freshPlayerState(myId, myName);
    connections.host.send({ type: 'name', name: myName });
    openRealtimeLink(connections.host.peer);
  }
  else if (data.type === 'roster') {
    if (!Array.isArray(data.roster)) return;
    data.roster.forEach(raw => {
      const id = Number(raw?.id);
      if (!Number.isInteger(id) || id < 0 || id >= MAX_PLAYERS) return;
      const p = players[id] || freshPlayerState(id, typeof raw?.name === 'string' ? raw.name : 'Player ' + (id + 1));
      Object.assign(p, raw, { id });
      players[id] = p;
    });
    if (started && !botMode) setNetworkStatus('P2P // ' + data.roster.filter(p => p.connected !== false).length + ' PILOTS', 'ok');
    renderLobby(); renderLeaderboard();
  }
  else if (data.type === 'start') {
    activeMapId = validMapId(data.mapId);
    debugLog('SESSION', 'Received match start', { map: activeMapId });
    started = true; buildClouds(); beginLocalGame();
  }
  else if (data.type === 'projectiles') {
    reconcileAuthoritativeProjectiles(data);
  }
  else if (data.type === 'effect') {
    handleRemoteEffect(data);
  }
  else if (data.type === 'states') {
    if (!Array.isArray(data.states) || data.states.length > MAX_PLAYERS) return;
    data.states.forEach(state => {
      if (state && typeof state === 'object') handleClientReceive({ ...state, type: 'state', stateSeq: data.stateSeq });
    });
  }
  else if (data.type === 'state') {
    const id = Number(data.from);
    if (!Number.isInteger(id) || id < 0 || id >= MAX_PLAYERS) return;
    if (Number.isSafeInteger(data.stateSeq)) {
      if (data.stateSeq <= (lastStateSeqByPlayer.get(id) || 0)) return;
      lastStateSeqByPlayer.set(id, data.stateSeq);
    }
    const p = players[id] = players[id] || freshPlayerState(id, 'Player ' + (id + 1));
    applyRemoteState(p, data);
  }
  else if (data.type === 'shoot') {
    if (data.id != null && Number.isFinite(data.x) && Number.isFinite(data.y) && Number.isFinite(data.angle) &&
        !projectileExists('bullet', data.id) && !seenImpactKeys.has('bullet:' + String(data.id)) &&
        (!Number.isFinite(data.shotAt) || data.shotAt > lastProjectileSnapshotAt)) {
      const b = { id: data.id, ownerId: data.from, x: data.x, y: data.y,
        prevX: data.x, prevY: data.y, angle: data.angle,
        vx: Math.cos(data.angle) * BULLET_SPEED, vy: Math.sin(data.angle) * BULLET_SPEED,
        born: performance.now(), shotAt: Number.isFinite(data.shotAt) ? data.shotAt : 0 };
      // The joiner's displayed plane is predicted between host snapshots.
      // Correct only the first frames of this bullet's drawing; its physics
      // and damage still use the host's x/y/angle.
      const owner = players[Number(data.from)];
      if (owner && Number.isFinite(owner.x) && Number.isFinite(owner.y) && Number.isFinite(owner.angle)) {
        const dx = owner.x + Math.cos(owner.angle) * 44 - b.x;
        const dy = owner.y + Math.sin(owner.angle) * 44 - b.y;
        if (Math.hypot(dx, dy) < (samePlayerId(data.from, myId) ? 350 : 180)) {
          b.renderDx = dx; b.renderDy = dy;
          b.renderAngle = angleDiff(b.angle, owner.angle);
          b.visualBorn = performance.now();
        }
      }
      bullets.push(b);
      spawnExplosion(b.x + (b.renderDx || 0), b.y + (b.renderDy || 0), 'muzzle');
      playCannonSound(data.x, data.y);
    }
  }
  else if (data.type === 'missile') {
    if (data.id != null && Number.isFinite(data.x) && Number.isFinite(data.y) && Number.isFinite(data.angle) &&
        !projectileExists('missile', data.id)) {
      const targetId = Number.isInteger(data.targetId) ? data.targetId : null;
      missiles.push({ id: data.id, ownerId: data.from, targetId, x: data.x, y: data.y, angle: data.angle, speed: Number.isFinite(data.speed) ? data.speed : MISSILE_INITIAL_SPEED, born: performance.now(), lockReadyAt: performance.now(), trail: [] });
      spawnExplosion(data.x, data.y, 'launch');
      playMissileLaunchSound(data.x, data.y);
    }
  }
  else if (data.type === 'bomb') {
    if (data.id != null && Number.isFinite(data.x) && Number.isFinite(data.y) && Number.isFinite(data.vx) && Number.isFinite(data.vy) &&
        !projectileExists('bomb', data.id)) {
      bombs.push({ id: data.id, ownerId: data.from, x: data.x, y: data.y, vx: data.vx, vy: data.vy, born: performance.now() });
    }
  }
  else if (data.type === 'flare') {
    if (Number.isFinite(data.x) && Number.isFinite(data.y)) {
      spawnFlareSalvo(data.x, data.y, Number.isFinite(data.angle) ? data.angle : 0, data.from);
    }
  }
  else if (data.type === 'sonicBoom') {
    if (Number.isFinite(data.x) && Number.isFinite(data.y)) {
      triggerSonicBoom(
        data.x, data.y,
        Number.isFinite(data.angle) ? data.angle : 0,
        Number.isFinite(data.speed) ? data.speed : HIGH_SPEED_THRESHOLD
      );
    }
  }
  else if (data.type === 'impact') {
    if (data.id != null && ['bullet', 'missile', 'bomb'].includes(data.kind) &&
        Number.isFinite(data.x) && Number.isFinite(data.y) && rememberImpact(data.kind, data.id)) {
      if (data.kind === 'bomb') {
        const bomb = bombs.find(b => b.id === data.id);
        if (bomb) detonateBomb(bomb, data.surface);
        else {
          if (data.surface === 'water') spawnWaterWeaponImpact(data.x, data.y, 'bomb');
          else spawnExplosion(data.x, data.y, 'bomb');
          if (data.surface !== 'water') playExplosionSound('blast', data.x, data.y);
          spawnBombShrapnel(data.x, data.y, data.from);
        }
      } else {
        removeProjectileLocal(data.kind, data.id);
        if (data.kind === 'missile' && data.surface === 'water') spawnWaterWeaponImpact(data.x, data.y, 'missile');
        else spawnExplosion(data.x, data.y, data.kind === 'missile' ? 'blast' : 'spark');
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
  const packet = { type: 'action', seq: clientActionSeq + 1, action };
  try {
    connections.host.send(packet);
    clientActionSeq = packet.seq;
  } catch (error) {
    debugLog('PEER', 'Action send failed', { action: action?.type, message: error?.message || String(error) });
  }
}

function sendClientInput(ts) {
  if (!isNetworkClient() || !connections.host || !connections.host.open) return;
  if (ts - lastClientInputSend < 50) return;
  const aimX = mouseX - window.innerWidth / 2;
  const aimY = mouseY - window.innerHeight / 2;
  const packet = {
    type: 'input', seq: clientInputSeq + 1,
    aimX: Number.isFinite(aimX) ? aimX : 1,
    aimY: Number.isFinite(aimY) ? aimY : 0,
    boost: !!keysHeld.boost, airbrake: !!keysHeld.airbrake, shoot: !!keysHeld.shoot
  };
  let fast = connections.realtime;
  if (fast?.open && myState && lastRealtimeOpenAt &&
      ts - (lastRealtimeRxAt || lastRealtimeOpenAt) > 3000) {
    // RTCDataChannel.open can remain true after incoming packets stop. Avoid
    // feeding input into a silent link indefinitely; the reliable connection
    // still carries the game while we establish another fast channel.
    debugLog('PEER', 'Fast flight channel stopped receiving states; reconnecting');
    connections.realtime = null;
    try { fast.close(); } catch (_) { /* the connection may already be gone */ }
    scheduleRealtimeRetry(connections.host.peer);
    fast = null;
  }
  // Skip a congested replaceable input packet. The next 50 ms sample holds
  // the latest cursor position; sending old input on the reliable channel
  // would reintroduce the multi-second steering delay.
  if (fast?.open && (fast.dataChannel?.bufferedAmount || 0) >= 8192) return;
  const channel = fast?.open ? fast : connections.host;
  try {
    channel.send(packet);
    clientInputSeq = packet.seq;
    lastClientInputSend = ts;
  } catch (error) {
    // PeerJS can report `open` for a short period after its data channel has
    // become unusable. Retry on the next frame instead of advancing the
    // sequence and falsely reporting that input was transmitted.
    if (ts - lastInputSendErrorAt > 2000) {
      lastInputSendErrorAt = ts;
      debugLog('PEER', 'Input send failed; retrying', { channel: fast?.open ? 'fast' : 'reliable', message: error?.message || String(error) });
    }
  }
}
window.addEventListener('blur', resetAllInput);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetAllInput(); });

function wireKeyboard() {
  if (keyboardWired) return;
  keyboardWired = true;
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
  if (mouseWired) return;
  mouseWired = true;
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
  if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.angle)) return;
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
  const visible = clamp(1 - (performance.now() - (b.visualBorn || 0)) / 300, 0, 1);
  const bx = b.x + (b.renderDx || 0) * visible;
  const by = b.y + (b.renderDy || 0) * visible;
  const angle = b.angle + (b.renderAngle || 0) * visible;
  ctx.save();
  ctx.strokeStyle = b.ownerId === myId ? 'rgba(255,244,155,.7)' : 'rgba(255,125,90,.55)';
  ctx.lineWidth = 1; ctx.lineCap = 'round';
  const tail = 9;
  ctx.beginPath(); ctx.moveTo(bx - Math.cos(angle) * tail, by - Math.sin(angle) * tail); ctx.lineTo(bx, by); ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate(angle);
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
  ctx.scale(1.25, 1.25);
  ctx.shadowColor = '#ff9d5c'; ctx.shadowBlur = 15;
  ctx.fillStyle = '#1b2934'; ctx.strokeStyle = '#d3e7ed'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.ellipse(0, 0, 8, 4.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ff9d5c';
  ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-22, 0); ctx.lineTo(-7, 3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffd08a';
  ctx.beginPath(); ctx.moveTo(5, -3); ctx.lineTo(-1, -9); ctx.lineTo(-5, -3); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(5, 3); ctx.lineTo(-1, 9); ctx.lineTo(-5, 3); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,231,171,.8)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-1, -2); ctx.lineTo(6, -2); ctx.stroke();
  ctx.restore();
}

function drawFlare(ctx, f, now) {
  if (!f || !Number.isFinite(f.x) || !Number.isFinite(f.y) || !Number.isFinite(f.born)) return;
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
  if (!cfg || !Number.isFinite(e.x) || !Number.isFinite(e.y) || !Number.isFinite(e.born)) return;
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

function drawGround(ctx, startX = 0, endX = WORLD_W) {
  const grad = ctx.createLinearGradient(0, GROUND_Y, 0, WORLD_H);
  grad.addColorStop(0, '#3f8c91');
  grad.addColorStop(.35, '#246875');
  grad.addColorStop(1, '#102f42');
  ctx.fillStyle = grad;
  const step = 120;
  const first = Math.floor((startX - step) / step) * step;
  const last = Math.ceil((endX + step) / step) * step;
  const bottom = WORLD_H + BORDER_FOG_DEPTH;
  const waveHeight = x => waterSurfaceY(x) - GROUND_Y;
  ctx.beginPath();
  ctx.moveTo(first, bottom);
  ctx.lineTo(first, GROUND_Y + waveHeight(first));
  for (let x = first + step; x <= last; x += step) {
    ctx.lineTo(x, GROUND_Y + waveHeight(x));
  }
  ctx.lineTo(last, bottom);
  ctx.closePath();
  ctx.fill();

  // Wave-line highlight along the surface
  ctx.strokeStyle = 'rgba(173,238,226,0.30)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = first; x <= last; x += step) {
    const h = waveHeight(x);
    if (x === first) ctx.moveTo(x, GROUND_Y + h); else ctx.lineTo(x, GROUND_Y + h);
  }
  ctx.stroke();

  // A couple of fainter, slightly submerged wave lines for texture
  ctx.strokeStyle = 'rgba(173,238,226,0.11)';
  ctx.lineWidth = 1.5;
  [18, 40].forEach((depth, di) => {
    ctx.beginPath();
    for (let x = first; x <= last; x += step) {
      const h = 0;
      if (x === first) ctx.moveTo(x, GROUND_Y + depth + h); else ctx.lineTo(x, GROUND_Y + depth + h);
    }
    ctx.stroke();
  });
}

function drawCityWorldMap(ctx, start, end) {
  // Keep the city anchored in world space so it follows the camera naturally
  // instead of behaving like a fixed overlay or a border strip.
  const first = Math.floor((start - 260) / 132) * 132;
  const backBase = GROUND_Y - 220;
  const frontBase = GROUND_Y - 70;
  const drawLayer = (base, layer, color, windowColor) => {
    for (let x = first; x <= end + 260; x += 132) {
      const seed = Math.abs(Math.sin(x * .017 + layer * 2.3));
      const width = 64 + Math.abs(Math.sin(x * .031 + layer)) * 46;
      const height = (95 + seed * 160 + Math.abs(Math.sin(x * .009)) * 90) * layer;
      const y = base - height;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height + 90);
      ctx.fillStyle = 'rgba(104,224,221,.16)';
      ctx.fillRect(x + 9, y + 13, 3, Math.max(12, height - 20));
      ctx.fillRect(x + width - 12, y + 13, 3, Math.max(12, height - 20));
      ctx.fillStyle = windowColor;
      const rows = Math.floor(height / 30);
      for (let row = 0; row < rows; row++) {
        if ((Math.floor(x / 132) + row * 3) % 4 < 2) {
          ctx.fillRect(x + 18, y + 18 + row * 30, Math.max(7, width - 34), 4);
        }
      }
    }
  };
  drawLayer(backBase, .72, 'rgba(9,34,48,.68)', 'rgba(255,205,108,.18)');
  drawLayer(frontBase, 1, 'rgba(6,25,39,.9)', 'rgba(255,205,108,.34)');
  ctx.fillStyle = 'rgba(7,22,32,.65)';
  ctx.fillRect(first, GROUND_Y - 42, end - first + 260, 44);
}

function mapHash01(index, salt = 0) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function canyonMesaLayout(index) {
  const cell = 720;
  const r1 = mapHash01(index, 4), r2 = mapHash01(index, 9), r3 = mapHash01(index, 14);
  const gap = 132 + r1 * 58;
  const x = index * cell + gap * .5;
  const width = cell - gap - 26;
  const base = GROUND_Y + 230;
  const height = 310 + r2 * 300;
  return { x, width, base, height, top: base - height, r1, r2, r3 };
}

function drawCanyonWorldMap(ctx, start, end) {
  // A distant, continuous canyon wall makes the open passes between nearer
  // mesas readable. It is scenery behind the flight area, like the city
  // skyline; the only physical lower boundary remains the flat waterline.
  const step = 96;
  const first = Math.floor((start - step) / step) * step;
  const last = Math.ceil((end + step) / step) * step;
  const farBase = GROUND_Y + 170;
  const farTop = x => farBase - (480 + Math.sin(x * .00155) * 125 +
    Math.sin(x * .0041 + 1.7) * 72 + Math.sin(x * .0103) * 24);

  ctx.beginPath();
  ctx.moveTo(first, farBase);
  for (let x = first; x <= last; x += step) ctx.lineTo(x, farTop(x));
  ctx.lineTo(last, WORLD_H + 180);
  ctx.lineTo(first, WORLD_H + 180);
  ctx.closePath();
  const farFill = ctx.createLinearGradient(0, GROUND_Y - 760, 0, farBase);
  farFill.addColorStop(0, '#9a5a4d');
  farFill.addColorStop(.42, '#75463f');
  farFill.addColorStop(1, '#372d36');
  ctx.fillStyle = farFill;
  ctx.fill();

  // Long broken strata follow the distant rock face instead of reading as
  // arbitrary horizontal stripes.
  [.24, .43, .63, .81].forEach((fraction, band) => {
    ctx.beginPath();
    for (let x = first; x <= last; x += step) {
      const y = farTop(x) + (farBase - farTop(x)) * fraction +
        Math.sin(x * (.003 + band * .0003) + band * 1.8) * 13;
      if (x === first) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = band % 2 === 0 ? 'rgba(237,166,116,.16)' : 'rgba(30,27,35,.22)';
    ctx.lineWidth = band === 1 ? 8 : 4;
    ctx.stroke();
  });
  ctx.beginPath();
  for (let x = first; x <= last; x += step) {
    if (x === first) ctx.moveTo(x, farTop(x)); else ctx.lineTo(x, farTop(x));
  }
  ctx.strokeStyle = 'rgba(255,197,145,.34)'; ctx.lineWidth = 3; ctx.stroke();

  // The nearer mesas are deliberately separated. Their wide gaps create
  // obvious flight lanes, while the far wall visible through each gap gives
  // the canyon depth. A little seed-based variation keeps the silhouette
  // irregular but identical on every frame and every player's machine.
  const cell = 720;
  const firstCell = Math.floor(start / cell) - 1;
  const lastCell = Math.ceil(end / cell) + 1;
  for (let i = firstCell; i <= lastCell; i++) {
    const { x, width, base, height, top, r1, r3 } = canyonMesaLayout(i);
    const points = [
      [x, base], [x, top + height * .34], [x + width * .09, top + height * .23],
      [x + width * .18, top + height * .12], [x + width * .31, top + height * .08],
      [x + width * .43, top + height * .13], [x + width * .54, top + height * .025],
      [x + width * .67, top + height * .09], [x + width * .78, top + height * .06],
      [x + width * .91, top + height * .22], [x + width, top + height * .31],
      [x + width, base]
    ];
    const traceMesa = () => {
      ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
      for (let p = 1; p < points.length; p++) ctx.lineTo(points[p][0], points[p][1]);
      ctx.closePath();
    };
    traceMesa();
    const face = ctx.createLinearGradient(0, top, 0, base);
    face.addColorStop(0, r3 > .5 ? '#bd7152' : '#a95c48');
    face.addColorStop(.34, '#85483f');
    face.addColorStop(1, '#392e38');
    ctx.fillStyle = face; ctx.fill();

    // Clipped sediment shelves sit inside the mesa faces and follow the
    // blocky erosion profile without crossing the open flight gaps.
    ctx.save(); traceMesa(); ctx.clip();
    for (let band = 1; band <= 4; band++) {
      const y = top + height * (.23 + band * .145);
      const wobble = 8 + band * 2;
      ctx.beginPath();
      ctx.moveTo(x - 8, y + Math.sin(i * 1.3 + band) * wobble);
      ctx.lineTo(x + width * .22, y - wobble * .45);
      ctx.lineTo(x + width * .47, y + wobble * .5);
      ctx.lineTo(x + width * .74, y - wobble * .28);
      ctx.lineTo(x + width + 8, y + Math.cos(i + band) * wobble);
      ctx.strokeStyle = band % 2 ? 'rgba(238,166,113,.27)' : 'rgba(36,28,35,.30)';
      ctx.lineWidth = band === 2 ? 7 : 4; ctx.stroke();
    }
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(points[1][0], points[1][1]);
    for (let p = 2; p <= 10; p++) ctx.lineTo(points[p][0], points[p][1]);
    ctx.strokeStyle = 'rgba(255,196,143,.38)'; ctx.lineWidth = 3; ctx.stroke();
    // Narrow shaded clefts add scale to the broad, open mesas.
    const cleftX = x + width * (.25 + r1 * .48);
    ctx.beginPath(); ctx.moveTo(cleftX, top + height * .18);
    ctx.lineTo(cleftX - 15, top + height * .55);
    ctx.lineTo(cleftX + 9, base - 30);
    ctx.strokeStyle = 'rgba(29,28,37,.27)'; ctx.lineWidth = 12; ctx.stroke();
  }

  // A dusty horizon glow separates the rust-colored ridges from the sky.
  const glowX = WORLD_W * .28, glowY = GROUND_Y - 630;
  if (glowX > start - 420 && glowX < end + 420) {
    const glow = ctx.createRadialGradient(glowX, glowY, 12, glowX, glowY, 420);
    glow.addColorStop(0, 'rgba(255,190,132,.20)');
    glow.addColorStop(1, 'rgba(255,153,108,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(glowX, glowY, 420, 0, Math.PI * 2); ctx.fill();
  }
}

function drawStormBackdrop(ctx, now, camX, camY, viewW, viewH) {
  // Distant squall shelves sit behind aircraft and foreground concealment.
  // Their positions are world-anchored, so they do not slide with the camera.
  const firstCell = Math.floor((camX - 800) / 1800);
  const lastCell = Math.ceil((camX + viewW + 800) / 1800);
  for (let i = firstCell; i <= lastCell; i++) {
    const centerX = i * 1800 + 900;
    const centerY = 1350 + mapHash01(i, 22) * 1200;
    const rx = 580 + mapHash01(i, 29) * 230;
    const ry = 250 + mapHash01(i, 31) * 130;
    if (centerY + ry < camY - 80 || centerY - ry > camY + viewH + 80) continue;
    ctx.save();
    const cloud = ctx.createRadialGradient(centerX, centerY - ry * .18, 30,
      centerX, centerY, rx);
    cloud.addColorStop(0, 'rgba(11,24,40,.54)');
    cloud.addColorStop(.48, 'rgba(20,39,57,.39)');
    cloud.addColorStop(1, 'rgba(37,59,75,0)');
    ctx.fillStyle = cloud;
    ctx.beginPath(); ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
    // A broken scalloped crest gives the squall a recognizable shelf-cloud
    // profile without layering obvious perfect circles over the scene.
    ctx.beginPath();
    ctx.moveTo(centerX - rx * .92, centerY + ry * .24);
    ctx.bezierCurveTo(centerX - rx * 1.02, centerY - ry * .02,
      centerX - rx * .70, centerY - ry * .18, centerX - rx * .58, centerY - ry * .39);
    ctx.bezierCurveTo(centerX - rx * .49, centerY - ry * .62,
      centerX - rx * .23, centerY - ry * .58, centerX - rx * .17, centerY - ry * .31);
    ctx.bezierCurveTo(centerX - rx * .02, centerY - ry * .77,
      centerX + rx * .27, centerY - ry * .73, centerX + rx * .34, centerY - ry * .35);
    ctx.bezierCurveTo(centerX + rx * .51, centerY - ry * .61,
      centerX + rx * .77, centerY - ry * .46, centerX + rx * .76, centerY - ry * .15);
    ctx.bezierCurveTo(centerX + rx * 1.02, centerY - ry * .09,
      centerX + rx * .99, centerY + ry * .20, centerX + rx * .86, centerY + ry * .28);
    ctx.quadraticCurveTo(centerX, centerY + ry * .62, centerX - rx * .92, centerY + ry * .24);
    ctx.closePath();
    ctx.fillStyle = 'rgba(17,32,49,.24)'; ctx.fill();
    ctx.strokeStyle = 'rgba(164,199,216,.11)'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - rx * .83, centerY + ry * .12);
    ctx.bezierCurveTo(centerX - rx * .70, centerY - ry * .18,
      centerX - rx * .55, centerY - ry * .54, centerX - rx * .40, centerY - ry * .40);
    ctx.bezierCurveTo(centerX - rx * .22, centerY - ry * .60,
      centerX - rx * .12, centerY - ry * .16, centerX - rx * .02, centerY - ry * .43);
    ctx.bezierCurveTo(centerX + rx * .12, centerY - ry * .68,
      centerX + rx * .28, centerY - ry * .54, centerX + rx * .39, centerY - ry * .23);
    ctx.bezierCurveTo(centerX + rx * .57, centerY - ry * .50,
      centerX + rx * .70, centerY - ry * .36, centerX + rx * .78, centerY - ry * .08);
    ctx.stroke();
    ctx.restore();
  }

  // Sparse, low-contrast rain gives the front motion without washing out the
  // sight picture. It is decorative only and does not change flight physics.
  const rainStepX = 118, rainStepY = 154;
  const rainStartX = Math.floor(camX / rainStepX) * rainStepX;
  const rainEndX = camX + viewW;
  const rainStartY = Math.floor(camY / rainStepY) * rainStepY;
  const rainEndY = camY + viewH;
  ctx.save(); ctx.beginPath(); ctx.rect(camX, camY, viewW, viewH); ctx.clip();
  ctx.strokeStyle = 'rgba(190,218,235,.105)'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
  ctx.beginPath();
  for (let x = rainStartX; x <= rainEndX; x += rainStepX) {
    for (let y = rainStartY; y <= rainEndY; y += rainStepY) {
      const seed = mapHash01(x / rainStepX + y / rainStepY * 43, 7);
      const drift = (now * .045 + seed * rainStepY) % rainStepY;
      const rx = x + (seed - .5) * 52 + drift * .12;
      const ry = y + drift;
      ctx.moveTo(rx, ry); ctx.lineTo(rx - 20, ry + 56);
    }
  }
  ctx.stroke(); ctx.restore();

  // Lightning occurs in the far distance on staggered cycles. The flash is
  // brief and restrained, and never covers the whole screen at once.
  const strikes = [WORLD_W * .17, WORLD_W * .48, WORLD_W * .79];
  strikes.forEach((x, i) => {
    const y = 1700 + mapHash01(i, 45) * 900;
    if (x < camX - 100 || x > camX + viewW + 100 || y + 450 < camY || y > camY + viewH + 120) return;
    const phase = (now + i * 3671) % 12600;
    const flash = phase < 95 ? 1 - phase / 95 :
      (phase >= 185 && phase < 245 ? .38 * (1 - (phase - 185) / 60) : 0);
    if (flash <= .015) return;
    const length = 240 + mapHash01(i, 52) * 190;
    const bend = (mapHash01(i, 61) - .5) * 130;
    ctx.save(); ctx.globalAlpha = flash * .62;
    const glow = ctx.createRadialGradient(x, y + length * .38, 4,
      x, y + length * .38, 260);
    glow.addColorStop(0, 'rgba(138,204,255,.22)');
    glow.addColorStop(1, 'rgba(91,157,230,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y + length * .38, 260, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#b9e5ff'; ctx.lineWidth = 3; ctx.shadowColor = '#86c9ff'; ctx.shadowBlur = 18;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bend * .25, y + length * .24);
    ctx.lineTo(x - bend * .18, y + length * .43); ctx.lineTo(x + bend, y + length * .66);
    ctx.lineTo(x + bend * .62, y + length); ctx.stroke();
    ctx.lineWidth = 1.2; ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(240,250,255,.95)';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bend * .25, y + length * .24);
    ctx.lineTo(x - bend * .18, y + length * .43); ctx.lineTo(x + bend, y + length * .66);
    ctx.lineTo(x + bend * .62, y + length); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - bend * .18, y + length * .43);
    ctx.lineTo(x - 74, y + length * .52); ctx.lineTo(x - 104, y + length * .69); ctx.stroke();
    ctx.restore();
  });
}

function drawSkyBackdrop(ctx, camX, camY, W, H) {
  // Signature backgrounds are world-anchored so scenery scrolls naturally
  // with the arena while the sky remains uncluttered around the aircraft.
  const sunX = WORLD_W * .72, sunY = 560;
  if (activeMapId === 'city' && sunX > camX - 220 && sunX < camX + W + 220 && sunY > camY - 220 && sunY < camY + H + 220) {
    const sun = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 210);
    sun.addColorStop(0, 'rgba(255,246,190,.9)'); sun.addColorStop(.18, 'rgba(255,215,120,.35)'); sun.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(sunX, sunY, 210, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,246,200,.85)'; ctx.beginPath(); ctx.arc(sunX, sunY, 34, 0, Math.PI * 2); ctx.fill();
  }
  if (activeMapId === 'city') {
    const start = Math.floor((camX - 260) / 132) * 132;
    const end = camX + W + 260;
    drawCityWorldMap(ctx, start, end);
  } else if (activeMapId === 'canyon') {
    drawCanyonWorldMap(ctx, camX - 220, camX + W + 220);
  } else if (activeMapId === 'storm') {
    drawStormBackdrop(ctx, performance.now(), camX, camY, W, H);
  }
}

function drawCloudBanks(ctx, now, camX, camY, viewW, viewH) {
  cloudBanks.forEach((b, index) => {
    if (b.x + b.rx < camX - 80 || b.x - b.rx > camX + viewW + 80 ||
        b.y + b.ry < camY - 80 || b.y - b.ry > camY + viewH + 80) return;
    ctx.save();
    ctx.translate(b.x, b.y);
    const pulse = .96 + Math.sin(now / 900 + index) * .04;
    ctx.scale(pulse, 1);
    const g = ctx.createRadialGradient(0, -b.ry * .12, b.ry * .08, 0, 0, b.rx);
    if (activeMapId === 'storm') {
      g.addColorStop(0, `rgba(34,49,66,${b.alpha})`);
      g.addColorStop(.55, `rgba(68,88,104,${b.alpha * .86})`);
      g.addColorStop(1, 'rgba(96,123,140,0)');
    } else if (activeMapId === 'canyon') {
      g.addColorStop(0, `rgba(246,218,184,${b.alpha * .8})`);
      g.addColorStop(.55, `rgba(211,169,144,${b.alpha * .7})`);
      g.addColorStop(1, 'rgba(177,127,111,0)');
    } else {
      g.addColorStop(0, `rgba(239,252,250,${b.alpha})`);
      g.addColorStop(.55, `rgba(201,231,232,${b.alpha * .78})`);
      g.addColorStop(1, 'rgba(165,205,211,0)');
    }
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, 0, b.rx, b.ry, 0, 0, Math.PI * 2); ctx.fill();
    const bankHighlight = activeMapId === 'storm' ? 'rgba(174,207,223,' :
      activeMapId === 'canyon' ? 'rgba(255,229,194,' : 'rgba(241,255,253,';
    const highlightAlpha = b.alpha * (activeMapId === 'storm' ? .10 : activeMapId === 'canyon' ? .2 : .28);
    ctx.fillStyle = `${bankHighlight}${highlightAlpha})`;
    ctx.beginPath(); ctx.ellipse(-b.rx * .28, -b.ry * .15, b.rx * .34, b.ry * .42, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(b.rx * .2, -b.ry * .08, b.rx * .42, b.ry * .35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  });
}

function drawFogPuff(ctx, x, y, rx, ry, phase) {
  const breathe = .82 + Math.sin(phase) * .12;
  const haze = ctx.createRadialGradient(x - rx * .16, y - ry * .12, rx * .04, x, y, rx);
  haze.addColorStop(0, `rgba(230,242,245,${.19 * breathe})`);
  haze.addColorStop(.32, `rgba(205,224,231,${.13 * breathe})`);
  haze.addColorStop(.68, `rgba(174,202,214,${.055 * breathe})`);
  haze.addColorStop(1, 'rgba(158,191,207,0)');
  ctx.fillStyle = haze;
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
}

function drawBoundaryFog(ctx, now, camX, camY, viewW, viewH) {
  const edge = BORDER_FOG_DEPTH;
  const pulse = .9 + Math.sin(now / 880) * .04;
  const solid = `rgba(202,222,229,${.78 * pulse})`;
  const soft = `rgba(198,221,229,${.23 * pulse})`;
  const clear = 'rgba(205,226,225,0)';
  const extra = 220;
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';

  // The playable border is the clear edge of each gradient. Fog begins at
  // x/y = 0 or WORLD_W/H and becomes denser as the camera looks farther into
  // the outside buffer. The fill extents follow the visible camera only to
  // cover the whole screen; the gradients themselves stay world-anchored.
  if (camX < edge) {
    const start = camX - extra;
    const width = Math.max(0, -start);
    if (width > 0) {
      const g = ctx.createLinearGradient(-edge, 0, 0, 0);
      g.addColorStop(0, solid); g.addColorStop(.65, soft); g.addColorStop(1, clear);
      ctx.fillStyle = g; ctx.fillRect(start, camY - extra, width, viewH + extra * 2);
    }
  }
  if (camX + viewW > WORLD_W - edge) {
    const end = camX + viewW + extra;
    const width = Math.max(0, end - WORLD_W);
    if (width > 0) {
      const g = ctx.createLinearGradient(WORLD_W, 0, WORLD_W + edge, 0);
      g.addColorStop(0, clear); g.addColorStop(.35, soft); g.addColorStop(1, solid);
      ctx.fillStyle = g; ctx.fillRect(WORLD_W, camY - extra, width, viewH + extra * 2);
    }
  }
  if (camY < edge) {
    const start = camY - extra;
    const height = Math.max(0, -start);
    if (height > 0) {
      const g = ctx.createLinearGradient(0, -edge, 0, 0);
      g.addColorStop(0, solid); g.addColorStop(.65, soft); g.addColorStop(1, clear);
      ctx.fillStyle = g; ctx.fillRect(camX - extra, start, viewW + extra * 2, height);
    }
  }

  // Layered, irregular billows add structure to the fog while staying wholly
  // outside the playable rectangle. Their centers are world anchored, so the
  // haze stays on the map edge instead of following the camera.
  const drift = now * .00016;
  const firstY = Math.floor((camY - 180) / 210) * 210;
  for (let y = firstY, i = 0; y <= camY + viewH + 180; y += 210, i++) {
    const phase = i * 1.73 + drift;
    if (camX < edge) {
      const rx = edge * (.48 + .035 * Math.sin(i * 2.1));
      drawFogPuff(ctx, -rx + 3, y + Math.sin(phase) * 24, rx, 105 + (i % 3) * 17, phase);
    }
    if (camX + viewW > WORLD_W - edge) {
      const rx = edge * (.48 + .035 * Math.cos(i * 1.9));
      drawFogPuff(ctx, WORLD_W + rx - 3, y + Math.cos(phase * .83) * 22, rx, 112 + (i % 2) * 19, phase + 1.2);
    }
  }
  const firstX = Math.floor((camX - 180) / 230) * 230;
  for (let x = firstX, i = 0; x <= camX + viewW + 180; x += 230, i++) {
    const phase = i * 1.51 - drift;
    if (camY < edge) {
      const ry = edge * (.46 + .035 * Math.sin(i * 2.4));
      drawFogPuff(ctx, x + Math.sin(phase) * 24, -ry + 3, edge * (.45 + (i % 2) * .04), ry, phase + .6);
    }
  }

  // Fine, low contrast filaments break up the smooth gradient. The sea remains
  // the only lower boundary, with no fog strip or bottom wall.
  ctx.globalAlpha = .105 + Math.sin(now / 510) * .018;
  ctx.strokeStyle = '#e4f0f3'; ctx.lineWidth = 2;
  const filamentY0 = Math.floor((camY - 120) / 145) * 145;
  if (camX < edge || camX + viewW > WORLD_W - edge) {
    for (let y = filamentY0; y < camY + viewH + 150; y += 145) {
      if (camX < edge) {
        ctx.beginPath(); ctx.moveTo(-edge * .92, y);
        ctx.bezierCurveTo(-edge * .72, y - 36, -edge * .28, y + 38, -3, y + Math.sin(y * .03 + drift) * 18);
        ctx.stroke();
      }
      if (camX + viewW > WORLD_W - edge) {
        ctx.beginPath(); ctx.moveTo(WORLD_W + 3, y);
        ctx.bezierCurveTo(WORLD_W + edge * .28, y + 36, WORLD_W + edge * .72, y - 38,
          WORLD_W + edge * .92, y + Math.cos(y * .025 + drift) * 18);
        ctx.stroke();
      }
    }
  }
  if (camY < edge) {
    for (let x = firstX; x < camX + viewW + 180; x += 165) {
      ctx.beginPath(); ctx.moveTo(x, -edge * .92);
      ctx.bezierCurveTo(x - 34, -edge * .7, x + 38, -edge * .28,
        x + Math.sin(x * .021 + drift) * 16, -3);
      ctx.stroke();
    }
  }
  ctx.restore();
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

function drawFallbackCrosshair(ctx, now) {
  if (!myState) return;
  const x = clamp(mouseX, 18, window.innerWidth - 18);
  const y = clamp(mouseY, 18, window.innerHeight - 18);
  const boosting = !!keysHeld.boost && myState.boost > 0 && myState.alive !== false;
  const pulse = 1 + Math.sin(now / 160) * .06;
  const color = boosting ? '#9cf3ed' : 'rgba(188,239,255,.94)';
  const glow = boosting ? 'rgba(100,235,255,.65)' : 'rgba(150,235,255,.58)';
  const gap = 8 * pulse, arm = 15 * pulse, radius = 19;
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.shadowColor = glow; ctx.shadowBlur = 8; ctx.lineWidth = 1.35; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-gap - arm, 0); ctx.lineTo(-gap, 0); ctx.moveTo(gap, 0); ctx.lineTo(gap + arm, 0);
  ctx.moveTo(0, -gap - arm); ctx.lineTo(0, -gap); ctx.moveTo(0, gap); ctx.lineTo(0, gap + arm); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 2.2, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.font = '8px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText('GO', 0, 34); ctx.restore();
}

function drawCrosshair(ctx, now, camX, camY, viewScale) {
  if (!started || !myState) return;
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
  }

  // Keep the blue mouse crosshair visible even while the red lock reticle is active.
  drawFallbackCrosshair(ctx, now);
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
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return;
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

  const palette = MAP_PALETTES[activeMapId] || MAP_PALETTES.city;
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, palette[0]); grad.addColorStop(.46, palette[1]); grad.addColorStop(1, palette[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Atmospheric bands make the arena feel deeper before the camera moves.
  const glow = ctx.createRadialGradient(W * .7, H * .25, 0, W * .7, H * .25, H * .75);
  glow.addColorStop(0, activeMapId === 'storm' ? 'rgba(100,150,255,.12)' : 'rgba(115,224,210,.13)'); glow.addColorStop(1, 'rgba(115,224,210,0)');
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
    if (c.x < camX - c.rx * 1.5 || c.x > camX + viewW + c.rx * 1.5 ||
        c.y < camY - c.ry * 2 || c.y > camY + viewH + c.ry * 2) return;
    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.tilt);
    const cloud = ctx.createRadialGradient(-c.rx * .12, -c.ry * .2, c.ry * .08, 0, 0, c.rx);
    cloud.addColorStop(0, `rgba(245,252,255,${c.a})`);
    cloud.addColorStop(.58, `rgba(208,229,239,${c.a * .66})`);
    cloud.addColorStop(1, 'rgba(180,211,228,0)');
    ctx.fillStyle = cloud;
    ctx.beginPath(); ctx.ellipse(0, 0, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(247,252,255,${c.a * .34})`;
    ctx.beginPath();
    ctx.ellipse(-c.rx * .2, -c.ry * .08, c.rx * c.lobe, c.ry * .72, 0, 0, Math.PI * 2);
    ctx.ellipse(c.rx * .28, c.ry * .04, c.rx * c.lobe * .78, c.ry * .62, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.restore();
  });

  drawSkyBackdrop(ctx, camX, camY, viewW, viewH);

  drawGround(ctx, camX - BORDER_FOG_DEPTH - 180, camX + viewW + BORDER_FOG_DEPTH + 180);
  highSpeedWake.draw(ctx);

  flares.forEach(f => drawFlare(ctx, f, now));
  bullets.forEach(b => drawBullet(ctx, b));
  missiles.forEach(m => drawMissile(ctx, m));
  bombs.forEach(b => drawBomb(ctx, b));
  shrapnels.forEach(s => drawShrapnel(ctx, s));

  Object.values(players).forEach(p => {
    if (p.id === myId) return;
    if (p.connected === false) return;
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.angle)) return;
    drawPlane(ctx, p, false, now);
  });
  drawPlane(ctx, myState, true, now);

  explosions.forEach(e => drawExplosion(ctx, e, now));
  specialEffects.forEach(e => { if (e && typeof e.draw === 'function') e.draw(ctx); });
  // Cloud banks remain the only foreground concealment layer.
  drawCloudBanks(ctx, now, camX, camY, viewW, viewH);
  drawBoundaryFog(ctx, now, camX, camY, viewW, viewH);

  ctx.restore();

  drawMinimap(now);
  drawFlightReticles(ctx, now, camX, camY, viewScale);
  drawAimAssist(ctx, now, camX, camY, viewScale);
  drawEnemyDirectionArrows(ctx, now, camX, camY, viewScale);
  try {
    drawCrosshair(ctx, now, camX, camY, viewScale);
  } catch (error) {
    // Keep the steering reticle visible if a transient target/render value is
    // malformed. The rest of the frame remains usable and the error is still
    // reported by the outer frame guard.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    drawFallbackCrosshair(ctx, now);
  }
}

function drawMinimap(now) {
  const ctx = miniCtx, W = miniCanvas.width, H = miniCanvas.height;
  const scaleX = W / WORLD_W, scaleY = H / WORLD_H;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,30,50,0.4)';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(31,95,143,0.7)';
  ctx.fillRect(0, GROUND_Y * scaleY, W, H - GROUND_Y * scaleY);

  if (activeMapId === 'canyon') {
    // The minimap uses the same deterministic mesa layout as the world art,
    // so the visible canyon passes line up with their strategic overview.
    for (let i = 0; i <= Math.ceil(WORLD_W / 720); i++) {
      const mesa = canyonMesaLayout(i);
      const x = mesa.x * scaleX, width = mesa.width * scaleX;
      const baseY = GROUND_Y * scaleY, topY = mesa.top * scaleY;
      ctx.fillStyle = 'rgba(177,91,69,.76)';
      ctx.fillRect(x, topY, width, baseY - topY);
      ctx.fillStyle = 'rgba(255,194,142,.6)';
      ctx.fillRect(x, topY, width, 1.2);
    }
  }
  if (activeMapId === 'canyon' || activeMapId === 'storm') {
    ctx.save();
    ctx.fillStyle = activeMapId === 'storm' ? 'rgba(145,180,198,.55)' : 'rgba(255,220,187,.5)';
    cloudBanks.forEach(bank => {
      ctx.beginPath();
      ctx.ellipse(bank.x * scaleX, bank.y * scaleY,
        Math.max(2, bank.rx * scaleX), Math.max(1.5, bank.ry * scaleY), 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  Object.values(players).forEach(p => {
    if (p.connected === false || p.alive === false) return;
    ctx.fillStyle = p.id === myId ? '#fff' : (p.color || colorFor(p.id));
    ctx.beginPath();
    ctx.arc(p.x * scaleX, p.y * scaleY, p.id === myId ? 3 : 2.2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function interpolateRemotePlayers(dtSec) {
  // Host coordinates are authoritative physics and must never be eased back
  // toward an old network target (freshPlayerState seeds tx at spawn).
  if (isHost) return;
  const t = Math.min(1, REMOTE_SMOOTH * dtSec);
  Object.values(players).forEach(p => {
    if (samePlayerId(p.id, myId) || p.isBot || p.connected === false || p.tx === undefined) return;
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
  resetAllInput();
  menu.style.display = 'none'; gameArea.style.display = 'block';
  myState = createLocalState();
  players[myId] = myState;
  wireKeyboard();
  wireMouse();
  resizeCanvas();
  if (!resizeWired) {
    resizeWired = true;
    window.addEventListener('resize', resizeCanvas);
  }
  // Send the first control state immediately. This prevents a newly joined
  // pilot from waiting for the next animation/input interval before the host
  // starts simulating its aircraft.
  if (isNetworkClient()) {
    // A channel opened in the lobby has no snapshots until the match starts.
    // Start its liveness clock with the first playable frame.
    if (connections.realtime?.open) lastRealtimeOpenAt = performance.now();
    lastClientInputSend = 0;
    sendClientInput(performance.now());
    // Input must not depend on the render frame rate. In a busy tab the
    // camera can draw slowly while this timer still feeds the host controls.
    if (clientInputTimer) clearInterval(clientInputTimer);
    clientInputTimer = setInterval(() => sendClientInput(performance.now()), 50);
  }
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
      debugLog('RUNTIME', 'Frame recovered after error', { message: error?.message || String(error) });
    }
    requestAnimationFrame(loop);
  }
}

function loopFrame(ts) {
  // A host-loss reset intentionally clears myState and stops the old sortie.
  // Exit before HUD/physics code touches the cleared state; a new match will
  // create a fresh animation loop through beginLocalGame().
  if (!started || !myState) return;
  updateDebugPanel(ts);
  const dt = Math.min(lastTime ? ts - lastTime : 16, 60);
  lastTime = ts;
  const dtSec = dt / 1000;
  screenShake = Math.max(0, screenShake - dtSec * 34);
  recoilKick = Math.max(0, recoilKick - dtSec * 28);
  if (isHost || botMode) updateLocalPlane(dtSec, keysHeld);
  // Joiner input is sent by its own timer, independent of rendering.
  if (isNetworkClient()) updateClientVisualPlane(dtSec);
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
  updateHighSpeedWake(dtSec);
  pruneFlares(ts);
  pruneExplosions(ts);
  if (ts - lastBroadcast > 66) {
    lastBroadcast = ts;
    if (isHost) broadcastAuthoritativeSnapshot();
  }
  if (isHost && ts - lastProjectileBroadcast > NETWORK_PROJECTILE_SNAPSHOT_MS) {
    lastProjectileBroadcast = ts;
    broadcastAuthoritativeProjectiles();
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

  updateBoundaryWarningUI();

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
  mapSelectEl = document.getElementById('mapSelect');
  mapSelectEl.addEventListener('change', () => { selectedMapId = validMapId(mapSelectEl.value); });
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
  boundaryWarningEl = document.getElementById('boundaryWarning');
  boundaryTimerEl = document.getElementById('boundaryTimer');
  debugPanelEl = document.getElementById('debugPanel');
  debugSummaryEl = document.getElementById('debugSummary');
  debugLogEl = document.getElementById('debugLog');
  debugActionStatusEl = document.getElementById('debugActionStatus');
  debugToggleEl = document.getElementById('debugToggle');
  document.getElementById('debugClose').onclick = () => toggleDebugPanel(false);
  document.getElementById('debugCopy').onclick = copyDebugLogs;
  document.getElementById('debugDownload').onclick = downloadDebugLogs;
  document.getElementById('debugClear').onclick = clearDebugLogs;
  debugToggleEl.onclick = () => toggleDebugPanel();
  document.addEventListener('keydown', e => {
    if (e.key === 'F2') {
      e.preventDefault();
      toggleDebugPanel();
    }
  });
  debugLog('BOOT', 'Diagnostics ready — press F2 during a match');

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
