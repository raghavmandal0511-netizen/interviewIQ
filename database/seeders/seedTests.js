import Test from "../../backend/src/database/models/test/test.model.js";
import { loadJson, stripSeedMeta } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import {
  assertArray,
  pick,
  requireFields,
} from "./helpers/validator.js";

/** Fields accepted by Test model (extras like slug/instructions are dropped). */
const ALLOWED = [
  "title",
  "description",
  "category",
  "duration",
  "totalQuestions",
  "passingMarks",
  "difficulty",
  "isPublished",
];

export async function seedTests() {
  const rows = assertArray(await loadJson("tests", "tests.json"), "tests/tests.json");
  let upserted = 0;

  for (const row of rows) {
    requireFields(
      row,
      ["title", "duration", "totalQuestions", "passingMarks"],
      "Test"
    );
    const seedKey = row._seedKey || null;
    const slug = row.slug || null;
    const payload = pick(stripSeedMeta(row), ALLOWED);
    payload.category = idResolver.resolveCategoryPlaceholder(row.category);

    const doc = await Test.findOneAndUpdate(
      { title: payload.title },
      { $set: payload },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    if (slug) {
      idResolver.setTest(slug, doc._id, seedKey);
    } else if (seedKey) {
      idResolver.setTest(seedKey.replace(/^test-/, ""), doc._id, seedKey);
    }
    upserted += 1;
  }

  logger.success(`Tests Seeded (${upserted})`);
  return upserted;
}
