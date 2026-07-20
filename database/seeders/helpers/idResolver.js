/**
 * In-memory maps from stable seed keys / slugs → MongoDB ObjectIds.
 * Populated as each seeder runs so later steps can resolve placeholders.
 */
class IdResolver {
  constructor() {
    this.categories = new Map(); // slug → ObjectId
    this.modules = new Map(); // slug → ObjectId
    this.topics = new Map(); // slug → ObjectId
    this.theories = new Map(); // topicSlug → ObjectId
    this.exercisesBySeedKey = new Map(); // _seedKey → ObjectId
    this.exercisesByPath = new Map(); // `${topicSlug}::${fileStem}` → ObjectId
    this.questions = new Map(); // `${topicSlug}_${fileStem}_${###}` → ObjectId
    this.hrCategories = new Map(); // slug → ObjectId
    this.tests = new Map(); // test slug → ObjectId
    this.testsBySeedKey = new Map(); // _seedKey → ObjectId
  }

  setCategory(slug, id) {
    this.categories.set(slug, id);
  }

  getCategory(slug) {
    const id = this.categories.get(slug);
    if (!id) throw new Error(`Category not found for slug: ${slug}`);
    return id;
  }

  resolveCategoryPlaceholder(value) {
    if (!value || typeof value !== "string") return value;
    if (value === "REPLACE_CATEGORY_ID") {
      throw new Error("REPLACE_CATEGORY_ID must be resolved via module slug mapping");
    }
    if (value === "REPLACE_CATEGORY_GENERAL_APTITUDE_ID") {
      return this.getCategory("general-aptitude");
    }
    if (value === "REPLACE_CATEGORY_INTERVIEW_ID") {
      return this.getCategory("interview");
    }
    if (value.startsWith("REPLACE_CATEGORY_")) {
      const slug = value
        .replace(/^REPLACE_CATEGORY_/, "")
        .replace(/_ID$/, "")
        .toLowerCase()
        .replace(/_/g, "-");
      return this.getCategory(slug);
    }
    return value;
  }

  setModule(slug, id) {
    this.modules.set(slug, id);
  }

  getModule(slug) {
    const id = this.modules.get(slug);
    if (!id) throw new Error(`Module not found for slug: ${slug}`);
    return id;
  }

  setTopic(slug, id) {
    this.topics.set(slug, id);
  }

  getTopic(slug) {
    const id = this.topics.get(slug);
    if (!id) throw new Error(`Topic not found for slug: ${slug}`);
    return id;
  }

  setTheory(topicSlug, id) {
    this.theories.set(topicSlug, id);
  }

  setExercise(seedKey, topicSlug, fileStem, id) {
    if (seedKey) this.exercisesBySeedKey.set(seedKey, id);
    if (topicSlug && fileStem) {
      this.exercisesByPath.set(`${topicSlug}::${fileStem}`, id);
    }
  }

  getExerciseBySeedKey(seedKey) {
    const id = this.exercisesBySeedKey.get(seedKey);
    if (!id) throw new Error(`Exercise not found for _seedKey: ${seedKey}`);
    return id;
  }

  getExerciseByPath(topicSlug, fileStem) {
    const id = this.exercisesByPath.get(`${topicSlug}::${fileStem}`);
    if (!id) {
      throw new Error(`Exercise not found for path: ${topicSlug}/${fileStem}`);
    }
    return id;
  }

  /**
   * Resolve exercise for a questions file under questions/{topic}/{stem}.json
   */
  resolveExerciseForQuestionFile(topicSlug, fileStem) {
    const pathKey = `${topicSlug}::${fileStem}`;
    if (this.exercisesByPath.has(pathKey)) {
      return this.exercisesByPath.get(pathKey);
    }
    const seedKey = `exercise-${topicSlug}-${fileStem}`;
    if (this.exercisesBySeedKey.has(seedKey)) {
      return this.exercisesBySeedKey.get(seedKey);
    }
    throw new Error(
      `Cannot resolve exercise for questions/${topicSlug}/${fileStem}.json`
    );
  }

  questionKey(topicSlug, fileStem, index) {
    return `${topicSlug}_${fileStem}_${String(index).padStart(3, "0")}`;
  }

  setQuestion(topicSlug, fileStem, index, id) {
    this.questions.set(this.questionKey(topicSlug, fileStem, index), id);
  }

  getQuestion(topicSlug, fileStem, index) {
    const key = this.questionKey(topicSlug, fileStem, index);
    const id = this.questions.get(key);
    if (!id) throw new Error(`Question not found for key: ${key}`);
    return id;
  }

  resolveQuestionPlaceholder(value) {
    if (!value || typeof value !== "string") return value;
    const match = value.match(/^REPLACE_QUESTION_ID_(.+)_(\d{3})$/);
    if (!match) {
      throw new Error(`Unrecognized question placeholder: ${value}`);
    }
    const rest = match[1];
    const index = Number(match[2]);
    const id = this.questions.get(`${rest}_${match[2]}`);
    if (!id) {
      throw new Error(`Question not found for placeholder: ${value}`);
    }
    return id;
  }

  setHrCategory(slug, id) {
    this.hrCategories.set(slug, id);
  }

  getHrCategory(slug) {
    const id = this.hrCategories.get(slug);
    if (!id) throw new Error(`HRCategory not found for slug: ${slug}`);
    return id;
  }

  setTest(slug, id, seedKey) {
    this.tests.set(slug, id);
    if (seedKey) this.testsBySeedKey.set(seedKey, id);
  }

  getTestBySlug(slug) {
    const id = this.tests.get(slug);
    if (!id) throw new Error(`Test not found for slug: ${slug}`);
    return id;
  }

  resolveTestPlaceholder(value) {
    if (!value || typeof value !== "string") return value;
    if (value.startsWith("REPLACE_TEST_ID_")) {
      const slug = value.replace(/^REPLACE_TEST_ID_/, "");
      return this.getTestBySlug(slug);
    }
    if (value.startsWith("REPLACE_TEST_")) {
      const key = value.replace(/^REPLACE_TEST_/, "").replace(/_ID$/, "");
      const bySeed = this.testsBySeedKey.get(`test-${key}`) || this.tests.get(key);
      if (!bySeed) throw new Error(`Test not found for placeholder: ${value}`);
      return bySeed;
    }
    return value;
  }
}

export const idResolver = new IdResolver();
