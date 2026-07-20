import path from "path";
import Question from "../../backend/src/database/models/question/question.model.js";
import {
  basenameWithoutExt,
  listJsonFilesRecursive,
  loadJson,
  stripSeedMeta,
} from "./helpers/fileLoader.js";
import { idResolver } from "./helpers/idResolver.js";
import { logger } from "./helpers/logger.js";
import { DATA_DIR, BATCH_SIZE } from "./helpers/paths.js";
import {
  assertArray,
  pick,
  validateQuestionDoc,
} from "./helpers/validator.js";

const ALLOWED = [
  "exerciseId",
  "question",
  "options",
  "correctAnswer",
  "explanation",
  "difficulty",
  "marks",
  "negativeMarks",
  "timeLimit",
  "tags",
  "questionType",
];

function topicAndStemFromPath(filePath) {
  // .../questions/{topicSlug}/{stem}.json
  const rel = path.relative(path.join(DATA_DIR, "questions"), filePath);
  const parts = rel.split(path.sep);
  if (parts.length !== 2) {
    throw new Error(`Unexpected questions path: ${filePath}`);
  }
  return {
    topicSlug: parts[0],
    fileStem: basenameWithoutExt(parts[1]),
  };
}

export async function seedQuestions() {
  const files = await listJsonFilesRecursive("questions");
  let inserted = 0;
  let updated = 0;
  let skippedFiles = 0;

  for (const filePath of files) {
    let topicSlug;
    let fileStem;
    try {
      ({ topicSlug, fileStem } = topicAndStemFromPath(filePath));
    } catch (err) {
      logger.warn(err.message);
      skippedFiles += 1;
      continue;
    }

    if (!idResolver.topics.has(topicSlug)) {
      logger.warn(`Skipping questions (topic missing): ${topicSlug}/${fileStem}`);
      skippedFiles += 1;
      continue;
    }

    let exerciseId;
    try {
      exerciseId = idResolver.resolveExerciseForQuestionFile(topicSlug, fileStem);
    } catch (err) {
      logger.warn(err.message);
      skippedFiles += 1;
      continue;
    }

    const relForLoad = path.relative(DATA_DIR, filePath).split(path.sep);
    const rows = assertArray(
      await loadJson(...relForLoad),
      `questions/${topicSlug}/${fileStem}.json`
    );

    const ops = [];
    const indexMap = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      validateQuestionDoc(row, `${topicSlug}/${fileStem}[${i}]`);
      const payload = pick(stripSeedMeta(row), ALLOWED);
      payload.exerciseId = exerciseId;

      ops.push({
        updateOne: {
          filter: { exerciseId, question: payload.question },
          update: { $set: payload },
          upsert: true,
        },
      });
      indexMap.push(i);
    }

    for (let start = 0; start < ops.length; start += BATCH_SIZE) {
      const chunk = ops.slice(start, start + BATCH_SIZE);
      const result = await Question.bulkWrite(chunk, { ordered: false });
      inserted += result.upsertedCount || 0;
      updated += result.modifiedCount || 0;

      // Reload docs for this chunk to register ObjectIds by stable keys
      const chunkRows = rows.slice(start, start + BATCH_SIZE);
      const texts = chunkRows.map((r) => r.question);
      const docs = await Question.find({
        exerciseId,
        question: { $in: texts },
      }).select("_id question");

      const byText = new Map(docs.map((d) => [d.question, d._id]));
      for (let j = 0; j < chunkRows.length; j += 1) {
        const globalIndex = start + j;
        const id = byText.get(chunkRows[j].question);
        if (id) {
          idResolver.setQuestion(topicSlug, fileStem, globalIndex, id);
        }
      }
    }
  }

  logger.success(
    `Questions Seeded (upserted ${inserted}, updated ${updated}${
      skippedFiles ? `, skipped files ${skippedFiles}` : ""
    })`
  );
  return inserted + updated;
}
