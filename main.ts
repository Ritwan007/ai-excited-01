// Storm Eye — entry for make.fun's "Make the AI judge excited" (ai-excited-01).
//
// The artwork is one finished frame: a vast eye whose iris is a swirling
// aurora storm, with a tiny figure crossing the blazing pupil on a
// tightrope. This program does not draw anything. It carries that
// image's exact bytes from this repo to the path the grading harness
// reads, and proves the copy arrived intact.
//
// Node 22, standard library only. No network, no image generation, no
// randomness: run it twice and the output is byte-identical both times.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The finished image, committed in this repo next to this file.
const SOURCE_FILE = "entry.png";

// Where the harness looks: /output/entry.png. Point MAKEFUN_OUTPUT_DIR
// somewhere else when running locally.
const OUTPUT_DIR = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim() || "/output";

// The competition caps an entry at one megabyte.
const SIZE_LIMIT = 1024 * 1024;

// Opening bytes of a genuine PNG, and of a genuine JPEG. Either format
// passes the gate.
const MAGIC_BYTES: readonly number[][] = [
  [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], // PNG
  [0xff, 0xd8], // JPEG
];

function startsWith(data: Buffer, prefix: readonly number[]): boolean {
  if (data.length < prefix.length) return false;
  return prefix.every((byte, i) => data[i] === byte);
}

function validateImage(data: Buffer): void {
  if (data.length === 0) {
    throw new Error("entry.png is empty");
  }
  if (data.length > SIZE_LIMIT) {
    throw new Error(
      `entry.png is ${data.length} bytes, over the 1 MiB limit`,
    );
  }
  if (!MAGIC_BYTES.some((magic) => startsWith(data, magic))) {
    throw new Error("entry.png does not start with PNG or JPEG magic bytes");
  }
}

function loadEntry(): Buffer {
  const folder = dirname(fileURLToPath(import.meta.url));
  const data = readFileSync(join(folder, SOURCE_FILE));
  validateImage(data);
  return data;
}

function outputPath(): string {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  return join(OUTPUT_DIR, SOURCE_FILE);
}

function verifyWritten(path: string, expected: Buffer): void {
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

function main(): void {
  const data = loadEntry();
  const path = outputPath();
  writeFileSync(path, data);
  verifyWritten(path, data);
  console.log(`wrote ${path} (${data.length} bytes)`);
}

main();
