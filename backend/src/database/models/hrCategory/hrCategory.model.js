import mongoose from "mongoose";

// =====================================
// HR Category Schema
// Relationship: Parent of HRQuestion
// Examples: Freshers, Experienced
// =====================================

const hrCategorySchema = new mongoose.Schema(
    {
        title: {
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

hrCategorySchema.index({ slug: 1 }, { unique: true });
hrCategorySchema.index({ isPublished: 1 });

export default mongoose.model("HRCategory", hrCategorySchema);
