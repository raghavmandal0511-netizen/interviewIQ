import mongoose from "mongoose";

// =====================================
// Sub Schemas
// =====================================

const optionSchema = new mongoose.Schema(
    {
        optionId: {
            type: String,
            required: true
        },

        text: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

// =====================================
// Question Schema
// Relationship: Child of Exercise; referenced by TestQuestion, UserAnswer
// =====================================

const questionSchema = new mongoose.Schema(
    {
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise",
            required: true
        },

        question: {
            type: String,
            required: true,
            trim: true
        },

        options: {
            type: [optionSchema],
            validate: {
                validator(value) {
                    return Array.isArray(value) && value.length >= 2;
                },
                message: "A question must have at least two options."
            }
        },

        correctAnswer: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        explanation: {
            type: String,
            default: "",
            trim: true
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium"
        },

        marks: {
            type: Number,
            default: 1,
            min: 0
        },

        negativeMarks: {
            type: Number,
            default: 0,
            min: 0
        },

        timeLimit: {
            type: Number,
            default: 0,
            min: 0
        },

        tags: [
            {
                type: String,
                trim: true
            }
        ],

        questionType: {
            type: String,
            enum: ["MCQ", "TRUE_FALSE", "MULTIPLE_CORRECT"],
            default: "MCQ"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

questionSchema.pre("save", function validateCorrectAnswer(next) {
    const { questionType, correctAnswer } = this;

    if (questionType === "MULTIPLE_CORRECT") {
        if (!Array.isArray(correctAnswer) || correctAnswer.length === 0) {
            return next(new Error("MULTIPLE_CORRECT questions require a non-empty array for correctAnswer."));
        }
    } else if (typeof correctAnswer !== "string" || correctAnswer.trim() === "") {
        return next(new Error("MCQ and TRUE_FALSE questions require a string correctAnswer."));
    }

    next();
});

questionSchema.index({ exerciseId: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ questionType: 1 });
questionSchema.index({ tags: 1 });

export default mongoose.model("Question", questionSchema);
