import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

function removeSpecialChars(str) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}
export async function POST(req) {
  try {
    const body = await req.json();
    if (body) {
      const reqBody = body;
      const content = reqBody.content.substring(0, 12000);

      const trainBotData = reqBody.trainBotData;

      if (content) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const dataset = "register.wizard.listExperiences";
        const model = await getTrainedModel(dataset);

        const input = `
              This is the User Data:
              ${content}
    
              Now please give me a List of All Work Experiences of this person from the above provided content.
              Experiences can be associated as person's career history, work experience, professional experience, previous work etc.
              jobTitle means the job title of the work experience
              company means the company name of the work experience
              
              The answer MUST be a valid JSON and formatting should be like this 
              replace the VALUE_HERE with the actual values
              {
                experiences: [
                  {
                    jobTitle: VALUE_HERE,
                    company: VALUE_HERE (Company Name),
                  },
                  .
                  .
                  .
                ]
              }
    
              If there is no value Leave that field blank
          `;

        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IcrLzWo",
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
              type: "register.wizard.listExperiences",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Get List of all Experiences with jobTitle and company only just check if the list is missing any data`,
            };

            await TrainBot.create({ ...obj });
          }
          // const resp = await chain4.call({ query: input });
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
