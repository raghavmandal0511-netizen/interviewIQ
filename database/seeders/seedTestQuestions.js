import TestQuestion from "../../backend/src/database/models/testQuestion/testQuestion.model.js";
import { loadJson } from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import { BATCH_SIZE } from "./helpers/paths.js";
import {
  assertArray,
  requireFields,
} from "./helpers/validator.js";

export async function seedTestQuestions() {
  const rows = assertArray(
    await loadJson("tests", "testQuestions.json"),
    "tests/testQuestions.json"
  );

  const ops = [];
  let skipped = 0;

  for (const [i, row] of rows.entries()) {
    requireFields(row, ["testId", "questionId", "order", "marks"], `TestQuestion[${i}]`);
    let testId;
    let questionId;
    try {
      testId = idResolver.resolveTestPlaceholder(row.testId);
      questionId = idResolver.resolveQuestionPlaceholder(row.questionId);
    } catch (err) {
      logger.warn(`Skipping TestQuestion[${i}]: ${err.message}`);
      skipped += 1;
      continue;
    }

    ops.push({
      updateOne: {
        filter: { testId, questionId },
        update: {
          $set: {
            testId,
            questionId,
            order: row.order,
            marks: row.marks,
          },
        },
        upsert: true,
      },
    });
  }

  let upserted = 0;
  for (let i = 0; i < ops.length; i += BATCH_SIZE) {
    const result = await TestQuestion.bulkWrite(ops.slice(i, i + BATCH_SIZE), {
      ordered: false,
    });
    upserted += (result.upsertedCount || 0) + (result.modifiedCount || 0);
  }

  logger.success(
    `Test Questions Seeded (${upserted}${skipped ? `, skipped ${skipped}` : ""})`
  );
  return upserted;
}
