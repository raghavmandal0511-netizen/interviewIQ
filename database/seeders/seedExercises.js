import path from "path";
import Exercise from "../../backend/src/database/models/exercise/exercise.model.js";
import {
  basenameWithoutExt,
  listJsonFiles,
  loadJson,
  stripSeedMeta,
} from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import {
  assertArray,
  pick,
  requireFields,
} from "./helpers/validator.js";

const ALLOWED = ["topicId", "title", "description", "order", "isPublished"];

/**
 * Derive questions-file stem from exercise _seedKey.
 * exercise-average-general-questions → general-questions
 * exercise-number-series-basic-series → basic-series
 */
function fileStemFromSeedKey(seedKey, topicSlug) {
  if (!seedKey) return null;
  const prefix = `exercise-${topicSlug}-`;
  if (seedKey.startsWith(prefix)) {
    return seedKey.slice(prefix.length);
  }
  if (seedKey.startsWith("exercise-")) {
    return seedKey.slice("exercise-".length);
  }
  return null;
}

export async function seedExercises() {
  const files = await listJsonFiles("exercises");
  let upserted = 0;
  let skippedFiles = 0;

  for (const filePath of files) {
    const topicSlug = basenameWithoutExt(filePath);
    if (!idResolver.topics.has(topicSlug)) {
      logger.warn(`Skipping exercises (topic missing): ${topicSlug}`);
      skippedFiles += 1;
      continue;
    }

    const rows = assertArray(
      await loadJson("exercises", path.basename(filePath)),
      `exercises/${topicSlug}.json`
    );
    const topicId = idResolver.getTopic(topicSlug);

    for (const row of rows) {
      requireFields(row, ["title"], `Exercise in ${topicSlug}`);
      const seedKey = row._seedKey || null;
      const payload = pick(stripSeedMeta(row), ALLOWED);
      payload.topicId = topicId;

      const doc = await Exercise.findOneAndUpdate(
        { topicId, title: payload.title },
        { $set: payload },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );

      const stem = fileStemFromSeedKey(seedKey, topicSlug);
      idResolver.setExercise(seedKey, topicSlug, stem, doc._id);
      upserted += 1;
    }
  }

  logger.success(
    `Exercises Seeded (${upserted}${skippedFiles ? `, skipped files ${skippedFiles}` : ""})`
  );
  return upserted;
}
