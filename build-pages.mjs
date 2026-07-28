import { createHash } from "node:crypto";
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  rm,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, "dist");
const manifestPath = path.join(root, "public-files.json");

async function listFiles(directory, prefix = "") {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
  )) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isSymbolicLink()) {
      throw new Error(`Generated output contains a symlink: ${relativePath}`);
    }

    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath, relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    } else {
      throw new Error(
        `Generated output is not a regular file: ${relativePath}`,
      );
    }
  }

  return files;
}

await rm(output, { recursive: true, force: true });

try {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const manifestKeys = Object.keys(manifest).sort();

  if (
    manifest.schema_version !== 1 ||
    !Array.isArray(manifest.files) ||
    manifestKeys.join(",") !== "files,schema_version"
  ) {
    throw new Error(
      "public-files.json must contain schema_version 1 and files",
    );
  }

  const files = manifest.files;
  const sortedFiles = [...files].sort();

  if (
    files.length === 0 ||
    files.some((entry, index) => entry !== sortedFiles[index])
  ) {
    throw new Error("Manifest files must be a non-empty sorted list");
  }

  const exactEntries = new Set();
  const caseFoldedEntries = new Set();

  for (const entry of files) {
    if (
      typeof entry !== "string" ||
      entry.length === 0 ||
      entry.includes("\\") ||
      entry.includes("\0") ||
      entry.endsWith("/") ||
      path.posix.isAbsolute(entry) ||
      path.win32.isAbsolute(entry) ||
      path.posix.normalize(entry) !== entry ||
      entry.split("/").some((segment) => segment === "." || segment === "..") ||
      entry === "dist" ||
      entry.startsWith("dist/")
    ) {
      throw new Error(`Unsafe manifest entry: ${String(entry)}`);
    }

    const caseFolded = entry.toLowerCase();

    if (exactEntries.has(entry) || caseFoldedEntries.has(caseFolded)) {
      throw new Error(`Duplicate manifest entry: ${entry}`);
    }

    exactEntries.add(entry);
    caseFoldedEntries.add(caseFolded);
  }

  for (const entry of files) {
    const source = path.resolve(root, entry);
    const rootPrefix = `${root}${path.sep}`;

    if (!source.startsWith(rootPrefix)) {
      throw new Error(`Manifest entry escapes the project root: ${entry}`);
    }

    const sourceStat = await lstat(source);

    if (!sourceStat.isFile() || sourceStat.isSymbolicLink()) {
      throw new Error(`Manifest entry is not a regular source file: ${entry}`);
    }

    const destination = path.join(output, ...entry.split("/"));
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(source, destination);
  }

  const generatedFiles = await listFiles(output);

  if (
    generatedFiles.length !== files.length ||
    generatedFiles.some((entry, index) => entry !== files[index])
  ) {
    throw new Error("Generated output does not match public-files.json");
  }

  for (const entry of generatedFiles) {
    const bytes = await readFile(path.join(output, ...entry.split("/")));
    const hash = createHash("sha256").update(bytes).digest("hex");
    console.log(`${hash}  ${entry}`);
  }

  console.log(`Built ${generatedFiles.length} public files in dist/`);
} catch (error) {
  await rm(output, { recursive: true, force: true });
  console.error(`Build failed: ${error.message}`);
  process.exitCode = 1;
}
