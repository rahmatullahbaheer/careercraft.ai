import { NextRequest, NextResponse } from "next/server";
import Prompt from "@/db/schemas/Prompt";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { makeid } from "@/helpers/makeid";
import type { AuthOptions } from "next-auth";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateToolUsage } from "@/helpers/updateToolUsage";
import { encodingForModel } from "js-tiktoken";
import { updateUserTokens } from "@/helpers/updateUserTokens";
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

  if (req) {
    const reqBody = await req.json();
    // const email = reqBody.email;
    const type = reqBody?.type; // request type
    const inputType = reqBody?.inputType; // input type
    // const jobPosition = reqBody?.jobPosition;
    const userData = reqBody?.userData;
    const personName = reqBody?.personName;

    const resumeType = reqBody?.resumeType;
    const jobPosition = reqBody?.jobPosition;
    const jobDescription = reqBody?.jobDescription;

    const userCredits = await getUserCreditsByEmail(session?.user?.email);
    const creditsUsed = reqBody?.creditsUsed;

    let inputPrompt = "";
    // const email = reqBody?.email;
    const trainBotData = reqBody?.trainBotData;
    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }

    if (type === "basicDetails") {
      const dataset = "resume.getBasicInfo";
      const model = await getTrainedModel(dataset);
      //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

      try {
        const promptRec: any = await (Prompt as any).findOne({
          type: "resume",
          name: "oneLineSlogan",
          active: true,
        });

        let prompt = promptRec?.value;
        prompt = prompt?.replaceAll("{{PersonName}}", personName);

        const inputPrompt = `This is the Resume data: ${JSON.stringify(
          userData
        )}
          
          Please find the following details in above provided userdata:
          shortName, jobTitle, linkedIn URL
          the  shortName means two letters from Name of the person.
          ${prompt}

      The output must be in this format. (following is an example)
      {
        "shortName": "AB",
        "jobTitle": "Your One line Slogan",
        "contact": {
          "linkedIn": "https://www.linkedin.com/in/abc/"
        }
      }


      The output must be a valid JSON
      Do not add anything if there is no value for a field. if there is no value leave that field blank donot add any extra labels.

      `;
        const response = await openai.chat.completions.create({
          model: model ? model : "gpt-4o-mini",
          messages: [{ role: "user", content: inputPrompt }],
        });

        //update total user credits
        await updateUserTotalCredits(
          session?.user?.email,
          creditsUsed,
          "resume"
        );
        await updateToolUsage("Resume Tool", creditsUsed);
        // make a trainBot entry
        try {
          if (trainBotData) {
            const basicInfoId = makeid();

            const payload = {
              id: basicInfoId,
              primarySkillsText:
                response?.choices[0]?.message?.content?.replace(
                  /(\r\n|\n|\r)/gm,
                  ""
                ),
            };

            const obj = {
              entryId: basicInfoId,

              type: "resume.getBasicInfo",
              input: inputPrompt,
              output: response?.choices[0]?.message?.content?.replace(
                /(\r\n|\n|\r)/gm,
                ""
              ),
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData.userEmail,
              fileAddress: trainBotData.fileAddress,
              Instructions: `Get basic information for the resume`,
            };

            await (TrainBot as any).create({ ...obj });
          }
        } catch (error) {}

        return NextResponse.json(
          {
            result: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            success: true,
          },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { result: error, success: false },
          { status: 404 }
        );
      }
    }

    if (type === "summary") {
      const dataset = "resume.writeSummary";
      const model = await getTrainedModel(dataset);
      //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

      try {
        if (resumeType === "resume-job-title") {
          await startDB();
          const promptRec: any = await (Prompt as any).findOne({
            type: "resume",
            name: "summary",
            active: true,
          });
          const prompt = promptRec?.value;

          let promptSummary = prompt?.replaceAll(
            "{{jobPosition}}",
            jobPosition
          );
          promptSummary = await promptSummary.replaceAll(
            "{{PersonName}}",
            personName
          );
          inputPrompt = `Read ${personName}'s Resume data: ${JSON.stringify(
            userData
          )}
      
      and then:
              ${promptSummary}`;
        } else if (resumeType === "resume-job-description") {
          await startDB();
          const promptRec: any = await (Prompt as any).findOne({
            type: "resume",
            name: "summary-for-specific-jd",
            active: true,
          });
          const prompt = promptRec?.value;

          let promptSummary = prompt?.replaceAll(
            "{{jobDescription}}",
            jobDescription
          );
          promptSummary = promptSummary?.replaceAll(
            "{{PersonName}}",
            personName
          );

          inputPrompt = `Read ${personName}'s Resume data: ${JSON.stringify(
            userData
          )}
      
      and then:
              ${promptSummary}`;
        } else {
          inputPrompt = `Read ${personName}'s Resume data: ${JSON.stringify(
            userData
          )} and write exective summary`;
        }

        const response = await openai.chat.completions.create({
          model: model ? model : "gpt-4o-mini",
          stream: true,
          messages: [{ role: "user", content: inputPrompt }],
        });
        const enc = encodingForModel("gpt-3.5-turbo"); // js-tiktoken
        let completionTokens = 0;

        const stream = OpenAIStream(response as any, {
          onStart: async () => {
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
          // make a trainBot entry
          onFinal: async (completions) => {
            try {
              if (completionTokens > 0) {
                await updateUserTokens(session?.user?.email, completionTokens);
              }
              if (trainBotData) {
                await startDB();
                const summaryId = makeid();

                const payload = {
                  id: summaryId,
                  summaryText: completions,
                };

                // postConsultingBid(payload);

                let entry: TrainBotEntryType = {
                  entryId: summaryId,
                  type: "resume.writeSummary",
                  input: inputPrompt,
                  output: completions,
                  idealOutput: "",
                  status: "pending",
                  userEmail: trainBotData.userEmail,
                  fileAddress: trainBotData?.fileAddress,
                  Instructions: `Write Summary for the resume`,
                };
                makeTrainedBotEntry(entry);
              }
            } catch {
              console.log("error while saving summary....");
            }
          },
        });

        // Respond with the stream
        return new StreamingTextResponse(stream);
      } catch (error) {
        return NextResponse.json(
          { result: error, success: false },
          { status: 404 }
        );
      }
    }

    if (type === "primarySkills") {
      const dataset = "resume.writePrimarySkills";
      const model = await getTrainedModel(dataset);

      try {
        if (resumeType === "resume-job-title") {
          await startDB();

          const promptRec = await (Prompt as any).findOne({
            type: "resume",
            name: "primarySkills",
            active: true,
          });
          const promptDB = promptRec?.value;

          const promptRefined = promptDB?.replaceAll(
            "{{jobPosition}}",
            jobPosition
          );

          inputPrompt = `Read ${personName}'s Resume data:: ${JSON.stringify(
            userData
          )}
      
    
      and then:
      ${promptRefined}
      
      the answer must be in a valid JSON array
      `;
        } else if (resumeType === "resume-job-description") {
          await startDB();

          const promptRec = await (Prompt as any).findOne({
            type: "resume",
            name: "primarySkills-for-specific-jd",
            active: true,
          });
          const promptDB = promptRec?.value;

          const promptRefined = promptDB?.replaceAll(
            "{{jobDescription}}",
            jobDescription
          );

          inputPrompt = `Read ${personName}'s Resume data:: ${JSON.stringify(
            userData
          )}
          and then:
          ${promptRefined}
          the answer must be in a valid JSON array
          `;
        } else {
          inputPrompt = `Read ${personName}'s Resume data:: ${JSON.stringify(
            userData
          )} and give me 10 primary skills and the answer must be in a valid JSON array`;
        }

        const response = await openai.chat.completions.create({
          model: model
            ? model
            : "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
          messages: [{ role: "user", content: inputPrompt }],
        });

        //update total records of user
        await updateUserTotalCredits(
          session?.user?.email,
          creditsUsed,
          "resume"
        );
        await updateToolUsage("Resume Tool", creditsUsed);

        // make a trainBot entry
        try {
          if (trainBotData) {
            await startDB();
            const primarySkillsId = makeid();

            const payload = {
              id: primarySkillsId,
              primarySkillsText:
                response?.choices[0]?.message?.content?.replace(
                  /(\r\n|\n|\r)/gm,
                  ""
                ),
            };

            const obj = {
              entryId: primarySkillsId,
              type: "resume.writePrimarySkills",
              input: inputPrompt,
              output: response?.choices[0]?.message?.content?.replace(
                /(\r\n|\n|\r)/gm,
                ""
              ),
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Write Primary Skills for Resume`,
            };

            await (TrainBot as any).create({ ...obj });
          }
        } catch (error) {}

        return NextResponse.json(
          {
            result: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            success: true,
          },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { result: error, success: false },
          { status: 404 }
        );
      }
    }
  }
}
