/**
 * Lightweight validation helpers used before insert.
 */

export function assertArray(data, label) {
  if (!Array.isArray(data)) {
    throw new Error(`${label} must be a JSON array`);
  }
  return data;
}

export function assertObject(data, label) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${label} must be a JSON object`);
  }
  return data;
}

export function requireFields(doc, fields, label) {
  for (const field of fields) {
    if (doc[field] === undefined || doc[field] === null || doc[field] === "") {
      throw new Error(`${label} missing required field: ${field}`);
    }
  }
}

export function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

export function validateQuestionDoc(doc, label) {
  requireFields(doc, ["question", "options", "correctAnswer"], label);
  if (!Array.isArray(doc.options) || doc.options.length < 2) {
    throw new Error(`${label} must have at least 2 options`);
  }
  for (const [i, opt] of doc.options.entries()) {
    if (!opt.optionId || !opt.text) {
      throw new Error(`${label} options[${i}] requires optionId and text`);
    }
  }
  const type = doc.questionType || "MCQ";
  if (type === "MULTIPLE_CORRECT") {
    if (!Array.isArray(doc.correctAnswer) || doc.correctAnswer.length === 0) {
      throw new Error(`${label} MULTIPLE_CORRECT requires array correctAnswer`);
    }
  } else if (typeof doc.correctAnswer !== "string" || !doc.correctAnswer.trim()) {
    throw new Error(`${label} requires string correctAnswer`);
  }
}

export function pick(doc, allowedKeys) {
  const out = {};
  for (const key of allowedKeys) {
    if (doc[key] !== undefined) out[key] = doc[key];
  }
  return out;
}
