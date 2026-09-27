# Wings Arena — multiplayer sky battle (up to 8 players)

Current build: v1.52.0 (Red Canyon and Storm Front map pass)

A free-for-all dogfight in the browser. One person hosts, up to seven friends
join with a code. Fly around an open arena, shoot down opponents, respawn, and
repeat. There are no coins, stars, or other collectibles. No server, no build
step, and no dependencies to install — PeerJS is loaded from its CDN.

The default city arena uses world-space buildings and cloud banks. Red Canyon
adds layered sandstone mesas and visible flight gaps; Storm Front adds distant
squall shelves, light rain, occasional lightning, and darker concealment banks.
The map scenery is visual-only, so there are no invisible rock collisions. The
flat ocean remains the lower crash boundary, and the city and ocean continue
beyond the playable rectangle into a soft animated boundary fog.

## Dependencies to install

None. Just `index.html`, `style.css`, `game.js`, loading PeerJS from a CDN:

```html
<script src="https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"></script>
```

When working from the numbered source folder, the active source pair is
`02-game.js` + `04-index.html` + `10-style.css`. `01-game.js` is an older
prototype and is not part of the current launch path; it still contains the
retired collectible prototype. The distributable package renames the active
files to `game.js`, `index.html`, and `style.css`.

## How the networking works (same hub topology as before)

With more than two players, everyone connecting directly to everyone else
gets complicated fast. Everyone connects only to the host, and the host
relays the authoritative match state — if Player 2 shoots at Player 3, that
shot travels Player 2 → Host → Player 3. Joiners only need the host's code.

Split of responsibilities:

- **The host is authoritative over movement, weapons, projectiles, damage,
  lock validity, and kill credit.** Clients submit input and one-shot actions;
  the host simulates them and broadcasts snapshots so every player shares the
  same projectile and collision timeline.
- **Position updates broadcast ~15 times/sec** (every 66ms), same cadence as
  the Tetris board sync. Each client still *renders* at a full 60fps, though:
  incoming updates are stored as a target position, and every other player's
  plane glides toward that target each frame instead of snapping to it. Without
  this, remote planes visibly teleport 15 times a second, which reads as
  choppy, low-framerate motion even though your own plane is smooth.
- **Projectile snapshots and impact events are replicated together.** Clients
  render the host's projectile positions, and impact effects are deduplicated
  so a bomb, missile, or bullet cannot explode twice on one screen.

## Hosting on GitHub Pages

1. Create a new repo (or reuse the Tetris one) and upload `index.html`,
   `style.css`, and `game.js` to the root — drag-and-drop via
   **Add file → Upload files**, then commit.
2. In the repo, go to **Settings → Pages**, set the source to your default
   branch (usually `main`) and the root folder, and save.
3. GitHub gives you a URL like `https://yourname.github.io/your-repo/`.
   Share that link — anyone who opens it can host or join a match.
4. Future edits: just re-upload the changed files and commit. Pages redeploys
   automatically. Use the flat package files named `index.html`, `style.css`,
   and `game.js`; the numbered files in the source folder are the editable
   project copies.

## How to play with up to 8 people

