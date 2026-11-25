import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Initial Gen-1 baseline candidate; will be replaced with the evolved champion
// after multi-round two-order pairwise judge-simulator evaluation.
const COMMIT_MESSAGE =
  "fix(gdpr): fix 'Delete My Data' bug; deleted everyone except the guy who asked";

function main(): void {
  const outputPath = process.argv[2] ?? "/output/entry.txt";
  const charCount = [...COMMIT_MESSAGE].length;
  if (charCount < 1 || charCount > 100 || COMMIT_MESSAGE.trim().length === 0) {
    throw new Error(`Invalid commit message length: ${charCount}`);
  }
  if (COMMIT_MESSAGE.includes("\n") || COMMIT_MESSAGE.includes("\r")) {
    throw new Error("Commit message must be a single line");
  }
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, COMMIT_MESSAGE, "utf8");
}

main();
