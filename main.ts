// explain-the-glass — main.ts
//
// A deterministic Node program for make.fun's "Five Seconds to Explain the
// Glass" bounty. It writes the single sentence a house cat would say in its
// own defence, five seconds after sweeping a glass off the table, to
// /output/entry.txt.
//
// The excuse: the cat caught the glass hiding a rival cat — its own
// reflection — inside the house uninvited. So the cat evicted them both:
// the glass and the phantom cat. No apology, no confession, just a cat
// defending its territory against an intruder only it can see.
//
// No input, no network, no randomness, no clock: every run writes the same
// bytes, so the two grading runs are byte-identical by construction.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "The glass was hiding another cat in my house, so I evicted them both.";

// The gate allows 1 to 200 UTF-8 characters, not only whitespace. Fail loudly
// here rather than shipping a text the gate would refuse.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || !EXCUSE.trim()) {
  throw new Error(
    `excuse must be 1-200 non-blank characters, got ${EXCUSE.length}`,
  );
}

// The grader runs this program in a sandbox where /output is the artifact
// directory. ENTRY_OUTPUT lets a local run point the same bytes at a scratch
// path instead; the default is the path the rules name.
const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, EXCUSE, "utf8");
