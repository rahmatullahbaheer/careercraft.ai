import ToolUsage from "@/db/schemas/ToolUsage";
import startDB from "@/lib/db";

export const updateToolUsage = async (
  toolName: string | null | undefined,
  credits: number
) => {
  try {
    await startDB();
    // Fetch the user document by email
    if (toolName) {
      // Update the user document with the new totalCredits
      const existingTool = await (ToolUsage as any).findOne({
        toolName: toolName,
      });

      if (existingTool) {
        // Tool exists, update creditsUsed
        await (ToolUsage as any).findOneAndUpdate(
          { toolName: toolName },
          { $inc: { creditsUsed: +credits } }, // Using $inc to decrement the totalCredits
          { new: true }
        );
      } else {
        // Tool doesn't exist, create a new one
        await (ToolUsage as any).create({
          toolName: toolName,
          creditsUsed: credits,
        });
      }
    } else {
      throw new Error("Tool name is not provided.");
    }
  } catch (error) {
    console.error("Error updating records:", error);
  }
};
