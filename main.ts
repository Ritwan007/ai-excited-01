// Storm Eye — make.fun ai-excited-01 entry (round 2 rebuild).
//
// A single static artwork: a colossal eye whose iris is a storm of
// aurora, with a tiny figure crossing its glowing pupil on a tightrope.
// This program just places the finished image where the harness looks
// for it. Node 22, standard library only, no network access.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ARTWORK_FILE = "entry.png";
const FALLBACK_DIR = "/output";
// JPEG files start with these two bytes (SOI marker).
const JPEG_SOI = [0xff, 0xd8];

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return FALLBACK_DIR;
}

function loadArtwork(sourcePath: string): Buffer {
  const pixels = readFileSync(sourcePath);
  if (pixels.length === 0) {
    throw new Error(`artwork is empty: ${sourcePath}`);
  }
  if (pixels[0] !== JPEG_SOI[0] || pixels[1] !== JPEG_SOI[1]) {
    throw new Error(`artwork is not a JPEG: ${sourcePath}`);
  }
  return pixels;
}

function main(): void {
  const here = dirname(new URL(import.meta.url).pathname);
  const pixels = loadArtwork(join(here, ARTWORK_FILE));

  const targetDir = resolveOutputDir();
  mkdirSync(targetDir, { recursive: true });
  const targetPath = join(targetDir, ARTWORK_FILE);
  writeFileSync(targetPath, pixels);

  console.log(`wrote ${targetPath} (${pixels.length} bytes)`);
}

main();
