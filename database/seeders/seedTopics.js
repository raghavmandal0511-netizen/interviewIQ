import Topic from "../../backend/src/database/models/topic/topic.model.js";
import { loadJson } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import { buildTopicToModuleMap } from "./helpers/paths.js";
import {
  assertArray,
  assertUnique,
  pick,
  requireFields,
} from "./helpers/validator.js";

const ALLOWED = [
  "moduleId",
  "name",
  "slug",
  "description",
  "estimatedTime",
  "difficulty",
  "order",
  "isPublished",
];

export async function seedTopics() {
  const rows = assertArray(await loadJson("topics.json"), "topics.json");
  assertUnique(
    rows.map((r) => r.slug),
    "topic slug"
  );

  const topicToModule = buildTopicToModuleMap();
  let upserted = 0;

  for (const row of rows) {
    requireFields(row, ["name", "slug"], "Topic");
    const moduleSlug = topicToModule.get(row.slug);
    if (!moduleSlug) {
      throw new Error(`No module mapping for topic slug: ${row.slug}`);
    }

    const payload = pick(row, ALLOWED);
    payload.moduleId = idResolver.getModule(moduleSlug);

    const doc = await Topic.findOneAndUpdate(
      { moduleId: payload.moduleId, slug: payload.slug },
      { $set: payload },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    idResolver.setTopic(doc.slug, doc._id);
    upserted += 1;
  }

  logger.success(`Topics Seeded (${upserted})`);
  return upserted;
}
