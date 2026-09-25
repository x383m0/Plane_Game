# Wings Arena — multiplayer sky battle (up to 8 players)

A free-for-all biplane dogfight in the browser. One person hosts, up to seven
friends join with a code. Fly around an open arena, collect coins for score,
shoot down opponents, respawn, repeat. No server, no build step, no
dependencies to install — same approach as the Tetris project this was built
from.

## Dependencies to install

None. Just `index.html`, `style.css`, `game.js`, loading PeerJS from a CDN:

```html
<script src="https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"></script>
```

## How the networking works (same hub topology as before)

With more than two players, everyone connecting directly to everyone else
gets complicated fast. So everyone connects only to the host, and the host
relays messages — if Player 2 shoots at Player 3, that shot travels
Player 2 → Host → Player 3. Joiners only ever need the host's code, never
each other's.

Split of responsibilities:

- **Each client is authoritative over its own plane.** You decide your own
  position, heading, and — crucially — whether an incoming bullet hit *you*.
  This keeps movement perfectly smooth locally (no waiting on the network)
  and matches how the Tetris version had each player own their own board.
- **The host is authoritative over coins and kill credit.** The host spawns
  coins, decides who gets credit when a `collect` message arrives first, and
  tallies kills/deaths when a `died` message arrives — so score can't
  double-count even if two players grab the same coin in the same instant.
- **Position updates broadcast ~15 times/sec** (every 66ms), same cadence as
  the Tetris board sync, which is plenty for planes that turn at a bounded
  rate.
- **Shots are relayed as fire-and-forget events** — the shooter simulates the
  bullet locally and tells everyone else "a bullet was fired from here, going
  this way," and each client checks that bullet against their own plane only.

## Hosting on GitHub Pages

1. Create a new repo (or reuse the Tetris one) and upload `index.html`,
   `style.css`, and `game.js` to the root — drag-and-drop via
   **Add file → Upload files**, then commit.
2. In the repo, go to **Settings → Pages**, set the source to your default
   branch (usually `main`) and the root folder, and save.
3. GitHub gives you a URL like `https://yourname.github.io/your-repo/`.
   Share that link — anyone who opens it can host or join a match.
4. Future edits: just re-upload the changed files and commit. Pages
   redeploys automatically.

## How to play with up to 8 people

1. Everyone enters a callsign (optional — defaults to "Player").
2. One person clicks **Host Game** and shares the code shown.
3. Up to seven friends each click **Join Game** and paste in that code.
4. The host sees a lobby list of who's connected and clicks **Start Game**
   whenever ready (doesn't need all 8).
5. Everyone spawns into the same open sky arena. Coins are worth 10 points;
   shooting someone down is worth 50 and adds to your kill count.
6. Get shot to 0 HP and you respawn after ~2 seconds with brief
   invulnerability (your plane flickers). There's no match end — it's an
   open-ended arena, so play as long as you like.

## Controls

- **← / →** or **A / D** — steer left/right (you fly forward automatically)
- **↑** or **W** — boost (limited meter, recharges when not in use)
- **Space** — fire (hold to keep firing at the weapon's cooldown rate)

## Known limitations

- If the host disconnects, the match ends for everyone (the host is the
  relay hub and the coin/score authority). Joiners disconnecting doesn't
  affect anyone else.
- Hit detection trusts the player being shot at to self-report the hit
  (the same trust model the Tetris version used for eliminations). Fine for
  a casual game with friends; not hardened against a modified client.
- Same WebRTC caveat as always: same-network setups connect reliably;
  separate networks with strict firewalls occasionally need a TURN relay,
  which isn't included here.
- No sound effects or mobile touch controls yet — keyboard only.
