import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    if (body) {
      const reqBody = body;
      const content = reqBody.content.substring(0, 13000);
      const trainBotData = reqBody.trainBotData;

      if (content) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const dataset = "register.wizard.listSkills";
        const model = await getTrainedModel(dataset);

        const input = `This is the User Data:
              ${content}
    
              Now please give me a List of all  Skills from the above content provided.
    
              The answer MUST be a valid Javascript JSON Array of Strings.`;

        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icr9I31", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
        });
        try {
          // make a trainBot entry
          if (trainBotData) {
            await startDB();

            const obj = {
              type: "register.wizard.listSkills",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Get List of all Skills`,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { result: "Internal Server Error", success: false },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { success: true, result: response.choices[0].message.content },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
