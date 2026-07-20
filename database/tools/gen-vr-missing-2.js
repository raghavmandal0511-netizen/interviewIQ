/**
 * Missing VR questions batch 2 — syllogism, cause advanced, dice
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
  if (arr.length !== 18) throw new Error(rel + " count=" + arr.length);
  fs.mkdirSync(path.dirname(path.join(ROOT, rel)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(arr, null, 2) + "\n");
  console.log("OK", rel, arr.length);
}

const sy = (e) => ["syllogism", e];
const ce = (e) => ["cause-and-effect", e];
const di = (e) => ["dice", e];

write("syllogism/introduction.json", [
  q("\"All A are B\" means:", ["Every A is B", "Every B is A", "No A is B", "Some A are not B"], "A", "Universal affirmative: all members of A are in B.", "easy", sy("introduction")),
  q("\"Some A are B\" means:", ["At least one A is B", "All A are B", "No A is B", "All B are A"], "A", "Particular affirmative requires only one overlapping case.", "easy", sy("introduction")),
  q("\"No A are B\" also means:", ["No B are A", "All A are B", "Some A are B", "All B are A"], "A", "Universal negatives convert simply.", "easy", sy("introduction")),
  q("In syllogism tests, statements should be treated as:", ["True for the question", "False always", "Real-world only", "Optional"], "A", "Accept given statements even if unrealistic.", "easy", sy("introduction")),
  q("Best quick tool for syllogisms:", ["Venn diagram circles", "Long essays", "Random guessing only", "Ignoring \"some\""], "A", "Circles show inclusion and overlap.", "easy", sy("introduction")),
  q("From All dogs are animals, does \"All animals are dogs\" follow?", ["No", "Yes", "Always in biology", "Yes if some dogs exist"], "A", "Converse of All is not definite.", "easy", sy("introduction")),
  q("All A are B and All B are C implies:", ["All A are C", "All C are A", "No A are C", "Some C are not A as definite"], "A", "A ⊆ B ⊆ C ⇒ A ⊆ C.", "medium", sy("introduction")),
  q("A conclusion that might be true but need not be:", ["Does not follow", "Follows", "Is called universal", "Is always selected"], "A", "Only necessary conclusions follow.", "medium", sy("introduction")),
  q("\"Some A are not B\" is called a:", ["Particular negative", "Universal affirmative", "Universal negative", "Definition"], "A", "O-type categorical proposition.", "easy", sy("introduction")),
  q("Which word pair shows opposite force?", ["All and No", "Some and Some", "All and All", "Is and Are"], "A", "All vs No are contrary universal forms.", "medium", sy("introduction")),
  q("If only possibility exists for a conclusion, mark it as:", ["Does not follow", "Follows", "Both follow always", "Either follows always"], "A", "Possibility ≠ certainty in standard keys.", "medium", sy("introduction")),
  q("Common option style for two conclusions is:", ["Only I follows", "I is a statement", "Draw nothing", "Skip reading II"], "A", "Options name which conclusions follow.", "easy", sy("introduction")),
  q("All books are papers. Some papers are files. Conclusion: All books are files.", ["Does not follow", "Follows", "Follows if papers exist", "Follows always in libraries"], "A", "Books are in papers; files overlap some papers not necessarily books.", "medium", sy("introduction")),
  q("No pen is pencil. Conclusion: No pencil is pen.", ["Follows", "Does not follow", "Follows only sometimes", "Cannot say"], "A", "No converts to No.", "easy", sy("introduction")),
  q("Purpose of syllogism practice is mainly to test:", ["Deductive validity", "Spelling only", "Handwriting", "Geography facts"], "A", "It tests what must follow from premises.", "easy", sy("introduction")),
  tf("You may use real-world knowledge to overturn given statements in syllogism.", false, "Statements are assumed true for the question.", sy("introduction")),
  tf("Venn sketches help check whether a conclusion is forced.", true, "Diagrams reveal necessary vs possible regions.", sy("introduction")),
  q("Which are valid categorical forms used in syllogism?", ["All A are B", "Some A are B", "No A are B", "Maybe A likes B"], ["A", "B", "C"], "All/Some/No (and some-not) are categorical; \"likes\" is not the standard form here.", "medium", sy("introduction"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("syllogism/basic.json", [
  q("Statements: All roses are flowers. All flowers are plants. Conclusion: All roses are plants.", ["Follows", "Does not follow", "Follows only if some roses exist", "Data inadequate"], "A", "Roses ⊆ flowers ⊆ plants.", "easy", sy("basic")),
  q("Statements: Some doctors are teachers. All teachers are engineers. Conclusion: All doctors are engineers.", ["Does not follow", "Follows", "Follows definitely", "Follows from reality"], "A", "Only some doctors are teachers.", "easy", sy("basic")),
  q("Statements: All pens are pencils. Some pencils are erasers. Conclusion: Some pens are erasers.", ["Does not follow", "Follows", "Follows always", "Follows if erasers exist"], "A", "Pen region may miss the eraser overlap.", "medium", sy("basic")),
  q("Statements: No car is a bike. All bikes are vehicles. Conclusion: No car is a vehicle.", ["Does not follow", "Follows", "Follows by conversion", "Follows from All"], "A", "Cars avoid bikes but may still be vehicles.", "medium", sy("basic")),
  q("Statements: All mangoes are fruits. Some fruits are sweet. Conclusion: Some mangoes are sweet.", ["Does not follow", "Follows", "Follows necessarily", "Follows by All"], "A", "Sweet fruits need not include mangoes.", "medium", sy("basic")),
  q("Statements: All A are B. All A are C. Conclusion: Some B are C.", ["Follows (if A exists)", "Never follows", "Means All B are C", "Means No B are C"], "A", "In exam logic with existential import for All, some B are C via A; many keys mark follows.", "hard", sy("basic")),
  q("Statements: Some A are B. Some B are C. Conclusion: Some A are C.", ["Does not follow", "Follows", "Follows always", "Follows by chain"], "A", "Two particulars do not force A–C overlap.", "medium", sy("basic")),
  q("Statements: All cups are plates. No plate is spoon. Conclusion: No cup is spoon.", ["Follows", "Does not follow", "Follows only sometimes", "Cannot say"], "A", "Cups ⊆ plates, plates disjoint spoons ⇒ cups disjoint spoons.", "easy", sy("basic")),
  q("Statements: All students are learners. Some learners are athletes. Conclusion: Some students are athletes.", ["Does not follow", "Follows", "Follows definitely", "Follows from All"], "A", "Athletes may be non-student learners.", "easy", sy("basic")),
  q("Statements: No bird is insect. All sparrows are birds. Conclusion: No sparrow is insect.", ["Follows", "Does not follow", "Follows only if insects exist", "Data inadequate"], "A", "Sparrows ⊆ birds, birds ∩ insects = ∅.", "easy", sy("basic")),
  q("Statements: All keys are locks. All locks are metals. Conclusion: All keys are metals.", ["Follows", "Does not follow", "Follows only converse", "Does not chain"], "A", "Keys ⊆ locks ⊆ metals.", "easy", sy("basic")),
  q("Statements: Some books are novels. All novels are stories. Conclusion: Some books are stories.", ["Follows", "Does not follow", "Follows only All books", "Never"], "A", "Those books that are novels are stories.", "medium", sy("basic")),
  q("Statements: All wars are destructive. Some destructive things are natural. Conclusion: Some wars are natural.", ["Does not follow", "Follows", "Follows by Some", "Follows always"], "A", "Natural destructive things need not be wars.", "medium", sy("basic")),
  q("Statements: All phones are devices. All devices are gadgets. Conclusion: Some gadgets are phones.", ["Follows", "Does not follow", "Never", "Only if no phones"], "A", "Phones ⊆ gadgets ⇒ some gadgets are phones (existential).", "medium", sy("basic")),
  q("Basic syllogism usually uses how many statement lines?", ["Two (commonly)", "Ten always", "Zero", "Only conclusions"], "A", "Classic items give two premises.", "easy", sy("basic")),
  tf("From All A are B you can definitely conclude All B are A.", false, "Converse is not definite.", sy("basic")),
  tf("No A are B allows the conclusion No B are A.", true, "E-type converts simply.", sy("basic")),
  q("Which conclusions can follow from All A are B and All B are C?", ["All A are C", "Some A are C", "Some C are A", "No A are C"], ["A", "B", "C"], "Chain gives All A are C and thus some relations; No A are C contradicts.", "hard", sy("basic"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("syllogism/advanced.json", [
  q("Statements: All clocks are watches. Some clocks are towers. All towers are buildings. Conclusion: Some watches are buildings.", ["Follows", "Does not follow", "Follows only All towers", "Data inadequate"], "A", "Some clocks(=watches) are towers ⊆ buildings.", "hard", sy("advanced")),
  q("Statements: Some pens are books. Some books are papers. Some papers are files. Conclusion: Some pens are files.", ["Does not follow", "Follows", "Follows by three Somes", "Follows always"], "A", "Chain of Somes is not transitive.", "hard", sy("advanced")),
  q("Statements: All trucks are vehicles. No vehicle is toy. Some toys are plastic. Conclusion: No truck is toy.", ["Follows", "Does not follow", "Follows only Some", "Cannot say"], "A", "Trucks ⊆ vehicles, vehicles ∩ toys = ∅.", "medium", sy("advanced")),
  q("Statements: All poets are writers. Some singers are poets. Conclusion: Some singers are writers.", ["Follows", "Does not follow", "Never", "Only All singers"], "A", "Those singers who are poets are writers.", "medium", sy("advanced")),
  q("Statements: No laptop is desktop. All desktops are computers. Some computers are servers. Conclusion: No laptop is computer.", ["Does not follow", "Follows", "Follows from No", "Follows always"], "A", "Laptops avoid desktops but may be computers.", "hard", sy("advanced")),
  q("Statements: All squares are rectangles. All rectangles are polygons. Some polygons are circles. Conclusion: Some squares are circles.", ["Does not follow", "Follows", "Follows by All", "Follows necessarily"], "A", "Circles among polygons need not include squares.", "medium", sy("advanced")),
  q("Statements: Some A are B. All B are C. No C are D. Conclusion: Some A are not D.", ["Follows", "Does not follow", "Follows only No A", "Cannot say"], "A", "Some A in B ⊆ C, and C ∩ D = ∅ ⇒ those A not D.", "hard", sy("advanced")),
  q("Statements: All managers are employees. Some employees are consultants. No consultant is intern. Conclusion: Some managers are interns.", ["Does not follow", "Follows", "Follows definitely", "Follows from All"], "A", "No forced manager–intern overlap.", "medium", sy("advanced")),
  q("Statements: All keys are metals. No metal is wood. All woods are trees. Conclusion: No key is tree.", ["Does not follow", "Follows", "Follows from No metal wood", "Follows always"], "A", "Keys not wood, but trees include woods only as subset—keys could still be non-wood trees? Actually keys ⊆ metals, metals ∩ wood=∅, woods ⊆ trees. Keys could be trees if some trees are not wood—possible. So does not follow.", "hard", sy("advanced")),
  q("Statements: Some questions are easy. All easy things are solvable. Some solvable things are lengthy. Conclusion: Some questions are lengthy.", ["Does not follow", "Follows", "Follows always", "Follows by All easy"], "A", "Lengthy solvable things need not be the easy questions.", "hard", sy("advanced")),
  q("Statements: All heroes are brave. Some brave people are quiet. All quiet people are thoughtful. Conclusion: Some heroes are thoughtful.", ["Does not follow", "Follows", "Follows necessarily", "Follows from All heroes"], "A", "Brave quiet people may exclude heroes.", "hard", sy("advanced")),
  q("Statements: No fish is mammal. All whales are mammals. Conclusion: No whale is fish.", ["Follows", "Does not follow", "Follows only Some", "Cannot say"], "A", "Whales ⊆ mammals, mammals ∩ fish = ∅.", "easy", sy("advanced")),
  q("Statements: All exams are tests. Some tests are oral. No oral is written. Conclusion: Some exams are not written.", ["Does not follow", "Follows", "Follows definitely", "Follows from No oral"], "A", "Exams that are oral would not be written, but exams need not be oral.", "hard", sy("advanced")),
  q("Advanced syllogism often adds:", ["More overlapping \"some\" statements", "No premises", "Only one word", "Dice faces"], "A", "Extra particulars increase possibility traps.", "easy", sy("advanced")),
  q("When three sets A,B,C are chained by All, the strongest conclusion is usually:", ["All A are C", "No A are C", "Some C are not A as forced", "All C are A"], "A", "Universal chain yields All A are C.", "medium", sy("advanced")),
  tf("Three \"Some\" statements in a row guarantee a conclusion linking the first and last sets.", false, "Particulars are not transitive.", sy("advanced")),
  tf("Combining All and No can yield a definite No between first and third sets.", true, "e.g., All A are B and No B are C ⇒ No A are C.", sy("advanced")),
  q("Which make syllogisms harder?", ["Possibility vs certainty", "Longer chains", "Multiple \"some\"", "Shorter alphabet only"], ["A", "B", "C"], "Possibility traps, chains, and particulars add difficulty.", "medium", sy("advanced"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("cause-and-effect/advanced.json", [
  q("I: Unemployment in the city rose last year.\nII: Several large factories in the city shut down last year.\nRelationship?", ["II is the cause and I is the effect", "I is the cause and II is the effect", "Both independent", "II is effect of I only always"], "A", "Factory shutdowns can cause unemployment to rise.", "medium", ce("advanced")),
  q("I: The government reduced import duties on electronics.\nII: Prices of some imported gadgets fell in the market.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Common cause only"], "A", "Lower duties can reduce retail prices.", "medium", ce("advanced")),
  q("I: A viral video made the restaurant famous overnight.\nII: The restaurant's waiting list became very long.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "II causes fame"], "A", "Fame from the video can increase demand/queues.", "easy", ce("advanced")),
  q("I: Farmers in the region switched to organic crops.\nII: Chemical fertilizer sales in the region declined.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Fertilizer causes organic switch only"], "A", "Less chemical farming reduces fertilizer demand.", "medium", ce("advanced")),
  q("I: The central bank raised interest rates.\nII: Home-loan EMIs increased for many borrowers.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "EMI causes rate hike"], "A", "Higher policy rates often raise loan EMIs.", "easy", ce("advanced")),
  q("I: Heavy snowfall blocked mountain passes.\nII: Tourist arrivals in the valley dropped sharply.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Tourism causes snowfall"], "A", "Blocked access reduces tourist inflow.", "easy", ce("advanced")),
  q("I: Company X announced a major product recall.\nII: Company X's share price fell the same day.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Price fall causes recall"], "A", "Bad news like recalls often triggers sell-offs.", "medium", ce("advanced")),
  q("I: Online attendance tools were adopted by many schools.\nII: Several ed-tech firms reported higher subscriptions.\nAlso both could follow COVID-era remote learning.\nBest fit among options?", ["Both effects of a common cause", "I cause II only always", "II cause I only always", "Completely unrelated forever"], "A", "Remote-learning shift can drive both tool adoption and ed-tech growth.", "hard", ce("advanced")),
  q("I: The city banned single-use plastic bags.\nII: Sales of cloth bags increased in local stores.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Cloth bags cause plastic ban"], "A", "Ban pushes consumers toward cloth bags.", "easy", ce("advanced")),
  q("I: A new metro line opened in the suburb.\nII: Average commute time for many residents fell.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Shorter commute causes metro"], "A", "New transit can shorten travel times.", "easy", ce("advanced")),
  q("I: Sudden rumors of a fuel shortage spread online.\nII: Long queues formed at petrol pumps.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Queues cause rumors only"], "A", "Panic from rumors can create queues.", "medium", ce("advanced")),
  q("I: Researchers published a breakthrough battery paper.\nII: A local bakery offered a weekend discount.\nRelationship?", ["Independent / unrelated", "I cause II", "II cause I", "Common scientific cause"], "A", "No plausible causal link.", "easy", ce("advanced")),
  q("I: Monsoon rainfall was far below normal.\nII: Reservoir water levels dropped in the state.\nAlso crop stress rose.\nFor I and II:", ["I cause, II effect", "II cause, I effect", "Independent", "Reservoirs cause weak monsoon"], "A", "Weak monsoon reduces reservoir inflow.", "medium", ce("advanced")),
  q("I: The airline canceled 40 flights due to crew shortage.\nII: Many passengers were stranded at the airport.\nRelationship?", ["I cause, II effect", "II cause, I effect", "Independent", "Stranding causes cancel"], "A", "Cancellations leave passengers stranded.", "easy", ce("advanced")),
  q("Advanced cause-effect items often involve:", ["Policy and market effects", "Only alphabet series", "Only dice opposites", "Only blood codes"], "A", "News-style policy/market links are common.", "easy", ce("advanced")),
  tf("If two statements share one underlying event, \"common cause\" can be the best choice.", true, "Both may be effects of the same driver.", ce("advanced")),
  tf("A price fall can never be an effect of bad corporate news.", false, "Bad news often causes price falls.", ce("advanced")),
  q("Valid advanced relationships include:", ["Direct cause→effect", "Reverse cause→effect", "Common cause", "Rhyming words only"], ["A", "B", "C"], "Causal directions and common cause matter; rhyme does not.", "medium", ce("advanced"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("dice/basics.json", [
  q("A standard die has how many faces?", ["6", "4", "8", "12"], "A", "A cube has six faces.", "easy", di("basics")),
  q("On a standard numbered die, faces are numbered:", ["1 to 6", "0 to 5", "1 to 8", "2 to 7"], "A", "Standard dice show 1 through 6.", "easy", di("basics")),
  q("How many faces are adjacent to a given face on a die?", ["4", "1", "5", "6"], "A", "Four sides touch; one is opposite.", "easy", di("basics")),
  q("How many faces are opposite a given face?", ["1", "2", "3", "4"], "A", "Exactly one opposite face.", "easy", di("basics")),
  q("Three faces meeting at a corner are:", ["All adjacent to each other", "All opposite each other", "Summing to 7 always", "Invisible always"], "A", "Corner faces are pairwise adjacent.", "medium", di("basics")),
  q("If face 3 is on top, the bottom face is opposite 3. On a standard die bottom is:", ["4", "3", "1", "6"], "A", "Standard opposites: 3 opposite 4.", "easy", di("basics")),
  q("A die is a:", ["Cube", "Sphere", "Cylinder", "Cone"], "A", "Ordinary dice are cubes.", "easy", di("basics")),
  q("Which cannot be true for one position of a physical die?", ["1 and 6 both on the front face together", "1 on top", "2 on front", "3 on right"], "A", "One face shows one number.", "easy", di("basics")),
  q("When two faces are shown adjacent in a view, they:", ["Cannot be opposite", "Must be opposite", "Must sum to 7 always even if nonstandard", "Must both be top"], "A", "Adjacent ⇒ not opposite.", "medium", di("basics")),
  q("Unfolded pattern of a die is called a:", ["Net", "Knot", "Chord", "Arc"], "A", "Cube nets show face layout.", "easy", di("basics")),
  q("On a standard die, 1 is opposite:", ["6", "2", "3", "4"], "A", "1+6=7.", "easy", di("basics")),
  q("On a standard die, 2 is opposite:", ["5", "3", "4", "6"], "A", "2+5=7.", "easy", di("basics")),
  q("If a problem does not say the die is standard, sum-7 rule:", ["Should not be assumed blindly", "Always applies worldwide", "Always false", "Applies only to coins"], "A", "Use sum-7 only when standard numbering is implied.", "medium", di("basics")),
  q("Maximum faces you can see at once on a opaque die from one corner view is typically:", ["3", "6", "5", "1"], "A", "Three faces meet at a corner.", "medium", di("basics")),
  q("Dice reasoning mainly tests:", ["Spatial face relations", "Spelling of numbers", "Blood relations", "Syllogism conversion"], "A", "It is about faces and orientations.", "easy", di("basics")),
  tf("A cube has six faces and twelve edges.", true, "Standard cube geometry.", di("basics")),
  tf("Opposite faces on a die can also be adjacent.", false, "Opposite faces never share an edge.", di("basics")),
  q("Basic die facts include:", ["6 faces", "1 opposite per face", "4 adjacent per face", "8 numbers on one face"], ["A", "B", "C"], "Six faces, one opposite, four adjacent; not eight numbers on one face.", "medium", di("basics"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("dice/opposite-faces.json", [
  q("On a standard die, opposite of 1 is:", ["6", "5", "4", "3"], "A", "1+6=7.", "easy", di("opposite-faces")),
  q("On a standard die, opposite of 2 is:", ["5", "6", "4", "3"], "A", "2+5=7.", "easy", di("opposite-faces")),
  q("On a standard die, opposite of 3 is:", ["4", "5", "6", "1"], "A", "3+4=7.", "easy", di("opposite-faces")),
  q("Sum of numbers on opposite faces of a standard die is:", ["7", "6", "8", "9"], "A", "Pairs (1,6),(2,5),(3,4).", "easy", di("opposite-faces")),
  q("If 5 is on top of a standard die, bottom is:", ["2", "1", "3", "4"], "A", "5 opposite 2.", "easy", di("opposite-faces")),
  q("Faces 2, 3, 4 meet at a corner. Opposite of 2 cannot be:", ["3", "5", "1", "6"], "A", "3 is adjacent to 2 at the corner, so not opposite. (On standard die opposite of 2 is 5.)", "medium", di("opposite-faces")),
  q("A die shows 1 adjacent to 2, 3, 4, and 5 in different views. Opposite of 1 is:", ["6", "2", "3", "4"], "A", "Only 6 never appears adjacent among 1–6.", "medium", di("opposite-faces")),
  q("Which pair are opposite on a standard die?", ["2 and 5", "2 and 3", "1 and 2", "3 and 5"], "A", "2↔5.", "easy", di("opposite-faces")),
  q("If two faces sum to 7 on a standard die, they are:", ["Opposite", "Adjacent always", "The same face", "Both top"], "A", "Opposite pairs sum to 7.", "easy", di("opposite-faces")),
  q("Can 1 and 6 appear as adjacent faces on a standard die?", ["No", "Yes always", "Yes and also opposite", "Only if painted wrong"], "A", "They are opposite, so not adjacent.", "medium", di("opposite-faces")),
  q("Top is 6, front is 2 on a standard die. Bottom is:", ["1", "5", "3", "4"], "A", "Opposite of 6 is 1.", "easy", di("opposite-faces")),
  q("A face X has adjacent faces A,B,C,D. The remaining face is:", ["Opposite X", "Also adjacent to X", "Equal to X", "Always 7"], "A", "Six faces: X + 4 adjacent + 1 opposite.", "medium", di("opposite-faces")),
  q("Which is NOT an opposite pair on a standard die?", ["1 and 5", "1 and 6", "2 and 5", "3 and 4"], "A", "1 opposite 6, not 5.", "easy", di("opposite-faces")),
  q("If 4 is opposite 3, the die numbering is consistent with:", ["Standard sum-7 rule", "Sum-5 rule", "Sum-9 rule", "No opposites"], "A", "3+4=7 matches standard.", "easy", di("opposite-faces")),
  q("Opposite faces never:", ["Share an edge", "Exist", "Sum to 7 on standard dice", "Are unique pairs"], "A", "They do not share an edge.", "easy", di("opposite-faces")),
  tf("On every puzzle die, opposites must sum to 7.", false, "Only when standard numbering is assumed.", di("opposite-faces")),
  tf("If A is adjacent to B, A is not opposite B.", true, "Adjacent and opposite are mutually exclusive.", di("opposite-faces")),
  q("Ways to find an opposite face include:", ["Sum-7 on standard die", "Eliminate adjacent faces", "Use corner adjacency", "Assume all faces opposite each other"], ["A", "B", "C"], "Sum-7, elimination, and corner rules help; not all faces are opposite.", "medium", di("opposite-faces"), { questionType: "MULTIPLE_CORRECT" }),
]);

write("dice/multiple-dice.json", [
  q("Two standard dice are placed with 6 on top of each. Bottoms are:", ["1 and 1", "6 and 6", "2 and 5", "3 and 4"], "A", "Each has 1 opposite 6.", "easy", di("multiple-dice")),
  q("Die A shows front 2; die B shows front 5. On standard dice, these fronts are:", ["Opposite numbers on a single die's pairing", "Always adjacent on one die", "The same face", "Invalid numbers"], "A", "2 and 5 are an opposite pair (on one die), here shown on two dice fronts.", "medium", di("multiple-dice")),
  q("Three positions of the same die show different faces on top: 1, then 2, then 3. Which could be opposite 1?", ["6 on a standard die", "2", "3", "1"], "A", "Top faces shown are not opposite each other necessarily; standard opposite of 1 is 6.", "medium", di("multiple-dice")),
  q("Two dice show the same number on top. Their bottom faces on standard dice:", ["Are equal", "Always differ", "Sum to 12 always with tops", "Are blank"], "A", "Same top ⇒ same opposite bottom.", "easy", di("multiple-dice")),
  q("In a figure, four dice are shown. Common approach is to:", ["Compare adjacent faces across views of the same die", "Add all visible numbers always", "Ignore repeated faces", "Assume sum 12"], "A", "Track one die's faces across orientations.", "medium", di("multiple-dice")),
  q("If die-1 has 3 adjacent to 1,2,4,5 then opposite 3 is 6. Die-2 identical standard. Opposite of 3 on die-2 is:", ["6", "1", "2", "4"], "A", "Identical standard dice share opposite pairs.", "easy", di("multiple-dice")),
  q("Two dice are stacked. Top die shows 5 on its top. Bottom face of top die touches top face of lower die. Touching face of top die is:", ["2 on standard", "5", "6", "1"], "A", "Bottom of top die is opposite its top 5 → 2.", "hard", di("multiple-dice")),
  q("A question shows two views of a die: View1 top=1 front=2; View2 top=3 front=2. With front fixed as 2, tops 1 and 3 suggest:", ["1 and 3 are adjacent to 2 (not opposite 2)", "1 opposite 2", "3 opposite 2", "1 opposite 3 always from this alone"], "A", "Both 1 and 3 appear adjacent to front 2.", "hard", di("multiple-dice")),
  q("When comparing multiple dice figures, faces that appear together adjacent:", ["Cannot be opposite on that die", "Must be opposite", "Must sum 7 even if nonstandard", "Are invalid"], "A", "Same adjacency rule applies.", "medium", di("multiple-dice")),
  q("Four standard dice all show 6 on top. How many faces showing 1 are on the bottoms total?", ["4", "1", "6", "0"], "A", "Each bottom is 1 → four ones.", "easy", di("multiple-dice")),
  q("A puzzle with several dice often asks for:", ["A hidden/opposite face", "Blood uncle", "Syllogism conclusion", "Word order"], "A", "Typical ask is which face is opposite or hidden.", "easy", di("multiple-dice")),
  q("If two different dice show 4 on top and 5 on front each, on standard dice their bottoms are:", ["Both 3", "Both 4", "Both 5", "Both 6"], "A", "Top 4 ⇒ bottom 3 each.", "medium", di("multiple-dice")),
  q("Rotating one die while keeping another fixed is used to:", ["Track where a face moves", "Change blood relations", "Create syllogisms", "Arrange words"], "A", "Rotation tracking finds new top/front.", "medium", di("multiple-dice")),
  q("Visible faces on two dice in one picture can total at most about:", ["Up to 6 if both show 3 faces", "12 always", "2 always", "36 always"], "A", "Each die can show up to 3 faces in a corner view.", "medium", di("multiple-dice")),
  q("Identical dice share:", ["The same opposite-face pairing if standard", "Random opposites each time", "No faces", "Only even numbers"], "A", "Standard identical dice match pairs.", "easy", di("multiple-dice")),
  tf("Multiple-dice questions may show several views of the same physical die.", true, "Different orientations of one die are common.", di("multiple-dice")),
  tf("If two standard dice show different tops, their bottoms must be equal.", false, "Bottoms equal only if tops are equal.", di("multiple-dice")),
  q("Helpful tactics for multiple-dice problems:", ["Fix one face and rotate", "List adjacent faces", "Apply sum-7 if standard", "Treat all visible faces as opposite"], ["A", "B", "C"], "Rotation, adjacency lists, and sum-7 help; visibles are not all opposite.", "medium", di("multiple-dice"), { questionType: "MULTIPLE_CORRECT" }),
]);

console.log("all batch2 written");
