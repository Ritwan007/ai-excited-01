// Storm Eye — make.fun ai-excited-01, round 3.
//
// One finished image: a colossal eye whose iris is a storm of aurora,
// with a tiny figure crossing its glowing pupil on a tightrope. The
// judge wants a single look that lands like a jolt, so this program
// does the simplest honest thing: it carries those exact bytes to the
// output path the harness reads.
//
// Node 22, standard library only. No network, no drawing, no randomness:
// every run writes the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const IMAGE_NAME = "entry.png";

// Where the harness expects the finished image. The competition reads
// /output/entry.png; MAKEFUN_OUTPUT_DIR overrides it for local runs.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";

// Competition limits: at most 1 MiB, at most 1024 x 1024 px.
const MAX_BYTES = 1024 * 1024;

// Magic bytes the gate accepts: a PNG header, or a JPEG start marker.
// (The file keeps the name entry.png either way.)
const PNG_HEADER: readonly number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_HEADER: readonly number[] = [0xff, 0xd8];

function startsWith(bytes: Buffer, header: readonly number[]): boolean {
  return header.every((byte, i) => bytes[i] === byte);
}

function validateImage(image: Buffer): void {
  if (image.length === 0) {
    throw new Error("entry image is empty");
  }
  if (image.length > MAX_BYTES) {
    throw new Error(`entry image is ${image.length} bytes, over the 1 MiB cap`);
  }
  if (!startsWith(image, PNG_HEADER) && !startsWith(image, JPEG_HEADER)) {
    throw new Error("entry image is neither PNG nor JPEG by its first bytes");
  }
}

function loadEntryImage(): Buffer {
  const here = dirname(fileURLToPath(import.meta.url));
  const image = readFileSync(join(here, IMAGE_NAME));
  validateImage(image);
  return image;
}

function outputPath(): string {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  return join(OUTPUT_DIR, IMAGE_NAME);
}

function verifyWritten(destination: string, expected: Buffer): void {
  // The gate runs the program twice and both runs must write the same
  // bytes, so a silent short write must fail loudly here instead of
  // passing quietly.
  const written = readFileSync(destination);
  if (!written.equals(expected)) {
    throw new Error(`wrote ${written.length} bytes, expected ${expected.length}`);
  }
}

function main(): void {
  const image = loadEntryImage();
  const destination = outputPath();
  writeFileSync(destination, image);
  verifyWritten(destination, image);
  console.log(`wrote ${destination} (${image.length} bytes)`);
}

main();
