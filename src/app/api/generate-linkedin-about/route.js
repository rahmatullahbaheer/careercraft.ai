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
      name: "about",
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
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
      { error: "Something went wrong while generating about section." },
      { status: 500 }
    );
  }
}
