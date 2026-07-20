import HRCategory from "../../backend/src/database/models/hrCategory/hrCategory.model.js";
import { loadJson } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import {
  assertArray,
  assertUnique,
  pick,
  requireFields,
} from "./helpers/validator.js";

const ALLOWED = ["title", "slug", "description", "isPublished"];

export async function seedHrCategories() {
  const rows = assertArray(
    await loadJson("hr", "categories.json"),
    "hr/categories.json"
  );
  assertUnique(
    rows.map((r) => r.slug),
    "hr category slug"
  );

  let upserted = 0;
  for (const row of rows) {
    requireFields(row, ["title", "slug"], "HRCategory");
    const payload = pick(row, ALLOWED);
    const doc = await HRCategory.findOneAndUpdate(
      { slug: payload.slug },
      { $set: payload },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    idResolver.setHrCategory(doc.slug, doc._id);
    upserted += 1;
  }

  logger.success(`HR Categories Seeded (${upserted})`);
  return upserted;
}
