import { NextResponse } from "next/server";
import startDB from "../../../lib/db";
import Prompt from "../../../db/schemas/Prompt.js";

// CORS headers (reuse this for all responses)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Change to your domain in production
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS: CORS Preflight handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// POST: Create or update a prompt
export async function POST(req) {
  const body = await req.json();

  try {
    await startDB();
    const { type, name, value, active, id } = body;

    const current = await Prompt.findOne({ type, name });

    if (current) {
      current.value = value;
      current.active = active;
      await current.save();

      return new NextResponse(
        JSON.stringify({ result: current, success: true }),
        { status: 200, headers: corsHeaders }
      );
    } else {
      const newPrompt = new Prompt({ type, name, value, active });
      const prompt = await newPrompt.save();

      return new NextResponse(
        JSON.stringify({ result: prompt, success: true }),
        { status: 200, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("POST Error:", error);
    return new NextResponse(
      JSON.stringify({ result: "Error Saving Prompt", success: false }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET: Fetch active prompts by type
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  console.log("type", type);

  try {
    await startDB();
    const prompts = await Prompt.find({ active: true, type });

    if (prompts.length > 0) {
      return new NextResponse(
        JSON.stringify({ result: prompts, success: true }),
        { status: 200, headers: corsHeaders }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ result: "Prompts not Found", success: false }),
        { status: 404, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("GET Error:", error);
    return new NextResponse(
      JSON.stringify({ result: "Error getting Prompts", success: false }),
      { status: 500, headers: corsHeaders }
    );
  }
}
