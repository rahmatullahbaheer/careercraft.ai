const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrainedModelSchema = new Schema(
  {
    dataset: {
      type: String,
    },
    model: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.TrainedModel ||
  mongoose.model("TrainedModel", TrainedModelSchema);
