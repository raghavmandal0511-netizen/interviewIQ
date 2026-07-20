import { connectDB, disconnectDB, mongoose } from "./helpers/db.js";
import { logger } from "./helpers/logger.js";
import { CONTENT_MODELS } from "./helpers/paths.js";

// Register models so mongoose.model names resolve (resolved via backend paths)
import "../../backend/src/database/models/category/category.model.js";
import "../../backend/src/database/models/module/module.model.js";
import "../../backend/src/database/models/topic/topic.model.js";
import "../../backend/src/database/models/theory/theory.model.js";
import "../../backend/src/database/models/exercise/exercise.model.js";
import "../../backend/src/database/models/question/question.model.js";
import "../../backend/src/database/models/test/test.model.js";
import "../../backend/src/database/models/testQuestion/testQuestion.model.js";
import "../../backend/src/database/models/hrCategory/hrCategory.model.js";
import "../../backend/src/database/models/hrQuestion/hrQuestion.model.js";
import "../../backend/src/database/models/userAttempt/userAttempt.model.js";
import "../../backend/src/database/models/userAnswer/userAnswer.model.js";
import "../../backend/src/database/models/topicProgress/topicProgress.model.js";
import "../../backend/src/database/models/userHRAnswer/userHRAnswer.model.js";

/**
 * Delete InterviewIQ content collections (and dependent progress).
 * Never deletes User documents.
 */
export async function clearContentCollections() {
  const results = [];
  for (const modelName of CONTENT_MODELS) {
    if (!mongoose.models[modelName]) {
      logger.warn(`Model not registered, skip clear: ${modelName}`);
      continue;
    }
    const res = await mongoose.model(modelName).deleteMany({});
    results.push({ modelName, deleted: res.deletedCount || 0 });
    logger.step(`Cleared ${modelName} (${res.deletedCount || 0})`);
  }
  return results;
}

async function main() {
  try {
    await connectDB();
    logger.blank();
    logger.info("Clearing InterviewIQ content collections...");
    await clearContentCollections();
    logger.blank();
    logger.success("Content collections cleared");
    process.exitCode = 0;
  } catch (err) {
    logger.error("Clear failed", err);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith("clear.js") ||
    process.argv[1].replace(/\\/g, "/").endsWith("seeders/clear.js"));

if (isDirectRun) {
  main();
}
