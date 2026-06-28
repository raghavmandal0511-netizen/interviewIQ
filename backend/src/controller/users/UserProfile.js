// models/UserProfile.js

import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    currentlyWorking: Boolean,
    description: String
}, { _id: false });

const qualificationSchema = new mongoose.Schema({
    degree: String,
    college: String,
    university: String,
    cgpa: String,
    startYear: Number,
    endYear: Number
}, { _id: false });

const schoolSchema = new mongoose.Schema({
    schoolName: String,
    board: String,
    percentage: String,
    passingYear: Number
}, { _id: false });

const profileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    profileImage: String,

    headline: String,

    bio: String,

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    state: String,

    city: String,

    linkedin: String,

    experiences: [experienceSchema],

    qualifications: [qualificationSchema],

    schoolEducation: [schoolSchema]

}, {
    timestamps: true
});

export default mongoose.model("UserProfile", profileSchema);