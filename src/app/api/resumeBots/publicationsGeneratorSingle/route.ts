import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const reqBody = await req.json();
    const publication = reqBody?.publication;
    const trainBotData = reqBody?.trainBotData;
    const personName = reqBody?.personName;
    const jobTitle = reqBody?.jobTitle;
    const userCredits = await getUserCreditsByEmail(session?.user?.email);
    const creditsUsed = reqBody?.creditsUsed;
    const dataset = "resume.writePublicationSingle";
    const model = await getTrainedModel(dataset);

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }
    await startDB();

    let promptRec = await Prompt.findOne({
      type: "resume",
      name: "writePublicationSingle",
      active: true,
    });

    let prompt = promptRec.value;
    prompt = await prompt.replaceAll("{{PersonName}}", personName);
    prompt = await prompt.replaceAll("{{JobTitle}}", jobTitle);

    const inputPrompt = `
    ${prompt}

    Here is the publication details: 
    
  
      Title: ${publication.jobTitle}
      Publisher: ${publication.publisher}
      Date: ${publication.date}
      Description: ${publication.description}
     
      `;

    const response = await openai.chat.completions.create({
      model: model ? model : "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    let workId;
    const enc = encodingForModel("gpt-3.5-turbo"); // js-tiktoken
    let completionTokens = 0;
    const stream = OpenAIStream(response, {
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
                Instructions: `Write Single Job Description for ${publication.title} at ${publication.publisher}`,
              };
              await makeTrainedBotEntry(entry);
            }
          } catch {
            console.log("error while saving publication....");
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
