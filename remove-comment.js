import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const scriptName = path.basename(import.meta.url.replace("file://", ""));
const singleLine = /(^|[^:])\/\/.*(?=[\n\r]|$)/g;
const multiLine = /\/\*[\s\S]*?\*\//g;
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const skipDirs = ["node_modules", ".next", "dist", "build", "out"];

function removeCommentsFromDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.includes(entry.name)) continue;
      removeCommentsFromDir(fullPath);
      continue;
    }
    if (!extensions.some(ext => entry.name.endsWith(ext))) continue;
    if (entry.name === scriptName) continue;
    try {
      const content = fs.readFileSync(fullPath, "utf-8");
      const cleaned = content
        .replace(multiLine, "")
        .replace(singleLine, "$1")
        .trimEnd();

      fs.writeFileSync(fullPath, cleaned, "utf-8");
      console.log(`Cleaned: ${fullPath}`);
    } catch (err) {
      console.error(`Error cleaning ${fullPath}:`, err);
    }
  }
}
removeCommentsFromDir(rootDir);
console.log("Comments removed safely.");