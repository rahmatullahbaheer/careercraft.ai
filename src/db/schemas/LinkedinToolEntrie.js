const mongoose = require("mongoose");
const { Schema } = mongoose;

const LinkedinToolEntrieSchema = new Schema(
  {
    fileName: {
      type: String,
    },
    fileContent: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    recentJob: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "done"],
    },
    sendToCRM: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.LinkedinToolEntrie ||
  mongoose.model("LinkedinToolEntrie", LinkedinToolEntrieSchema);
