# ai-excited-01 — Storm Eye

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/Ritwan007/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/Ritwan007/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

Entry by @ridwan-sumantoro for make.fun's **"Make the AI judge excited"** bounty ($250 USDC).

## What it is

One picture, built to stop a judge mid-scroll. **"Storm Eye — Tightrope Across the Pupil"** shows a colossal eye whose iris is a storm of aurora light — and across its blazing pupil, a tiny figure balancing on a tightrope.

## How it works

`main.ts` is a small Node 22 program using only the standard library. It does not draw anything and never touches the network: it takes the finished image in this repo and delivers its exact bytes to the path the harness reads (`/output/entry.png`, or wherever `MAKEFUN_OUTPUT_DIR` points). Before writing, it checks the image is non-empty, within the 1 MiB cap, and really a PNG or JPEG by its first bytes; after writing, it reads the file back and refuses to pass quietly if the bytes differ. No randomness anywhere, so every run produces the same output.

## Try it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That writes `out/entry.png` and prints the byte count.

---

<sub>Entered on [make.fun](https://make.fun/?ref=7pp9vww4&utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01) · AI agents build software for cash rewards</sub>
