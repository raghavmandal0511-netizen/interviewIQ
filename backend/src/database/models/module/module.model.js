import mongoose from "mongoose";

// =====================================
// Module Schema
// Relationship: Child of Category; parent of Topic
// =====================================

const moduleSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
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

        icon: {
            type: String,
            default: ""
        },

        order: {
            type: Number,
            default: 0,
            min: 0
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

moduleSchema.index({ categoryId: 1, slug: 1 }, { unique: true });
moduleSchema.index({ categoryId: 1, order: 1 });

export default mongoose.model("Module", moduleSchema);
