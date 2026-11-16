// Storm Eye — entry for make.fun's "Make the AI judge excited" (ai-excited-01).
//
// The artwork is a single finished frame: a vast eye whose iris is a
// swirling aurora storm, with a tiny figure crossing the bright pupil on
// a tightrope. This script's job is deliberately small — carry that
// image's exact bytes from this repo to the place the grading harness
// looks for them, and prove the copy came through faithfully.
//
// Node 22, standard library only. No network, no image generation, no
// randomness: run it twice and the output is identical both times.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_FILE = "entry.png";

// The harness reads /output/entry.png. Set MAKEFUN_OUTPUT_DIR to point
// somewhere else when running locally.
const OUTPUT_DIR = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim() || "/output";

// The competition caps an entry at one megabyte.
const SIZE_LIMIT = 1024 * 1024;

// The opening bytes of a genuine PNG, and of a genuine JPEG. The gate
// accepts either format.
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_MAGIC = [0xff, 0xd8];

function hasPrefix(data: Buffer, prefix: number[]): boolean {
  if (data.length < prefix.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (data[i] !== prefix[i]) return false;
  }
  return true;
}

function checkImage(data: Buffer): void {
  if (data.length === 0) throw new Error("entry.png is empty");
  if (data.length > SIZE_LIMIT) {
    throw new Error(`entry.png is ${data.length} bytes, over the 1 MiB limit`);
  }
  if (!hasPrefix(data, PNG_MAGIC) && !hasPrefix(data, JPEG_MAGIC)) {
    throw new Error("entry.png does not start with PNG or JPEG magic bytes");
  }
}

function readEntry(): Buffer {
  const folder = dirname(fileURLToPath(import.meta.url));
  const data = readFileSync(join(folder, SOURCE_FILE));
  checkImage(data);
  return data;
}

function destinationPath(): string {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  return join(OUTPUT_DIR, SOURCE_FILE);
}

function confirmCopy(path: string, expected: Buffer): void {
  // The harness runs this program twice and expects byte-identical
  // output both times, so a truncated or corrupted write has to fail
  // here loudly instead of slipping through unnoticed.
  const actual = readFileSync(path);
  if (!actual.equals(expected)) {
    throw new Error(
      `verification failed: wrote ${actual.length} bytes, expected ${expected.length}`,
    );
  }
}

function run(): void {
  const data = readEntry();
  const path = destinationPath();
  writeFileSync(path, data);
  confirmCopy(path, data);
  console.log(`wrote ${path} (${data.length} bytes)`);
}

run();
