import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },

    language: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Accepted",
            "Wrong Answer",
            "Time Limit Exceeded",
            "Runtime Error",
            "Compilation Error"
        ]
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"]
    },

    runtime: Number,

    memory: Number,

    score: Number,

    submittedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

export default mongoose.model("ProblemSubmission", submissionSchema);