const mongoose = require("mongoose");
const { Schema } = mongoose;

const CreditsPackageScehema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
            deafult: 0,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
            required: true,
        },
        features: {
            type: [String],
            default: [],
        },
        featuresToolTips: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            enum: ["basic", "standard", "premium"],
            required: true,
        },
        totalCredits: Number
    },
    { timestamps: true }
);

module.exports = mongoose.models.CreditsPackage ||
    mongoose.model("CreditsPackage", CreditsPackageScehema);
