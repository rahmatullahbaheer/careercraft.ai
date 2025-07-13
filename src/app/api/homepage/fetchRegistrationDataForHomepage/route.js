import { NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    if (body) {
      const content = body.content.substring(0, 12000);
      if (content) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const input = `
              This is the User Data:
              ${content}
    
              Now please give me the following information about the user:
              First Name:
              Last Name:
              Email Address:
              Phone Number:
              Industry: Select One Value from this array which is most suitable and put _id of that in industry attribute according to user's data [
                      {
                          "_id": "668fc655ffee5f179ca4a5a2",
                          "name": "Health Care",
                      },
                      {
                          "_id": "66a02d8931d56273c786852c",
                          "name": "Supply Chain/Logistics",
                      },
                      {
                          "_id": "66a02d9631d56273c786852d",
                          "name": "Corporate Development/Strategy",
                      },
                      {
                          "_id": "66a02da631d56273c786852e",
                          "name": "Research and Development (R&D)",
                      },
                      {
                          "_id": "66a02db431d56273c786852f",
                          "name": "Customer Service/Customer Experience",
                      },
                      {
                          "_id": "66a02dc531d56273c7868530",
                          "name": "Legal",
                      },
                      {
                          "_id": "66a02dd331d56273c7868531",
                          "name": "Product Management",
                      },
                      {
                          "_id": "66a02ddc31d56273c7868532",
                          "name": "Engineering",
                      },
                      {
                          "_id": "66a02de731d56273c7868533",
                          "name": "Sales",
                      },
                      {
                          "_id": "66a02df231d56273c7868534",
                          "name": "Human Resource",
                      },
                      {
                          "_id": "66a02dfc31d56273c7868535",
                          "name": "Operations",
                      },
                      {
                          "_id": "66a02e0431d56273c7868536",
                          "name": "Marketing",
                      },
                      {
                          "_id": "66a02e0d31d56273c7868537",
                          "name": "Finance",
                      },
                      {
                          "_id": "66a02e1431d56273c7868538",
                          "name": "Information Tecnology (IT)",
                      }                      
                  ]
    
    
              The answer MUST be a valid JSON and formatting should be like the following 
              replace the VALUE_HERE with the actual value
              {
                firstName: VALUE_HERE,
                lastName: VALUE_HERE,
                email: VALUE_HERE,
                registeredPhone: VALUE_HERE,
                industry: VALUE_HERE,                
              }
    
              If there is no value Leave that field blank
          `;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini-2024-07-18",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
          max_tokens: 456,
        });

        return NextResponse.json(
          { success: true, result: response.choices[0].message.content },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Something went wrong", success: false },
      { status: 404 }
    );
  }
}
