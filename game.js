// ================= Constants =================
// v1.27 enlarged the original arena by 20%; v1.53 expands that layout again
// while keeping map proportions, terrain, and shared multiplayer coordinates aligned.
const WORLD_SCALE = 1.2;
const WORLD_W = 7200 * WORLD_SCALE, WORLD_H = 4416 * WORLD_SCALE;
// The camera had already been widened twice by 15%. Widen the current view
// another 30% multiplicatively so the requested change preserves that baseline.
const CAMERA_FOV_MULT = 1.3225 * 1.3;
const GROUND_Y = WORLD_H - 150 * WORLD_SCALE;   // sea surface / crash boundary
// The visible world continues beyond the playable rectangle so the city and
// ocean never terminate on a hard vertical seam. Aircraft may enter this fog
// buffer briefly before the boundary timer disables them.
const BORDER_FOG_DEPTH = 340 * WORLD_SCALE;
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
const TOP_BOUNDARY_DEPTH = 260 * WORLD_SCALE;
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
const HIGH_SPEED_FOV_MULT = 1.518 * 1.3;
const HIGH_SPEED_FOV_SMOOTHING = 5.5;
const SONIC_BOOM_COOLDOWN_MS = 1800;
const TURN_ACCEL = 9.5, TURN_DAMPING = 3.8;
const BARREL_ROLL_DURATION = 720, BARREL_ROLL_SPEED = Math.PI * 2.8, BARREL_ROLL_COOLDOWN = 900;
const STALL_SPIN_SPEED = 5.2, FALL_GRAVITY = 420;
const STALL_DELAY = 320; // brief warning window before a sustained stall becomes uncontrolled

const BULLET_SPEED = 1850, BULLET_GRAVITY = 260, BULLET_LIFE = Infinity, FIRE_COOLDOWN = 32, BULLET_DAMAGE = 4.5;
const BULLET_FULL_DAMAGE_RANGE = 650;
const BULLET_FALLOFF_DISTANCE = 3000;
const BULLET_MIN_DAMAGE_MULT = 0.24;
const BULLET_SIGHT_TIME = .42;
const HIT_RADIUS = 30, BULLET_RADIUS = 1.65;
const PLANE_COLLISION_RADIUS = 34;
const PLANE_COLLISION_RESTITUTION = 0.28;
const PLANE_COLLISION_DAMAGE_COOLDOWN_MS = 700;

// Gun heat: ultra-fast RPM, but holding fire builds heat until it locks out.
const HEAT_MAX = 300, HEAT_PER_SHOT = 5, HEAT_DECAY = 26, HEAT_DECAY_OVERHEAT = 44;
const OVERHEAT_RESET_FRAC = 0.1;  // must cool back down to 10% heat before firing again

// Homing missiles should demand a countermeasure or a committed evasive turn,
// while still leaving room for a sharp maneuver to break seeker tracking.
const MISSILE_INITIAL_SPEED = 760;
const MISSILE_MAX_SPEED = 1080;
const MISSILE_ACCELERATION = 125;
const MISSILE_LAUNCH_COAST_MS = 550;
const MISSILE_COAST_MIN_SPEED = 180, MISSILE_COAST_MAX_SPEED = 520;
const MISSILE_COAST_GRAVITY = 240, MISSILE_BOOST_START_SPEED = 560;
const MISSILE_SEEKER_RANGE = 3200, MISSILE_SEEKER_CONE = 1.15;
const MISSILE_TARGET_MEMORY_MS = 360;
const MISSILE_TURN_RATE = 1.5, MISSILE_LIFE = 4200, MISSILE_DAMAGE = 55;
const MISSILE_DODGE_TURN_THRESHOLD = 1.05;
const MISSILE_DODGE_HOLD_MS = 180;
const MISSILE_LOCK_DELAY = 1000;  // continuous facing time required for a lock
const MISSILE_LOCK_SYNC_GRACE_MS = 150; // brief packet grace; aim still has to remain on target
const MISSILE_HIT_RADIUS = 36, MISSILE_LOCK_RANGE = Infinity, MISSILE_LOCK_CONE = Math.PI / 3;
const MISSILE_MAX = 4, MISSILE_REGEN_MS = 5000, MISSILE_COOLDOWN = 900;
const BOMB_SPEED = 240, BOMB_GRAVITY = 420, BOMB_LIFE = 2200, BOMB_DAMAGE = 82;
const BOMB_MAX = 2, BOMB_REGEN_MS = 8500, BOMB_COOLDOWN = 850, BOMB_HIT_RADIUS = 42;
const BOMB_PROXIMITY_RADIUS = 132, BOMB_BLAST_RADIUS = 156, BOMB_BLAST_DAMAGE = 92;
const SHRAPNEL_COUNT = 16, SHRAPNEL_SPEED = 500;
const SHRAPNEL_GRAVITY = 120, SHRAPNEL_LIFE = 800, SHRAPNEL_DAMAGE = 18, SHRAPNEL_HIT_RADIUS = 22;
const WATER_WEAPON_DETONATION_DELAY = 1.1;
const MAX_ACTIVE_WATER_WEAPON_EFFECTS = 24;

// A seeker only accepts flares after its target commits to a sharp evasive
// turn. Steady flight keeps the missile focused on the aircraft.
const FLARE_MAX = 3, FLARE_REGEN_MS = 7000, FLARE_MIN_INTERVAL = 400;
const FLARE_BREAK_RADIUS = 560, FLARE_ACTIVE_MS = 1900, FLARE_SALVO_COUNT = 6;
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
const SOUND_MAX_DISTANCE = 1400 * WORLD_SCALE;  // world units; sounds beyond this are silent
const CLOUD_COUNT = 45;
const CLOUD_MIN_RADIUS = 22, CLOUD_MAX_RADIUS = 148;
const CLOUD_FORM_COUNT = 4;
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
    [.16, .23, 300, 170], [.50, .29, 320, 180], [.84, .20, 290, 165]
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
  canyon: ['#718fa9', '#b4c5c9', '#dfc19e'],
  storm: ['#050b18', '#152a43', '#466f86'],
  islands: ['#082031', '#1b6173', '#80c4bd']
};
// Squall haze limits practical target visibility and seeker acquisition while
// leaving the storm radar useful for navigation.
const STORM_VISIBILITY_RANGE = 760 * WORLD_SCALE;

// Red Canyon is split into open sky above and a connected cave network below.
// Each profile node stores the roof's outside edge, its cave-side ceiling,
// and the cave floor. Rendering, spawning, and authoritative collision all
// read this same fixed world geometry.
const CANYON_CAVE_PROFILE = [
  [0, 1960, 2340, 4020], [600, 2050, 2440, 4060],
  [1200, 1990, 2380, 4120], [1800, 2180, 2580, 4050],
  [2400, 2070, 2480, 3980], [3000, 1910, 2310, 4040],
  [3600, 2060, 2470, 4120], [4200, 2220, 2640, 4050],
  [4800, 2080, 2480, 3980], [5400, 1940, 2360, 4080],
  [6000, 2100, 2510, 4140], [6600, 2190, 2580, 4050],
  [7200, 1990, 2390, 4010]
].map(([x, surface, ceiling, floor]) => [
  x * WORLD_SCALE, (surface - 100) * WORLD_SCALE,
  (ceiling - 220) * WORLD_SCALE, (floor + 100) * WORLD_SCALE
]);
const CANYON_CAVE_ENTRANCES = [[520, 1040], [2920, 3480], [5500, 6100]]
  .map(([left, right]) => [left * WORLD_SCALE, right * WORLD_SCALE]);
// x, attachment edge, half-width, intrusion length, tip offset. These are
// visible stalactites and stalagmites, and the same triangles stop aircraft.
const CANYON_CAVE_SPIRES = [
  [350, 'ceiling', 68, 275, -20], [860, 'floor', 84, 380, 16],
  [1450, 'ceiling', 92, 430, 20], [2040, 'floor', 76, 310, -25],
  [2580, 'ceiling', 88, 360, -18], [3180, 'floor', 100, 440, 14],
  [3860, 'ceiling', 76, 315, 18], [4450, 'floor', 88, 380, -15],
  [5050, 'ceiling', 100, 415, 25], [5630, 'floor', 72, 330, -20],
  [6260, 'ceiling', 90, 380, 10], [6860, 'floor', 92, 410, -22]
].map(([x, edge, width, length, offset]) => [x * WORLD_SCALE, edge, width * WORLD_SCALE, length * WORLD_SCALE, offset * WORLD_SCALE]);
// Rock cross-walls divide the lower cavern into a larger, tighter route
// network. Each wall leaves two staggered openings; the changing openings
// create upper and lower branches that reconnect in the chambers between.
// Opening heights are fractions of the local ceiling-to-floor distance.
const CANYON_CAVE_BULKHEADS = [
  [760, 50, [[.08, .31], [.67, .92]]],
  [1510, 58, [[.34, .61], [.76, .96]]],
  [2290, 52, [[.05, .28], [.57, .83]]],
  [3090, 62, [[.27, .54], [.72, .96]]],
  [3910, 54, [[.06, .32], [.63, .88]]],
  [4740, 64, [[.36, .63], [.78, .97]]],
  [5550, 52, [[.04, .29], [.58, .84]]],
  [6370, 62, [[.28, .55], [.73, .96]]],
  [7040, 48, [[.07, .33], [.65, .91]]]
].map(([x, halfWidth, openings]) => [x * WORLD_SCALE, halfWidth * WORLD_SCALE, openings]);
const CANYON_END_WALL_THICKNESS = 90 * WORLD_SCALE;
const CANYON_PLANE_COLLISION_RADIUS = 36;

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
let statusEl, lobbyList, startBtn, botsBtn, botCountInputEl, botCountValueEl, mapSelectEl, graphicsQualitySelectEl, networkStatusEl, chooseRole, lobby, menu, gameArea, waitHint;
let skyCanvas, skyCtx, miniCanvas, miniCtx;
let audioCtx = null, masterGain = null;
let audioBank = {}, audioAssetsStarted = false;
let engineCruiseAudio = null, engineBoostAudio = null;
let waterWakeChurnAudio = null, waterWakeSprayAudio = null;
const gunfireAudioByPlayer = new Map();
const GUN_AUDIO_RELEASE_MS = 150;
let screenShake = 0, recoilKick = 0, lastIncomingLock = false;
let currentCameraFovMult = CAMERA_FOV_MULT;
let fpsCounterEl = null, fpsWindowStart = null, fpsWindowFrames = 0;
const planeCollisionDamageAt = new Map();
let selectedMapId = 'city';
let activeMapId = 'city';
let graphicsQualityMode = 'auto';
let autoReducedGraphics = false;
let graphicsProbeMs = 0, graphicsProbeFrames = 0, graphicsRecoveryMs = 0;
let lastRenderAt = 0, lastHudUpdateAt = 0;
const GRAPHICS_QUALITY_STORAGE_KEY = 'wingsArenaGraphicsQuality';
const MAX_GAME_RENDER_FPS = 60;
const HUD_UPDATE_INTERVAL_MS = 80;
let localFlareScheduleGeneration = 0;
const seenImpactKeys = new Set();
let lastNetworkActivityAt = 0;

function isReducedGraphics() {
  return graphicsQualityMode === 'low' || (graphicsQualityMode === 'auto' && autoReducedGraphics);
}

function setGraphicsQuality(mode, persist = true) {
  graphicsQualityMode = ['auto', 'low', 'high'].includes(mode) ? mode : 'auto';
  if (graphicsQualityMode !== 'auto') autoReducedGraphics = graphicsQualityMode === 'low';
  else autoReducedGraphics = false;
  graphicsProbeMs = 0; graphicsProbeFrames = 0; graphicsRecoveryMs = 0;
  if (persist) {
    try { window.localStorage?.setItem(GRAPHICS_QUALITY_STORAGE_KEY, graphicsQualityMode); } catch (_) {}
  }
}

// Auto mode reacts to sustained slow frames rather than one-off explosions or
// tab wakeups, and only restores full detail after the machine has headroom.
function sampleGraphicsPerformance(frameMs) {
  if (graphicsQualityMode !== 'auto' || !Number.isFinite(frameMs) || frameMs > 200) return;
  graphicsProbeMs += Math.max(0, frameMs);
  graphicsProbeFrames++;
  if (graphicsProbeMs < 1800 || !graphicsProbeFrames) return;
  const averageFrameMs = graphicsProbeMs / graphicsProbeFrames;
  if (averageFrameMs >= 25) {
    autoReducedGraphics = true;
    graphicsRecoveryMs = 0;
  } else if (autoReducedGraphics && averageFrameMs <= 18.5) {
    graphicsRecoveryMs += graphicsProbeMs;
    if (graphicsRecoveryMs >= 6000) {
      autoReducedGraphics = false;
      graphicsRecoveryMs = 0;
    }
  } else if (averageFrameMs > 18.5) {
    graphicsRecoveryMs = 0;
  }
  graphicsProbeMs = 0;
  graphicsProbeFrames = 0;
}

const AUDIO_ASSETS = {
  // GitHub Pages currently serves the uploaded audio files from the repo root.
  // Keep these paths flat so the deployed game can actually resolve them.
  cannon: 'a10-gun-burst.ogg',
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

function canyonProfileAt(x) {
  const px = clamp(Number.isFinite(x) ? x : 0, 0, WORLD_W);
  let i = 0;
  while (i < CANYON_CAVE_PROFILE.length - 2 && px > CANYON_CAVE_PROFILE[i + 1][0]) i++;
  const a = CANYON_CAVE_PROFILE[i], b = CANYON_CAVE_PROFILE[i + 1];
  const t = b[0] === a[0] ? 0 : (px - a[0]) / (b[0] - a[0]);
  return {
    surfaceY: a[1] + (b[1] - a[1]) * t,
    ceilingY: a[2] + (b[2] - a[2]) * t,
    floorY: a[3] + (b[3] - a[3]) * t
  };
}

function canyonIsEntrance(x) {
  return CANYON_CAVE_ENTRANCES.some(([left, right]) => x >= left && x <= right);
}

function canyonSpireTriangle(spire) {
  const [x, edge, halfWidth, length, tipOffset] = spire;
  const profile = canyonProfileAt(x);
  const baseY = edge === 'ceiling' ? profile.ceilingY : profile.floorY;
  const tipY = baseY + (edge === 'ceiling' ? length : -length);
  return [[x - halfWidth, baseY], [x + halfWidth, baseY], [x + tipOffset, tipY]];
}

function canyonPointInTriangle(x, y, triangle) {
  const cross = (a, b, px, py) => (px - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (py - b[1]);
  const d1 = cross(triangle[0], triangle[1], x, y);
  const d2 = cross(triangle[1], triangle[2], x, y);
  const d3 = cross(triangle[2], triangle[0], x, y);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
}

function canyonCircleHitsTriangle(x, y, radius, triangle) {
  if (canyonPointInTriangle(x, y, triangle)) return true;
  for (let i = 0; i < 3; i++) {
    const a = triangle[i], b = triangle[(i + 1) % 3];
    if (pointSegmentDistance(x, y, a[0], a[1], b[0], b[1]) <= radius) return true;
  }
  return false;
}

function canyonPointHitsWall(x, y) {
  const profile = canyonProfileAt(x);
  if (y >= profile.floorY) return true;
  if (!canyonIsEntrance(x) && y >= profile.surfaceY && y <= profile.ceilingY) return true;
  if (y >= profile.ceilingY &&
      (x <= CANYON_END_WALL_THICKNESS || x >= WORLD_W - CANYON_END_WALL_THICKNESS)) return true;
  for (const [wallX, halfWidth, openings] of CANYON_CAVE_BULKHEADS) {
    if (Math.abs(wallX - x) > halfWidth) continue;
    const height = profile.floorY - profile.ceilingY;
    const open = openings.some(([top, bottom]) =>
      y >= profile.ceilingY + height * top && y <= profile.ceilingY + height * bottom);
    if (!open && y >= profile.ceilingY && y <= profile.floorY) return true;
  }
  return false;
}

function canyonPositionCollides(x, y, radius = CANYON_PLANE_COLLISION_RADIUS) {
  if (activeMapId !== 'canyon' || !Number.isFinite(x) || !Number.isFinite(y)) return false;
  if (canyonPointHitsWall(x, y)) return true;
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI * 2 * i / 8;
    if (canyonPointHitsWall(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius)) return true;
  }
  for (const spire of CANYON_CAVE_SPIRES) {
    if (Math.abs(spire[0] - x) > spire[2] + radius) continue;
    if (canyonCircleHitsTriangle(x, y, radius, canyonSpireTriangle(spire))) return true;
  }
  return false;
}

// Sample movement paths so fast aircraft and weapons cannot tunnel through
// narrow rock faces between frames. `safeX/safeY` is the last clear point.
function canyonFirstRockCollision(x1, y1, x2, y2, radius = 0, maxStep = 12) {
  if (activeMapId !== 'canyon') return null;
  const distance = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.max(1, Math.ceil(distance / maxStep));
  let safeT = 0;
  if (canyonPositionCollides(x1, y1, radius)) {
    return { safeX: x1, safeY: y1, hitX: x1, hitY: y1, t: 0 };
  }
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
    if (canyonPositionCollides(x, y, radius)) {
      return {
        safeX: x1 + (x2 - x1) * safeT,
        safeY: y1 + (y2 - y1) * safeT,
        hitX: x, hitY: y, t
      };
    }
    safeT = t;
  }
  return null;
}

