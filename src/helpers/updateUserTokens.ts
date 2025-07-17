import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export const updateUserTokens = async (
  email: string | null | undefined,
  tokens: number
) => {
  try {
    await startDB();
    // Fetch the user document by email
    if (email) {
      // Update the user document with the new openai tokens
      await (User as any).findOneAndUpdate(
        { email: email },
        { $inc: { OpenAiTokensUsed: +tokens } }, // Using $inc to increment the OpenAiTokensUsed
        { new: true }
      );
      console.log(`Updated openai tokens for ${email} `);
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error("Error updating openai tokens:", error);
  }
};
