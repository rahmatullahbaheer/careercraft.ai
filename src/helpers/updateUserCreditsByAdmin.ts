import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export const updateUserCreditsByAdmin = async (
  email: string | null | undefined,
  credits: number,
  coupon: string = ""
) => {
  try {
    await startDB();
    // Fetch the user document by email
    if (email) {
      const update: any = {
        $inc: { userCredits: +credits, totalCredits: +credits },
      };

      if (coupon !== "") {
        update.$push = { redeemedCoupons: coupon };
      }

      await (User as any).findOneAndUpdate({ email: email }, update, {
        new: true,
      });
      console.log(`Updated totalCredits for ${email} `);
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error("Error updating totalCredits:", error);
  }
};
