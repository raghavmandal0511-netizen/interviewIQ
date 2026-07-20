/**
 * Fill missing Verbal Reasoning question files only.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "data", "questions");

function q(stem, opts, ans, exp, diff, tags, extra = {}) {
  const o = {
    exerciseId: "REPLACE_EXERCISE_ID",
    question: stem,
    options: opts.map((t, i) => ({ optionId: String.fromCharCode(65 + i), text: t })),
    correctAnswer: ans,
    explanation: exp,
    difficulty: diff,
    marks: extra.marks ?? 1,
    negativeMarks: extra.negativeMarks ?? 0.25,
    timeLimit: extra.timeLimit ?? 60,
    tags,
    questionType: extra.questionType ?? "MCQ",
  };
  if (extra.questionType === "TRUE_FALSE") {
    o.options = [{ optionId: "A", text: "True" }, { optionId: "B", text: "False" }];
    o.timeLimit = 30;
    o.negativeMarks = 0;
  }
  if (extra.questionType === "MULTIPLE_CORRECT") {
    o.marks = 2;
    o.negativeMarks = 0.5;
    o.timeLimit = 90;
  }
  return o;
}
const tf = (s, v, e, tags, d = "easy") =>
  q(s, ["True", "False"], v ? "A" : "B", e, d, tags, { questionType: "TRUE_FALSE" });

function write(rel, arr) {
  if (arr.length !== 18) throw new Error(rel + " has " + arr.length);
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(arr, null, 2) + "\n");
  console.log("OK", rel, arr.length);
}

const br = (e) => ["blood-relation-test", e];
const sy = (e) => ["syllogism", e];
const ce = (e) => ["cause-and-effect", e];
const di = (e) => ["dice", e];

// ---- blood symbol ----
write("blood-relation-test/symbol-relations.json", [
  q("If A + B means A is the father of B, what does P + Q mean?", ["P is father of Q", "Q is father of P", "P is mother of Q", "P is brother of Q"], "A", "By definition A + B → A is father of B, so P is father of Q.", "easy", br("symbol-relations")),
  q("Codes: X × Y means X is sister of Y; X + Y means X is brother of Y. What is A to C in A × B + C?", ["Sister", "Brother", "Mother", "Father"], "A", "B + C → B brother of C (siblings). A × B → A sister of B → A sister of C.", "medium", br("symbol-relations")),
  q("P @ Q means P is wife of Q; P $ Q means P is father of Q. In A @ B $ C, A is C's:", ["Mother", "Father", "Aunt", "Sister"], "A", "B $ C → B father of C. A @ B → A wife of B → mother of C.", "medium", br("symbol-relations")),
  q("A © B means A is mother of B; A # B means A is father of B. A © B # C means A is C's:", ["Grandmother", "Mother", "Sister", "Aunt"], "A", "B # C → B father of C. A © B → A mother of B → grandmother of C.", "medium", br("symbol-relations")),
  q("A ÷ B means A is son of B. In P ÷ Q ÷ R, P is R's:", ["Grandson", "Son", "Father", "Uncle"], "A", "P son of Q and Q son of R → P grandson of R.", "medium", br("symbol-relations")),
  q("A * B means A is brother of B; A − B means A is sister of B. A * B − C: A is C's:", ["Brother", "Sister", "Father", "Mother"], "A", "B − C → siblings. A * B → A brother of B → brother of C.", "easy", br("symbol-relations")),
  q("M + N means M is husband of N; M × N means M is son of N. A + B × C: A is C's:", ["Son-in-law", "Son", "Brother", "Father"], "A", "B × C → B son of C. A + B → A husband of B → son-in-law of C.", "hard", br("symbol-relations")),
  q("X Δ Y means X is father of Y; X Ω Y means X is mother of Y. A Δ B Ω C: A is C's:", ["Maternal grandfather", "Father", "Uncle", "Brother"], "A", "B Ω C → B mother of C. A Δ B → A father of B → maternal grandfather of C.", "hard", br("symbol-relations")),
  q("P % Q means P is daughter of Q; P & Q means P is son of Q. A % B & C: A is C's:", ["Granddaughter", "Daughter", "Niece", "Mother"], "A", "B & C → B son of C. A % B → A daughter of B → granddaughter of C.", "medium", br("symbol-relations")),
  q("L @ M means L is sister of M; L ! M means L is brother of M. G ! H @ I: G is I's:", ["Brother", "Sister", "Father", "Mother"], "A", "H @ I → H sister of I. G ! H → G brother of H → brother of I.", "easy", br("symbol-relations")),
  q("A $ B = A is father of B; A # B = A is mother of B; A * B = A is brother of B. P $ Q * R # S. P is S's:", ["Maternal grandfather", "Father", "Uncle", "Brother"], "A", "R # S → R mother of S. Q * R → Q brother of R. P $ Q → P father of Q → maternal grandfather of S.", "hard", br("symbol-relations")),
  q("P × Q = P is son of Q; P + Q = P is daughter of Q. A × B + C: A is C's:", ["Grandson", "Son", "Daughter", "Niece"], "A", "B + C → B daughter of C. A × B → A son of B → grandson of C.", "medium", br("symbol-relations")),
  q("If A ⊕ B means A is father of B, which must be true?", ["A is male", "B is male", "A is female", "B is father of A"], "A", "A father is male.", "easy", br("symbol-relations")),
  q("First step in a coded blood-relation question is to:", ["Decode each symbol using the legend", "Assume everyone is male", "Ignore the codes", "Answer from real family"], "A", "Convert codes to English using the given meanings.", "easy", br("symbol-relations")),
  q("A ↑ B means A is parent of B; A ↓ B means A is child of B. If A ↑ B and C ↑ B, A and C are most likely:", ["The two parents of B", "Siblings of B", "Children of B", "Unrelated strangers only"], "A", "Both are parents of B (mother and father), unless A and C are the same person.", "medium", br("symbol-relations")),
  tf("In symbol problems, you must use only the meanings given in that question's legend.", true, "Each question defines its own code.", br("symbol-relations")),
  tf("If A + B means A is father of B, then B + A means B is father of A.", true, "The operator meaning stays; names swap roles.", br("symbol-relations")),
  q("Useful steps for symbol-based blood relations include:", ["Rewrite as English", "Draw a family tree", "Mark genders when known", "Ignore the legend"], ["A", "B", "C"], "Decode, draw, and mark genders; never ignore the legend.", "medium", br("symbol-relations"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("blood-relation-test/family-tree.json", [
  q("In a family of 3: A is father of B, B is father of C. How many generations are shown?", ["3", "2", "1", "4"], "A", "A → B → C are three generations.", "easy", br("family-tree")),
  q("K is mother of L and M. L is unmarried male. M is married female with son N. How is K related to N?", ["Grandmother", "Mother", "Aunt", "Sister"], "A", "N is child of M; M is child of K → K grandmother of N.", "medium", br("family-tree")),
  q("P and Q are brothers. R is mother of P. S is father of Q. How is S related to R?", ["Husband", "Brother", "Father", "Son"], "A", "S and R are parents of P and Q → spouses.", "easy", br("family-tree")),
  q("A has two children B and C. B has daughter D. C has son E. How is D related to E?", ["Cousin", "Sister", "Aunt", "Mother"], "A", "D and E are children of siblings → cousins.", "easy", br("family-tree")),
  q("F is sister of G. H is father of F. I is mother of G. J is son of I. How many children do H and I have at least?", ["3", "2", "1", "4"], "A", "F, G, and J are children of the couple (J son of I; H father of F; same parents).", "medium", br("family-tree")),
  q("Three generations: grandparents, parents, children. A boy's paternal grandfather is:", ["Father's father", "Mother's father", "Father's brother", "Mother's brother"], "A", "Paternal grandfather = father's father.", "easy", br("family-tree")),
  q("W is wife of X. X is brother of Y. Y is mother of Z. How is W related to Z?", ["Aunt", "Mother", "Sister", "Grandmother"], "A", "Y is mother of Z; X brother of Y; W wife of X → W is aunt of Z.", "medium", br("family-tree")),
  q("A couple has 2 sons and 1 daughter. Each son has 1 daughter. How many granddaughters does the couple have from sons only?", ["2", "1", "3", "0"], "A", "Each of 2 sons has 1 daughter → 2 granddaughters.", "easy", br("family-tree")),
  q("M is father of N. O is sister of N. P is brother of M. How is P related to O?", ["Uncle", "Father", "Brother", "Cousin"], "A", "P is brother of O's father → uncle.", "easy", br("family-tree")),
  q("In a tree, A (male) married B (female). They have son C and daughter D. D married E and has son F. How is F related to A?", ["Grandson", "Son", "Nephew", "Brother"], "A", "F is child of A's daughter → grandson.", "easy", br("family-tree")),
  q("R's father's sister's son is R's:", ["Cousin", "Brother", "Uncle", "Nephew"], "A", "Father's sister's son = paternal cousin.", "medium", br("family-tree")),
  q("Only two brothers A and B; A has daughter C; B has son D. C is D's:", ["Cousin", "Sister", "Aunt", "Mother"], "A", "Children of brothers are cousins.", "easy", br("family-tree")),
  q("G is grandmother of H. H's father is I. I's sister is J. How is J related to H?", ["Aunt", "Mother", "Sister", "Cousin"], "A", "J is sister of H's father → aunt.", "medium", br("family-tree")),
  q("A family has father, mother, 2 sons, 1 daughter. Minimum people if all are distinct:", ["5", "4", "6", "3"], "A", "Father + mother + 2 sons + 1 daughter = 5.", "easy", br("family-tree")),
  q("If A is brother of B, and C is daughter of B, then A is C's:", ["Uncle", "Father", "Brother", "Cousin"], "A", "Brother of parent → uncle.", "easy", br("family-tree")),
  tf("In a standard family tree sketch, children are drawn below their parents.", true, "Generations go downward from parents to children.", br("family-tree")),
  tf("Cousins are always in the same generation as each other.", true, "Cousins are children of siblings, same generation.", br("family-tree")),
  q("Which relations appear one generation above you?", ["Father", "Mother", "Uncle", "Cousin"], ["A", "B", "C"], "Father, mother, uncle are above; cousin is same generation.", "medium", br("family-tree"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("blood-relation-test/mixed.json", [
  q("A says of B: \"B's mother is the only daughter of my mother.\" A is B's:", ["Mother", "Father", "Uncle", "Brother"], "A", "Only daughter of A's mother is A (female). She is B's mother.", "hard", br("mixed")),
  q("Pointing to a lady, a man says, \"Her son's mother is my daughter's mother.\" The lady is the man's:", ["Wife", "Sister", "Mother", "Daughter"], "A", "My daughter's mother is my wife; she is the lady's son's mother → lady is his wife.", "hard", br("mixed")),
  q("A is B's brother. C is A's mother. D is C's father. E is B's son. How is D related to E?", ["Great-grandfather", "Grandfather", "Father", "Uncle"], "A", "D → C → A/B → E: D is great-grandfather of E.", "hard", br("mixed")),
  q("P is brother of Q. R is sister of Q. S is brother of T. T is daughter of Q. Who is uncle of T?", ["P", "R", "S", "Q"], "A", "T's parent is Q; P is brother of Q → uncle of T. S is brother of T (sibling).", "medium", br("mixed")),
  q("If A is sister of B, B is married to C, C is father of D, how is A related to D?", ["Aunt", "Mother", "Sister", "Niece"], "A", "A is sister of D's parent B → aunt.", "medium", br("mixed")),
  q("X's father's only sister's son is X's:", ["Cousin", "Brother", "Uncle", "Nephew"], "A", "Father's sister's son = cousin.", "easy", br("mixed")),
  q("A + B means A is father of B; A − B means A is sister of B; A × B means A is brother of B. What is P to R in P × Q − R?", ["Brother", "Sister", "Father", "Uncle"], "A", "Q − R → Q sister of R. P × Q → P brother of Q → brother of R.", "medium", br("mixed")),
  q("There are 6 people A–F. A is father of C but C is not son of A. B is mother of F and D. D is brother of C. How is C related to A?", ["Daughter", "Son", "Wife", "Sister"], "A", "A is father of C; C not son → C is daughter.", "medium", br("mixed")),
  q("M is son of N. O is brother of N. P is brother of O. How is P related to M?", ["Uncle", "Father", "Brother", "Cousin"], "A", "P brother of N; N parent of M → P uncle of M.", "easy", br("mixed")),
  q("A man has 3 daughters. Each daughter has 1 brother. How many sons does the man have?", ["1", "3", "2", "0"], "A", "All daughters share the same one brother.", "easy", br("mixed")),
  q("B is husband of A. C is daughter of A. D is brother of B. How is D related to C?", ["Uncle", "Father", "Brother", "Cousin"], "A", "D is brother of C's father B → uncle.", "easy", br("mixed")),
  q("Introducing a boy, a girl says: \"He is the son of my mother's only brother.\" The boy is the girl's:", ["Cousin", "Brother", "Uncle", "Nephew"], "A", "Mother's only brother is maternal uncle; his son is cousin.", "medium", br("mixed")),
  q("A is father of B and C. B is father of D. E is wife of A. How is E related to D?", ["Grandmother", "Mother", "Aunt", "Sister"], "A", "E wife of A → grandmother of D.", "easy", br("mixed")),
  q("P's mother is Q's sister. R is father of P. How is R related to Q?", ["Brother-in-law", "Brother", "Father", "Uncle"], "A", "R married Q's sister → brother-in-law of Q.", "medium", br("mixed")),
  q("Which puzzle type mixes coded symbols with plain English clues?", ["Mixed blood-relation problems", "Only pure syllogism", "Only dice nets", "Only word order"], "A", "Mixed sets combine codes and verbal clues.", "easy", br("mixed")),
  tf("\"Only son\" means the parent has no daughters.", false, "Only son means exactly one son; daughters may exist.", br("mixed")),
  tf("Drawing a tree helps when statements mention many people.", true, "Diagrams reduce confusion in multi-person puzzles.", br("mixed")),
  q("Strategies that help in mixed blood-relation sets:", ["Draw generations", "Mark M/F", "Decode symbols first", "Ignore \"only\" words"], ["A", "B", "C"], "Draw, mark gender, decode; do not ignore \"only\".", "medium", br("mixed"), { questionType: "MULTIPLE_CORRECT" }),
]);

console.log("blood done");
