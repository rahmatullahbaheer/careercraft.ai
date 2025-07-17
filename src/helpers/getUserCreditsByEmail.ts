import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export const getUserCreditsByEmail = async (
  email: string | null | undefined
) => {
  try {
    await startDB();
    // Fetch the user document by email
    if (email) {
      const user = await (User as any).findOne({ email: email });

      return user.userCredits;
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error("Error updating totalCredits:", error);
  }
};
