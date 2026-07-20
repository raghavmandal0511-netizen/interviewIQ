import mongoose from "mongoose";

// =====================================
// Category Schema
// Relationship: Parent of Module; referenced by Test.category
// =====================================

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
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

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ order: 1, isActive: 1 });

export default mongoose.model("Category", categorySchema);
