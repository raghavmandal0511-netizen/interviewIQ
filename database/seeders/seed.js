import { clearContentCollections } from "./clear.js";
import { connectDB, disconnectDB } from "./helpers/db.js";
import { logger } from "./helpers/logger.js";
import { seedCategories } from "./seedCategories.js";
import { seedExercises } from "./seedExercises.js";
import { seedHrCategories } from "./seedHrCategories.js";
import { seedHrQuestions } from "./seedHrQuestions.js";
import { seedModules } from "./seedModules.js";
import { seedQuestions } from "./seedQuestions.js";
import { seedTestQuestions } from "./seedTestQuestions.js";
import { seedTests } from "./seedTests.js";
import { seedTheory } from "./seedTheory.js";
import { seedTopics } from "./seedTopics.js";

const STEPS = [
  { name: "Categories", run: seedCategories },
  { name: "Modules", run: seedModules },
  { name: "Topics", run: seedTopics },
  { name: "Theory", run: seedTheory },
  { name: "Exercises", run: seedExercises },
  { name: "Questions", run: seedQuestions },
  { name: "HR Categories", run: seedHrCategories },
  { name: "HR Questions", run: seedHrQuestions },
  { name: "Tests", run: seedTests },
  { name: "Test Questions", run: seedTestQuestions },
];

function shouldClear(argv) {
  return argv.includes("--clear") || process.env.SEED_CLEAR === "1";
}

async function runSeed({ clearFirst }) {
  await connectDB();
  logger.blank();

  if (clearFirst) {
    logger.info("Clearing existing InterviewIQ content before seed...");
    await clearContentCollections();
    logger.blank();
  }

  const started = Date.now();
  const failures = [];

  for (const step of STEPS) {
    try {
      logger.step(`Seeding ${step.name}...`);
      await step.run();
    } catch (err) {
      logger.error(`${step.name} seeding failed`, err);
      failures.push(step.name);
      // Parent hierarchy failures are fatal — stop to avoid invalid refs.
      if (
        ["Categories", "Modules", "Topics", "Exercises", "Questions"].includes(
          step.name
        )
      ) {
        throw err;
      }
      // Non-critical later steps: log and continue when safe.
      logger.warn(`Continuing after ${step.name} failure`);
    }
  }

  logger.blank();
  if (failures.length) {
    logger.warn(`Completed with failures: ${failures.join(", ")}`);
    process.exitCode = 1;
  } else {
    logger.success("Database Seed Complete");
    process.exitCode = 0;
  }
  logger.info(`Finished in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

async function main() {
  const clearFirst = shouldClear(process.argv);
  try {
    await runSeed({ clearFirst });
  } catch (err) {
    logger.error("Seed aborted", err);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

main();
