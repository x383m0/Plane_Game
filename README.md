# Wings Arena — multiplayer sky battle (up to 8 players)

Current build: v1.48.1 (boundary fog and flat water patch)

A free-for-all dogfight in the browser. One person hosts, up to seven friends
join with a code. Fly around an open arena, shoot down opponents, respawn, and
repeat. There are no coins, stars, or other collectibles. No server, no build
step, and no dependencies to install — PeerJS is loaded from its CDN.

The current arena uses the sky/background and water, with the world-space city
buildings and cloud banks restored. The city and ocean continue beyond the
playable rectangle into a soft animated boundary fog instead of ending on a
hard seam. Canyon/island/storm geometry, border lines, and other decorative
map props remain disabled so the flight space stays visually clean.

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
