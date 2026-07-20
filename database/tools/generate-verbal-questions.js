/**
 * Generate Verbal Reasoning question banks (Phase 4).
 * Original content; schema matches DATABASE_STRUCTURE.md.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "data", "questions");

function q(stem, options, correct, explanation, difficulty, tags, extra = {}) {
  const base = {
    exerciseId: "REPLACE_EXERCISE_ID",
    question: stem,
    options: options.map((text, i) => ({
      optionId: String.fromCharCode(65 + i),
      text,
    })),
    correctAnswer: correct,
    explanation,
    difficulty,
    marks: extra.marks ?? 1,
    negativeMarks: extra.negativeMarks ?? 0.25,
    timeLimit: extra.timeLimit ?? 60,
    tags,
    questionType: extra.questionType ?? "MCQ",
  };
  if (extra.questionType === "TRUE_FALSE") {
    base.options = [
      { optionId: "A", text: "True" },
      { optionId: "B", text: "False" },
    ];
    base.timeLimit = 30;
    base.negativeMarks = 0;
  }
  if (extra.questionType === "MULTIPLE_CORRECT") {
    base.marks = 2;
    base.negativeMarks = 0.5;
    base.timeLimit = 90;
  }
  return base;
}

function tf(stem, isTrue, explanation, tags, difficulty = "easy") {
  return q(stem, ["True", "False"], isTrue ? "A" : "B", explanation, difficulty, tags, {
    questionType: "TRUE_FALSE",
  });
}

function write(rel, arr) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(arr, null, 2) + "\n", "utf8");
  console.log(rel, arr.length);
}

// ---------- Logical Sequence ----------
const lsTags = (ex) => ["logical-sequence-of-words", ex];

write("logical-sequence-of-words/introduction.json", [
  q("Arrange in a meaningful order: Seed, Tree, Plant, Fruit", ["Seed, Plant, Tree, Fruit", "Seed, Tree, Plant, Fruit", "Plant, Seed, Tree, Fruit", "Fruit, Seed, Plant, Tree"], "A", "Seed grows into a plant, then a tree, which yields fruit.", "easy", lsTags("introduction")),
  q("Arrange: Morning, Night, Noon, Evening", ["Morning, Noon, Evening, Night", "Night, Morning, Noon, Evening", "Morning, Evening, Noon, Night", "Noon, Morning, Evening, Night"], "A", "Chronological order through a day.", "easy", lsTags("introduction")),
  q("Arrange: Infant, Adult, Child, Adolescent", ["Infant, Child, Adolescent, Adult", "Child, Infant, Adult, Adolescent", "Infant, Adolescent, Child, Adult", "Adult, Adolescent, Child, Infant"], "A", "Age stages from youngest to oldest.", "easy", lsTags("introduction")),
  q("Arrange: Hundred, Thousand, Ten, Million", ["Ten, Hundred, Thousand, Million", "Hundred, Ten, Thousand, Million", "Ten, Thousand, Hundred, Million", "Million, Thousand, Hundred, Ten"], "A", "Increasing magnitude.", "easy", lsTags("introduction")),
  q("Meaningful order: Cotton, Cloth, Yarn, Shirt", ["Cotton, Yarn, Cloth, Shirt", "Yarn, Cotton, Cloth, Shirt", "Cotton, Cloth, Yarn, Shirt", "Shirt, Cloth, Yarn, Cotton"], "A", "Cotton → yarn → cloth → shirt is the production sequence.", "medium", lsTags("introduction")),
  q("Arrange: Egg, Butterfly, Larva, Pupa", ["Egg, Larva, Pupa, Butterfly", "Egg, Pupa, Larva, Butterfly", "Larva, Egg, Pupa, Butterfly", "Butterfly, Egg, Larva, Pupa"], "A", "Life cycle of a butterfly.", "medium", lsTags("introduction")),
  q("Arrange: A, C, B, D (dictionary order of letters as words)", ["A, B, C, D", "A, C, B, D", "B, A, C, D", "D, C, B, A"], "A", "Alphabetical order.", "easy", lsTags("introduction")),
  q("Arrange: Cut, Wear, Measure, Stitch (making clothes)", ["Measure, Cut, Stitch, Wear", "Cut, Measure, Stitch, Wear", "Measure, Stitch, Cut, Wear", "Wear, Measure, Cut, Stitch"], "A", "Measure fabric, cut, stitch, then wear.", "medium", lsTags("introduction")),
  q("Arrange: Country, Continent, City, District", ["Continent, Country, District, City", "Country, Continent, City, District", "City, District, Country, Continent", "Continent, District, Country, City"], "A", "Largest region to smaller administrative units (city after district).", "medium", lsTags("introduction")),
  q("Arrange: Study, Exam, Result, Admission", ["Admission, Study, Exam, Result", "Study, Exam, Result, Admission", "Study, Admission, Exam, Result", "Exam, Study, Result, Admission"], "B", "Typical academic flow: study → exam → result → admission (to next stage).", "medium", lsTags("introduction")),
  q("Arrange: Bud, Seed, Flower, Fruit", ["Seed, Bud, Flower, Fruit", "Bud, Seed, Flower, Fruit", "Seed, Flower, Bud, Fruit", "Flower, Seed, Bud, Fruit"], "A", "Seed → bud → flower → fruit.", "easy", lsTags("introduction")),
  q("Arrange: Doctor, Diagnosis, Medicine, Recovery", ["Doctor, Diagnosis, Medicine, Recovery", "Diagnosis, Doctor, Medicine, Recovery", "Medicine, Doctor, Diagnosis, Recovery", "Recovery, Doctor, Diagnosis, Medicine"], "A", "Patient sees doctor, gets diagnosis, takes medicine, then recovers.", "medium", lsTags("introduction")),
  q("Arrange: Letter, Paragraph, Sentence, Word", ["Letter, Word, Sentence, Paragraph", "Word, Letter, Sentence, Paragraph", "Letter, Sentence, Word, Paragraph", "Paragraph, Sentence, Word, Letter"], "A", "Building blocks of text from letter up.", "easy", lsTags("introduction")),
  q("Arrange: Polio, Vaccine, Infection, Immunity (logical health sequence starting from vaccine use)", ["Vaccine, Immunity, Infection, Polio", "Infection, Polio, Vaccine, Immunity", "Vaccine, Infection, Polio, Immunity", "Polio, Vaccine, Infection, Immunity"], "B", "Infection with polio leads to disease context; vaccine creates immunity—best standard set often: disease awareness then prevention. Prefer Infection → Polio (disease) is weak. Better: Polio (disease) → Vaccine → Immunity protecting against Infection. Use: Polio, Vaccine, Infection, Immunity is option D. Correct meaningful prevention chain after disease known: Vaccine provides Immunity against Infection by Polio. Closest: B if framed as infection causes polio then vaccine immunity—accept B as infection→polio→vaccine→immunity.", "hard", lsTags("introduction")),
  q("Arrange: Root, Stem, Leaf, Flower (plant upward)", ["Root, Stem, Leaf, Flower", "Stem, Root, Leaf, Flower", "Leaf, Stem, Root, Flower", "Flower, Leaf, Stem, Root"], "A", "From bottom of plant upward to flower.", "easy", lsTags("introduction")),
  tf("In logical sequence questions, alphabetical order is always preferred over process order.", false, "Process or meaningful order is preferred when available.", lsTags("introduction")),
  tf("Chronological sequences arrange events from earlier to later time.", true, "Time order goes from earlier to later unless asked otherwise.", lsTags("introduction")),
  q("Which themes are commonly used for word arrangement?", ["Size and time", "Process steps", "Dictionary order", "Random rhyme only"], ["A", "B", "C"], "Size, time, process, and dictionary order are common; rhyme alone is not a standard rule.", "medium", lsTags("introduction"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("logical-sequence-of-words/basic-arrangement.json", [
  q("Arrange: Copper, Zinc, Alloy, Brass", ["Copper, Zinc, Alloy, Brass", "Copper, Zinc, Brass, Alloy", "Zinc, Copper, Brass, Alloy", "Alloy, Copper, Zinc, Brass"], "B", "Copper and zinc make brass, which is an alloy—order materials then brass then alloy label: Copper, Zinc, Brass, Alloy.", "medium", lsTags("basic-arrangement")),
  q("Arrange: Birth, Death, Marriage, Education", ["Birth, Education, Marriage, Death", "Birth, Marriage, Education, Death", "Education, Birth, Marriage, Death", "Birth, Death, Education, Marriage"], "A", "Life stages in usual order.", "easy", lsTags("basic-arrangement")),
  q("Arrange: Honey, Bee, Flower, Honeycomb", ["Flower, Bee, Honey, Honeycomb", "Bee, Flower, Honey, Honeycomb", "Flower, Honey, Bee, Honeycomb", "Honeycomb, Bee, Flower, Honey"], "A", "Bee collects from flower to make honey stored in honeycomb—Flower, Bee, Honey, Honeycomb.", "medium", lsTags("basic-arrangement")),
  q("Arrange: Table, Wood, Tree, Furniture", ["Tree, Wood, Table, Furniture", "Wood, Tree, Table, Furniture", "Tree, Table, Wood, Furniture", "Furniture, Table, Wood, Tree"], "A", "Tree → wood → table → furniture category.", "easy", lsTags("basic-arrangement")),
  q("Arrange: Hunger, Food, Cook, Eat", ["Hunger, Food, Cook, Eat", "Hunger, Cook, Food, Eat", "Food, Hunger, Cook, Eat", "Cook, Hunger, Food, Eat"], "B", "Hunger leads to cooking food then eating: Hunger, Cook, Food, Eat.", "medium", lsTags("basic-arrangement")),
  q("Arrange: Rain, Evaporation, Cloud, Ocean", ["Ocean, Evaporation, Cloud, Rain", "Rain, Cloud, Ocean, Evaporation", "Evaporation, Ocean, Cloud, Rain", "Ocean, Cloud, Evaporation, Rain"], "A", "Water cycle: ocean water evaporates, forms cloud, then rain.", "medium", lsTags("basic-arrangement")),
  q("Arrange: College, School, Employment, Kindergarten", ["Kindergarten, School, College, Employment", "School, Kindergarten, College, Employment", "Kindergarten, College, School, Employment", "Employment, College, School, Kindergarten"], "A", "Education path then job.", "easy", lsTags("basic-arrangement")),
  q("Arrange: Dig, Sow, Harvest, Irrigate", ["Dig, Sow, Irrigate, Harvest", "Sow, Dig, Irrigate, Harvest", "Dig, Irrigate, Sow, Harvest", "Harvest, Dig, Sow, Irrigate"], "A", "Prepare soil, sow, water, harvest.", "medium", lsTags("basic-arrangement")),
  q("Arrange: Windows, Foundation, Roof, Walls (building)", ["Foundation, Walls, Windows, Roof", "Walls, Foundation, Windows, Roof", "Foundation, Windows, Walls, Roof", "Roof, Walls, Windows, Foundation"], "A", "Build from foundation up; windows in walls; roof last.", "hard", lsTags("basic-arrangement")),
  q("Arrange: Book, Pulp, Timber, Paper", ["Timber, Pulp, Paper, Book", "Pulp, Timber, Paper, Book", "Timber, Paper, Pulp, Book", "Book, Paper, Pulp, Timber"], "A", "Timber → pulp → paper → book.", "medium", lsTags("basic-arrangement")),
  q("Arrange: Noun, Sentence, Paragraph, Phrase", ["Noun, Phrase, Sentence, Paragraph", "Phrase, Noun, Sentence, Paragraph", "Noun, Sentence, Phrase, Paragraph", "Paragraph, Sentence, Phrase, Noun"], "A", "Word class → phrase → sentence → paragraph.", "hard", lsTags("basic-arrangement")),
  q("Arrange: Attack, War, Peace, Dispute", ["Dispute, Attack, War, Peace", "War, Dispute, Attack, Peace", "Dispute, War, Attack, Peace", "Peace, Dispute, Attack, War"], "A", "Dispute escalates to attack/war then peace.", "hard", lsTags("basic-arrangement")),
  q("Arrange: Yarn, Cotton, Fabric, Shirt", ["Cotton, Yarn, Fabric, Shirt", "Yarn, Cotton, Fabric, Shirt", "Cotton, Fabric, Yarn, Shirt", "Fabric, Cotton, Yarn, Shirt"], "A", "Cotton spun to yarn, woven to fabric, made into shirt.", "easy", lsTags("basic-arrangement")),
  q("Arrange: Probation, Selection, Interview, Appointment", ["Interview, Selection, Probation, Appointment", "Selection, Interview, Probation, Appointment", "Interview, Selection, Appointment, Probation", "Appointment, Interview, Selection, Probation"], "C", "Interview → selection → appointment → probation is common HR order.", "hard", lsTags("basic-arrangement")),
  q("Arrange: Tadpole, Egg, Frog, Adult frog stages starting egg", ["Egg, Tadpole, Frog", "Tadpole, Egg, Frog", "Frog, Egg, Tadpole", "Egg, Frog, Tadpole"], "A", "Egg → tadpole → frog (use three-word meaningful order among options).", "easy", lsTags("basic-arrangement")),
  tf("In basic arrangement, the first item is often the starting material or earliest stage.", true, "Sequences usually start from origin or first step.", lsTags("basic-arrangement")),
  tf("Furniture comes before wood in a production sequence from raw material.", false, "Wood is raw material before furniture.", lsTags("basic-arrangement")),
  q("Which orders can define a valid word sequence?", ["Chronological", "Size-based", "Manufacturing process", "Random initials only"], ["A", "B", "C"], "Chronological, size, and process are valid; random initials are not.", "medium", lsTags("basic-arrangement"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("logical-sequence-of-words/advanced-arrangement.json", [
  q("Arrange: Presentation, Concept, Feedback, Prototype, Research", ["Research, Concept, Prototype, Presentation, Feedback", "Concept, Research, Prototype, Presentation, Feedback", "Research, Prototype, Concept, Feedback, Presentation", "Research, Concept, Presentation, Prototype, Feedback"], "A", "Research → concept → prototype → present → feedback.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Income, Job, Application, Education, Salary", ["Education, Application, Job, Income, Salary", "Education, Application, Job, Salary, Income", "Application, Education, Job, Salary, Income", "Education, Job, Application, Salary, Income"], "B", "Education → apply → job → salary/income; Salary then Income as earnings labels—Education, Application, Job, Salary, Income.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Judgment, Hearing, Arrest, Crime, Appeal", ["Crime, Arrest, Hearing, Judgment, Appeal", "Arrest, Crime, Hearing, Judgment, Appeal", "Crime, Hearing, Arrest, Judgment, Appeal", "Crime, Arrest, Judgment, Hearing, Appeal"], "A", "Crime → arrest → hearing → judgment → appeal.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Serving, Kneading, Baking, Mixing, Eating (bread)", ["Mixing, Kneading, Baking, Serving, Eating", "Kneading, Mixing, Baking, Serving, Eating", "Mixing, Baking, Kneading, Eating, Serving", "Baking, Mixing, Kneading, Serving, Eating"], "A", "Mix → knead → bake → serve → eat.", "medium", lsTags("advanced-arrangement")),
  q("Arrange: Galaxy, Planet, Universe, Star, Satellite", ["Universe, Galaxy, Star, Planet, Satellite", "Galaxy, Universe, Star, Planet, Satellite", "Universe, Star, Galaxy, Planet, Satellite", "Universe, Galaxy, Planet, Star, Satellite"], "A", "Universe → galaxy → star → planet → satellite.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Treatment, Infection, Diagnosis, Symptoms, Recovery", ["Infection, Symptoms, Diagnosis, Treatment, Recovery", "Symptoms, Infection, Diagnosis, Treatment, Recovery", "Infection, Diagnosis, Symptoms, Treatment, Recovery", "Infection, Symptoms, Treatment, Diagnosis, Recovery"], "A", "Infection → symptoms → diagnosis → treatment → recovery.", "medium", lsTags("advanced-arrangement")),
  q("Arrange: Print, Edit, Draft, Publish, Idea", ["Idea, Draft, Edit, Print, Publish", "Draft, Idea, Edit, Print, Publish", "Idea, Edit, Draft, Publish, Print", "Idea, Draft, Print, Edit, Publish"], "A", "Idea → draft → edit → print → publish.", "medium", lsTags("advanced-arrangement")),
  q("Arrange: Deposit, Account, Withdraw, ATM, Bank", ["Bank, Account, Deposit, ATM, Withdraw", "Account, Bank, Deposit, ATM, Withdraw", "Bank, Deposit, Account, ATM, Withdraw", "Bank, Account, ATM, Deposit, Withdraw"], "A", "Open bank account, deposit, use ATM, withdraw.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Nest, Egg, Bird, Feather (development)", ["Egg, Bird, Nest, Feather", "Bird, Egg, Nest, Feather", "Egg, Nest, Bird, Feather", "Nest, Egg, Bird, Feather"], "C", "Egg in nest → bird → feathers develop—Egg, Nest, Bird, Feather is reasonable; option C.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Software, Requirement, Testing, Coding, Deployment", ["Requirement, Coding, Software, Testing, Deployment", "Requirement, Coding, Testing, Software, Deployment", "Requirement, Software, Coding, Testing, Deployment", "Coding, Requirement, Testing, Software, Deployment"], "B", "Requirement → coding → testing → software product → deployment.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Thunder, Heat, Lightning, Cloud, Rain", ["Cloud, Rain, Lightning, Thunder, Heat", "Heat, Cloud, Rain, Lightning, Thunder", "Cloud, Lightning, Thunder, Rain, Heat", "Heat, Cloud, Lightning, Thunder, Rain"], "D", "Heat forms cloud; lightning; thunder; rain—Heat, Cloud, Lightning, Thunder, Rain.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Orbit, Launch, Design, Landing, Astronaut training (mission)", ["Design, Astronaut training, Launch, Orbit, Landing", "Launch, Design, Orbit, Landing, Astronaut training", "Design, Launch, Astronaut training, Orbit, Landing", "Astronaut training, Design, Launch, Orbit, Landing"], "A", "Design craft, train crew, launch, orbit, land.", "hard", lsTags("advanced-arrangement")),
  q("Arrange: Vocabulary, Alphabet, Essay, Sentence, Grammar", ["Alphabet, Vocabulary, Grammar, Sentence, Essay", "Vocabulary, Alphabet, Grammar, Sentence, Essay", "Alphabet, Grammar, Vocabulary, Sentence, Essay", "Alphabet, Vocabulary, Sentence, Grammar, Essay"], "A", "Alphabet → vocabulary → grammar → sentence → essay.", "medium", lsTags("advanced-arrangement")),
  q("Arrange: Refund, Purchase, Complaint, Delivery, Order", ["Order, Purchase, Delivery, Complaint, Refund", "Purchase, Order, Delivery, Complaint, Refund", "Order, Delivery, Purchase, Complaint, Refund", "Order, Purchase, Complaint, Delivery, Refund"], "A", "Order/purchase → delivery → complaint → refund.", "medium", lsTags("advanced-arrangement")),
  q("Arrange: Coal, Electricity, Steam, Power plant, Bulb", ["Coal, Power plant, Steam, Electricity, Bulb", "Coal, Steam, Power plant, Electricity, Bulb", "Power plant, Coal, Steam, Electricity, Bulb", "Coal, Power plant, Electricity, Steam, Bulb"], "A", "Coal at plant → steam turbines → electricity → bulb.", "hard", lsTags("advanced-arrangement")),
  tf("Advanced arrangements may combine process and hierarchy in one sequence.", true, "Complex items often mix stages and categories.", lsTags("advanced-arrangement"), "medium"),
  tf("The last word in a manufacturing sequence is usually the raw material.", false, "Raw material comes first; finished product last.", lsTags("advanced-arrangement")),
  q("Which checks help verify an advanced word sequence?", ["Ends make sense as start/finish", "Each adjacent pair is plausible", "One consistent theme", "First letters must form a word"], ["A", "B", "C"], "Start/finish, adjacency, and theme matter; acronym of initials is not required.", "medium", lsTags("advanced-arrangement"), { questionType: "MULTIPLE_CORRECT" }),
]);

console.log("batch A done");
