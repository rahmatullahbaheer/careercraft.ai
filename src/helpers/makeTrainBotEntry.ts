
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";

export type TrainBotEntryType = {
  entryId: String;
  type: String;
  input: String;
  output: String;
  idealOutput: String;
  status: "pending" | "reviewed" | "trained";
  userEmail: String;
  fileAddress: String;
  Instructions: String;
  createdAt?: any;
};

export const makeTrainedBotEntry = async (entry: TrainBotEntryType) => {
  try {
    await startDB();
 
    const trainBotEntry = new TrainBot(entry);
    await trainBotEntry.save();

  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
