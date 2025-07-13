const mongoose = require("mongoose");
const { Schema } = mongoose;

const ToolUsageSchema = new Schema(
  {
    toolName: {
      type: String,
    },
    creditsUsed: {
        type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.models.ToolUsage ||
  mongoose.model("ToolUsage", ToolUsageSchema);
