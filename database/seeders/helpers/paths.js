import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Repo paths resolved from database/seeders/helpers */
export const SEEDERS_DIR = path.resolve(__dirname, "..");
export const DATABASE_DIR = path.resolve(SEEDERS_DIR, "..");
export const DATA_DIR = path.resolve(DATABASE_DIR, "data");
export const REPO_ROOT = path.resolve(DATABASE_DIR, "..");
export const BACKEND_DIR = path.resolve(REPO_ROOT, "backend");
export const BACKEND_ENV_PATH = path.resolve(BACKEND_DIR, ".env");

export const BATCH_SIZE = 500;

/** Module slug → category slug (resolves REPLACE_CATEGORY_ID) */
export const MODULE_TO_CATEGORY = {
  "arithmetic-aptitude": "general-aptitude",
  "logical-reasoning": "general-aptitude",
  "verbal-reasoning": "general-aptitude",
  "online-tests": "general-aptitude",
  "hr-interview": "interview",
  "ai-interview": "interview",
};

/** Module slug → ordered topic slugs (resolves REPLACE_MODULE_ID) */
export const MODULE_TOPIC_SLUGS = {
  "arithmetic-aptitude": [
    "problems-on-trains",
    "time-and-distance",
    "height-and-distance",
    "time-and-work",
    "simple-interest",
    "compound-interest",
    "profit-and-loss",
    "partnership",
    "percentage",
    "problems-on-ages",
    "calendar",
    "clock",
    "average",
    "area",
    "volume-and-surface-area",
    "permutation-and-combination",
    "numbers",
    "problems-on-numbers",
    "problems-on-hcf-and-lcm",
    "decimal-fraction",
    "simplification",
    "square-root-and-cube-root",
    "surds-and-indices",
    "ratio-and-proportion",
    "chain-rule",
    "pipes-and-cistern",
    "boats-and-streams",
    "alligation-or-mixture",
    "logarithm",
    "races-and-games",
    "stocks-and-shares",
    "probability",
    "true-discount",
    "bankers-discount",
    "odd-man-out-and-series",
  ],
  "logical-reasoning": [
    "number-series",
    "letter-and-symbol-series",
    "verbal-classification",
    "essential-part",
    "analogies",
    "artificial-language",
    "logical-deduction",
  ],
  "verbal-reasoning": [
    "logical-sequence-of-words",
    "blood-relation-test",
    "syllogism",
    "series-completion",
    "cause-and-effect",
    "dice",
  ],
  "hr-interview": ["freshers", "experienced"],
  "ai-interview": ["ai-mock-interview"],
  "online-tests": [
    "arithmetic-test-1",
    "arithmetic-test-2",
    "arithmetic-test-3",
    "logical-test-1",
    "logical-test-2",
    "verbal-test-1",
    "verbal-test-2",
    "mock-interviewiq-test-1",
    "mock-interviewiq-test-2",
  ],
};

export function buildTopicToModuleMap() {
  const map = new Map();
  for (const [moduleSlug, topicSlugs] of Object.entries(MODULE_TOPIC_SLUGS)) {
    for (const topicSlug of topicSlugs) {
      if (map.has(topicSlug)) {
        throw new Error(`Duplicate topic slug in module map: ${topicSlug}`);
      }
      map.set(topicSlug, moduleSlug);
    }
  }
  return map;
}

/** Content collections cleared by seed:clear (users are never cleared). */
export const CONTENT_MODELS = [
  "UserHRAnswer",
  "UserAnswer",
  "UserAttempt",
  "TopicProgress",
  "TestQuestion",
  "Question",
  "Exercise",
  "Theory",
  "HRQuestion",
  "HRCategory",
  "Test",
  "Topic",
  "Module",
  "Category",
];
