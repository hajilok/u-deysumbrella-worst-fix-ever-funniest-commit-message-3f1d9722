import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Evolved Gen-3 champion commit message (64 UTF-8 bytes, single line).
const COMMIT_MESSAGE =
  "Fix 'card declined' errors by charging the last card that worked";

function resolveOutputPath(argv: string[]): string {
  const flagIndex = argv.indexOf("--out");
  if (flagIndex !== -1 && argv[flagIndex + 1]) {
    return argv[flagIndex + 1];
  }
  return "/output/entry.txt";
}

function main(): void {
  const outputPath = resolveOutputPath(process.argv);
  const charCount = [...COMMIT_MESSAGE].length;
  if (charCount < 1 || charCount > 100 || COMMIT_MESSAGE.trim().length === 0) {
    throw new Error(`Invalid commit message length: ${charCount}`);
  }
  if (COMMIT_MESSAGE.includes("\n") || COMMIT_MESSAGE.includes("\r")) {
    throw new Error("Commit message must be a single line");
  }
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, COMMIT_MESSAGE, { encoding: "utf8", mode: 0o644 });
}

main();
