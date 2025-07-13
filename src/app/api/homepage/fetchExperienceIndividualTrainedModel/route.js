import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    if (body) {
      const reqBody = body;
      const content = reqBody.content.substring(0, 12000);
      const jobTitle = reqBody.jobTitle;
      const company = reqBody.company;
      const trainBotData = reqBody.trainBotData;

      if (content) {
        // CREATING LLM MODAL
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const input = `
        This is the User Data:
            ${content}
            ___________________
  
            Now Find the details for  Job Title: ${jobTitle} at  ${company}  from the above provided User Data.
            and provide the following fields for that work experience:
            country, cityState, fromMonth, fromYear, isContinue, toMonth, toYear, description
            country: name of the country where this person worked in ${company}
            cityState:  name of the city or state where this person worked in ${company}
            fromMonth: means the month when this person started working at ${company} The month name must be in full e.g. Juanuary, February etc.
            fromYear: means the year when this person started working at ${company}
            toMonth: means the month when this person stopped working at ${company} The month name must be in full e.g. Juanuary, February etc.
            toYear: means the year when this person stopped working at ${company}
            isContinue: means if the person  is still working there or not (Is Experience continued? e.g true, false)
            description: fetch Work experience description of this person at ${company} from the User Data provided.
  
            The answer MUST be a valid JSON and formatting should be like this
            replace the VALUE_HERE with the actual values
            {
              country: VALUE_HERE,
              cityState: VALUE_HERE,
              fromMonth: VALUE_HERE,
              fromYear: VALUE_HERE,
              toMonth: VALUE_HERE,
              toYear: VALUE_HERE,
              isContinue: VALUE_HERE,
              description: VALUE_HERE
            }
  
            If there is no value for any field Leave that field blank e.g: ""  and do not add labels like "N/A", "Unknown" or "Not Available" etc.`;

        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-0613:careerbooster-ai::8Dvh6dPq", // v2
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
              type: "register.wizard.individualExperience",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Find [[${jobTitle}]] at  [[${company}]]`,
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
      { status: 404 }
    );
  }
}
