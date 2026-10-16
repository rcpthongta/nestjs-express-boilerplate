import fs from "node:fs/promises";
import path from "node:path";

async function generateMetadata() {
  const rootDir = path.resolve(import.meta.dirname, "..");
  const packageJsonPath = path.join(rootDir, "package.json");
  const outputPath = path.join(rootDir, "src", "metadata.ts");
  const packageJsonRaw = await fs.readFile(packageJsonPath, "utf8");
  const json = JSON.parse(packageJsonRaw);
  const content = [
    "export interface Metadata {",
    "  readonly version: string;",
    "  readonly name: string;",
    "}",
    "",
    "export const metadata: Metadata = {",
    `  version: ${JSON.stringify(json.version)},`,
    `  name: ${JSON.stringify(json.name)}`,
    "};",
    ""
  ].join("\n");

  await fs.writeFile(outputPath, content, "utf8");
}

await generateMetadata();
