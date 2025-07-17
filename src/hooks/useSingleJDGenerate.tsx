"use client";
import useGetUserData from "./useGetUserData";
import { useDispatch, useSelector } from "react-redux";
import {
  setState,
  setWorkExperience,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";
import useSaveResumeToDB from "./useSaveToDB";
import useGetCreditLimits from "./useGetCreditLimits";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { useAppContext } from "@/context/AppContext";
import { RootState } from "@/store/store";
type WorkExperienceObj = {
  title: string;
  cityState?: string;
  country?: string;
  company?: string;
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  description?: string;
  isContinue?: boolean;
  achievements?: string[];
};

const useSingleJDGenerate = (setStreamedJDData) => {
  const { getUserDataIfNotExists } = useGetUserData();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const resumeData = useSelector((state: RootState) => state.resume);
  const creditLimits = useSelector((state: RootState) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();
  let oneWorkExpIndex: number;
  const { saveResumeToDB } = useSaveResumeToDB();
  const { abortController, setOutOfCredits } = useAppContext();
  const getOneWorkExperienceNew = async (experience) => {
    dispatch(setWorkExperience(""));
    let temp = "";

    let workExpArray = [...resumeData.workExperienceArray];
    if (experience && workExpArray.length) {
      oneWorkExpIndex = workExpArray.findIndex(
        (workExp) => JSON.stringify(workExp) === JSON.stringify(experience)
      );
    }

    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    const { detailedResume } = resumeData.state;
    if (userData.isFetched) {
      let workExpArrObj: WorkExperienceObj = { title: "" };

      workExpArrObj.title = experience?.title;
      workExpArrObj.cityState = experience?.cityState;
      workExpArrObj.country = experience?.country;
      workExpArrObj.company = experience?.company;
      workExpArrObj.fromMonth = experience?.fromMonth;
      workExpArrObj.fromYear = experience?.fromYear;
      workExpArrObj.isContinue = experience?.isContinue;
      workExpArrObj.toMonth = experience?.toMonth;
      workExpArrObj.toYear = experience?.toYear;

      let achievementTemp = "";
      const res = await fetch("/api/resumeBots/jdGeneratorSingle", {
        method: "POST",
        body: JSON.stringify({
          detailedResume: detailedResume,
          experience: experience,

          creditsUsed: creditLimits.resume_individualWorkExperience,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.uploadedResume.fileName,
          },
          personName: userData.firstName + " " + userData.lastName,
          jobTitle: resumeData?.state?.jobPosition,
        }),
        signal: abortController?.signal,
      });
      if (res.ok && res.body) {
        const reader = res.body.getReader();
        setStreamedJDData("");

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);
          // const text = response.result;

          setStreamedJDData((prev: string) => prev + text);
          // temp += text;
          achievementTemp += text;
        }
      } else {
        if (res.status === 429) {
          showErrorToast("You ran out of credits!");
          if (setOutOfCredits) {
            setOutOfCredits(true);
          }
        } else {
          showErrorToast("Error in generating work experience");
        }
        setStreamedJDData("");
        dispatch(setWorkExperienceArray({ workExperienceArray: workExpArray }));
        dispatch(setState({ name: "resumeLoading", value: false }));
      }

      if (achievementTemp.length > 0) {
        setStreamedJDData((prev: string) => prev + `</div> <br /> `);
        temp += `</div> <br /> `;
        const achivementsArray = fetchLIstOfStrings(achievementTemp);
        workExpArrObj.achievements = achivementsArray;

        workExpArray.splice(oneWorkExpIndex, 1, workExpArrObj);
        saveResumeToDB({
          ...resumeData,
          workExperienceArray: workExpArray,
        });
        dispatch(setWorkExperienceArray({ workExperienceArray: workExpArray }));
        dispatch(setState({ name: "resumeLoading", value: false }));
        showSuccessToast("Generated Successfully");
        setStreamedJDData("");
      }
    }
  };

  return { getOneWorkExperienceNew };
};

export default useSingleJDGenerate;
