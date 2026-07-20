import mongoose from "mongoose";

// =====================================
// Exercise Schema
// Relationship: Child of Topic; parent of Question
// =====================================

const exerciseSchema = new mongoose.Schema(
    {
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        order: {
            type: Number,
            default: 0,
            min: 0
        },

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

exerciseSchema.index({ topicId: 1, order: 1 });
exerciseSchema.index({ topicId: 1, isPublished: 1 });

export default mongoose.model("Exercise", exerciseSchema);
