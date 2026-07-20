export const isAnswerCorrect = (question, selectedOption) => {
    if (
        selectedOption === undefined ||
        selectedOption === null ||
        selectedOption === "" ||
        (Array.isArray(selectedOption) && selectedOption.length === 0)
    ) {
        return false;
    }

    if (question.questionType === "MULTIPLE_CORRECT") {
        if (!Array.isArray(selectedOption)) {
            return false;
        }

        const correct = [...question.correctAnswer].map(String).sort();
        const selected = [...selectedOption].map(String).sort();

        return (
            correct.length === selected.length &&
            correct.every((value, index) => value === selected[index])
        );
    }

    return String(selectedOption) === String(question.correctAnswer);
};

export const hasAnswer = (selectedOption) => {
    if (selectedOption === undefined || selectedOption === null || selectedOption === "") {
        return false;
    }

    if (Array.isArray(selectedOption)) {
        return selectedOption.length > 0;
    }

    return true;
};

export const calculateAttemptResults = (testQuestions, questionsMap, userAnswersMap) => {
    let score = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let unanswered = 0;
    let totalTimeTaken = 0;
    let totalPossibleMarks = 0;

    const answerResults = testQuestions.map((testQuestion) => {
        const question = questionsMap.get(String(testQuestion.questionId));
        const userAnswer = userAnswersMap.get(String(testQuestion.questionId));
        const marks = testQuestion.marks ?? question?.marks ?? 0;
        const negativeMarks = question?.negativeMarks ?? 0;
        const selectedOption = userAnswer?.selectedOption;
        const timeTaken = userAnswer?.timeTaken ?? 0;

        totalPossibleMarks += marks;
        totalTimeTaken += timeTaken;

        let isCorrect = false;
        let earnedMarks = 0;

        if (!hasAnswer(selectedOption)) {
            unanswered += 1;
        } else if (isAnswerCorrect(question, selectedOption)) {
            isCorrect = true;
            totalCorrect += 1;
            earnedMarks = marks;
            score += marks;
        } else {
            totalWrong += 1;
            earnedMarks = negativeMarks > 0 ? -negativeMarks : 0;
            score -= negativeMarks;
        }

        return {
            questionId: testQuestion.questionId,
            selectedOption,
            isCorrect,
            earnedMarks,
            timeTaken,
            correctAnswer: question?.correctAnswer,
            explanation: question?.explanation
        };
    });

    score = Math.max(0, score);

    const totalQuestions = testQuestions.length;
    const percentage = totalPossibleMarks > 0
        ? Math.min(100, Math.max(0, (score / totalPossibleMarks) * 100))
        : 0;
    const accuracy = totalQuestions > 0
        ? Math.min(100, Math.max(0, (totalCorrect / totalQuestions) * 100))
        : 0;

    return {
        score,
        percentage: Number(percentage.toFixed(2)),
        accuracy: Number(accuracy.toFixed(2)),
        totalCorrect,
        totalWrong,
        unanswered,
        totalTimeTaken,
        totalPossibleMarks,
        totalQuestions,
        answerResults
    };
};

export const getAttemptExpiryTime = (startedAt, durationMinutes) => {
    return new Date(new Date(startedAt).getTime() + durationMinutes * 60 * 1000);
};

export const isAttemptExpired = (startedAt, durationMinutes, now = new Date()) => {
    return now >= getAttemptExpiryTime(startedAt, durationMinutes);
};

export const getRemainingSeconds = (startedAt, durationMinutes, now = new Date()) => {
    const remainingMs = getAttemptExpiryTime(startedAt, durationMinutes).getTime() - now.getTime();
    return Math.max(0, Math.ceil(remainingMs / 1000));
};