function randomCanyonSpawnPoint() {
  for (let attempt = 0; attempt < 160; attempt++) {
    const x = rand(180 * WORLD_SCALE, WORLD_W - 180 * WORLD_SCALE);
    const profile = canyonProfileAt(x);
    const inSky = Math.random() < .45;
    const y = inSky
      ? rand(150 * WORLD_SCALE, profile.surfaceY - 160 * WORLD_SCALE)
      : rand(profile.ceilingY + 150 * WORLD_SCALE, profile.floorY - 180 * WORLD_SCALE);
    if (!canyonPositionCollides(x, y, CANYON_PLANE_COLLISION_RADIUS + 10)) return { x, y };
  }
  const x = 3600 * WORLD_SCALE, profile = canyonProfileAt(x);
  return { x, y: (profile.ceilingY + profile.floorY) * .5 };
}

function canyonGroundContactY(x) {
  return canyonProfileAt(x).floorY;
}

// Small procedural sound rig for fallback effects. It starts only after a
// user gesture; the cannon uses its trimmed A-10 audio asset below.
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
function addVisibleScreenShake(x, y, amount) {
  if (!myState || !Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(amount) || amount <= 0) return;
  if (!isInPlayerVision({ x, y })) return;
  screenShake = Math.max(screenShake, amount);
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
function markGunfire(ownerId, x = null, y = null) {
  if (ownerId == null) return;
  const key = String(ownerId);
  let burst = gunfireAudioByPlayer.get(key);
  if (!burst) {
    burst = { ownerId, lastShotAt: 0, x: null, y: null, audio: null };
    gunfireAudioByPlayer.set(key, burst);
  }
  burst.lastShotAt = performance.now();
  if (Number.isFinite(x) && Number.isFinite(y)) { burst.x = x; burst.y = y; }
}
function stopGunfireAudio() {
  gunfireAudioByPlayer.forEach(burst => {
    if (!burst.audio) return;
    burst.audio.pause(); burst.audio.currentTime = 0; burst.audio.volume = 0;
  });
  gunfireAudioByPlayer.clear();
}
function updateGunfireAudio(now = performance.now(), dtSec = 1 / 60) {
  const blend = clamp(dtSec * 16, 0, 1);
  gunfireAudioByPlayer.forEach((burst, key) => {
    const firing = now - burst.lastShotAt <= GUN_AUDIO_RELEASE_MS;
    if (!burst.audio && audioBank.cannon) {
      burst.audio = audioBank.cannon.cloneNode();
      burst.audio.loop = true;
      burst.audio.volume = 0;
    }
    const player = samePlayerId(burst.ownerId, myId) ? myState : (players[burst.ownerId] || players[key]);
    const x = Number.isFinite(player?.x) ? player.x : burst.x;
    const y = Number.isFinite(player?.y) ? player.y : burst.y;
    const targetVolume = !firing ? 0 : samePlayerId(burst.ownerId, myId) ? .27 :
      (Number.isFinite(x) && Number.isFinite(y) ? proximityVolume(x, y, .27) : 0);
    const audio = burst.audio;
    if (audio) {
      if (firing && targetVolume <= .005) {
        audio.pause(); audio.currentTime = 0; audio.volume = 0;
      } else if (targetVolume > .005 && audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
      audio.volume += (targetVolume - audio.volume) * blend;
      if (!firing && audio.volume < .005) {
        audio.pause(); audio.currentTime = 0;
        gunfireAudioByPlayer.delete(key);
      }
    } else if (!firing) {
      gunfireAudioByPlayer.delete(key);
    }
  });
}
function playMissileLaunchSound(x = null, y = null) {
  const volume = x == null || y == null ? .36 : proximityVolume(x, y, .36);
  if (volume <= .005) return;
  if (!playAsset('missile', volume, 1.05)) { noiseBurst(.34, volume * .22, 'lowpass', 520); tone(92, .38, volume * .25, 'sawtooth', 240); }
}
function playExplosionSound(kind, x, y) {
  if (kind === 'blast' || kind === 'crash' || kind === 'shock') {
    const volume = proximityVolume(x, y, kind === 'crash' ? .22 : .3);
    if (volume <= .005) return;
    if (!playAsset('explosion', volume, kind === 'crash' ? .88 : 1)) { noiseBurst(kind === 'crash' ? .5 : .32, volume * (kind === 'crash' ? .18 : .34), 'lowpass', 240); tone(kind === 'crash' ? 42 : 58, .52, volume * (kind === 'crash' ? .16 : .29), 'sine', -34); }
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
    const particleStride = isReducedGraphics() ? 3 : 1;
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

    this.bubbles.forEach((p, i) => {
      if (i % particleStride) return;
      const t = p.age / p.maxAge;
      ctx.globalAlpha = (1 - t) * (.22 + p.intensity * .4);
      ctx.fillStyle = '#eefbff';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * (1 - t * .32), 0, Math.PI * 2); ctx.fill();
    });
    this.foam.forEach((p, i) => {
      if (i % particleStride) return;
      const t = p.age / p.maxAge;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.heading);
      ctx.globalAlpha = (1 - t) * (.3 + p.intensity * .4);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.2 + p.speed;
      ctx.beginPath(); ctx.arc(0, 0, 7 + p.speed * 12 + t * 14, .15 * Math.PI, .85 * Math.PI); ctx.stroke();
      ctx.restore();
    });
    this.spray.forEach((p, i) => {
      if (i % particleStride) return;
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
  if (activeMapId === 'canyon') {
    highSpeedWake.reset();
    updateWaterWakeAudio(0, 0, dtSec);
    return;
  }
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
  if (activeMapId === 'canyon') return;
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
  addVisibleScreenShake(x, y, 12);
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
  if (kind === 'blast' || kind === 'crash' || kind === 'planeWater' || kind === 'shock')
    addVisibleScreenShake(x, y, kind === 'crash' || kind === 'planeWater' ? 22 : 11);
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
    addVisibleScreenShake(this.x, this.y, 5);
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
  const mapId = validMapId(activeMapId);
  const cloudTop = mapId === 'canyon' ? 1800 * WORLD_SCALE : GROUND_Y - 40 * WORLD_SCALE;
  for (let i = 0; i < CLOUD_COUNT; i++) {
    const rx = rand(CLOUD_MIN_RADIUS, CLOUD_MAX_RADIUS) * WORLD_SCALE;
    const form = Math.floor(rand(0, CLOUD_FORM_COUNT));
    const aspect = form === 0 ? rand(.12, .23) : form === 1 ? rand(.48, .78) :
      form === 2 ? rand(.22, .38) : rand(.28, .58);
    const alpha = form === 0 ? rand(.035, .085) : form === 1 ? rand(.07, .16) :
      form === 2 ? rand(.05, .13) : rand(.03, .095);
    clouds.push({
      x: rand(0, WORLD_W), y: rand(0, cloudTop),
      rx, ry: rx * aspect, a: alpha,
      lobe: rand(.28, .52), tilt: rand(-.12, .12), form,
      puffCount: Math.floor(rand(3, 7)), seed: rand(0, Math.PI * 2),
      tint: Math.floor(rand(0, 3))
    });
  }
  // Each arena gets a deliberate route through its concealment zones. The
  // coordinates are fixed in world space so host and joiners agree on cover.
  const bankLayout = MAP_CLOUD_BANK_LAYOUTS[mapId] || MAP_CLOUD_BANK_LAYOUTS.city;
  const bankCount = MAP_THEMES[mapId]?.cloudBanks || CLOUD_BANK_COUNT;
  cloudBanks = bankLayout.slice(0, bankCount).map(([nx, ny, rx, ry], i) => ({
    x: WORLD_W * nx, y: (GROUND_Y - 160 * WORLD_SCALE) * ny + 180 * WORLD_SCALE,
    rx: rx * WORLD_SCALE, ry: ry * WORLD_SCALE, alpha: .72 + (i % 3) * .07
  }));
}

function isInCloudBank(x, y) {
  return cloudBanks.some(b => {
    const dx = (x - b.x) / b.rx, dy = (y - b.y) / b.ry;
    return dx * dx + dy * dy < 1;
  });
}

function randomSpawnPoint() {
  if (activeMapId === 'canyon') return randomCanyonSpawnPoint();
  return { x: rand(200 * WORLD_SCALE, WORLD_W - 200 * WORLD_SCALE), y: rand(120 * WORLD_SCALE, GROUND_Y - 160 * WORLD_SCALE) };
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
    p.borderEnteredAt = 0;
    p.borderRemaining = 0;
    p.borderWarningSeen = false;
    return false;
  }
  if (!p.borderEnteredAt) {
    p.borderEnteredAt = now;
    p.borderWarningSeen = false;
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
    x: p.x, y: p.y, angle, collisionPrevX: p.x, collisionPrevY: p.y,
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
  myState.collisionPrevX = p.x; myState.collisionPrevY = p.y;
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
  bot.collisionPrevX = p.x; bot.collisionPrevY = p.y;
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

function crashPlaneIntoCanyon(state, collision) {
  if (!state || !collision) return;
  state.x = collision.safeX; state.y = collision.safeY;
  if (state === myState) {
    if (isHost) broadcast({ type: 'effect', kind: 'crash', x: collision.hitX, y: collision.hitY });
    finishDeath(null, 'You hit the cave wall.', 'crash');
    return;
  }
  spawnExplosion(collision.hitX, collision.hitY, 'crash');
  if (isHost) broadcast({ type: 'effect', kind: 'crash', x: collision.hitX, y: collision.hitY });
  if (state.isBot) finishBotDeath(state);
  else finishRemoteDeath(state);
}

function finishCanyonDeathFall(state, collision = null) {
  if (!state) return;
  if (collision) { state.x = collision.safeX; state.y = collision.safeY; }
  if (state === myState) finishDeath(state.deathKiller, 'Aircraft lost in the cave.', 'crash');
  else if (state.isBot) finishBotDeath(state);
  else finishRemoteDeath(state);
}

function updateBotDeathFall(bot, dtSec) {
  const previousY = bot.y;
  bot.verticalVelocity += FALL_GRAVITY * dtSec;
  bot.speed = 0; bot.turnVelocity = 0;
  bot.roll += bot.fallSpinVelocity * dtSec;
  bot.y += bot.verticalVelocity * dtSec;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(bot.x, previousY, bot.x, bot.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) finishCanyonDeathFall(bot, collision);
  } else if (bot.y >= GROUND_Y - 12) finishBotDeath(bot);
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
  const previousY = myState.y;
  myState.verticalVelocity += FALL_GRAVITY * dtSec;
  // Falling is intentionally screen-vertical: do not integrate angle or
  // speed into X. Roll is visual only and has no influence on movement.
  myState.speed = 0;
  myState.turnVelocity = 0;
  myState.roll += myState.fallSpinVelocity * dtSec;
  myState.y += myState.verticalVelocity * dtSec;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(myState.x, previousY, myState.x, myState.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) finishCanyonDeathFall(myState, collision);
  } else if (myState.y >= GROUND_Y - 12) finishDeath(myState.deathKiller, 'Aircraft lost', 'planeWater');
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
  const previousX = myState.x, previousY = myState.y;
  myState.x += Math.cos(myState.angle) * myState.speed * dtSec;
  myState.y += Math.sin(myState.angle) * myState.speed * dtSec + myState.verticalVelocity * dtSec;

  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(previousX, previousY, myState.x, myState.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) { crashPlaneIntoCanyon(myState, collision); return; }
  }

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
  if (activeMapId !== 'canyon' && myState.y >= GROUND_Y - 12) crashLocal('You hit the sea.');
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
    if (!m.ignited || m.ownerId === myId || m.decoyTarget || (m.targetId != null && m.targetId !== myId)) continue;
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
  const previousX = myState.x, previousY = myState.y;
  myState.x += Math.cos(myState.angle) * myState.speed * dtSec;
  myState.y += Math.sin(myState.angle) * myState.speed * dtSec + myState.verticalVelocity * dtSec;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(previousX, previousY, myState.x, myState.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) { crashPlaneIntoCanyon(myState, collision); return; }
  }
  if (updateBoundaryState(myState, performance.now())) {
    beginDeathFall(null, 'Boundary lost — aircraft disabled');
    return;
  }
  if (activeMapId !== 'canyon' && myState.y >= GROUND_Y - 12) {
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
        myState.health -= bulletDamageAtDistance(b) * (rearHit ? 1.35 : 1);
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
      if (!m.ignited || m.ownerId === myId || m.decoyTarget) continue;
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
    born: performance.now(), traveled: 0
  };
  bullets.push(b);
  spawnExplosion(b.x, b.y, 'muzzle');
  markGunfire(ownerId, b.x, b.y);
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
    if (activeMapId === 'canyon') {
      const rockHit = canyonFirstRockCollision(startX, startY, endX, endY, BULLET_RADIUS, 8);
      if (rockHit) {
        const hitX = rockHit.hitX, hitY = rockHit.hitY;
        if (isHost || rememberImpact('bullet', b.id)) spawnExplosion(hitX, hitY, 'spark', b.angle);
        if (isHost) broadcast({ type: 'impact', from: b.ownerId, kind: 'bullet', id: b.id,
          x: hitX, y: hitY, surface: 'rock' });
        removeProjectileLocal('bullet', b.id);
        continue;
      }
    }
    // Test the swept segment so a fast round splashes at the actual crossing
    // in this frame, rather than a frame later at an elevated fixed offset.
    const surfaceAtEnd = waterSurfaceY(endX);
    if (activeMapId !== 'canyon' && (startY >= waterSurfaceY(startX) ||
        (endY >= surfaceAtEnd && endY > startY))) {
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
    b.traveled = (Number.isFinite(b.traveled) ? b.traveled : 0) + Math.hypot(endX - startX, endY - startY);
    b.angle = Math.atan2(b.vy, b.vx);
  }
}

