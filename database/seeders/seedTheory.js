import path from "path";
import Theory from "../../backend/src/database/models/theory/theory.model.js";
import {
  basenameWithoutExt,
  listJsonFiles,
  loadJson,
  stripSeedMeta,
} from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import { assertObject, pick } from "./helpers/validator.js";

const ALLOWED = [
  "topicId",
  "introduction",
  "explanation",
  "formulas",
  "shortcutTips",
  "solvedExamples",
  "references",
];

export async function seedTheory() {
  const files = await listJsonFiles("theory");
  let upserted = 0;
  let skipped = 0;

  for (const filePath of files) {
    const topicSlug = basenameWithoutExt(filePath);
    if (!idResolver.topics.has(topicSlug)) {
      logger.warn(`Skipping theory (topic missing): ${topicSlug}`);
      skipped += 1;
      continue;
    }

    const raw = assertObject(
      await loadJson("theory", path.basename(filePath)),
      `theory/${topicSlug}.json`
    );
    const payload = pick(stripSeedMeta(raw), ALLOWED);
    payload.topicId = idResolver.getTopic(topicSlug);

    const doc = await Theory.findOneAndUpdate(
      { topicId: payload.topicId },
      { $set: payload },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    idResolver.setTheory(topicSlug, doc._id);
    upserted += 1;
  }

  logger.success(`Theory Seeded (${upserted}${skipped ? `, skipped ${skipped}` : ""})`);
  return upserted;
}