1. Everyone enters a callsign (optional — defaults to "Player").
2. One person clicks **Host Game** and shares the code shown.
3. Up to seven friends each click **Join Game** and paste in that code.
4. The host sees a lobby list of who's connected and clicks **Start Game**
   whenever ready (doesn't need all 8).
5. Everyone spawns into the same open sky arena. Shooting someone down is
   worth 50 points and adds to your kill count.
6. Get shot to 0 HP and you respawn after ~2 seconds with brief
   invulnerability (your plane flickers). There's no match end — it's an
   open-ended arena, so play as long as you like.

## Controls

- **Mouse movement** — steer. The camera keeps the plane centered, so the
  turn target is computed from screen-center → cursor.
- **↑** or **W** — boost
- **S / Shift** — air-brake
- **Q / E** — barrel roll
- **Left click** or **Space** — cannon
- **Right click** — missile
- **B** — bomb
- **F** — chaff/flares
- **R** — test uncontrolled fall / reset

### Gun heat

The gun fires fast, but holding it down builds heat. Max out the 300-point
heat bar and the gun locks up until it cools back down, so short controlled
bursts beat holding the trigger. Heat drains when you let off fire and drains
faster after overheating. In multiplayer the host owns each player's heat and
fire cooldown.

### Boundary fog and bombs

The outer map is a five-second warning zone. Entering it displays a return
warning and countdown; staying outside until the timer expires disables the
aircraft. Bombs now have a larger model, a stronger central blast, 16 active
shrapnel fragments, and a larger explosion radius. The host applies the blast
damage once and clients only render the replicated impact.

### v1.47 polish fixes

- Restarting a sortie no longer stacks keyboard, mouse, or resize listeners.
  This prevents a later test-fall/reset key press from performing two actions
  at once and avoids duplicate weapon input after returning to a room.
- Starting a new host, join, or skirmish session clears stale PeerJS state,
  projectile arrays, lock timers, audio, and HUD warnings before the new match.
- A missile that reaches its lifetime now stops processing immediately after
  its final detonation, preventing a one-frame ghost update.
- Delayed flare waves are tied to the current session, so a fast restart cannot
  leak countermeasures from the previous sortie.
- Unknown visual-effect kinds are safely pruned instead of being allowed to
  throw inside the render loop.

### v1.48 high-speed water wake

- Added the supplied HIGH SPEED WAKE-style effect as a world-space water trail.
  It appears only while the local aircraft is alive, above the water, and
  moving above the wake threshold; it grows wider and persists longer as speed
  increases, with a speed-scaled delayed trail behind the aircraft.
- Added the two supplied waterfall recordings as layered wake audio. The
  churn and spray layers smoothly follow wake intensity, change playback rate
  with speed, and fade/mute outside the near-water zone. Audio is stopped on
  death, respawn, and session reset.

### v1.48.1 boundary and water polish

- Fixed the left, right, and top fog so the gradients and wisps stay attached
  to the fixed world borders instead of moving with the camera.
- Removed bottom boundary fog; the flat ocean now provides the visual and
  gameplay boundary at the bottom of the arena.
- Flattened the water surface and its submerged highlight lines while keeping
  the high-speed wake aligned to that level surface.

### v1.48.2 runtime hardening

- Remote roster entries now receive safe placeholder state until their first
  authoritative position arrives, preventing invisible or malformed planes.
- Invalid projectile, flare, sonic-boom, impact, and state packets are ignored
  instead of allowing `NaN` coordinates to poison rendering or lock-on logic.
- Unknown or malformed visual effects are pruned before rendering, preventing
  a single bad effect from interrupting the animation loop.
- Delayed flare waves are cancelled when their owner disconnects, and lock-on
  candidate checks now ignore incomplete remote state.

### v1.48.3 soft border fog

- The playable area now ends at the clear edge of the fog instead of having
  fog drawn inside the arena before the border.
- Fog begins exactly at each side/top border and becomes denser outward into
  the visible outside buffer, creating a soft return-to-map boundary without
  a hard line. The existing five-second return warning remains unchanged.
- The bottom remains fog-free so the flat ocean continues to act as the lower
  boundary.

### v1.48.4 straight-flight propulsion

- Added a small forward propulsion assist while the aircraft is flying
  steadily. It fades out during hard turns and is disabled while air-braking,
  so the plane can build enough speed in a straight run to cross the 600
  supersonic threshold without requiring a dive.
- Preserved the 900 maximum speed, high-speed assist, boost, gravity, and
  host-authoritative multiplayer simulation. The same propulsion rule is used
  by the local plane, host-simulated joiners, and skirmish bots.

### v1.48.5 near-water sonic wave

- Integrated the supplied sonic-boom water-wave design into the world-space
  effects system. A sonic boom now creates a visible wave only when the plane
  is within the near-water altitude band.
- Wave size scales with water proximity and sonic speed. The wave travels
  along the flat ocean in the opposite direction of the aircraft's horizontal
  flight direction, with foam, spray, and mist adapted from the supplied
  reference effect.
- The effect is triggered consistently for the local plane, host-simulated
  joiners, skirmish bots, and replicated sonic-boom events.

### v1.48.6 multiplayer input and vertical-speed fix

- Host input packets are now accepted even if a brief roster update marked the
  remote player stale. Input sequence numbers are normalized safely, and the
  host tolerates short WebRTC jitter before falling back to neutral steering.
- Client input sends now advance their sequence only after `send()` succeeds,
  with retry diagnostics when PeerJS reports a temporarily unusable channel.
- Straight-flight propulsion and sonic-speed acceleration now scale with the
  aircraft's horizontal flight component. Pointing straight up no longer
  receives the level-flight speed assist.

### v1.48.7 joiner latency and respawn-clock fix

- Input is sent every 50 ms independently of the joiner's rendering frame
  rate. The host still owns movement, weapons, collision, and damage.
- Full projectile snapshots now use a separate 250 ms cadence instead of
  riding alongside every 66 ms player-state update. Projectiles continue to
  move between snapshots and are corrected by the host; gun/missile spawn and
  impact events still arrive immediately. This reduces reliable-channel
  backlog during sustained fire.
- The joiner respawn display uses the host's remaining countdown, translated
  to the local clock. An absolute host `performance.now()` value is never
  treated as the joiner's timestamp.
- F2 diagnostics now show input and action acknowledgements from the host.
  If TX advances but an ACK does not, the channel is delayed or blocked. If
  both advance but movement/weapon effects do not, inspect host simulation.

### v1.48.8 smooth multiplayer flight

- The joiner opens a second PeerJS channel for replaceable steering samples
  and position snapshots. The primary reliable channel still carries gun and
  missile actions, spawns, damage, and room events. If the fast channel fails,
  the game falls back to the original reliable path and retries the link.
- The joiner's own plane and camera predict visual flight between snapshots.
  Newer host state smooths out any difference while the host remains in charge
  of movement, collisions, and weapons. Out-of-order position packets cannot
  rewind the plane.
- F2 diagnostics identify whether the fast link is connected and how long it
  has been since a fast state packet arrived. A silent fast link falls back to
  reliable input after three seconds and reconnects. Both host and joiner need
  this version for the new link to open.

### v1.48.9 multiplayer gun muzzle alignment

- Gun bullets spawn just ahead of the drawn plane tip on the host and in
  skirmish. Joiners receive a fast visual shot alongside its reliable backup;
  the displayed bullet starts at the predicted plane nose and eases into the
  host's authoritative path. Bullet damage and collision stay host controlled.
- Shot IDs deduplicate the two deliveries. Older projectile snapshots do not
  erase a shot fired after that snapshot; newer snapshots can confirm removal.
- Both host and joiner need v1.48.9 for the fast gun visual. The reliable
  backup continues to work during a fast channel outage.

### v1.49.0 multiplayer synchronization audit

- Fixed a host physics bug: render interpolation was pulling each remote
  pilot's authoritative x/y/angle toward its original random spawn target
  every frame. Only joiners now interpolate other pilots; host simulation,
  collisions, missile lock, and bullet origins share the same real position.
- Flight state for all pilots is sent in one sequenced packet each tick rather
  than one packet per pilot. Late/out-of-order packets still cannot rewind a
  player. Remote respawns and large corrections snap to the host position.
- Projectile correction snapshots contain at most 48 bullets nearest each
  joiner. Gun creation and hit/water removal still use individual reliable
  events; a partial correction cannot erase bullets omitted for bandwidth.
  A delayed fast shot cannot recreate a bullet already reported as hit.
- Host and joiner must both use v1.49.0 for the batched flight packets.

### v1.49.1 water bullet impact alignment

- Bullets now hit the visible water surface on the frame they cross it. The
  splash and host impact event use the segment's waterline intersection rather
  than a point eight units above the sea on the following frame.
- Water splash creation anchors older or delayed network impacts to the same
  drawn waterline. A joiner shows one local splash and ignores the duplicate
  host confirmation for that bullet.

### v1.50.0 edge fog, cloud size variation, and gun balance

- Removed the invisible flight-coordinate clamps that stopped aircraft at the
  outside fog buffer. The boundary warning and five-second return timer remain
  authoritative; the water remains the lower boundary.
- Reworked the left, right, and top boundary fog with layered billows, depth
  gradients, and fine wisps. The fog stays anchored to the arena edges, and no
  bottom fog strip is drawn.
- Ambient clouds now use varied elliptical sizes from 22 to 148 world units.
- Reduced gun damage from 7 to 4.5 per hit (rear hits retain their existing
  damage multiplier).

### v1.51.0 staged bomb and missile water impacts

- Bombs and missiles that cross the waterline now trigger a small impact
  splash, a 1.1-second sinking/bubble phase, then an underwater flash, compact
  expanding surface wave, and denser spray.
- The host sends the exact waterline impact point to joiners; remote clients
  play the same staged effect once. Bomb damage and shrapnel remain controlled
  by the existing authoritative impact logic.

### v1.51.1 water impact readability and performance pass

- Enlarged the initial water splash and made the sinking weapon and bubble
  trail easier to read at normal camera scale. The delayed surface wave stays
  compact.
- Capped simultaneous bomb/missile water effects at 24 to bound particle and
  draw work during multi-player or bot-heavy matches.
- Host/joiner impact packets retain the exact waterline point and duplicate
  packets are ignored.

### v1.52.0 Red Canyon and Storm Front maps

- Red Canyon now has layered, world-anchored sandstone walls, eroded strata,
  shaded clefts, and broad gaps between near mesas. The minimap mirrors the
  mesa layout and marks the canyon cloud cover.
- Storm Front now has distant squall shelves, subtle moving rain, staggered
  lightning in the distance, and dark cloud banks that preserve the existing
  concealment and missile-lock rules. Its minimap marks the cloud cover.
- Both maps use fixed world-space scenery and concealment layouts on every
  client. Scenery does not create unseen collision hazards or change flight
  physics; the flat waterline remains the crash boundary.

## Diagnostics and known limitations
- Click **LOGS** at any time, or press **F2**, to open the local diagnostics
  console. It shows
  the PeerJS connection, last network activity, input sequence/age, player
  coordinates, and runtime errors. **Copy Log** or **Download** can be used to
  send the report for troubleshooting; logs stay on the current device.
- The host now repairs incomplete remote player state, advances joiners through
  normal flight and gravity, and keeps the falling/crashing state authoritative.
  Remote crashes can also be finished by a confirmed bullet hit instead of
  becoming an immortal falling plane.
- Fixed: shots fired by anyone other than the host used to be invisible to
  the host and couldn't damage it — the host relayed those shots to other
  clients but never added them to its own local bullet list. It now does.
- Fixed: respawning never actually happened — the update function returned
  before the code that checks the respawn timer, so that check never ran.

- If the host disconnects, the match ends for everyone (the host is the
  relay hub and match authority); joiners disconnecting does not affect
  anyone else.
- The host owns collision and damage decisions. A player with a strict
  firewall may still need a TURN relay for PeerJS to connect.
- Same WebRTC caveat as always: same-network setups connect reliably;
  separate networks with strict firewalls occasionally need a TURN relay,
  which isn't included here.
- Mobile touch controls are not included; keyboard and mouse are recommended.