function bulletDamageAtDistance(bullet) {
  const distance = Math.max(0, Number.isFinite(bullet?.traveled) ? bullet.traveled : 0);
  const fade = clamp((distance - BULLET_FULL_DAMAGE_RANGE) / BULLET_FALLOFF_DISTANCE, 0, 1);
  return BULLET_DAMAGE * (1 - fade * (1 - BULLET_MIN_DAMAGE_MULT));
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
  addVisibleScreenShake(b.x, burstY, waterHit ? 3 : 9);
  spawnBombShrapnel(b.x, burstY, b.ownerId);
  if (isHost) broadcast({ type: 'impact', from: b.ownerId, kind: 'bomb', id: b.id, x: b.x, y: burstY,
    surface: waterHit ? 'water' : surface === 'rock' ? 'rock' : null });
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
    if (activeMapId === 'canyon') {
      const rockHit = canyonFirstRockCollision(startX, startY, endX, endY, 8, 8);
      if (rockHit) {
        if (authoritative) {
          b.x = rockHit.hitX; b.y = rockHit.hitY;
          detonateBomb(b, 'rock');
        } else {
          bombs.splice(i, 1);
        }
        continue;
      }
    }
    if (authoritative && activeMapId !== 'canyon' && (startY >= waterSurfaceY(startX) ||
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
    const reachedGround = activeMapId === 'canyon'
      ? s.y >= canyonGroundContactY(s.x) : s.y >= GROUND_Y - 8;
    if (now - s.born > SHRAPNEL_LIFE || reachedGround) {
      shrapnels.splice(i, 1);
      continue;
    }
    s.prevX = s.x; s.prevY = s.y;
    s.vy += SHRAPNEL_GRAVITY * dtSec;
    s.x += s.vx * dtSec; s.y += s.vy * dtSec;
    if (activeMapId === 'canyon' && canyonFirstRockCollision(s.prevX, s.prevY, s.x, s.y, 1, 8)) {
      shrapnels.splice(i, 1);
      continue;
    }

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
  if (activeMapId === 'storm' && Math.hypot(p.x - myState.x, p.y - myState.y) > STORM_VISIBILITY_RANGE) return false;
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

  // Keep a completed lock only while the pilot continues facing that exact
  // aircraft. The short expiry is only a network snapshot grace period.
  if (missileLockTargetId != null) {
    const locked = players[missileLockTargetId];
    if (!locked || locked.alive === false || locked.connected === false ||
        findMissileLockTarget(true) !== missileLockTargetId) {
      missileLockTargetId = null; missileLockProgress = 0; missileLockExpiresAt = 0;
    } else {
      missileLockProgress = 1;
      missileLockExpiresAt = now + MISSILE_LOCK_SYNC_GRACE_MS;
      return;
    }
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
    missileLockExpiresAt = now + MISSILE_LOCK_SYNC_GRACE_MS;
  }
}

function fireMissileFor(state, ownerId, targetId = null, replicate = false) {
  if (!state || !state.alive || state.falling || state.missileCooldown > 0 || state.missiles <= 0) return null;
  state.missileCooldown = MISSILE_COOLDOWN;
  state.missiles--;
  const nose = 22;
  const born = performance.now();
  const inheritedSpeed = Number.isFinite(state.speed) ? Math.max(0, state.speed) : PLANE_SPEED;
  const coastSpeed = clamp(inheritedSpeed * .86, MISSILE_COAST_MIN_SPEED, MISSILE_COAST_MAX_SPEED);
  const lockedTarget = targetId == null ? null : players[targetId];
  const m = {
    id: ownerId + '-m' + (nextMissileId++), ownerId, targetId,
    x: state.x + Math.cos(state.angle) * nose,
    y: state.y + Math.sin(state.angle) * nose,
    angle: state.angle, speed: coastSpeed, coastSpeed, dropVelocity: 0,
    born, boostAt: born + MISSILE_LAUNCH_COAST_MS,
    lockReadyAt: born + MISSILE_LAUNCH_COAST_MS, ignited: false,
    lastTargetX: lockedTarget?.x, lastTargetY: lockedTarget?.y,
    lastTargetSeenAt: lockedTarget ? born : 0,
    trail: [], exhaust: 0
  };
  missiles.push(m);
  spawnExplosion(m.x, m.y, 'launch');
  playMissileLaunchSound(m.x, m.y); addVisibleScreenShake(m.x, m.y, ownerId === myId ? 7 : 3);
  if (replicate) {
    const packet = { type: 'missile', id: m.id, targetId, x: m.x, y: m.y, angle: m.angle,
      speed: m.speed, coastSpeed: m.coastSpeed, coastRemaining: MISSILE_LAUNCH_COAST_MS,
      dropVelocity: 0, lastTargetX: m.lastTargetX, lastTargetY: m.lastTargetY,
      locked: targetId != null };
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
  const targetId = missileLockTargetId != null && missileLockExpiresAt > performance.now() &&
    findMissileLockTarget(true) === missileLockTargetId ? missileLockTargetId : null;
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
        const volume = proximityVolume(f.x, f.y, .18);
        if (volume > .005) playAsset('flare', volume, 1.02 + flareNumber * .015);
      });
    }, flareNumber * FLARE_SPAWN_INTERVAL_MS);
  }
}

function missileCanSeePoint(m, x, y) {
  const distance = dist(m.x, m.y, x, y);
  if (distance > MISSILE_SEEKER_RANGE || distance < 1) return false;
  const bearing = Math.atan2(y - m.y, x - m.x);
  if (Math.abs(angleDiff(m.angle, bearing)) > MISSILE_SEEKER_CONE) return false;
  if (isInCloudBank(m.x, m.y) || isInCloudBank(x, y)) return false;
  if (activeMapId === 'canyon' && canyonFirstRockCollision(m.x, m.y, x, y, 0, 24)) return false;
  return true;
}

function findMissileVisibleFlare(m, ownerId, now) {
  let best = null, bestAngle = Infinity;
  for (const flare of flares) {
    if (!samePlayerId(flare.ownerId, ownerId) || now < flare.born || now - flare.born > FLARE_ACTIVE_MS) continue;
    if (dist(m.x, m.y, flare.x, flare.y) > FLARE_BREAK_RADIUS || !missileCanSeePoint(m, flare.x, flare.y)) continue;
    const bearing = Math.atan2(flare.y - m.y, flare.x - m.x);
    const angle = Math.abs(angleDiff(m.angle, bearing));
    if (angle < bestAngle) { best = flare; bestAngle = angle; }
  }
  return best;
}

function missileTargetIsDodging(m, target, now) {
  const turningHard = Number.isFinite(target?.turnVelocity) &&
    Math.abs(target.turnVelocity) >= MISSILE_DODGE_TURN_THRESHOLD;
  if (!turningHard) {
    m.targetDodgeStartedAt = null;
    return false;
  }
  if (!Number.isFinite(m.targetDodgeStartedAt)) m.targetDodgeStartedAt = now;
  return now - m.targetDodgeStartedAt >= MISSILE_DODGE_HOLD_MS;
}

function updateMissileGuidance(m, now) {
  if (m.decoyTarget) return { x: m.decoyTarget.x, y: m.decoyTarget.y };
  if (m.targetId == null) return null;
  const target = players[m.targetId];
  if (!target || target.alive === false || target.connected === false) {
    m.targetId = null;
    m.decoyed = true;
    return null;
  }

  const planeVisible = Number.isFinite(target.x) && Number.isFinite(target.y) &&
    missileCanSeePoint(m, target.x, target.y);
  // Flares are a countermeasure for a committed jink. If the target is flying
  // steadily, the seeker ignores the flare and keeps tracking the aircraft.
  const targetDodging = missileTargetIsDodging(m, target, now);
  const flare = findMissileVisibleFlare(m, target.id, now);
  if (flare && targetDodging) {
    m.decoyTarget = flare;
    m.decoyed = true;
    m.targetId = null;
    return { x: flare.x, y: flare.y };
  }
  if (planeVisible) {
    m.lastTargetX = target.x; m.lastTargetY = target.y; m.lastTargetSeenAt = now;
    return { x: target.x, y: target.y };
  }
  if (Number.isFinite(m.lastTargetX) && Number.isFinite(m.lastTargetY) &&
      now - (m.lastTargetSeenAt || m.born) <= MISSILE_TARGET_MEMORY_MS) {
    return { x: m.lastTargetX, y: m.lastTargetY };
  }
  m.targetId = null;
  m.decoyed = true;
  return null;
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

    const boostAt = Number.isFinite(m.boostAt) ? m.boostAt :
      (Number.isFinite(m.lockReadyAt) ? m.lockReadyAt : m.born + MISSILE_LAUNCH_COAST_MS);
    m.ignited = now >= boostAt;
    let aimPoint = null;
    if (m.ignited) {
      if (!m.boosted) {
        m.speed = Math.max(Number.isFinite(m.speed) ? m.speed : MISSILE_INITIAL_SPEED, MISSILE_BOOST_START_SPEED);
        m.boosted = true;
      }
      aimPoint = updateMissileGuidance(m, now);
      m.dropVelocity = Math.max(0, (m.dropVelocity || 0) - 620 * dtSec);
      m.speed = Math.min(MISSILE_MAX_SPEED,
        (Number.isFinite(m.speed) ? m.speed : MISSILE_BOOST_START_SPEED) + MISSILE_ACCELERATION * dtSec);
    } else {
      // The missile inherits a little of the aircraft's velocity, stays
      // parallel during separation, and drops slightly before motor ignition.
      m.speed = clamp(Number.isFinite(m.coastSpeed) ? m.coastSpeed : m.speed,
        MISSILE_COAST_MIN_SPEED, MISSILE_COAST_MAX_SPEED);
      m.dropVelocity = Math.min(250, (m.dropVelocity || 0) + MISSILE_COAST_GRAVITY * dtSec);
    }

    // Flare decoys only explode when the missile physically reaches the flare.
    if (m.decoyTarget && dist(m.x, m.y, m.decoyTarget.x, m.decoyTarget.y) < MISSILE_HIT_RADIUS && authoritative) {
      spawnExplosion(m.decoyTarget.x, m.decoyTarget.y, 'blast');
      if (isHost) broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id, x: m.decoyTarget.x, y: m.decoyTarget.y });
      removeProjectileLocal('missile', m.id);
      continue;
    }
    if (aimPoint) {
      const desired = Math.atan2(aimPoint.y - m.y, aimPoint.x - m.x);
      const step = MISSILE_TURN_RATE * dtSec;
      const diff = angleDiff(m.angle, desired);
      m.angle += Math.abs(diff) < step ? diff : Math.sign(diff) * step;
    }

    m.trail.push({ x: m.x, y: m.y });
    if (m.trail.length > 20) m.trail.shift();
    const startX = m.x, startY = m.y;
    const endX = startX + Math.cos(m.angle) * m.speed * dtSec;
    const endY = startY + Math.sin(m.angle) * m.speed * dtSec + (m.dropVelocity || 0) * dtSec;
    if (activeMapId === 'canyon') {
      const rockHit = canyonFirstRockCollision(startX, startY, endX, endY, 7, 8);
      if (rockHit) {
        if (authoritative) {
          spawnExplosion(rockHit.hitX, rockHit.hitY, 'blast');
          if (isHost) broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id,
            x: rockHit.hitX, y: rockHit.hitY, surface: 'rock' });
        }
        removeProjectileLocal('missile', m.id);
        continue;
      }
    }
    const surfaceAtStart = waterSurfaceY(startX), surfaceAtEnd = waterSurfaceY(endX);
    if (authoritative && activeMapId !== 'canyon' && (startY >= surfaceAtStart ||
        (endY >= surfaceAtEnd && endY > startY))) {
      const t = startY >= surfaceAtStart ? 0 :
        clamp((surfaceAtStart - startY) / (endY - startY), 0, 1);
      const hitX = startX + (endX - startX) * t;
      const hitY = waterSurfaceY(hitX);
      spawnWaterWeaponImpact(hitX, hitY, 'missile', m.angle);
      addVisibleScreenShake(hitX, hitY, 3);
      if (isHost) broadcast({ type: 'impact', from: m.ownerId, kind: 'missile', id: m.id,
        x: hitX, y: hitY, surface: 'water' });
      removeProjectileLocal('missile', m.id);
      continue;
    }
    m.x = endX; m.y = endY;
  }
}

function createMissileReplica(data, ownerId) {
  const now = performance.now();
  const coastRemaining = Number.isFinite(data.coastRemaining)
    ? clamp(data.coastRemaining, 0, MISSILE_LAUNCH_COAST_MS)
    : MISSILE_LAUNCH_COAST_MS;
  const speed = Number.isFinite(data.speed) ? data.speed : MISSILE_INITIAL_SPEED;
  const coastSpeed = Number.isFinite(data.coastSpeed)
    ? data.coastSpeed
    : clamp(speed, MISSILE_COAST_MIN_SPEED, MISSILE_COAST_MAX_SPEED);
  const boostAt = now + coastRemaining;
  return {
    id: data.id, ownerId, targetId: data.targetId ?? null,
    x: data.x, y: data.y, angle: data.angle, speed, coastSpeed,
    dropVelocity: Number.isFinite(data.dropVelocity) ? data.dropVelocity : 0,
    born: now, boostAt, lockReadyAt: boostAt,
    ignited: coastRemaining <= 0, boosted: coastRemaining <= 0,
    lastTargetX: data.lastTargetX, lastTargetY: data.lastTargetY,
    lastTargetSeenAt: Number.isFinite(data.lastTargetX) && Number.isFinite(data.lastTargetY) ? now : 0,
    trail: [], exhaust: 0
  };
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
  const previousX = bot.x, previousY = bot.y;
  bot.x += Math.cos(bot.angle) * bot.speed * dtSec;
  bot.y += Math.sin(bot.angle) * bot.speed * dtSec;
  if (bot.y < 0) bot.verticalVelocity += TOP_BOUNDARY_GRAVITY * clamp(-bot.y / TOP_BOUNDARY_DEPTH, .2, 1) * dtSec;
  else bot.verticalVelocity *= Math.max(0, 1 - 4.5 * dtSec);
  bot.y += bot.verticalVelocity * dtSec;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(previousX, previousY, bot.x, bot.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) { crashPlaneIntoCanyon(bot, collision); return; }
  }
  if (updateBoundaryState(bot, now)) { beginBotDeathFall(bot, null); return; }
  if (activeMapId !== 'canyon' && bot.y >= GROUND_Y - 12) { beginBotDeathFall(bot, null); return; }

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
      if (bot.falling) finishBotDeath(bot); else damageBot(bot, bulletDamageAtDistance(b), b.ownerId);
      break;
    }
    if (!bot.alive) return;
    for (let i = missiles.length - 1; i >= 0; i--) {
      const m = missiles[i];
      if (!m.ignited || m.ownerId === bot.id || m.decoyTarget || (m.targetId != null && m.targetId !== bot.id)) continue;
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
  p.collisionPrevX = point.x; p.collisionPrevY = point.y;
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
  const previousY = p.y;
  p.verticalVelocity += FALL_GRAVITY * dtSec;
  p.speed = 0; p.turnVelocity = 0;
  p.roll += p.fallSpinVelocity * dtSec;
  p.y += p.verticalVelocity * dtSec;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(p.x, previousY, p.x, p.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) finishCanyonDeathFall(p, collision);
  } else if (p.y >= GROUND_Y - 12) finishRemoteDeath(p);
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
  if (p.hostLockTargetId != null) {
    const heldTarget = players[p.hostLockTargetId];
    if (heldTarget && heldTarget.alive !== false && heldTarget.connected !== false &&
        findHostLockTarget(p) === p.hostLockTargetId) {
      // Keep a completed lock only while the authoritative aircraft angle
      // still points at the same target. Refresh this short network grace.
      p.hostLockProgress = MISSILE_LOCK_DELAY;
      p.hostLockExpiresAt = now + MISSILE_LOCK_SYNC_GRACE_MS;
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
    p.hostLockExpiresAt = now + MISSILE_LOCK_SYNC_GRACE_MS;
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
  const previousX = p.x, previousY = p.y;
  p.x += Math.cos(p.angle) * Math.max(0, p.speed) * dtSec;
  p.y += Math.sin(p.angle) * Math.max(0, p.speed) * dtSec + p.verticalVelocity * dtSec;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(previousX, previousY, p.x, p.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) { crashPlaneIntoCanyon(p, collision); return; }
  }
  if (updateBoundaryState(p, now)) { beginRemoteDeathFall(p, null, 'Boundary lost — aircraft disabled'); return; }
  if (activeMapId !== 'canyon' && p.y >= GROUND_Y - 12) { beginRemoteDeathFall(p, null, 'You hit the sea.'); return; }

  
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

function planeCanCollide(p) {
  return !!p && p.connected !== false && p.alive !== false && !p.falling &&
    Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.angle) &&
    Number.isFinite(p.speed);
}

