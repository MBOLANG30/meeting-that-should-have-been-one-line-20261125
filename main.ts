// The Meeting That Should Have Been One Line — make.fun entry.
// Writes the single sentence that could have replaced an entire pointless
// meeting to /output/entry.txt, then verifies the file byte-for-byte.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "We already agreed in the group chat, so this meeting is just the live-action replay for people who don't read.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Clear only the CONTENTS of the output folder, never the folder itself.
mkdirSync(OUT_DIR, { recursive: true });
for (const name of readdirSync(OUT_DIR)) {
  rmSync(join(OUT_DIR, name), { recursive: true, force: true });
}

writeFileSync(OUT_FILE, LINE, "utf8");

// Verify byte-for-byte: exactly the line, one line, one sentence, 1-200 chars.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line byte-for-byte");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry length ${written.length} is outside 1-200 characters`);
}
if (written.includes("\n") || written.trim() !== written) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
if (!existsSync(OUT_DIR)) {
  throw new Error("output folder itself must never be deleted");
}

console.log(`Wrote ${written.length} characters to ${OUT_FILE}`);
