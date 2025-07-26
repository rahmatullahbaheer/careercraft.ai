"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetUserData from "./useGetUserData";
import { setPrimarySkills } from "@/store/resumeSlice";
import useSaveResumeToDB from "./useSaveToDB";
import useGetCreditLimits from "./useGetCreditLimits";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { useAppContext } from "@/context/AppContext";
import { RootState } from "@/store/store";

const useGetPrimarySkills = (
  setRegenerating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch();
  const {abortController, setOutOfCredits} = useAppContext();
  const userData = useSelector((state: RootState) => state.userData);
  const resumeData = useSelector((state: RootState) => state.resume);
  const { getUserDataIfNotExists } = useGetUserData();
  const [aiInputUserData, setAiInputUserData] = useState({});
  const { saveResumeToDB } = useSaveResumeToDB();

  const creditLimits = useSelector((state: RootState) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();
  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, []);

  const getPrimarySkills = async () => {
    setRegenerating(true);

    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("primarySkills"));
    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        personName: userData?.firstName + " " + userData?.lastName,
        userData: aiInputUserData,
        jobPosition: resumeData.state.jobPosition,

        creditsUsed: creditLimits.resume_skills,

        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
      signal: abortController?.signal,
    })
      .then(async (resp) => {
        const res = await resp.json();
        if (res.success) {
          if (res?.result) {
            let myJSON = JSON.parse(JSON.stringify(res.result));

            myJSON = JSON.parse(myJSON);
            dispatch(setPrimarySkills({ primarySkills: myJSON }));
            setRegenerating(false);
            saveResumeToDB({
              ...resumeData,
              primarySkills: myJSON,
            });
          }
          showSuccessToast("Generated Successfully");
        } else {
          if (resp.status === 429) {
            showErrorToast("You ran out of credits!");
            if (setOutOfCredits) {
              setOutOfCredits(true);
            }
          } else {
            showErrorToast("Error in generating skills!");
          }
          setRegenerating(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { getPrimarySkills };
};

export default useGetPrimarySkills;
