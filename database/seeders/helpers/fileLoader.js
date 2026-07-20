import fs from "fs/promises";
import path from "path";
import { DATA_DIR } from "./paths.js";

/**
 * Load and parse a JSON file relative to database/data.
 * @param {...string} segments path segments under database/data
 */
export async function loadJson(...segments) {
  const filePath = path.join(DATA_DIR, ...segments);
  const raw = await fs.readFile(filePath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${filePath}: ${err.message}`);
  }
}

/**
 * Load JSON if the file exists; otherwise return null.
 */
export async function loadJsonIfExists(...segments) {
  const filePath = path.join(DATA_DIR, ...segments);
  try {
    await fs.access(filePath);
  } catch {
    return null;
  }
  return loadJson(...segments);
}

/**
 * List *.json files in a directory under database/data (non-recursive).
 * @returns {Promise<string[]>} absolute paths
 */
export async function listJsonFiles(...dirSegments) {
  const dirPath = path.join(DATA_DIR, ...dirSegments);
  let entries;
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".json"))
    .map((e) => path.join(dirPath, e.name))
    .sort();
}

/**
 * Recursively list *.json files under a directory.
 */
export async function listJsonFilesRecursive(...dirSegments) {
  const dirPath = path.join(DATA_DIR, ...dirSegments);
  const results = [];

  async function walk(current) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch (err) {
      if (err.code === "ENOENT") return;
      throw err;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        results.push(full);
      }
    }
  }

  await walk(dirPath);
  return results.sort();
}

export function basenameWithoutExt(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

export function stripSeedMeta(doc) {
  if (!doc || typeof doc !== "object") return doc;
  const clone = { ...doc };
  delete clone._seedKey;
  delete clone._id;
  return clone;
}
