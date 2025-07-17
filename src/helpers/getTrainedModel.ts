import startDB from "@/lib/db";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";
import TrainedModel from "@/db/schemas/TrainedModel";

export const getTrainedModel = async (dataset: string) => {
  try {
    let model: string | null = null;
    await startDB();

    // Getting the dataset model if trained previously
    const datasetModel = await (TrainedModel as any).findOne({
      dataset,
    });

    model = datasetModel ? datasetModel.model : null;

    // getting default model if trained model no found
    if (!model) {
      const defaultModel: any = await (FineTuningSetting as any).findOne({});
      model = defaultModel ? defaultModel.tuningBaseModel : null;
    }

    return model;
  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
