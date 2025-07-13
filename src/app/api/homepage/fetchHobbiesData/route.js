import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    if (reqBody) {
      const content = reqBody.content.substring(0, 13000);
      const trainBotData = reqBody.trainBotData;

      if (content) {
        // CREATING LLM MODAL
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const dataset = "register.wizard.listAwards";
        const model = await getTrainedModel(dataset);

        const input = `
              This is the User Data:
              ${content}
    
              Now please give me a List of All Interests and Hobbies like reading, playing, music etc. found from the above user data provided.
    
              The answer MUST be a valid JSON and formatting should be like this 
              replace the VALUE_HERE with the actual values
              {
                interests: [
                  array of strings
                ]
              }
              If you don't see any Interests just resturn empty like
              {
                interests: []
              }
              If there is no value Leave that field blank
          `;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini-2024-07-18",
          response_format:{ "type": "json_object" },
          // model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          // temperature: 1,
        });
        try {
          // make a trainBot entry
          if (trainBotData) {
            await startDB();
            const obj = {
              type: "register.wizard.listInterests",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Get List of all Interests`,
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
