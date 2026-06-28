import mongoose from "mongoose";

const codingProfileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    codingScore: {
        type: Number,
        default: 0
    },

    problemsSolved: {
        type: Number,
        default: 0
    },

    easySolved: {
        type: Number,
        default: 0
    },

    mediumSolved: {
        type: Number,
        default: 0
    },

    hardSolved: {
        type: Number,
        default: 0
    },

    articlesPublished: {
        type: Number,
        default: 0
    },

    currentStreak: {
        type: Number,
        default: 0
    },

    longestStreak: {
        type: Number,
        default: 0
    },

    potdSolved: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

export default mongoose.model("CodingProfile", codingProfileSchema);