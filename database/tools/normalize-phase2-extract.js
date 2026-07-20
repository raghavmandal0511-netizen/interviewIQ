/**
 * Phase 2 — Extract Phase 1 packs into theory / exercises / questions hierarchy.
 * Also scaffolds empty exercise metadata for all Arithmetic topics.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "data");
const PHASE1 = path.join(ROOT, "general-aptitude", "arithmetic");
const THEORY = path.join(ROOT, "theory");
const EXERCISES = path.join(ROOT, "exercises");
const QUESTIONS = path.join(ROOT, "questions");

const TOPICS = [
  { name: "Problems on Trains", slug: "problems-on-trains", order: 1 },
  { name: "Time and Distance", slug: "time-and-distance", order: 2 },
  { name: "Height and Distance", slug: "height-and-distance", order: 3 },
  { name: "Time and Work", slug: "time-and-work", order: 4 },
  { name: "Simple Interest", slug: "simple-interest", order: 5 },
  { name: "Compound Interest", slug: "compound-interest", order: 6 },
  { name: "Profit and Loss", slug: "profit-and-loss", order: 7 },
  { name: "Partnership", slug: "partnership", order: 8 },
  { name: "Percentage", slug: "percentage", order: 9 },
  { name: "Problems on Ages", slug: "problems-on-ages", order: 10 },
  { name: "Calendar", slug: "calendar", order: 11 },
  { name: "Clock", slug: "clock", order: 12 },
  { name: "Average", slug: "average", order: 13 },
  { name: "Area", slug: "area", order: 14 },
  { name: "Volume and Surface Area", slug: "volume-and-surface-area", order: 15 },
  { name: "Permutation and Combination", slug: "permutation-and-combination", order: 16 },
  { name: "Numbers", slug: "numbers", order: 17 },
  { name: "Problems on Numbers", slug: "problems-on-numbers", order: 18 },
  { name: "Problems on HCF and LCM", slug: "problems-on-hcf-and-lcm", order: 19 },
  { name: "Decimal Fraction", slug: "decimal-fraction", order: 20 },
  { name: "Simplification", slug: "simplification", order: 21 },
  { name: "Square Root and Cube Root", slug: "square-root-and-cube-root", order: 22 },
  { name: "Surds and Indices", slug: "surds-and-indices", order: 23 },
  { name: "Ratio and Proportion", slug: "ratio-and-proportion", order: 24 },
  { name: "Chain Rule", slug: "chain-rule", order: 25 },
  { name: "Pipes and Cistern", slug: "pipes-and-cistern", order: 26 },
  { name: "Boats and Streams", slug: "boats-and-streams", order: 27 },
  { name: "Alligation or Mixture", slug: "alligation-or-mixture", order: 28 },
  { name: "Logarithm", slug: "logarithm", order: 29 },
  { name: "Races and Games", slug: "races-and-games", order: 30 },
  { name: "Stocks and Shares", slug: "stocks-and-shares", order: 31 },
  { name: "Probability", slug: "probability", order: 32 },
  { name: "True Discount", slug: "true-discount", order: 33 },
  { name: "Banker's Discount", slug: "bankers-discount", order: 34 },
  { name: "Odd Man Out and Series", slug: "odd-man-out-and-series", order: 35 },
];

const EXERCISE_DEFS = [
  {
    key: "formula",
    title: "Formula Practice",
    description: "Practice core formulas, conversions, and identity checks.",
    order: 1,
    file: "formula.json",
  },
  {
    key: "general-questions",
    title: "General Questions",
    description: "Standard aptitude MCQs for this topic.",
    order: 2,
    file: "general-questions.json",
  },
  {
    key: "data-sufficiency-1",
    title: "Data Sufficiency 1",
    description: "Data sufficiency set 1 — decide which statements are enough.",
    order: 3,
    file: "data-sufficiency-1.json",
  },
  {
    key: "data-sufficiency-2",
    title: "Data Sufficiency 2",
    description: "Data sufficiency set 2 — mixed difficulty DS practice.",
    order: 4,
    file: "data-sufficiency-2.json",
  },
];

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function writeJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function loadPhase1(slug) {
  const file = path.join(PHASE1, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function normalizeTheory(theory) {
  return {
    topicId: "REPLACE_TOPIC_ID",
    introduction: theory.introduction || "",
    explanation: theory.explanation || "",
    formulas: (theory.formulas || []).map((f) => ({
      title: f.title || "",
      content: f.content || "",
    })),
    shortcutTips: (theory.shortcutTips || []).map((t) => ({
      title: t.title || "",
      tip: t.tip || "",
    })),
    solvedExamples: (theory.solvedExamples || []).map((e) => ({
      problem: e.problem || "",
      solution: e.solution || "",
      steps: Array.isArray(e.steps) ? e.steps : [],
    })),
    references: (theory.references || []).map((r) => ({
      title: r.title || "",
      url: r.url || "",
    })),
  };
}

function normalizeQuestion(q, tagsFallback) {
  return {
    exerciseId: "REPLACE_EXERCISE_ID",
    question: q.question,
    options: (q.options || []).map((o) => ({
      optionId: o.optionId,
      text: o.text,
    })),
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || "",
    difficulty: q.difficulty || "medium",
    marks: typeof q.marks === "number" ? q.marks : 1,
    negativeMarks: typeof q.negativeMarks === "number" ? q.negativeMarks : 0.25,
    timeLimit: typeof q.timeLimit === "number" ? q.timeLimit : 60,
    tags: Array.isArray(q.tags) && q.tags.length ? q.tags : [tagsFallback],
    questionType: q.questionType || "MCQ",
  };
}

function buildExercises(slug, name) {
  return EXERCISE_DEFS.map((ex) => ({
    topicId: "REPLACE_TOPIC_ID",
    _seedKey: `exercise-${slug}-${ex.key}`,
    title: ex.title,
    description:
      ex.key === "general-questions"
        ? `Standard MCQs on ${name}`
        : ex.key === "formula"
          ? `Formula practice for ${name}`
          : `${ex.title} for ${name}`,
    order: ex.order,
    isPublished: true,
  }));
}

ensureDir(THEORY);
ensureDir(EXERCISES);
ensureDir(QUESTIONS);

const manifest = { extracted: [], missingTheory: [], missingGeneral: [] };

for (const topic of TOPICS) {
  const { slug, name } = topic;
  const phase1 = loadPhase1(slug);

  writeJson(path.join(EXERCISES, `${slug}.json`), buildExercises(slug, name));
  ensureDir(path.join(QUESTIONS, slug));

  if (phase1 && phase1.theory) {
    writeJson(path.join(THEORY, `${slug}.json`), normalizeTheory(phase1.theory));
    manifest.extracted.push(slug);
  } else {
    manifest.missingTheory.push(slug);
  }

  if (phase1 && Array.isArray(phase1.questions) && phase1.questions.length) {
    const qs = phase1.questions.map((q) => normalizeQuestion(q, slug));
    writeJson(path.join(QUESTIONS, slug, "general-questions.json"), qs);
  } else {
    manifest.missingGeneral.push(slug);
  }
}

writeJson(path.join(ROOT, "_phase2-manifest.json"), {
  topics: TOPICS,
  exerciseDefs: EXERCISE_DEFS,
  ...manifest,
});

console.log(
  JSON.stringify(
    {
      extractedTheory: manifest.extracted.length,
      missingTheory: manifest.missingTheory,
      missingGeneral: manifest.missingGeneral,
    },
    null,
    2
  )
);
