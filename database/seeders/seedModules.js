import Module from "../../backend/src/database/models/module/module.model.js";
import { loadJson } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import { MODULE_TO_CATEGORY } from "./helpers/paths.js";
import {
  assertArray,
  assertUnique,
  pick,
  requireFields,
} from "./helpers/validator.js";

const ALLOWED = [
  "categoryId",
  "name",
  "slug",
  "description",
  "icon",
  "order",
  "isActive",
];

export async function seedModules() {
  const rows = assertArray(await loadJson("modules.json"), "modules.json");
  assertUnique(
    rows.map((r) => r.slug),
    "module slug"
  );

  let upserted = 0;
  for (const row of rows) {
    requireFields(row, ["name", "slug"], "Module");
    const categorySlug = MODULE_TO_CATEGORY[row.slug];
    if (!categorySlug) {
      throw new Error(`No category mapping for module slug: ${row.slug}`);
    }

    const payload = pick(row, ALLOWED);
    payload.categoryId = idResolver.getCategory(categorySlug);

    const doc = await Module.findOneAndUpdate(
      { categoryId: payload.categoryId, slug: payload.slug },
      { $set: payload },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    idResolver.setModule(doc.slug, doc._id);
    upserted += 1;
  }

  logger.success(`Modules Seeded (${upserted})`);
  return upserted;
}
