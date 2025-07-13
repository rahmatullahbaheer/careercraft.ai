const mongoose = require("mongoose");
const { Schema } = mongoose;

const FineTuningSettingSchema = new Schema(
  {
    tuningBaseModel: {
      type: String,
    },
    allowSendingDataToTuning: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.FineTuningSetting ||
  mongoose.model("FineTuningSetting", FineTuningSettingSchema);
