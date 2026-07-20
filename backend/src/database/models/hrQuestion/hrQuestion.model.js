import mongoose from "mongoose";

// =====================================
// HR Question Schema
// Relationship: Child of HRCategory
// =====================================

const hrQuestionSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HRCategory",
            required: true
        },

        question: {
            type: String,
            required: true,
            trim: true
        },

        sampleAnswer: {
            type: String,
            default: "",
            trim: true
        },

        keyPoints: [
            {
                type: String,
                trim: true
            }
        ],

        commonMistakes: [
            {
                type: String,
                trim: true
            }
        ],

        interviewerTips: [
            {
                type: String,
                trim: true
            }
        ],

        isPublished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

hrQuestionSchema.index({ categoryId: 1, question: 1 }, { unique: true });
hrQuestionSchema.index({ categoryId: 1, isPublished: 1 });
hrQuestionSchema.index({ question: "text" });

export default mongoose.model("HRQuestion", hrQuestionSchema);
