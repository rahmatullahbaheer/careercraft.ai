const mongoose = require("mongoose");
const { Schema } = mongoose;

const FineTuningModelSchema = new Schema(
  {
    fileName: {
      type: String,
    },
    fileId: {
      type: String,
    },
    tuningBaseModel: {
      type: String,
    },
    status: {
      type: String,
    },
    fineTuningJobId: {
      type: String,
    },
    datasetType: {
      type: String,
    },
    fineTunedModel: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.FineTuningModel ||
  mongoose.model("FineTuningModel", FineTuningModelSchema);
