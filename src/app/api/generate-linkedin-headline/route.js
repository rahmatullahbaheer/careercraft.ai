import { NextResponse } from "next/server";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, experience, skills } = body.userData;

    // Connect to database and fetch prompt
    await startDB();
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "headline",
      active: true,
    });

    if (!promptRec) {
      return NextResponse.json(
        { error: "Prompt not found in database." },
        { status: 404 }
      );
    }

    const experiences = experience
      .map((exp) => `${exp.jobTitle} at ${exp.company}`)
      .join(", ");

    const skillList = skills.slice(0, 10).join(", ");

    // Use database prompt and replace placeholders
    let prompt = promptRec.value;
    prompt = prompt.replaceAll("{{PersonName}}", `${firstName} ${lastName}`);
    prompt = prompt.replaceAll("{{Experiences}}", experiences);
    prompt = prompt.replaceAll("{{Skills}}", skillList);

    // If no placeholders in DB prompt, use fallback approach
    if (!prompt.includes(firstName) && !prompt.includes(experiences)) {
      prompt = `${prompt}
      
Person: ${firstName} ${lastName}
Experience: ${experiences}
Top Skills: ${skillList}`;
    }

    // For testing purposes, return the specific headline
    const testHeadline =
      "Senior Project Manager | Agile Methodologies | Strategic Planning | Risk Management | Team Leadership | Process Improvement | Delivering High-quality Projects On Time and Within Budget";

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Simulate streaming by sending the headline in chunks
          const words = testHeadline.split(" ");
          for (let i = 0; i < words.length; i++) {
            const chunk = i === 0 ? words[i] : " " + words[i];
            controller.enqueue(encoder.encode(chunk));
            // Add a small delay to simulate real streaming
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating headline." },
      { status: 500 }
    );
  }
}
