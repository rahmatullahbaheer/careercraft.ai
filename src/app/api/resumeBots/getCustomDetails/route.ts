import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateToolUsage } from "@/helpers/updateToolUsage";
import { updateUserTokens } from "@/helpers/updateUserTokens";
import { encodingForModel } from "js-tiktoken";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const reqBody = await req.json();
    const activity = reqBody?.data;
    const personName = reqBody?.personName;
    const sectionName = reqBody?.section;
    const jobTitle = reqBody?.jobPosition;
    const userCredits = await getUserCreditsByEmail(session?.user?.email);
    const creditsUsed = reqBody?.creditsUsed;
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }

    await startDB();

    const inputPrompt = `
    Improve and rewrite the work below to position ${personName} for the position of ${jobTitle} based on the following instructions:

    The work should be in the form of a bullet list
    
    The bullet should highlight the core achievements and the key results of how ${personName} added value to the company.
       
    Consider mentioning strategic thinking and problem-solving abilities where possible
     
    This will not be a quantifying experience so do not add % or numbers in each bullet to make the outcome quantifiable.
    
    I want the answer to be in HTML format.
    Here is the work details: 
    
  
      Title: ${activity.title}
      From Month: ${activity.fromMonth}
      From Year: ${activity.fromYear}
      To Month: ${activity.toMonth}
      To Year: ${activity.toYear}
      is the job continued: ${activity.isContinue}
      Job Description: ${activity.description}
      Company country: ${activity.country}
      Company city,State: ${activity.cityState}
     
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    const enc = encodingForModel("gpt-3.5-turbo"); // js-tiktoken
    let completionTokens = 0;
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // postConsultingBid(payload);
        await updateUserTotalCredits(
          session?.user?.email,
          creditsUsed,
          "resume"
        );
        await updateToolUsage("Resume Tool", creditsUsed);
      },
      onToken: async (content) => {
        const tokenList = enc.encode(content);
        completionTokens += tokenList.length;
      },
      onFinal: async (completions) => {
        try {
          if (completionTokens > 0) {
            await updateUserTokens(session?.user?.email, completionTokens);
          }
        } catch (error) {}
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    return NextResponse.json(
      { result: "Something went wrong", success: false },
      { status: 404 }
    );
  }
}
