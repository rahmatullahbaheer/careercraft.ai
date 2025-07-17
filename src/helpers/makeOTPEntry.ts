import Otp from "@/db/schemas/Otp";
import startDB from "@/lib/db";

export type OtpEntryType = {
  email: String;
  otp: Number;
  expiry: Number;
};

export const makeOTPEntry = async (payload: OtpEntryType) => {
  try {
    await startDB();
    const OtpEntry = new Otp(payload);
    await OtpEntry.save();
  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
