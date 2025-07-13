/**
 * Get the appropriate trained model ID based on the dataset type
 * @param {string} dataset - The dataset identifier
 * @returns {Promise<string>} The model ID to use
 */
export async function getTrainedModel(dataset) {
  // Map dataset types to their corresponding trained model IDs
  const modelMap = {
    "register.wizard.listSkills":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icr9I31",
    "register.wizard.listAwards":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listCertifications":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listEducation":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listExperience":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listProjects":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listLanguages":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listHobbies":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listReferences":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listPublications":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listRegistrations":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.listTrainings":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    "register.wizard.writeSummary":
      "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
  };

  // Return the specific model for the dataset, or fall back to a default model
  return modelMap[dataset] || "gpt-4o-mini-2024-07-18";
}
