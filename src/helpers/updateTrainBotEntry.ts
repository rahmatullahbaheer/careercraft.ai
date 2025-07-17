import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";

export type UpdateTrainBotEntryType = {
  entryId: String;
  type: String;
  output: String;
};

export const updateTrainedBotEntry = async (entry: UpdateTrainBotEntryType) => {
  try {
    await startDB();
    // Getting the dataset model if trained previously
    await (TrainBot as any).findOneAndUpdate(
      { entryId: entry.entryId, type: entry.type },
      { $set: { output: entry.output } },
      { new: true }
    );
  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
