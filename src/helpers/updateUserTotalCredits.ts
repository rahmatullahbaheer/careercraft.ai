import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export const updateUserTotalCredits = async (
  email: string | null | undefined,
  credits: number,
  type?: string
) => {
  try {
    await startDB();
    // Fetch the user document by email
    if (email) {
      // Update the user document with the new totalCredits
      if (type === "resume") {
        await (User as any).findOneAndUpdate(
          { email: email, trialResume: true },
          { $inc: { userCredits: -credits } }, // Using $inc to decrement the totalCredits
          { new: true }
        );
      } else {
        await (User as any).findOneAndUpdate(
          { email: email },
          { $inc: { userCredits: -credits } }, // Using $inc to decrement the totalCredits
          { new: true }
        );
      }

      console.log(`Updated totalCredits for ${email} `);
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error("Error updating totalCredits:", error);
  }
};
