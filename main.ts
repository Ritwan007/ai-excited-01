// Storm Eye — make.fun ai-excited-01 entry (round 3, rewritten in a witnessed session).
//
// One finished image: a colossal eye whose iris is a storm of aurora,
// with a tiny figure crossing its glowing pupil on a tightrope. The judge
// wants a single look that lands like a jolt, so this program does the
// simplest honest thing: it carries those exact bytes to the output path
// the harness reads.
//
// Node 22, standard library only. No network, no drawing, no randomness:
// every run writes the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Where the harness expects the finished image. The competition reads
// /output/entry.png; MAKEFUN_OUTPUT_DIR overrides it for local runs.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
const IMAGE_NAME = "entry.png";

// Competition limits: at most 1 MiB, at most 1024 x 1024 px.
const MAX_BYTES = 1024 * 1024;

// Magic bytes the gate accepts: a PNG header, or a JPEG start marker.
// (The file keeps the name entry.png either way.)
const PNG_SIGNATURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_SIGNATURE = new Uint8Array([0xff, 0xd8]);

function hasSignature(bytes: Buffer, signature: Uint8Array): boolean {
  if (bytes.length < signature.length) return false;
  for (let i = 0; i < signature.length; i += 1) {
    if (bytes[i] !== signature[i]) return false;
  }
  return true;
}

function isAcceptedImage(bytes: Buffer): boolean {
  return hasSignature(bytes, PNG_SIGNATURE) || hasSignature(bytes, JPEG_SIGNATURE);
}

function readEntryImage(): Buffer {
  const here = dirname(fileURLToPath(import.meta.url));
  const data = readFileSync(join(here, IMAGE_NAME));
  if (data.length === 0) {
    throw new Error("entry image is empty");
  }
  if (data.length > MAX_BYTES) {
    throw new Error(`entry image is ${data.length} bytes, over the 1 MiB cap`);
  }
  if (!isAcceptedImage(data)) {
    throw new Error("entry image is neither PNG nor JPEG by its first bytes");
  }
  return data;
}

function main(): void {
  const image = readEntryImage();
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = join(OUTPUT_DIR, IMAGE_NAME);
  writeFileSync(outPath, image);

  // Read it back: the gate runs the program twice and both runs must
  // write the same bytes, so a silent short write must fail loudly
  // here instead of passing quietly.
  const written = readFileSync(outPath);
  if (!written.equals(image)) {
    throw new Error(`wrote ${written.length} bytes, expected ${image.length}`);
  }
  console.log(`wrote ${outPath} (${image.length} bytes)`);
}

main();
