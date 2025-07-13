import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
export async function POST(req) {
  const reqBody = await req.json();
  try {
      const content = reqBody.content.substring(0, 13000);
      const trainBotData = reqBody.trainBotData;

      if (content) {
        // CREATING LLM MODAL
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const dataset = "register.wizard.listEducation";
        const model = await getTrainedModel(dataset);

        const input = `
              This is the User Data:
              ${content}
    
              Now please give me a List of All Education(also include certifications, courses and other academic information if present) from the above user data provided.
    
              The answer MUST be a valid JSON and formatting should be like this 
              replace the VALUE_HERE with the actual values
              {
                education: [
                  {
                    educationLevel: VALUE_HERE,
                    fieldOfStudy: VALUE_HERE,
                    schoolName: VALUE_HERE,
                    schoolLocation: VALUE_HERE (Address of School which may include city and state/country),
                    fromMonth: VALUE_HERE (in full e.g. January, May),
                    fromYear: VALUE_HERE (in full e.g 2023, 1997),
                    toMonth: VALUE_HERE (in full e.g. January, May)
                    toYear: VALUE_HERE (in full e.g 2023, 1997),
                    isContinue: VALUE_HERE (Is Education continued? e.g true, false , if you don't see any detail than make it false),
                  },
                  .
                  .
                  .
                ]
              }
    
              if there is only one year or date fill it in the toYear and toMonth field
              If there is only Year and no month for an education record put the year in the toYear field and leave the toMonth field blank
              If there is no value Leave that field blank
              Months should be in full e.g. January, February, March, April, May, June, July, August, September, October, November, and December
          `;

        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE", // v2
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
              type: "register.wizard.listEducation",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Get List of all Education`,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) { }

        return NextResponse.json(
          { success: true, result: response.choices[0].message.content },
          { status: 200 }
        );
      }
    
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