function capturePlaneCollisionOrigins() {
  if (!isHost && !botMode) return;
  Object.values(players).forEach(p => {
    if (!planeCanCollide(p)) return;
    p.collisionPrevX = p.x;
    p.collisionPrevY = p.y;
  });
}

function planeCollisionSweep(a, b) {
  const diameter = PLANE_COLLISION_RADIUS * 2;
  let ax = a.x, ay = a.y, bx = b.x, by = b.y, t = 1;
  let dx = bx - ax, dy = by - ay;
  let distance = Math.hypot(dx, dy);
  let swept = false;

  if (distance > diameter) {
    const a0x = Number.isFinite(a.collisionPrevX) ? a.collisionPrevX : a.x;
    const a0y = Number.isFinite(a.collisionPrevY) ? a.collisionPrevY : a.y;
    const b0x = Number.isFinite(b.collisionPrevX) ? b.collisionPrevX : b.x;
    const b0y = Number.isFinite(b.collisionPrevY) ? b.collisionPrevY : b.y;
    const rx = b0x - a0x, ry = b0y - a0y;
    const vx = (b.x - b0x) - (a.x - a0x), vy = (b.y - b0y) - (a.y - a0y);
    const qa = vx * vx + vy * vy;
    const qb = 2 * (rx * vx + ry * vy);
    const qc = rx * rx + ry * ry - diameter * diameter;
    const discriminant = qb * qb - 4 * qa * qc;
    if (qa < 1e-6 || discriminant < 0) return null;
    const firstContact = (-qb - Math.sqrt(discriminant)) / (2 * qa);
    if (firstContact < 0 || firstContact > 1) return null;
    t = firstContact;
    ax = a0x + (a.x - a0x) * t;
    ay = a0y + (a.y - a0y) * t;
    bx = b0x + (b.x - b0x) * t;
    by = b0y + (b.y - b0y) * t;
    dx = bx - ax; dy = by - ay;
    distance = Math.hypot(dx, dy);
    swept = true;
  }

  if (distance < 1e-4) {
    const direction = String(a.id) < String(b.id) ? 1 : -1;
    dx = direction; dy = 0; distance = 1;
  }
  return { ax, ay, bx, by, nx: dx / distance, ny: dy / distance,
    distance, diameter, t, swept };
}

function planeWorldVelocity(p) {
  const speed = Number.isFinite(p.speed) ? p.speed : 0;
  return {
    x: Math.cos(p.angle) * speed,
    y: Math.sin(p.angle) * speed + (Number.isFinite(p.verticalVelocity) ? p.verticalVelocity : 0)
  };
}

function storePlaneWorldVelocity(p, velocity) {
  const speed = Math.hypot(velocity.x, velocity.y);
  const limitedSpeed = Math.min(HIGH_SPEED_MAX_SPEED, speed);
  const scale = speed > 0 ? limitedSpeed / speed : 0;
  const vx = velocity.x * scale, vy = velocity.y * scale;
  p.speed = limitedSpeed;
  if (limitedSpeed > 0.01) p.angle = Math.atan2(vy, vx);
  p.verticalVelocity = 0;
  p.highSpeedActive = limitedSpeed >= HIGH_SPEED_THRESHOLD;
  return { x: vx, y: vy };
}

function enforcePlaneCollisionWorld(p, fromX, fromY, now) {
  if (!planeCanCollide(p)) return;
  if (activeMapId === 'canyon') {
    const collision = canyonFirstRockCollision(fromX, fromY, p.x, p.y, CANYON_PLANE_COLLISION_RADIUS);
    if (collision) { crashPlaneIntoCanyon(p, collision); return; }
  }
  if (updateBoundaryState(p, now)) {
    if (samePlayerId(p.id, myId)) beginDeathFall(null, 'Boundary lost — aircraft disabled');
    else if (p.isBot) beginBotDeathFall(p, null);
    else beginRemoteDeathFall(p, null, 'Boundary lost — aircraft disabled');
    return;
  }
  if (activeMapId !== 'canyon' && p.y >= GROUND_Y - 12) {
    if (samePlayerId(p.id, myId)) crashLocal('You hit the sea.');
    else if (p.isBot) beginBotDeathFall(p, null);
    else beginRemoteDeathFall(p, null, 'You hit the sea.');
  }
}

function resolvePlaneCollisions(now = performance.now(), dtSec = 0) {
  if (!isHost && !botMode) return;
  const active = Object.values(players).filter(planeCanCollide);
  for (let i = 0; i < active.length; i++) {
    const a = active[i];
    for (let j = i + 1; j < active.length; j++) {
      if (!planeCanCollide(a)) break;
      const b = active[j];
      if (!planeCanCollide(b)) continue;
      const contact = planeCollisionSweep(a, b);
      if (!contact) continue;

      const oldAX = a.x, oldAY = a.y, oldBX = b.x, oldBY = b.y;
      const { nx, ny, distance, diameter, swept, t } = contact;
      if (swept) {
        // Put fast crossing aircraft at first contact, then spend the unused
        // frame time moving them apart using the post-impact velocity.
        a.x = contact.ax - nx * .25; a.y = contact.ay - ny * .25;
        b.x = contact.bx + nx * .25; b.y = contact.by + ny * .25;
      } else if (distance < diameter) {
        const correction = (diameter - distance + .5) * .5;
        a.x -= nx * correction; a.y -= ny * correction;
        b.x += nx * correction; b.y += ny * correction;
      }

      const velocityA = planeWorldVelocity(a), velocityB = planeWorldVelocity(b);
      const relativeNormal = (velocityB.x - velocityA.x) * nx + (velocityB.y - velocityA.y) * ny;
      const closingSpeed = Math.max(0, -relativeNormal);
      const impactX = (contact.ax + contact.bx) * .5;
      const impactY = (contact.ay + contact.by) * .5;
      if (closingSpeed > 0) {
        const impulse = -(1 + PLANE_COLLISION_RESTITUTION) * relativeNormal * .5;
        velocityA.x -= impulse * nx; velocityA.y -= impulse * ny;
        velocityB.x += impulse * nx; velocityB.y += impulse * ny;
        const resolvedA = storePlaneWorldVelocity(a, velocityA);
        const resolvedB = storePlaneWorldVelocity(b, velocityB);
        const remaining = swept ? Math.max(0, dtSec * (1 - t)) : 0;
        if (remaining) {
          a.x += resolvedA.x * remaining; a.y += resolvedA.y * remaining;
          b.x += resolvedB.x * remaining; b.y += resolvedB.y * remaining;
        }
      }

      if (closingSpeed >= 250) {
        const key = [String(a.id), String(b.id)].sort().join(':');
        const lastHit = planeCollisionDamageAt.get(key) || 0;
        if (!planeCollisionDamageAt.has(key) || now - lastHit >= PLANE_COLLISION_DAMAGE_COOLDOWN_MS) {
          planeCollisionDamageAt.set(key, now);
          const damage = Math.round(clamp((closingSpeed - 200) * .04, 1, 40));
          applyHostDamage(a, damage, b.id);
          applyHostDamage(b, damage, a.id);
          spawnExplosion(impactX, impactY, 'spark');
          if (!botMode) broadcast({ type: 'effect', kind: 'spark', x: impactX, y: impactY });
        }
      }

      enforcePlaneCollisionWorld(a, oldAX, oldAY, now);
      enforcePlaneCollisionWorld(b, oldBX, oldBY, now);
    }
  }
  // The map is small (at most 28 pairs); pruning also prevents stale keys
  // after pilots disconnect and later reuse their slot.
  for (const [key, hitAt] of planeCollisionDamageAt) {
    if (now - hitAt > PLANE_COLLISION_DAMAGE_COOLDOWN_MS * 8) planeCollisionDamageAt.delete(key);
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
      applyHostDamage(target, bulletDamageAtDistance(b) * (rearHit ? 1.35 : 1), b.ownerId);
      break;
    }
    if (!target.alive || target.falling) return;
    for (let i = missiles.length - 1; i >= 0; i--) {
      const m = missiles[i];
      if (!m.ignited || samePlayerId(m.ownerId, target.id) || m.decoyTarget ||
          (m.targetId != null && !samePlayerId(m.targetId, target.id))) continue;
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
  });
  c.on('data', data => {
    if (ownerId == null || realtimeConnections[ownerId] !== c || !connections[ownerId]?.open) return;
    if (data?.type === 'input') handleHostReceive(Number(ownerId), data);
  });
  const close = () => {
    if (ownerId != null && realtimeConnections[ownerId] === c) {
      delete realtimeConnections[ownerId];
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
  planeCollisionDamageAt.clear();
  highSpeedWake.reset();
  stopWaterWakeAudio();
  stopGunfireAudio();
  localFlareScheduleGeneration++;
  missileLockTargetId = null; missileLockAcquireId = null; missileLockCandidateId = null;
  missileLockCandidateAligned = false; missileLockProgress = 0; missileLockExpiresAt = 0;
  currentCameraFovMult = CAMERA_FOV_MULT;
  lastClientInputSend = 0; clientInputSeq = 0; clientActionSeq = 0; lastInputSendErrorAt = 0;
  lastHostInputAck = 0; lastHostActionAck = 0;
  lastTime = 0; lastBroadcast = 0; lastProjectileBroadcast = 0;
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
    if (c.label === 'flight-state') { acceptRealtimeConnection(c); return; }
    const id = nextFreeId();
    if (id === null) { c.on('open', () => c.send({ type: 'full' })); return; }
    connections[id] = c;
    players[id] = freshPlayerState(id, 'Player ' + (id + 1));
    players[id].connected = true;
    c.on('open', () => {
      c.send({ type: 'welcome', id });
      if (started) c.send({ type: 'start', mapId: activeMapId });
      broadcastRoster();
    });
    c.on('data', data => handleHostReceive(id, data));
    c.on('close', () => {
      if (realtimeConnections[id]) realtimeConnections[id].close();
      if (players[id]) players[id].connected = false;
      removePlayerArtifacts(id);
      broadcastRoster();
    });
    c.on('error', () => {
      if (realtimeConnections[id]) realtimeConnections[id].close();
      if (players[id]) players[id].connected = false;
      removePlayerArtifacts(id);
      broadcastRoster();
    });
  });
  startBtn.onclick = () => {
    if (started) return;
    activeMapId = validMapId(mapSelectEl?.value || selectedMapId);
    started = true; buildClouds();
    broadcast({ type: 'start', mapId: activeMapId });
    beginLocalGame();
  };
}

function startBotMode() {
  resetForNewSession();
  unlockAudio();
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
  if (!p.alive) return;
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
    const lockedTarget = p.hostLockExpiresAt > performance.now() &&
      findHostLockTarget(p) === p.hostLockTargetId ? p.hostLockTargetId : null;
    fireMissileFor(p, p.id, lockedTarget, true);
  } else if (action.type === 'bomb') {
    dropBombFor(p, p.id, true);
  } else if (action.type === 'flare') {
    deployFlareFor(p, p.id, true);
  }
}

