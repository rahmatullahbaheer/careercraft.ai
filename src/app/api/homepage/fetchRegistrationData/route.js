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
      const content = reqBody.content;
      const trainBotData = reqBody?.trainBotData;

      if (content) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const dataset = "register.wizard.basicInfo";
        const model = await getTrainedModel(dataset);

        const input = `This is the User Data:
                ${content}
      
                Now please give me the following information about the user:
                First Name:
                Last Name:
                Email Address:
                Linkedin URL:
                Phone / Mobile Number:
                Country Name:
                Street Address:
                City or/and State Name:
                Postal Code from the provided data or get from the name of the City:
      
      
                The answer MUST be a valid JSON and formatting should be like this 
                replace the VALUE_HERE with the actual value
                {
                  firstName: VALUE_HERE,
                  lastName: VALUE_HERE,
                  email: VALUE_HERE,
                  linkedin: VALUE_HERE,
                  phone: VALUE_HERE,
                  country: VALUE_HERE,
                  street: VALUE_HERE,
                  cityState: VALUE_HERE,
                  postalCode: VALUE_HERE,
                }
      
                If there is no value Leave that field blank`;

        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
        });

        try {
          if (trainBotData) {
            await startDB();
            // make a trainBot entry
            const obj = {
              type: "register.wizard.basicInfo",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Fetching basic information e.g. Name, email, phone, address, etc.`,
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
          { result: response.choices[0].message.content, success: true },
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
