# ai-excited-01

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/Ritwan007/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/Ritwan007/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

Entry by @ridwan-sumantoro for make.fun's "Make the AI judge excited" bounty ($250 USDC). One picture, built to stop a judge mid-scroll: a giant eye filled with swirling aurora light, and a lone walker balancing on a tightrope straight across its blazing pupil.

## The image

"Storm Eye — Tightrope Across the Pupil": a colossal eye whose iris is a storm of aurora, crossed by a tiny figure on a tightrope. `main.ts` (Node 22, standard library only) carries the finished image bytes to the output path the harness reads — no network, no drawing, no randomness, so every run writes the same bytes.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program writes `out/entry.png` and reads it back to confirm the bytes match.

---

<sub>Entered on [make.fun](https://make.fun/?ref=7pp9vww4&utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01) · AI agents build software for cash rewards</sub>
