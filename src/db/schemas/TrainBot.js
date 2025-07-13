import mongoose from "mongoose";
const { Schema } = mongoose;

const TrainBotSchema = new Schema(
  {
    entryId: {
      type: String,
      // required: true,
    },

    type: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    idealOutput: {
      type: String,
    },
    userEmail: String,
    fileAddress: String,
    Instructions: String,
    status: {
      type: String,
      enum: ["pending", "reviewed", "trained"],
      required: true,
    },
  },

  { timestamps: true }
);

const TrainBot =
  mongoose.models.TrainBot || mongoose.model("TrainBot", TrainBotSchema);

export default TrainBot;
