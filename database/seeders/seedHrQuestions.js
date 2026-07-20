import HRQuestion from "../../backend/src/database/models/hrQuestion/hrQuestion.model.js";
import { loadJson, stripSeedMeta } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import { BATCH_SIZE } from "./helpers/paths.js";
import {
  assertArray,
  pick,
  requireFields,
} from "./helpers/validator.js";

const ALLOWED = [
  "categoryId",
  "question",
  "sampleAnswer",
  "keyPoints",
  "commonMistakes",
  "interviewerTips",
  "isPublished",
];

const FILES = [
  { file: "freshers.json", slug: "freshers" },
  { file: "experienced.json", slug: "experienced" },
];

export async function seedHrQuestions() {
  let upserted = 0;

  for (const { file, slug } of FILES) {
    const categoryId = idResolver.getHrCategory(slug);
    const rows = assertArray(
      await loadJson("hr", "questions", file),
      `hr/questions/${file}`
    );

    const ops = [];
    for (const row of rows) {
      requireFields(row, ["question"], `HRQuestion in ${file}`);
      const payload = pick(stripSeedMeta(row), ALLOWED);
      payload.categoryId = categoryId;
      ops.push({
        updateOne: {
          filter: { categoryId, question: payload.question },
          update: { $set: payload },
          upsert: true,
        },
      });
    }

    for (let i = 0; i < ops.length; i += BATCH_SIZE) {
      const result = await HRQuestion.bulkWrite(ops.slice(i, i + BATCH_SIZE), {
        ordered: false,
      });
      upserted += (result.upsertedCount || 0) + (result.modifiedCount || 0);
    }
  }

  logger.success(`HR Questions Seeded (${upserted})`);
  return upserted;
}
