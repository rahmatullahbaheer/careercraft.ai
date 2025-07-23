const mongoose = require("mongoose");
const { Schema } = mongoose;

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stripePriceLine: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    credits: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
PackageSchema.index({ name: 1 });
PackageSchema.index({ status: 1 });

module.exports =
  mongoose.models.Package || mongoose.model("Package", PackageSchema);
