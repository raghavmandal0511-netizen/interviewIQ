import mongoose from "mongoose";

// =====================================
// Sub Schemas
// =====================================

const formulaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: ""
        },

        content: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        _id: false
    }
);

const shortcutTipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: ""
        },

        tip: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        _id: false
    }
);

const solvedExampleSchema = new mongoose.Schema(
    {
        problem: {
            type: String,
            trim: true,
            default: ""
        },

        solution: {
            type: String,
            trim: true,
            default: ""
        },

        steps: [
            {
                type: String,
                trim: true
            }
        ]
    },
    {
        _id: false
    }
);

const referenceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: ""
        },

        url: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        _id: false
    }
);

// =====================================
// Theory Schema
// Relationship: One-to-one with Topic
// =====================================

const theorySchema = new mongoose.Schema(
    {
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
            unique: true
        },

        introduction: {
            type: String,
            default: "",
            trim: true
        },

        explanation: {
            type: String,
            default: "",
            trim: true
        },

        formulas: {
            type: [formulaSchema],
            default: []
        },

        shortcutTips: {
            type: [shortcutTipSchema],
            default: []
        },

        solvedExamples: {
            type: [solvedExampleSchema],
            default: []
        },

        references: {
            type: [referenceSchema],
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// topicId unique index comes from field `unique: true`

export default mongoose.model("Theory", theorySchema);
