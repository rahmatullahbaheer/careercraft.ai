import { cleanupOTPIndexes } from "@/helpers/cleanupOTPIndexes";

export async function POST(req) {
  try {
    await cleanupOTPIndexes();

    return new Response(
      JSON.stringify({
        message: "OTP indexes cleaned up successfully",
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Cleanup error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to cleanup indexes",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
