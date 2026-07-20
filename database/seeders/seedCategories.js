import Category from "../../backend/src/database/models/category/category.model.js";
import { loadJson } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import {
  assertArray,
  assertUnique,
  pick,
  requireFields,
} from "./helpers/validator.js";

const ALLOWED = ["name", "slug", "description", "icon", "order", "isActive"];

export async function seedCategories() {
  const rows = assertArray(await loadJson("categories.json"), "categories.json");
  assertUnique(
    rows.map((r) => r.slug),
    "category slug"
  );

  let upserted = 0;
  for (const row of rows) {
    requireFields(row, ["name", "slug"], "Category");
    const payload = pick(row, ALLOWED);
    const doc = await Category.findOneAndUpdate(
      { slug: payload.slug },
      { $set: payload },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    idResolver.setCategory(doc.slug, doc._id);
    upserted += 1;
  }

  logger.success(`Categories Seeded (${upserted})`);
  return upserted;
}