// Position/angle updates only arrive ~15 times/sec over the network. Instead
// of snapping the remote plane straight to each update (which looks choppy,
// like the game is running at 15fps), we store the update as a target and
// glide the rendered plane toward it every frame in interpolateRemotePlayers().
function applyRemoteState(p, data) {
  if (!p || ![data.x, data.y, data.angle, data.health].every(Number.isFinite)) {
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
  if (Number.isFinite(data.turnVelocity)) p.turnVelocity = data.turnVelocity;
  p.lastStateAt = performance.now();
  p.health = data.health; p.alive = data.alive;
  p.falling = !!data.falling;
  p.stalled = !!data.stalled;
  p.boosting = !!data.boosting;
  if (data.roll != null) p.roll = data.roll;
  ['speed', 'verticalVelocity', 'heat', 'overheated', 'boost', 'missiles', 'bombs', 'flares', 'score', 'kills', 'deaths', 'borderEnteredAt', 'borderRemaining'].forEach(key => {
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
    if (Number(id) !== fromId && c.open) c.send({ type: 'state', from: fromId, x: data.x, y: data.y, angle: data.angle, turnVelocity: data.turnVelocity, verticalVelocity: data.verticalVelocity, health: data.health, alive: data.alive, falling: data.falling, stalled: data.stalled, boosting: data.boosting, roll: data.roll });
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
      from: p.id, x: p.x, y: p.y, angle: p.angle, turnVelocity: p.turnVelocity,
      verticalVelocity: p.verticalVelocity,
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
    missiles: missiles.map(m => ({
      id: m.id, ownerId: m.ownerId, targetId: m.targetId,
      x: m.x, y: m.y, angle: m.angle, speed: m.speed,
      coastSpeed: m.coastSpeed, dropVelocity: m.dropVelocity || 0,
      coastRemaining: Math.max(0, (m.boostAt || (m.born + MISSILE_LAUNCH_COAST_MS)) - now),
      decoyed: !!m.decoyed,
      decoyTarget: m.decoyTarget ? { x: m.decoyTarget.x, y: m.decoyTarget.y } : null,
      lastTargetX: m.lastTargetX, lastTargetY: m.lastTargetY,
      lastTargetSeenAgo: m.lastTargetSeenAt ? Math.max(0, now - m.lastTargetSeenAt) : null,
      age: age(m)
    })),
    bombs: bombs.map(b => ({ id: b.id, ownerId: b.ownerId, x: b.x, y: b.y, vx: b.vx, vy: b.vy, age: age(b) })),
    shrapnels: shrapnels.map(s => ({ id: s.id, ownerId: s.ownerId, x: s.x, y: s.y, prevX: s.prevX, prevY: s.prevY, vx: s.vx, vy: s.vy, age: age(s) }))
  };
  Object.entries(connections).forEach(([id, c]) => {
    if (!c?.open || !players[id]) return;
    const packet = {
      type: 'projectiles', snapshotAt: now, bulletsPartial: bullets.length > NETWORK_BULLETS_PER_SNAPSHOT,
      bullets: nearest(bullets, players[id], NETWORK_BULLETS_PER_SNAPSHOT).map(b => ({
        id: b.id, ownerId: b.ownerId, x: b.x, y: b.y, prevX: b.prevX, prevY: b.prevY,
        angle: b.angle, vx: b.vx, vy: b.vy, traveled: Number.isFinite(b.traveled) ? b.traveled : 0, age: age(b)
      })), ...other
    };
    // Never build a queue of stale world corrections ahead of actions or
    // hit events. Bullet creation/removal travels independently and reliably.
    if ((c.dataChannel?.bufferedAmount || 0) > 12000) return;
    try { c.send(packet); } catch (error) {
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
    shotAt: old?.shotAt || 0, traveled: Number.isFinite(p.traveled) ? p.traveled : (old?.traveled || 0)
  }));
  sync('missile', data.missiles, ['x', 'y', 'angle', 'speed'], (p, old, t) => ({
    ...p,
    born: t - (p.age || 0),
    boostAt: t + (Number.isFinite(p.coastRemaining) ? clamp(p.coastRemaining, 0, MISSILE_LAUNCH_COAST_MS) : Math.max(0, MISSILE_LAUNCH_COAST_MS - (p.age || 0))),
    lockReadyAt: t + (Number.isFinite(p.coastRemaining) ? clamp(p.coastRemaining, 0, MISSILE_LAUNCH_COAST_MS) : Math.max(0, MISSILE_LAUNCH_COAST_MS - (p.age || 0))),
    coastSpeed: Number.isFinite(p.coastSpeed) ? p.coastSpeed : Math.min(p.speed, MISSILE_COAST_MAX_SPEED),
    dropVelocity: Number.isFinite(p.dropVelocity) ? p.dropVelocity : 0,
    ignited: Number.isFinite(p.coastRemaining) ? p.coastRemaining <= 0 : (p.age || 0) >= MISSILE_LAUNCH_COAST_MS,
    boosted: Number.isFinite(p.coastRemaining) ? p.coastRemaining <= 0 : (p.age || 0) >= MISSILE_LAUNCH_COAST_MS,
    lastTargetSeenAt: Number.isFinite(p.lastTargetSeenAgo) ? t - p.lastTargetSeenAgo : (old?.lastTargetSeenAt || 0),
    trail: old?.trail || [], exhaust: 0,
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
    bullets.push({ id: data.id, ownerId: fromId, x: data.x, y: data.y, prevX: data.x, prevY: data.y, angle: data.angle, vx: Math.cos(data.angle) * BULLET_SPEED, vy: Math.sin(data.angle) * BULLET_SPEED, born: performance.now(), traveled: 0 });
    spawnExplosion(data.x, data.y, 'muzzle');
  }
  broadcast({ type: 'shoot', from: fromId, id: data.id, x: data.x, y: data.y,
    angle: data.angle, shotAt: data.shotAt });
}

function handleMissile(fromId, data) {
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.angle)) return;
  if (!samePlayerId(fromId, myId) && data.id != null && !projectileExists('missile', data.id)) {
    missiles.push(createMissileReplica(data, fromId));
    spawnExplosion(data.x, data.y, 'launch');
    playMissileLaunchSound(data.x, data.y);
  }
  Object.entries(connections).forEach(([id, c]) => {
    if (Number(id) !== fromId && c.open) c.send({ type: 'missile', from: fromId, id: data.id,
      targetId: data.targetId, x: data.x, y: data.y, angle: data.angle, speed: data.speed,
      coastSpeed: data.coastSpeed, coastRemaining: data.coastRemaining, dropVelocity: data.dropVelocity,
      lastTargetX: data.lastTargetX, lastTargetY: data.lastTargetY,
      locked: data.targetId != null });
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
  if (data.kind === 'spark' || data.kind === 'crash') {
    spawnExplosion(data.x, data.y, data.kind, Number.isFinite(data.angle) ? data.angle : -Math.PI / 2);
  }
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
    scheduleRealtimeRetry(hostId);
    return;
  }
  connections.realtime = c;
  c.on('open', () => {
    if (peer !== sessionPeer || connections.realtime !== c) { c.close(); return; }
    lastRealtimeOpenAt = performance.now();
    lastRealtimeRxAt = 0;
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
  setNetworkStatus('P2P // CONNECTING', 'warn');
  isHost = false;
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
  if (!menuFightFrame) startMenuDogfight();
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
        born: performance.now(), shotAt: Number.isFinite(data.shotAt) ? data.shotAt : 0, traveled: 0 };
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
      markGunfire(data.from, data.x, data.y);
    }
  }
  else if (data.type === 'missile') {
    if (data.id != null && Number.isFinite(data.x) && Number.isFinite(data.y) && Number.isFinite(data.angle) &&
        !projectileExists('missile', data.id)) {
      const targetId = Number.isInteger(data.targetId) ? data.targetId : null;
      missiles.push(createMissileReplica({ ...data, targetId }, data.from));
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
// Decorative menu dogfight: deliberately independent of the live match
// simulation, so menu motion can never change player, bot, or network state.
let menuFightCanvas = null, menuFightCtx = null, menuFightFrame = 0;
let menuFightWidth = 0, menuFightHeight = 0, menuFightDpr = 1;
let menuFightLast = 0, menuFightPlanes = [], menuFightShots = [], menuFightMissiles = [], menuFightFlares = [], menuFightSparks = [];
let menuFightResizeWired = false;
let menuFightVisibilityWired = false;
let menuFightFlareId = 0;
const MENU_FIGHT_COLORS = ['#ff806f', '#73e0d2', '#ffd166', '#9d91ff'];

function resizeMenuDogfight() {
  if (!menuFightCanvas || !menuFightCtx) return;
  // The animated menu is decorative; rendering above CSS resolution costs
  // fill-rate on integrated GPUs without making the planes meaningfully clearer.
  menuFightDpr = Math.min(window.devicePixelRatio || 1, 1);
  menuFightWidth = Math.max(1, window.innerWidth);
  menuFightHeight = Math.max(1, window.innerHeight);
  menuFightCanvas.width = Math.round(menuFightWidth * menuFightDpr);
  menuFightCanvas.height = Math.round(menuFightHeight * menuFightDpr);
  menuFightCtx.setTransform(menuFightDpr, 0, 0, menuFightDpr, 0, 0);
  if (menuFightPlanes.length) {
    menuFightPlanes.forEach((p, i) => {
      p.x = clamp(p.nx * menuFightWidth, 45, menuFightWidth - 45);
      p.y = clamp(p.ny * menuFightHeight, 45, menuFightHeight - 45);
    });
  }
}

function startMenuDogfight() {
  menuFightCanvas = document.getElementById('menuDogfight');
  if (!menuFightCanvas) return;
  menuFightCanvas.style.display = 'block';
  menuFightCtx = menuFightCanvas.getContext('2d', { alpha: true });
  resizeMenuDogfight();
  menuFightPlanes = MENU_FIGHT_COLORS.map((color, i) => {
    const nx = [.12, .82, .24, .88][i], ny = [.26, .34, .78, .72][i];
    return { id: i, color, nx, ny, x: nx * menuFightWidth, y: ny * menuFightHeight,
      angle: [0, Math.PI, -.35, Math.PI + .35][i], speed: 185 + i * 12,
      hp: 3, fireAt: performance.now() + 300 + i * 180,
      missileAt: performance.now() + 1800 + i * 1250,
      flareDemoAt: performance.now() + 4400 + i * 1900, flarePopAt: 0,
      flareBurstPops: 0, flareCooldownUntil: 0, respawnAt: 0,
      flashUntil: 0, rollPhase: i * 1.7 };
  });
  menuFightShots = []; menuFightMissiles = []; menuFightFlares = []; menuFightSparks = [];
  menuFightLast = performance.now();
  menuFightFrame = requestAnimationFrame(drawMenuDogfight);
  if (!menuFightResizeWired) {
    menuFightResizeWired = true;
    window.addEventListener('resize', resizeMenuDogfight);
  }
  if (!menuFightVisibilityWired) {
    menuFightVisibilityWired = true;
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && menu && menu.style.display !== 'none' && !menuFightFrame) startMenuDogfight();
    });
  }
}

function drawMenuDogfight(ts) {
  if (!menuFightCanvas || document.hidden || !menu || menu.style.display === 'none') { menuFightFrame = 0; return; }
  const ctx = menuFightCtx, W = menuFightWidth, H = menuFightHeight;
  const elapsed = menuFightLast ? ts - menuFightLast : 1000 / 30;
  if (elapsed < 1000 / 30) {
    menuFightFrame = requestAnimationFrame(drawMenuDogfight);
    return;
  }
  const dt = clamp(elapsed / 1000, 0, .06);
  menuFightLast = ts;
  ctx.setTransform(menuFightDpr, 0, 0, menuFightDpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  // Show more of the engagement at once with a gentle camera pullback.
  ctx.save(); ctx.translate(W * .5, H * .5); ctx.scale(.78, .78); ctx.translate(-W * .5, -H * .5);

  // Atmospheric horizon and distant cloud bands keep the action readable
  // while leaving the existing game menu and typography in the foreground.
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, 'rgba(20,65,89,.10)');
  sky.addColorStop(.62, 'rgba(94,161,170,.13)');
  sky.addColorStop(1, 'rgba(230,174,111,.2)');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = .18;
  for (let i = 0; i < 5; i++) {
    const y = H * (.18 + i * .16) + Math.sin(ts / 2600 + i) * 9;
    const x = ((ts * (.009 + i * .002) + i * W * .29) % (W + 320)) - 160;
    const g = ctx.createLinearGradient(x, y, x + 260, y);
    g.addColorStop(0, 'rgba(215,240,239,0)'); g.addColorStop(.5, 'rgba(215,240,239,.65)'); g.addColorStop(1, 'rgba(215,240,239,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x + 130, y, 150, 11 + i % 3 * 4, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();

  for (const p of menuFightPlanes) {
    if (p.respawnAt) {
      if (ts >= p.respawnAt) {
        p.nx = Math.random() < .5 ? .08 : .92; p.ny = .16 + Math.random() * .68;
        p.x = p.nx * W; p.y = p.ny * H; p.angle = p.nx < .5 ? 0 : Math.PI;
        p.hp = 3; p.respawnAt = 0; p.fireAt = ts + 700;
      }
      continue;
    }
    const target = menuFightPlanes[(p.id + 1) % menuFightPlanes.length];
    if (!target || target.respawnAt) continue;
    const dx = target.x - p.x, dy = target.y - p.y;
    const desired = Math.atan2(dy, dx);
    const turn = clamp(angleDiff(p.angle, desired), -1.75 * dt, 1.75 * dt);
    p.angle += turn;
    // A soft center bias prevents fighters disappearing behind the menu edges.
    const cx = W * (.5 + Math.sin(ts / 5400 + p.id * 2.1) * .15);
    const cy = H * (.5 + Math.cos(ts / 4700 + p.id * 1.6) * .2);
    const homeAngle = Math.atan2(cy - p.y, cx - p.x);
    if (p.x < 38 || p.x > W - 38 || p.y < 38 || p.y > H - 38) {
      p.angle += clamp(angleDiff(p.angle, homeAngle), -2.0 * dt, 2.0 * dt);
    }
    const velocity = p.speed * (Math.abs(turn) > .01 ? .84 : 1);
    p.x += Math.cos(p.angle) * velocity * dt;
    p.y += Math.sin(p.angle) * velocity * dt;
    p.nx = p.x / W; p.ny = p.y / H;
    p.rollPhase += dt * (turn === 0 ? .15 : Math.sign(turn) * 1.7);
    const targetDistance = dist(p.x, p.y, target.x, target.y);
    const targetError = Math.abs(angleDiff(p.angle, desired));
    if (ts >= p.fireAt && targetDistance < Math.min(W, H) * .82 && targetError < .34) {
      const muzzleX = p.x + Math.cos(p.angle) * 26, muzzleY = p.y + Math.sin(p.angle) * 26;
      menuFightShots.push({ x: muzzleX, y: muzzleY, vx: Math.cos(p.angle) * 610, vy: Math.sin(p.angle) * 610,
        owner: p.id, target: target.id, born: ts, life: .86 });
      p.fireAt = ts + 340 + Math.random() * 240;
    } else if (ts >= p.fireAt) p.fireAt = ts + 120;

    if (ts >= p.missileAt && targetDistance < Math.min(W, H) * .92 && targetError < .48) {
      const mx = p.x + Math.cos(p.angle) * 34, my = p.y + Math.sin(p.angle) * 34;
      menuFightMissiles.push({ id: ++menuFightFlareId, x: mx, y: my, angle: p.angle,
        speed: 205, owner: p.id, target: target.id, born: ts, life: 3.8, flareTargetId: null });
      p.missileAt = ts + 4300 + Math.random() * 2000;
    }

    const incoming = menuFightMissiles.some(m => m.target === p.id && dist(m.x, m.y, p.x, p.y) < 245);
    if (!p.flareBurstPops && ts >= p.flareCooldownUntil && (incoming || ts >= p.flareDemoAt)) {
      p.flareBurstPops = 3; p.flarePopAt = ts; p.flareCooldownUntil = ts + 11500;
      p.flareDemoAt = ts + 14500 + Math.random() * 5000;
    }
    while (p.flareBurstPops > 0 && ts >= p.flarePopAt) {
      // Each pair is emitted from the current wing positions, then the three
      // paired pops roll out at short intervals like a countermeasure burst.
      for (const side of [-1, 1]) {
        const lx = -5, ly = side * 12;
        const fx = p.x + Math.cos(p.angle) * lx - Math.sin(p.angle) * ly;
        const fy = p.y + Math.sin(p.angle) * lx + Math.cos(p.angle) * ly;
        menuFightFlares.push({ id: ++menuFightFlareId, x: fx, y: fy,
          vx: -Math.cos(p.angle) * 78 - Math.sin(p.angle) * side * 82,
          vy: -Math.sin(p.angle) * 78 + Math.cos(p.angle) * side * 82,
          born: ts, owner: p.id, life: 1.35 });
      }
      p.flareBurstPops--; p.flarePopAt += 85;
    }
  }

  menuFightFlares = menuFightFlares.filter(f => {
    const age = (ts - f.born) / 1000;
    if (age > f.life) return false;
    f.x += f.vx * dt; f.y += f.vy * dt;
    f.vy += 16 * dt;
    return true;
  });
  menuFightMissiles = menuFightMissiles.filter(m => {
    const target = menuFightPlanes[m.target];
    if (!target || target.respawnAt || (ts - m.born) / 1000 > m.life) return false;
    let decoy = m.flareTargetId == null ? null : menuFightFlares.find(f => f.id === m.flareTargetId);
    if (!decoy) {
      m.flareTargetId = null;
      let nearest = 190;
      for (const flare of menuFightFlares) {
        if (flare.owner === m.target) continue;
        const d = dist(m.x, m.y, flare.x, flare.y);
        if (d < nearest) { nearest = d; decoy = flare; }
      }
      if (decoy) m.flareTargetId = decoy.id;
    }
    const aimX = decoy ? decoy.x : target.x, aimY = decoy ? decoy.y : target.y;
    const wanted = Math.atan2(aimY - m.y, aimX - m.x);
    m.angle += clamp(angleDiff(m.angle, wanted), -2.8 * dt, 2.8 * dt);
    m.speed = Math.min(380, m.speed + 150 * dt);
    const oldX = m.x, oldY = m.y;
    m.x += Math.cos(m.angle) * m.speed * dt;
    m.y += Math.sin(m.angle) * m.speed * dt;
    if (decoy && pointSegmentDistance(decoy.x, decoy.y, oldX, oldY, m.x, m.y) < 11) {
      menuFightSparks.push({ x: decoy.x, y: decoy.y, born: ts, color: '#ffe6a1' });
      return false;
    }
    if (!decoy && pointSegmentDistance(target.x, target.y, oldX, oldY, m.x, m.y) < 18) {
      target.hp--; target.flashUntil = ts + 160;
      menuFightSparks.push({ x: target.x, y: target.y, born: ts, color: '#ffbd69' });
      if (target.hp <= 0) {
        for (let n = 0; n < 12; n++) menuFightSparks.push({ x: target.x, y: target.y, born: ts, color: n % 2 ? '#ffbd69' : '#d9f4ff', vx: rand(-150, 150), vy: rand(-150, 150) });
        target.respawnAt = ts + 1400;
      }
      return false;
    }
    return true;
  });

  menuFightShots = menuFightShots.filter(s => {
    const age = (ts - s.born) / 1000;
    if (age > s.life) return false;
    const oldX = s.x, oldY = s.y;
    s.x += s.vx * dt; s.y += s.vy * dt;
    const target = menuFightPlanes[s.target];
    if (target && !target.respawnAt && pointSegmentDistance(target.x, target.y, oldX, oldY, s.x, s.y) < 15) {
      target.hp--; target.flashUntil = ts + 110;
      menuFightSparks.push({ x: target.x, y: target.y, born: ts, color: target.color });
      if (target.hp <= 0) {
        for (let n = 0; n < 9; n++) menuFightSparks.push({ x: target.x, y: target.y, born: ts, color: n % 2 ? '#ffbd69' : '#d9f4ff', vx: rand(-110, 110), vy: rand(-110, 110) });
        target.respawnAt = ts + 1400;
      }
      return false;
    }
    return s.x > -20 && s.x < W + 20 && s.y > -20 && s.y < H + 20;
  });

  ctx.save(); ctx.lineCap = 'round';
  for (const shot of menuFightShots) {
    const age = (ts - shot.born) / 1000;
    ctx.strokeStyle = 'rgba(255,222,150,' + clamp(1 - age / shot.life, 0, .9) + ')';
    ctx.lineWidth = 2; ctx.shadowColor = '#ffc76f'; ctx.shadowBlur = 9;
    ctx.beginPath(); ctx.moveTo(shot.x, shot.y); ctx.lineTo(shot.x - shot.vx * .035, shot.y - shot.vy * .035); ctx.stroke();
  }
  ctx.restore();
  for (const m of menuFightMissiles) {
    ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.angle);
    const trail = ctx.createLinearGradient(-6, 0, -30, 0);
    trail.addColorStop(0, 'rgba(255,244,190,.92)'); trail.addColorStop(.35, 'rgba(255,139,67,.75)'); trail.addColorStop(1, 'rgba(255,70,35,0)');
    ctx.fillStyle = trail; ctx.beginPath(); ctx.moveTo(-4, -2.4); ctx.lineTo(-30, 0); ctx.lineTo(-4, 2.4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f1f6ed'; ctx.strokeStyle = '#f5c47f'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(1, -2); ctx.lineTo(-7, -1.3); ctx.lineTo(-9, 0); ctx.lineTo(-7, 1.3); ctx.lineTo(1, 2); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  for (const f of menuFightFlares) {
    const age = (ts - f.born) / 1000;
    const radius = 8 + Math.sin(ts / 45 + f.id) * 1.8;
    const glow = ctx.createRadialGradient(f.x, f.y, 1, f.x, f.y, 24);
    glow.addColorStop(0, 'rgba(255,255,220,.98)'); glow.addColorStop(.22, 'rgba(255,192,84,.9)'); glow.addColorStop(1, 'rgba(255,91,31,0)');
    ctx.globalAlpha = clamp(1 - age / f.life, 0, 1); ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(f.x, f.y, radius * 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff3bf'; ctx.beginPath(); ctx.arc(f.x, f.y, 2.6, 0, Math.PI * 2); ctx.fill();
  }
  menuFightSparks = menuFightSparks.filter(s => ts - s.born < 480);
  for (const s of menuFightSparks) {
    const age = (ts - s.born) / 1000;
    const x = s.x + (s.vx || 0) * age, y = s.y + (s.vy || 0) * age;
    ctx.globalAlpha = 1 - age / .48; ctx.fillStyle = s.color;
    ctx.beginPath(); ctx.arc(x, y, s.vx == null ? 3 + age * 8 : 2.5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  for (const p of menuFightPlanes) {
    if (p.respawnAt) continue;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
    const flicker = ts < p.flashUntil;
    ctx.globalAlpha = flicker ? .42 : .88;
    ctx.shadowColor = p.color; ctx.shadowBlur = 15;
    ctx.scale(.82, .82);
    drawPlaneSprite(ctx, p.color, true, true, Math.sin(p.rollPhase) * .28, false, false);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffbd69'; ctx.globalAlpha = .76;
    ctx.beginPath(); ctx.arc(35, 0, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  menuFightFrame = requestAnimationFrame(drawMenuDogfight);
}

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
  if (!isMe && activeMapId === 'storm' && Math.hypot(p.x - myState.x, p.y - myState.y) > STORM_VISIBILITY_RANGE) return;
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

function isWorldPointVisible(x, y, camX, camY, viewW, viewH, padding = 0) {
  return Number.isFinite(x) && Number.isFinite(y) &&
    x >= camX - padding && x <= camX + viewW + padding &&
    y >= camY - padding && y <= camY + viewH + padding;
}

function drawVisibleWorldItems(items, ctx, now, camX, camY, viewW, viewH, padding, drawItem) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item || !isWorldPointVisible(item.x, item.y, camX, camY, viewW, viewH, padding)) continue;
    drawItem(ctx, item, now);
  }
}

function drawBullet(ctx, b, now = performance.now()) {
  if (!b || !Number.isFinite(b.x) || !Number.isFinite(b.y) || !Number.isFinite(b.angle)) return;
  const visible = clamp(1 - (now - (b.visualBorn || 0)) / 300, 0, 1);
  const bx = b.x + (b.renderDx || 0) * visible;
  const by = b.y + (b.renderDy || 0) * visible;
  const angle = b.angle + (b.renderAngle || 0) * visible;
  ctx.save();
  ctx.strokeStyle = b.ownerId === myId ? 'rgba(255,244,155,.7)' : 'rgba(255,125,90,.55)';
  ctx.lineWidth = 1; ctx.lineCap = 'round';
  const tail = 9;
  ctx.beginPath(); ctx.moveTo(bx - Math.cos(angle) * tail, by - Math.sin(angle) * tail); ctx.lineTo(bx, by); ctx.stroke();
  ctx.shadowColor = b.ownerId === myId ? '#fff59d' : '#ff6548';
  ctx.shadowBlur = isReducedGraphics() ? 0 : 5;
  ctx.fillStyle = b.ownerId === myId ? '#fffbd0' : '#ff987d';
  ctx.beginPath();
  ctx.ellipse(bx, by, BULLET_RADIUS * 2.2, BULLET_RADIUS, angle, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMissile(ctx, m, now = performance.now()) {
  if (!m || !Number.isFinite(m.x) || !Number.isFinite(m.y) || !Number.isFinite(m.angle)) return;
  const incoming = m.targetId === myId && m.ownerId !== myId && m.ignited;
  if (incoming) {
    const pulse = 22 + Math.sin(now / 90) * 5;
    ctx.save(); ctx.globalAlpha = .28; ctx.strokeStyle = '#ff4558'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(m.x, m.y, pulse, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
  const trail = Array.isArray(m.trail) ? m.trail : [];
  for (let i = 0; i < trail.length; i++) {
    const t = trail[i];
    if (!t || !Number.isFinite(t.x) || !Number.isFinite(t.y)) continue;
    const frac = (i + 1) / (trail.length + 1);
    ctx.fillStyle = m.ignited
      ? `rgba(255,${Math.round(115 + frac * 105)},${Math.round(48 + frac * 90)},${frac * .52})`
      : `rgba(184,203,211,${frac * .2})`;
    ctx.beginPath();
    ctx.arc(t.x, t.y, m.ignited ? 2 + frac * 4 : 1 + frac * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(m.x, m.y);
  ctx.rotate(m.angle);
  if (m.ignited) {
    const flicker = .82 + Math.sin(now * .055 + (Number(m.ownerId) || 0)) * .12;
    ctx.globalAlpha = flicker;
    ctx.shadowColor = m.decoyed ? '#c2d1d6' : '#ff8a3d'; ctx.shadowBlur = m.decoyed ? 7 : 16;
    ctx.fillStyle = m.decoyed ? '#d5e0e4' : '#ffd073';
    ctx.beginPath(); ctx.moveTo(-13, -2.2); ctx.lineTo(-25, 0); ctx.lineTo(-13, 2.2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = m.decoyed ? '#aab9bf' : '#ff5635';
    ctx.beginPath(); ctx.moveTo(-13, -1.25); ctx.lineTo(-20, 0); ctx.lineTo(-13, 1.25); ctx.closePath(); ctx.fill();
  } else {
    ctx.shadowColor = 'rgba(160,190,202,.28)'; ctx.shadowBlur = 5;
  }
  const body = ctx.createLinearGradient(-13, -4, 16, 4);
  body.addColorStop(0, m.decoyed ? '#8899a0' : '#53666e');
  body.addColorStop(.42, m.decoyed ? '#d0dadd' : '#dce6e8');
  body.addColorStop(.72, m.decoyed ? '#9eafb5' : '#83969d');
  body.addColorStop(1, m.decoyed ? '#718188' : '#33454d');
  ctx.fillStyle = body;
  ctx.strokeStyle = m.decoyed ? '#e1eaed' : '#f0f6f7'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-15, -2.7); ctx.lineTo(9, -2.7);
  ctx.quadraticCurveTo(14, -2.5, 21, 0);
  ctx.quadraticCurveTo(14, 2.5, 9, 2.7); ctx.lineTo(-15, 2.7);
  ctx.quadraticCurveTo(-18, 0, -15, -2.7);
  ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0;
  // Forward seeker nose and swept cruciform fins give the missile a slender
  // guided-rocket silhouette that is distinct from the game's bomb shape.
  ctx.fillStyle = m.decoyed ? '#65777e' : '#23343b';
  ctx.beginPath(); ctx.moveTo(8, -3); ctx.lineTo(21, 0); ctx.lineTo(8, 3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = m.decoyed ? '#71838a' : '#a44537';
  ctx.beginPath(); ctx.moveTo(2, -2.5); ctx.lineTo(-5, -8); ctx.lineTo(-8, -2.5); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(2, 2.5); ctx.lineTo(-5, 8); ctx.lineTo(-8, 2.5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = m.decoyed ? '#63747a' : '#a9bac0';
  ctx.beginPath(); ctx.moveTo(-7, -2.5); ctx.lineTo(-15, -7); ctx.lineTo(-13, -2.5); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-7, 2.5); ctx.lineTo(-15, 7); ctx.lineTo(-13, 2.5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e2a24d'; ctx.fillRect(-8, -2.65, 2, 5.3);
  ctx.fillStyle = '#52636a'; ctx.fillRect(-17, -2.3, 3, 4.6);
  ctx.fillStyle = m.decoyed ? '#dbe4e7' : '#f6d17e';
  ctx.beginPath(); ctx.ellipse(2, 0, 2.1, .85, 0, 0, Math.PI * 2); ctx.fill();
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
  // Red Canyon has a stone floor and no ocean. Its cave geometry is drawn
  // with the map backdrop, using the same profile that movement collides with.
  if (activeMapId === 'canyon') return;
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
  const reduced = isReducedGraphics();
  const cityStep = (reduced ? 188 : 132) * WORLD_SCALE;
  const first = Math.floor((start - 260 * WORLD_SCALE) / cityStep) * cityStep;
  const backBase = GROUND_Y - 220 * WORLD_SCALE;
  const frontBase = GROUND_Y - 70 * WORLD_SCALE;
  const drawLayer = (base, layer, color, windowColor) => {
    for (let x = first; x <= end + 260 * WORLD_SCALE; x += cityStep) {
      const seed = Math.abs(Math.sin(x * .017 + layer * 2.3));
      const width = (64 + Math.abs(Math.sin(x * .031 + layer)) * 46) * WORLD_SCALE;
      const height = (95 + seed * 160 + Math.abs(Math.sin(x * .009)) * 90) * layer * WORLD_SCALE;
      const y = base - height;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height + 90 * WORLD_SCALE);
      if (!reduced) {
        ctx.fillStyle = 'rgba(104,224,221,.16)';
        ctx.fillRect(x + 9 * WORLD_SCALE, y + 13 * WORLD_SCALE, 3 * WORLD_SCALE, Math.max(12, height - 20 * WORLD_SCALE));
        ctx.fillRect(x + width - 12 * WORLD_SCALE, y + 13 * WORLD_SCALE, 3 * WORLD_SCALE, Math.max(12, height - 20 * WORLD_SCALE));
      }
      ctx.fillStyle = windowColor;
      const rows = Math.floor(height / (reduced ? 46 : 30) / WORLD_SCALE);
      for (let row = 0; row < rows; row++) {
        if ((Math.floor(x / cityStep) + row * 3) % 4 < 2) {
          ctx.fillRect(x + 18 * WORLD_SCALE, y + 18 * WORLD_SCALE + row * (reduced ? 46 : 30) * WORLD_SCALE, Math.max(7, width - 34 * WORLD_SCALE), 4 * WORLD_SCALE);
        }
      }
    }
  };
  drawLayer(backBase, .72, 'rgba(9,34,48,.68)', 'rgba(255,205,108,.18)');
  drawLayer(frontBase, 1, 'rgba(6,25,39,.9)', 'rgba(255,205,108,.34)');
  ctx.fillStyle = 'rgba(7,22,32,.65)';
  ctx.fillRect(first, GROUND_Y - 42 * WORLD_SCALE, end - first + 260 * WORLD_SCALE, 44 * WORLD_SCALE);
}

function mapHash01(index, salt = 0) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function drawCanyonWorldMap(ctx, start, end) {
  const reduced = isReducedGraphics();
  const step = reduced ? 96 : 48;
  const first = clamp(Math.floor(start / step) * step, 0, WORLD_W);
  const last = clamp(Math.ceil(end / step) * step, 0, WORLD_W);
  const xs = [];
  for (let x = first; x < last; x += step) xs.push(x);
  if (!xs.length || xs[xs.length - 1] !== last) xs.push(last);

  const traceBand = (left, right, upper, lower) => {
    const points = [];
    for (let x = left; x < right; x += step) points.push(x);
    points.push(right);
    if (points.length < 2) return;
    ctx.beginPath();
    points.forEach((x, i) => i ? ctx.lineTo(x, upper(x)) : ctx.moveTo(x, upper(x)));
    for (let i = points.length - 1; i >= 0; i--) ctx.lineTo(points[i], lower(points[i]));
    ctx.closePath();
  };
  const solidRuns = [];
  let runStart = first;
  CANYON_CAVE_ENTRANCES.forEach(([gapStart, gapEnd]) => {
    if (gapEnd <= first || gapStart >= last) return;
    if (gapStart > runStart) solidRuns.push([runStart, Math.min(gapStart, last)]);
    runStart = Math.max(runStart, gapEnd);
  });
  if (runStart < last) solidRuns.push([runStart, last]);

  // The cave air is a connected lower-half flight space. A dark, warm
  // gradient gives it depth while leaving the sky above the roof untouched.
  traceBand(first, last, x => canyonProfileAt(x).ceilingY, x => canyonProfileAt(x).floorY);
  const air = ctx.createLinearGradient(0, 2280 * WORLD_SCALE, 0, WORLD_H);
  air.addColorStop(0, '#514047');
  air.addColorStop(.35, '#352f38');
  air.addColorStop(1, '#1b202a');
  ctx.fillStyle = air; ctx.fill();

  const roof = ctx.createLinearGradient(0, 1850 * WORLD_SCALE, 0, 2730 * WORLD_SCALE);
  roof.addColorStop(0, '#be7653'); roof.addColorStop(.25, '#995541');
  roof.addColorStop(.72, '#56383b'); roof.addColorStop(1, '#302d37');
  const floor = ctx.createLinearGradient(0, 3700 * WORLD_SCALE, 0, WORLD_H + BORDER_FOG_DEPTH);
  floor.addColorStop(0, '#68433c'); floor.addColorStop(.24, '#56383a');
  floor.addColorStop(1, '#252832');
  solidRuns.forEach(([left, right]) => {
    traceBand(left, right, x => canyonProfileAt(x).surfaceY, x => canyonProfileAt(x).ceilingY);
    ctx.fillStyle = roof; ctx.fill();
  });
  traceBand(first, last, x => canyonProfileAt(x).floorY, () => WORLD_H + BORDER_FOG_DEPTH);
  ctx.fillStyle = floor; ctx.fill();

  // Layered sandstone follows the exact cave wall silhouettes and is clipped
  // to each solid section so the entrances stay open all the way from sky.
  const drawStrata = (left, right, upper, lower) => {
    ctx.save(); traceBand(left, right, upper, lower); ctx.clip();
    const bandCount = reduced ? 6 : 10;
    for (let band = 0; band < bandCount; band++) {
      const y = (1940 + band * (reduced ? 330 : 206)) * WORLD_SCALE;
      ctx.beginPath();
      for (let x = left; x <= right; x += step) {
        const wobble = Math.sin(x * (.0018 + band * .00006) / WORLD_SCALE + band * 1.7) * 23 * WORLD_SCALE;
        if (x === left) ctx.moveTo(x, y + wobble); else ctx.lineTo(x, y + wobble);
      }
      ctx.strokeStyle = band % 3 === 0 ? 'rgba(255,193,145,.21)' : 'rgba(27,26,34,.22)';
      ctx.lineWidth = band % 4 === 0 ? 11 : 4;
      ctx.stroke();
    }
    ctx.restore();
  };
  solidRuns.forEach(([left, right]) => drawStrata(left, right,
    x => canyonProfileAt(x).surfaceY, x => canyonProfileAt(x).ceilingY));
  drawStrata(first, last, x => canyonProfileAt(x).floorY, () => WORLD_H + BORDER_FOG_DEPTH);

  // The cavern cross-walls use the same opening data as collision. Offset
  // apertures form two narrow lanes through each wall, opening into broad
  // chambers before the next split.
  CANYON_CAVE_BULKHEADS.forEach(([x, halfWidth, openings], index) => {
    if (x + halfWidth < first || x - halfWidth > last) return;
    const profile = canyonProfileAt(x), height = profile.floorY - profile.ceilingY;
    const spans = [];
    let cursor = 0;
    openings.slice().sort((a, b) => a[0] - b[0]).forEach(([top, bottom]) => {
      if (top > cursor) spans.push([cursor, top]);
      cursor = Math.max(cursor, bottom);
    });
    if (cursor < 1) spans.push([cursor, 1]);
    spans.forEach(([top, bottom], spanIndex) => {
      const y = profile.ceilingY + height * top;
      const h = height * (bottom - top);
      const rock = ctx.createLinearGradient(x - halfWidth, y, x + halfWidth, y + h);
      rock.addColorStop(0, '#a3624b'); rock.addColorStop(.42, '#694440'); rock.addColorStop(1, '#332f38');
      ctx.fillStyle = rock;
      ctx.fillRect(x - halfWidth, y, halfWidth * 2, h);
      ctx.strokeStyle = 'rgba(31,26,32,.72)'; ctx.lineWidth = 5;
      ctx.strokeRect(x - halfWidth, y, halfWidth * 2, h);
      ctx.strokeStyle = 'rgba(255,193,145,.3)'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - halfWidth + 8, y + h * (.22 + ((index + spanIndex) % 3) * .13));
      ctx.lineTo(x - 5, y + h * .44);
      ctx.lineTo(x + halfWidth - 7, y + h * (.36 + ((index + spanIndex + 1) % 3) * .12));
      ctx.stroke();
    });
  });

  // In the cave half, the map ends are solid sandstone walls and the floor
  // closes the bottom. Keep the sky above the cavern open to the normal arena.
  [0, WORLD_W - CANYON_END_WALL_THICKNESS].forEach(x => {
    const profile = canyonProfileAt(x === 0 ? 0 : WORLD_W);
    const rock = ctx.createLinearGradient(x, profile.ceilingY, x + CANYON_END_WALL_THICKNESS, WORLD_H);
    rock.addColorStop(0, '#8d5846'); rock.addColorStop(.48, '#573c3c'); rock.addColorStop(1, '#282b34');
    ctx.fillStyle = rock;
    ctx.fillRect(x, profile.ceilingY, CANYON_END_WALL_THICKNESS, WORLD_H - profile.ceilingY + BORDER_FOG_DEPTH);
    ctx.strokeStyle = 'rgba(255,193,145,.32)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(x + 4, profile.ceilingY); ctx.lineTo(x + 4, WORLD_H); ctx.stroke();
  });

  // Sky openings cast broad shafts of warm light into the lower caverns.
  CANYON_CAVE_ENTRANCES.forEach(([left, right], i) => {
    const x = (left + right) * .5;
    if (right < first || left > last) return;
    const profile = canyonProfileAt(x);
    const centerY = profile.ceilingY + 380 * WORLD_SCALE;
    const glow = ctx.createRadialGradient(x, centerY, 18 * WORLD_SCALE, x, centerY, 720 * WORLD_SCALE);
    glow.addColorStop(0, 'rgba(255,213,166,.16)');
    glow.addColorStop(.48, 'rgba(237,177,131,.075)');
    glow.addColorStop(1, 'rgba(224,160,125,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, centerY, 720 * WORLD_SCALE, 0, Math.PI * 2); ctx.fill();
  });

  // Silhouette rims and shadowed wall seams make the ceiling and floor read
  // as thick rock instead of a flat colored divider.
  for (const [left, right] of solidRuns) {
    [
      [x => canyonProfileAt(x).surfaceY, 'rgba(255,205,158,.55)', 4],
      [x => canyonProfileAt(x).ceilingY, 'rgba(25,25,34,.72)', 8]
    ].forEach(([edge, color, width]) => {
      ctx.beginPath();
      for (let x = left; x <= right; x += step) {
        if (x === left) ctx.moveTo(x, edge(x)); else ctx.lineTo(x, edge(x));
      }
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
    });
  }
  ctx.beginPath();
  for (let x = first; x <= last; x += step) {
    if (x === first) ctx.moveTo(x, canyonProfileAt(x).floorY);
    else ctx.lineTo(x, canyonProfileAt(x).floorY);
  }
  ctx.strokeStyle = 'rgba(236,167,122,.36)'; ctx.lineWidth = 5; ctx.stroke();

  // Stalactites and stalagmites intrude into the passage as solid triangular
  // formations. Their facets are drawn from the same vertices used by hit tests.
  CANYON_CAVE_SPIRES.forEach(spire => {
    const [x] = spire;
    if (x < first - 180 || x > last + 180) return;
    const points = canyonSpireTriangle(spire);
    const minY = Math.min(...points.map(p => p[1])), maxY = Math.max(...points.map(p => p[1]));
    const rock = ctx.createLinearGradient(0, minY, 0, maxY);
    rock.addColorStop(0, '#aa664c'); rock.addColorStop(.48, '#75483f'); rock.addColorStop(1, '#39313b');
    ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    ctx.lineTo(points[1][0], points[1][1]); ctx.lineTo(points[2][0], points[2][1]); ctx.closePath();
    ctx.fillStyle = rock; ctx.fill();
    ctx.strokeStyle = 'rgba(25,24,32,.6)'; ctx.lineWidth = 5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    ctx.lineTo(points[2][0], points[2][1]);
    ctx.strokeStyle = 'rgba(255,196,144,.33)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(points[1][0], points[1][1]);
    ctx.lineTo(points[2][0], points[2][1]);
    ctx.strokeStyle = 'rgba(23,24,32,.5)'; ctx.lineWidth = 7; ctx.stroke();
  });

  // Faint mineral seams on the cave walls add detail without filling the
  // navigable air with particles or moving scenery.
  CANYON_CAVE_SPIRES.forEach(([x, edge], i) => {
    if (x < first - 240 || x > last + 240) return;
    const profile = canyonProfileAt(x);
    const y = edge === 'ceiling' ? profile.ceilingY - 90 : profile.floorY + 105;
    ctx.strokeStyle = i % 2 ? 'rgba(194,157,134,.26)' : 'rgba(126,191,181,.22)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - 70, y); ctx.lineTo(x - 12, y - 32); ctx.lineTo(x + 44, y - 19); ctx.stroke();
  });
}

function drawStormBackdrop(ctx, now, camX, camY, viewW, viewH) {
  // Distant squall shelves sit behind aircraft and foreground concealment.
  // Their positions are world-anchored, so they do not slide with the camera.
  const stormCell = 1800 * WORLD_SCALE;
  const firstCell = Math.floor((camX - 800 * WORLD_SCALE) / stormCell);
  const lastCell = Math.ceil((camX + viewW + 800 * WORLD_SCALE) / stormCell);
  for (let i = firstCell; i <= lastCell; i++) {
    const centerX = i * stormCell + 900 * WORLD_SCALE;
    const centerY = (1350 + mapHash01(i, 22) * 1200) * WORLD_SCALE;
    const rx = (580 + mapHash01(i, 29) * 230) * WORLD_SCALE;
    const ry = (250 + mapHash01(i, 31) * 130) * WORLD_SCALE;
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
  const rainStepX = 118 * WORLD_SCALE, rainStepY = 154 * WORLD_SCALE;
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
      ctx.moveTo(rx, ry); ctx.lineTo(rx - 20 * WORLD_SCALE, ry + 56 * WORLD_SCALE);
    }
  }
  ctx.stroke(); ctx.restore();

  // Lightning occurs in the far distance on staggered cycles. The flash is
  // brief and restrained, and never covers the whole screen at once.
  const strikes = [WORLD_W * .17, WORLD_W * .48, WORLD_W * .79];
  strikes.forEach((x, i) => {
    const y = (1700 + mapHash01(i, 45) * 900) * WORLD_SCALE;
    if (x < camX - 100 || x > camX + viewW + 100 || y + 450 < camY || y > camY + viewH + 120) return;
    const phase = (now + i * 3671) % 12600;
    const flash = phase < 95 ? 1 - phase / 95 :
      (phase >= 185 && phase < 245 ? .38 * (1 - (phase - 185) / 60) : 0);
    if (flash <= .015) return;
    const length = (240 + mapHash01(i, 52) * 190) * WORLD_SCALE;
    const bend = (mapHash01(i, 61) - .5) * 130 * WORLD_SCALE;
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
    ctx.lineTo(x - 74 * WORLD_SCALE, y + length * .52); ctx.lineTo(x - 104 * WORLD_SCALE, y + length * .69); ctx.stroke();
    ctx.restore();
  });
}

function drawSkyBackdrop(ctx, camX, camY, W, H) {
  // Signature backgrounds are world-anchored so scenery scrolls naturally
  // with the arena while the sky remains uncluttered around the aircraft.
  const sunX = WORLD_W * .72, sunY = 560 * WORLD_SCALE;
  if (activeMapId === 'city' && sunX > camX - 220 && sunX < camX + W + 220 && sunY > camY - 220 && sunY < camY + H + 220) {
    const sun = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 210);
    sun.addColorStop(0, 'rgba(255,246,190,.9)'); sun.addColorStop(.18, 'rgba(255,215,120,.35)'); sun.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(sunX, sunY, 210, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,246,200,.85)'; ctx.beginPath(); ctx.arc(sunX, sunY, 34, 0, Math.PI * 2); ctx.fill();
  }
  if (activeMapId === 'city') {
    const cityStep = 132 * WORLD_SCALE;
    const start = Math.floor((camX - 260 * WORLD_SCALE) / cityStep) * cityStep;
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
  // Rock forms the lower half's boundary in the canyon; overlay fog there
  // would hide the actual wall edge and make the cave look like a cutout.
  if (activeMapId === 'canyon') return;
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
      ? 'LOCKED'
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
    if (activeMapId === 'storm' && Math.hypot(p.x - myState.x, p.y - myState.y) > STORM_VISIBILITY_RANGE) return;
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

function drawStormVisibility(ctx, camX, camY, viewW, viewH) {
  if (activeMapId !== 'storm' || !myState) return;
  const radius = STORM_VISIBILITY_RANGE;
  const haze = ctx.createRadialGradient(myState.x, myState.y, radius * .28,
    myState.x, myState.y, radius * 1.18);
  haze.addColorStop(0, 'rgba(17,30,45,0)');
  haze.addColorStop(.42, 'rgba(17,30,45,.08)');
  haze.addColorStop(.76, 'rgba(17,30,45,.31)');
  haze.addColorStop(1, 'rgba(17,30,45,.64)');
  ctx.fillStyle = haze;
  ctx.fillRect(camX, camY, viewW, viewH);
}

function drawAmbientBirds(ctx, now, camX, camY, viewW, viewH) {
  const reduced = isReducedGraphics();
  const speedClock = now / 1000;
  for (let flock = 0; flock < 30; flock++) {
    if (reduced && flock % 3 !== 0) continue;
    const drift = 22 + (flock % 5) * 6;
    const x = ((flock * WORLD_W / 30 + speedClock * drift) % WORLD_W + WORLD_W) % WORLD_W;
    const y = (0.12 + mapHash01(flock, 91) * .48) * GROUND_Y;
    if (x < camX - 90 || x > camX + viewW + 90 || y < camY - 70 || y > camY + viewH + 70) continue;
    if (activeMapId === 'canyon' && y > canyonProfileAt(x).surfaceY && !canyonIsEntrance(x)) continue;
    const count = 3 + (flock % 3), direction = flock % 4 === 0 ? -1 : 1;
    const flap = Math.sin(now * .009 + flock) * 3.2;
    ctx.save(); ctx.translate(x, y); ctx.scale(direction, 1);
    ctx.strokeStyle = activeMapId === 'storm' ? 'rgba(222,239,244,.48)' : 'rgba(14,36,46,.48)';
    ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    for (let bird = 0; bird < count; bird++) {
      const offsetX = (bird - (count - 1) / 2) * 16;
      const offsetY = Math.sin(flock + bird * 1.9) * 7;
      const size = 7 + mapHash01(flock * 7 + bird, 18) * 4;
      ctx.beginPath();
      ctx.moveTo(offsetX - size, offsetY + flap * .25);
      ctx.quadraticCurveTo(offsetX - size * .35, offsetY - flap, offsetX, offsetY);
      ctx.quadraticCurveTo(offsetX + size * .35, offsetY - flap, offsetX + size, offsetY + flap * .25);
      ctx.stroke();
    }
    ctx.restore();
  }
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

  const reducedQuality = isReducedGraphics();
  clouds.forEach((c, cloudIndex) => {
    if (reducedQuality && cloudIndex % 2 !== 0) return;
    if (c.x < camX - c.rx * 1.5 || c.x > camX + viewW + c.rx * 1.5 ||
        c.y < camY - c.ry * 2 || c.y > camY + viewH + c.ry * 2) return;
    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.tilt);
    if (reducedQuality) {
      ctx.globalAlpha = .72;
      ctx.fillStyle = `rgba(211,231,238,${Math.min(.3, c.a * 2.2)})`;
      ctx.beginPath(); ctx.ellipse(0, 0, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      return;
    }
    const form = Number.isFinite(c.form) ? c.form : 1;
    const palettes = [
      ['245,252,255', '208,229,239', '180,211,228'],
      ['255,253,248', '216,232,240', '179,211,229'],
      ['224,243,248', '191,219,232', '165,199,216']
    ];
    const tint = Number.isFinite(c.tint) ? Math.floor(c.tint) % palettes.length : 0;
    const palette = palettes[tint];
    const cloud = ctx.createRadialGradient(-c.rx * .12, -c.ry * .2, c.ry * .08, 0, 0, c.rx);
    cloud.addColorStop(0, `rgba(${palette[0]},${c.a})`);
    cloud.addColorStop(.58, `rgba(${palette[1]},${c.a * .66})`);
    cloud.addColorStop(1, `rgba(${palette[2]},0)`);
    ctx.fillStyle = cloud;
    ctx.beginPath(); ctx.ellipse(0, 0, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(250,253,255,${c.a * (form === 1 ? .46 : .3)})`;
    if (form === 0) {
      // Thin, wind-stretched cirrus streaks.
      for (let i = 0; i < 3; i++) {
        const offset = i - 1;
        const wave = Math.sin((c.seed || 0) + i * 1.9);
        ctx.beginPath();
        ctx.ellipse(offset * c.rx * .16, wave * c.ry * .18,
          c.rx * (.42 - i * .035), Math.max(1, c.ry * (.12 + i * .018)), wave * .05, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (form === 1) {
      // Tall cumulus crowns with individually varied lobes.
      const count = Math.max(3, c.puffCount || 4);
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1) - .5;
        const wave = Math.sin((c.seed || 0) + i * 1.7);
        const puffRx = c.rx * (.16 + .055 * (1 + wave));
        const puffRy = c.ry * (.37 + .09 * Math.cos((c.seed || 0) + i * 2.1));
        ctx.beginPath();
        ctx.ellipse(t * c.rx * .92, -c.ry * (.07 + .08 * Math.cos((c.seed || 0) + i)), puffRx, puffRy, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (form === 2) {
      // Broad, stacked stratocumulus layers.
      ctx.beginPath();
      ctx.ellipse(-c.rx * .1, -c.ry * .2, c.rx * .73, c.ry * .28, -.04, 0, Math.PI * 2);
      ctx.ellipse(c.rx * .12, c.ry * .13, c.rx * .86, c.ry * .3, .025, 0, Math.PI * 2);
      ctx.ellipse(c.rx * .34, -c.ry * .02, c.rx * .36, c.ry * .22, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Broken, separated puffs leave more sky visible through the cloud.
      const count = Math.max(3, c.puffCount || 4);
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1) - .5;
        const wave = Math.sin((c.seed || 0) + i * 2.4);
        ctx.beginPath();
        ctx.ellipse(t * c.rx * 1.05, wave * c.ry * .23,
          c.rx * (.13 + .045 * Math.cos((c.seed || 0) + i)), c.ry * (.25 + .08 * wave), 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  });

  drawSkyBackdrop(ctx, camX, camY, viewW, viewH);
  drawAmbientBirds(ctx, now, camX, camY, viewW, viewH);

  drawGround(ctx, camX - BORDER_FOG_DEPTH - 180, camX + viewW + BORDER_FOG_DEPTH + 180);
  highSpeedWake.draw(ctx);

  // Projectiles remain in the simulation until their real hit/cleanup rules
  // fire, but drawing far outside the camera only burns canvas work. Keep a
  // small margin for each shape so effects at the screen edge stay complete.
  drawVisibleWorldItems(flares, ctx, now, camX, camY, viewW, viewH, 32, drawFlare);
  drawVisibleWorldItems(bullets, ctx, now, camX, camY, viewW, viewH, 20, drawBullet);
  missiles.forEach(m => {
    const bodyVisible = isWorldPointVisible(m?.x, m?.y, camX, camY, viewW, viewH, 32);
    const trailVisible = !bodyVisible && Array.isArray(m?.trail) && m.trail.some(point =>
      isWorldPointVisible(point?.x, point?.y, camX, camY, viewW, viewH, 6));
    if (bodyVisible || trailVisible) drawMissile(ctx, m, now);
  });
  drawVisibleWorldItems(bombs, ctx, now, camX, camY, viewW, viewH, 32, drawBomb);
  drawVisibleWorldItems(shrapnels, ctx, now, camX, camY, viewW, viewH, 12, drawShrapnel);

  Object.values(players).forEach(p => {
    if (p.id === myId) return;
    if (p.connected === false) return;
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.angle)) return;
    drawPlane(ctx, p, false, now);
  });
  drawPlane(ctx, myState, true, now);

  explosions.forEach(e => {
    const padding = FX[e?.kind]?.r || 0;
    if (isWorldPointVisible(e?.x, e?.y, camX, camY, viewW, viewH, padding)) drawExplosion(ctx, e, now);
  });
  specialEffects.forEach(e => { if (e && typeof e.draw === 'function') e.draw(ctx); });
  drawStormVisibility(ctx, camX, camY, viewW, viewH);
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
  if (!ctx || W < 1 || H < 1) return;
  const frame = { x: 3, y: 3, w: W - 6, h: H - 6 };
  const scope = { x: 20, y: 40, w: W - 40, h: H - 60 };
  const scaleX = scope.w / WORLD_W, scaleY = scope.h / WORLD_H;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, W, H);
  const rounded = (x, y, w, h, r) => {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  };

  rounded(frame.x, frame.y, frame.w, frame.h, 18);
  const bezel = ctx.createLinearGradient(0, frame.y, 0, frame.y + frame.h);
  bezel.addColorStop(0, 'rgba(25,64,75,.98)'); bezel.addColorStop(.5, 'rgba(8,27,37,.99)'); bezel.addColorStop(1, 'rgba(5,18,28,.99)');
  ctx.fillStyle = bezel; ctx.fill(); ctx.strokeStyle = 'rgba(126,224,213,.65)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#9cebdd'; ctx.font = 'bold 17px Space Mono, monospace'; ctx.textAlign = 'left';
  ctx.fillText('TACTICAL RADAR', 22, 27);
  ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(183,223,220,.72)'; ctx.font = '11px Space Mono, monospace';
  ctx.fillText('FULL ARENA // LIVE', W - 20, 26);

  rounded(scope.x, scope.y, scope.w, scope.h, 8); ctx.save(); ctx.clip();
  const background = ctx.createLinearGradient(0, scope.y, 0, scope.y + scope.h);
  background.addColorStop(0, activeMapId === 'storm' ? '#102b38' : '#092d33');
  background.addColorStop(1, activeMapId === 'canyon' ? '#222331' : '#061c2b');
  ctx.fillStyle = background; ctx.fillRect(scope.x, scope.y, scope.w, scope.h);
  if (activeMapId === 'canyon') {
    ctx.fillStyle = 'rgba(117,166,185,.55)'; ctx.fillRect(scope.x, scope.y, scope.w, scope.h);
    ctx.fillStyle = 'rgba(38,34,44,.94)'; ctx.beginPath();
    CANYON_CAVE_PROFILE.forEach(([x, , ceiling], i) => i ? ctx.lineTo(scope.x + x * scaleX, scope.y + ceiling * scaleY) : ctx.moveTo(scope.x + x * scaleX, scope.y + ceiling * scaleY));
    for (let i = CANYON_CAVE_PROFILE.length - 1; i >= 0; i--) {
      const [x, , , floorY] = CANYON_CAVE_PROFILE[i]; ctx.lineTo(scope.x + x * scaleX, scope.y + floorY * scaleY);
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(181,94,66,.92)';
    for (let x = 0; x < WORLD_W; x += 60 * WORLD_SCALE) {
      const wall = canyonProfileAt(x);
      if (!canyonIsEntrance(x)) ctx.fillRect(scope.x + x * scaleX, scope.y + wall.surfaceY * scaleY,
        Math.max(1, 60 * WORLD_SCALE * scaleX), Math.max(1, (wall.ceilingY - wall.surfaceY) * scaleY));
      ctx.fillRect(scope.x + x * scaleX, scope.y + wall.floorY * scaleY,
        Math.max(1, 60 * WORLD_SCALE * scaleX), Math.max(1, (WORLD_H - wall.floorY) * scaleY));
    }
    ctx.strokeStyle = 'rgba(255,199,151,.72)'; ctx.lineWidth = 2; ctx.beginPath();
    CANYON_CAVE_PROFILE.forEach(([x, , , floorY], i) => i ? ctx.lineTo(scope.x + x * scaleX, scope.y + floorY * scaleY) : ctx.moveTo(scope.x + x * scaleX, scope.y + floorY * scaleY));
    ctx.stroke();
  } else {
    // City map grid / storm cells / island water remain subdued under the scan.
    ctx.fillStyle = 'rgba(20,77,105,.66)'; ctx.fillRect(scope.x, scope.y + GROUND_Y * scaleY, scope.w, scope.h - GROUND_Y * scaleY);
    ctx.strokeStyle = activeMapId === 'storm' ? 'rgba(168,205,222,.18)' : 'rgba(103,227,213,.18)'; ctx.lineWidth = 1;
    const blocks = 18;
    for (let i = 1; i < blocks; i++) {
      const x = scope.x + scope.w * i / blocks;
      ctx.beginPath(); ctx.moveTo(x, scope.y); ctx.lineTo(x, scope.y + scope.h); ctx.stroke();
    }
    for (let i = 1; i < 8; i++) {
      const y = scope.y + scope.h * i / 8;
      ctx.beginPath(); ctx.moveTo(scope.x, y); ctx.lineTo(scope.x + scope.w, y); ctx.stroke();
    }
  }
  if (activeMapId === 'storm' || activeMapId === 'canyon') {
    ctx.fillStyle = activeMapId === 'storm' ? 'rgba(166,203,220,.22)' : 'rgba(255,220,187,.26)';
    cloudBanks.forEach(bank => {
      ctx.beginPath(); ctx.ellipse(scope.x + bank.x * scaleX, scope.y + bank.y * scaleY,
        Math.max(2, bank.rx * scaleX), Math.max(1.5, bank.ry * scaleY), 0, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Range rings, azimuth axes, and the rotating scan sector give the map a
  // readable radar language while preserving the full-map player positions.
  const cx = scope.x + scope.w * .5, cy = scope.y + scope.h * .5;
  ctx.strokeStyle = 'rgba(139,237,220,.29)'; ctx.lineWidth = 1;
  for (const fraction of [.2, .4, .6, .8, 1]) {
    ctx.beginPath(); ctx.ellipse(cx, cy, scope.w * fraction * .5, scope.h * fraction * .5, 0, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(cx, scope.y); ctx.lineTo(cx, scope.y + scope.h);
  ctx.moveTo(scope.x, cy); ctx.lineTo(scope.x + scope.w, cy); ctx.stroke();
  const sweepAngle = now * .00038;
  const sweepRadius = Math.hypot(scope.w, scope.h) * .55;
  ctx.save(); ctx.globalAlpha = .34; ctx.fillStyle = 'rgba(99,255,213,.45)'; ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.arc(cx, cy, sweepRadius, sweepAngle - .34, sweepAngle); ctx.closePath(); ctx.fill();
  ctx.globalAlpha = .82; ctx.strokeStyle = '#8dffdd'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweepAngle) * sweepRadius, cy + Math.sin(sweepAngle) * sweepRadius); ctx.stroke();
  ctx.restore();

  Object.values(players).forEach(p => {
    if (p.connected === false || p.alive === false || !Number.isFinite(p.x) || !Number.isFinite(p.y)) return;
    const px = scope.x + p.x * scaleX, py = scope.y + p.y * scaleY;
    const heading = Math.atan2(Math.sin(p.angle || 0) * scaleY, Math.cos(p.angle || 0) * scaleX);
    const color = p.id === myId ? '#effffb' : (p.color || colorFor(p.id));
    ctx.save(); ctx.translate(px, py); ctx.rotate(heading);
    ctx.globalAlpha = .34; ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.arc(0, 0, p.id === myId ? 13 : 11, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.beginPath();
    ctx.moveTo(p.id === myId ? 12 : 10, 0); ctx.lineTo(-7, -6); ctx.lineTo(-4, 0); ctx.lineTo(-7, 6); ctx.closePath();
    ctx.fillStyle = color; ctx.fill(); ctx.restore();
  });
  ctx.restore();
  rounded(scope.x, scope.y, scope.w, scope.h, 8); ctx.strokeStyle = 'rgba(120,236,218,.54)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = 'rgba(174,230,223,.8)'; ctx.textAlign = 'left'; ctx.font = '10px Space Mono, monospace'; ctx.fillText('N ↑', 24, H - 9);
  ctx.textAlign = 'right'; ctx.fillText(`TRACKS ${Object.values(players).filter(p => p.connected !== false && p.alive !== false).length}`, W - 22, H - 9);
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
  if (menuFightFrame) cancelAnimationFrame(menuFightFrame);
  menuFightFrame = 0;
  if (menuFightCanvas) menuFightCanvas.style.display = 'none';
  lastTime = 0; lastRenderAt = 0; lastHudUpdateAt = 0;
  fpsWindowStart = null; fpsWindowFrames = 0;
  if (fpsCounterEl) fpsCounterEl.textContent = 'FPS --';
  graphicsProbeMs = 0; graphicsProbeFrames = 0; graphicsRecoveryMs = 0;
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

let lastTime = 0, lastBroadcast = 0;

// Keep one bad bot/effect frame from permanently stopping requestAnimationFrame.
function loop(ts) {
  try {
    loopFrame(ts);
  } catch (error) {
    requestAnimationFrame(loop);
  }
}

function updateFpsCounter(ts) {
  if (!fpsCounterEl || !Number.isFinite(ts)) return;
  if (fpsWindowStart === null) {
    fpsWindowStart = ts;
    fpsWindowFrames = 0;
    return;
  }
  fpsWindowFrames++;
  const elapsed = ts - fpsWindowStart;
  if (elapsed >= 500) {
    fpsCounterEl.textContent = 'FPS ' + Math.round(fpsWindowFrames * 1000 / elapsed);
    fpsWindowStart = ts;
    fpsWindowFrames = 0;
  }
}

function loopFrame(ts) {
  // A host-loss reset intentionally clears myState and stops the old sortie.
  // Exit before HUD/physics code touches the cleared state; a new match will
  // create a fresh animation loop through beginLocalGame().
  if (!started || !myState) return;
  const frameMs = lastTime ? ts - lastTime : 16;
  sampleGraphicsPerformance(frameMs);
  const dt = Math.min(frameMs, 60);
  lastTime = ts;
  const dtSec = dt / 1000;
  screenShake = Math.max(0, screenShake - dtSec * 34);
  recoilKick = Math.max(0, recoilKick - dtSec * 28);
  if (isHost || botMode) capturePlaneCollisionOrigins();
  if (isHost || botMode) updateLocalPlane(dtSec, keysHeld);
  // Joiner input is sent by its own timer, independent of rendering.
  if (isNetworkClient()) updateClientVisualPlane(dtSec);
  updateNetworkPlayers(dtSec, ts);
  updateBots(dtSec, ts);
  if (isHost || botMode) resolvePlaneCollisions(ts, dtSec);
  const fovTarget = myState && myState.speed >= HIGH_SPEED_THRESHOLD ? HIGH_SPEED_FOV_MULT : CAMERA_FOV_MULT;
  currentCameraFovMult += (fovTarget - currentCameraFovMult) * clamp(dtSec * HIGH_SPEED_FOV_SMOOTHING, 0, 1);
  updateEngineAudio();
  updateGunfireAudio(ts, dtSec);
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

  if (ts - lastHudUpdateAt >= HUD_UPDATE_INTERVAL_MS) {
  lastHudUpdateAt = ts;
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
  }

  if (ts - lastRenderAt >= 1000 / MAX_GAME_RENDER_FPS) {
    const renderInterval = 1000 / MAX_GAME_RENDER_FPS;
    lastRenderAt += Math.max(1, Math.floor((ts - lastRenderAt) / renderInterval)) * renderInterval;
    render(ts);
    updateFpsCounter(ts);
  }
  requestAnimationFrame(loop);
}

// ================= Boot =================
window.addEventListener('DOMContentLoaded', () => {
  startMenuDogfight();
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
  graphicsQualitySelectEl = document.getElementById('graphicsQualitySelect');
  let savedGraphicsQuality = 'auto';
  try { savedGraphicsQuality = window.localStorage?.getItem(GRAPHICS_QUALITY_STORAGE_KEY) || 'auto'; } catch (_) {}
  setGraphicsQuality(savedGraphicsQuality, false);
  graphicsQualitySelectEl.value = graphicsQualityMode;
  graphicsQualitySelectEl.addEventListener('change', () => setGraphicsQuality(graphicsQualitySelectEl.value));
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
  fpsCounterEl = document.getElementById('fpsCounter');
  lbListEl = document.getElementById('lbList');
  killFeedEl = document.getElementById('killFeed');
  respawnOverlay = document.getElementById('respawnOverlay');
  respawnMsgEl = document.getElementById('respawnMsg');
  respawnTimerEl = document.getElementById('respawnTimer');
  boundaryWarningEl = document.getElementById('boundaryWarning');
  boundaryTimerEl = document.getElementById('boundaryTimer');
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
