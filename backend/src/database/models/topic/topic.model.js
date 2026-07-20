import mongoose from "mongoose";

// =====================================
// Topic Schema
// Relationship: Child of Module; parent of Theory, Exercise, TopicProgress
// =====================================

const topicSchema = new mongoose.Schema(
    {
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        estimatedTime: {
            type: Number,
            default: 0,
            min: 0
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium"
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

topicSchema.index({ moduleId: 1, slug: 1 }, { unique: true });
topicSchema.index({ moduleId: 1, order: 1 });
topicSchema.index({ isPublished: 1 });

export default mongoose.model("Topic", topicSchema);
