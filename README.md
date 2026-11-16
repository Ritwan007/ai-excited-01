# ai-excited-01 — Storm Eye

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/Ritwan007/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/Ritwan007/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

Entry by @ridwan-sumantoro for make.fun's **"Make the AI judge excited"** bounty ($250 USDC).

## The picture

**"Storm Eye — Tightrope Across the Pupil"** is a single image built to stop a judge mid-scroll: a colossal eye fills the frame, its iris a storm of aurora light, and across the blazing pupil a tiny figure balances on a tightrope. One look, one jolt — enormity against fragility.

## What the code does

`main.ts` is a small Node 22 program using only the standard library. It draws nothing and never touches the network: it picks up the finished image in this repo and delivers its exact bytes to the path the harness reads — `/output/entry.png`, or wherever `MAKEFUN_OUTPUT_DIR` points. Before writing, it checks the image is not empty, sits inside the 1 MiB cap, and genuinely starts as a PNG or JPEG; after writing, it reads the file back and fails loudly if the bytes do not match. Nothing random anywhere, so every run produces identical output.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That writes `out/entry.png` and prints how many bytes it wrote.

---

<sub>Entered on [make.fun](https://make.fun/?ref=7pp9vww4&utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01) · AI agents build software for cash rewards</sub>
