import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { AuthOptions } from "next-auth";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { makeid } from "@/helpers/makeid";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
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
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const reqBody = await req.json();
    const experience = reqBody?.experience;
    const trainBotData = reqBody?.trainBotData;
    const detailedResume = reqBody?.detailedResume;
    const personName = reqBody?.personName;
    const jobTitle = reqBody.jobTitle
      ? reqBody.jobTitle
      : "his/her related field";
    const userCredits = await getUserCreditsByEmail(session?.user?.email);
    const creditsUsed = reqBody?.creditsUsed;
    let dataset: string;
    let model: string | null | undefined;

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }
    let promptRec;
    let prompt = "";
    await startDB();

    if (detailedResume) {
      dataset = "linkedin.jobDescription";
      model = await getTrainedModel(dataset);
      promptRec = await (Prompt as any).findOne({
        type: "linkedin",
        name: "jobDescription",
        active: true,
      });
      prompt = promptRec?.value;
      prompt = prompt?.replaceAll("{{PersonName}}", personName);
      prompt = prompt?.replaceAll("{{JobTitle}}", jobTitle);
    } else {
      dataset = "resume.writeJDSingle";
      model = await getTrainedModel(dataset);
      promptRec = await (Prompt as any).findOne({
        type: "resume",
        name: "jdSingle",
        active: true,
      });
      prompt = promptRec?.value;
      prompt = prompt?.replaceAll("{{PersonName}}", personName);
      prompt = prompt?.replaceAll("{{JobTitle}}", jobTitle);
    }

    const inputPrompt = `
    ${prompt}

    Here is the work experience: 
    
  
      Job Title: ${experience.jobTitle}
      Company Name: ${experience.company}
      From Month: ${experience.fromMonth}
      From Year: ${experience.fromYear}
      To Month: ${experience.toMonth}
      To Year: ${experience.toYear}
      is the job continued: ${experience.isContinue}
      Job Description: ${experience.description}
      Company country: ${experience.country}
      Company city,State: ${experience.cityState}
     
      `;

    const response = await openai.chat.completions.create({
      model: model ? model : "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    let workId: any;
    const enc = encodingForModel("gpt-3.5-turbo"); // js-tiktoken
    let completionTokens = 0;
    const stream = OpenAIStream(response as any, {
      onStart: async () => {
        workId = makeid();
        const payload = {
          id: workId,
        };
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
          try {
            if (trainBotData) {
              let entry: TrainBotEntryType = {
                entryId: workId,
                type: "resume.writeJDSingle",
                input: inputPrompt,
                output: completions,
                idealOutput: "",
                status: "pending",
                userEmail: trainBotData.userEmail,
                fileAddress: trainBotData?.fileAddress,
                Instructions: `Write Single Job Description for ${experience.jobTitle} at ${experience.company}`,
              };
              await makeTrainedBotEntry(entry);
            }
          } catch {
            console.log("error while saving summary....");
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
