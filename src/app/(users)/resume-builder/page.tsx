"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/templates/template_1";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  setBasicInfo,
  setWorkExperience,
  setPrimarySkills,
  setId,
  setState,
  setWorkExperienceArray,
  resetResume,
  // setQuantifyingExperience,
  setTrainings,
  setAwards,
  setPublications,
  setReferences,
  setInterests,
  setCertifications,
  setLanguages,
  setProjects,
} from "@/store/resumeSlice";
import { useReactToPrint } from "react-to-print";
import {
  checkIconSmall,
  chevronRight,
  crossIcon,
  infoSmallIcon,
} from "@/helpers/iconsProvider";
import Confetti from "react-dom-confetti";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import GenerateResume from "@/components/dashboard/resume-builder/GenerateNewResumeCard";
import Link from "next/link";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import Image from "next/image";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useGetUserData from "@/hooks/useGetUserData";
import useGetSummary from "@/hooks/useGetSummary";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";
import useGetCreditLimits from "@/hooks/useGetCreditLimits";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import CreditInfoModal from "@/components/dashboard/resume-builder/CreditsInfoModal";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import TourBot from "@/components/dashboard/TourBot";
import { useTourContext } from "@/context/TourContext";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";

const ResumeBuilder = () => {
  const [confettingRunning, setConfettiRunning] = useState(false);
  const [showConfettiRunning, setShowConfettiRunning] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    decay: 0.95,
    duration: 8000,
    width: "25px",
    height: "25px",
  };

  const { resumeElementRef, tourBotRef, historyCardRef, availableCreditsRef } =
    useTourContext();

  const { getUserDataIfNotExists } = useGetUserData();
  const componentRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { abortController, setAbortController, outOfCredits } = useAppContext();
  // Local States
  const [finished, setFinished] = useState<boolean>(false);
  const [streamedSummaryData, setStreamedSummaryData] = useState<string>("");
  const [streamedJDData, setStreamedJDData] = useState<string>("");
  const [aiInputUserData, setAiInputUserData] = useState({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [resumeGenerated, setResumeGenerated] = useState<boolean>(false);
  const { saveResumeToDB } = useSaveResumeToDB();
  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);
  const creditLimits = useSelector((state: any) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();
  const handlePrintClick = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
    @page {
      size: A4;
      margin:0;
    }
  `,
  });
  useEffect(() => {
    return () => {
      abortController?.abort();
      setAbortController(new AbortController());
    };
  }, []);
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  // const getConsent = () => {
  //   if (creditsInfoRef.current) {
  //     creditsInfoRef.current.openModal(true);
  //   }
  // };

  const runConfetti = () => {
    if (showConfettiRunning) {
      showSuccessToast("Generated Successfully");
      setConfettiRunning(true);
      setTimeout(() => {
        setConfettiRunning(false);
        setShowTemplatePopup(true);
      }, 3000); // Adjust the duration as needed
    }
  };
  const handleGenerate = useCallback(async () => {
    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();

    // reset resume
    dispatch(resetResume(resumeData.state));

    if (session?.user?.email) {
      setResumeGenerated(false);
      dispatch(setState({ name: "resumeLoading", value: true }));
      // dispatch(setQuantifyingExperience(quantifyingExperience));
      dispatch(setTrainings({ trainings: userData.trainings }));
      dispatch(setProjects({ projects: userData.projects }));
      dispatch(setAwards({ awards: userData.awards }));
      dispatch(setPublications({ publications: userData.publications }));
      dispatch(setReferences({ references: userData.references }));
      dispatch(setInterests({ interests: userData.interests }));
      dispatch(setCertifications({ certifications: userData.certifications }));
      dispatch(setLanguages({ languages: userData.languages }));

      // Only clear ID if we don't have one already to avoid breaking saves
      if (!resumeData.id) {
        dispatch(setId(""));
      }
      const basicInfoResponse = await getBasicInfo();
      if (basicInfoResponse.success) {
        await getSummary();
        await getPrimarySkills();
        await getWorkExperienceNew();
      } else {
        dispatch(setState({ name: "resumeLoading", value: false }));
      }

      //  runConfetti();
    } else {
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, [resumeData.state]);

  // const makeAPICallWithRetry: any = async (
  //   apiFunction: any,
  //   retriesLeft = 2
  // ) => {
  //   try {
  //     // Attempt the API call
  //     return await apiFunction();
  //   } catch (error) {
  //     // If an error occurs and retries are left, retry the call
  //     if (retriesLeft > 0) {
  //       console.log(
  //         `API call failed. Retrying... Retries left: ${retriesLeft}`
  //       );
  //       return makeAPICallWithRetry(apiFunction, retriesLeft - 1);
  //     } else {
  //       // If no retries are left, handle the error accordingly
  //       console.error("API call failed after multiple retries.", error);
  //       throw new Error("API call failed after multiple retries");
  //     }
  //   }
  // };

  const getBasicInfo = async () => {
    try {
      const response = await fetch("/api/resumeBots/getBasicInfo", {
        method: "POST",
        body: JSON.stringify({
          type: "basicDetails",
          inputType: "userData",
          personName: userData.firstName + " " + userData.lastName,
          creditsUsed: creditLimits.resume_basicInfo,
          userData: aiInputUserData,
          resumeType: resumeData.state.resumeType,
          jobPosition: resumeData.state.jobPosition,
          jobDescription: resumeData.state.jobDescription,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.uploadedResume.fileName,
          },
        }),
        signal: abortController?.signal,
      });

      const res = await response.json();

      if (res.success && res.result) {
        let myJSON =
          typeof res.result === "object" ? res.result : JSON.parse(res.result);
        const basicObj = {
          ...myJSON,
          name: userData?.firstName + " " + userData?.lastName,
          contact: {
            ...myJSON?.contact,
            email: userData?.email,
            phone: userData?.phone,
            address: `${userData?.contact?.street} ${userData?.contact?.cityState} ${userData?.contact?.country} ${userData?.contact?.postalCode}`,
          },
          education: userData?.education,
        };
        dispatch(setBasicInfo(basicObj));

        // Save immediately after basic info is set to ensure we have a resume ID
        setTimeout(() => {
          saveResumeToDB();
        }, 500);

        return { success: true }; // return success response
      } else {
        setShowConfettiRunning(false);
        showErrorToast("Something Went Wrong");
        return { success: false }; // return error response
      }
    } catch (err) {
      console.log(err);
      setShowConfettiRunning(false);
      showErrorToast("Something Went Wrong");
      return { success: false }; // return error response
    }
  };

  // Call the function and log the response

  const getWorkExperienceNew = async () => {
    // return makeAPICallWithRetry(async () => {
    await getCreditLimitsIfNotExists();
    await getUserDataIfNotExists();

    if (userData.isFetched && userData.experience) {
      // remove ids from experiences
      const experiences: any = userData.experience.map((item: any) => {
        const { id, ...rest } = item;
        return rest;
      });
      setStreamedJDData("");
      dispatch(setWorkExperience(""));
      let temp = "";
      const workExpArr: any = [];
      for (const [index, experience] of experiences.entries()) {
        let workExpArrObj: any = {};
        let html = "";
        html += `<h2 style="font-size: 1.3rem; font-weight: bold; line-height: 2rem; ">${experience?.jobTitle}</h2>`;
        workExpArrObj.title = experience?.jobTitle;

        html += `<h2 style="font-size: 1.1rem; line-height: 1.5rem">
        
        ${experience?.fromMonth} ${experience?.fromYear} - ${
          experience?.isContinue
            ? "Present"
            : experience?.toMonth + " " + experience?.toYear
        } | ${experience?.company} | 
        ${experience?.cityState} ${experience?.country}
                  </h2>`;
        html += `<div>`;
        workExpArrObj.cityState = experience?.cityState;
        workExpArrObj.country = experience?.country;
        workExpArrObj.company = experience?.company;
        workExpArrObj.fromMonth = experience?.fromMonth;
        workExpArrObj.fromYear = experience?.fromYear;
        workExpArrObj.isContinue = experience?.isContinue;
        workExpArrObj.toMonth = experience?.toMonth;
        workExpArrObj.toYear = experience?.toYear;

        temp += html;
        let achievementTemp = "";
        setStreamedJDData((prev: any) => prev + html);
        try {
          const res: any = await fetch("/api/resumeBots/jdGeneratorSingle", {
            method: "POST",
            body: JSON.stringify({
              // quantifyingExperience: quantifyingExperience,
              experience: experience,
              detailedResume: resumeData.state.detailedResume,
              creditsUsed: creditLimits.resume_individualWorkExperience,
              trainBotData: {
                userEmail: userData.email,
                // fileAddress: userData.files[0].fileName,
                fileAddress: userData.uploadedResume.fileName,
              },
              personName: userData.firstName + " " + userData.lastName,
              jobTitle: resumeData.state.jobPosition,
            }),
            signal: abortController?.signal,
          });

          if (res.ok) {
            const reader = res.body.getReader();
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const text = new TextDecoder().decode(value);
              setStreamedJDData((prev: any) => prev + text);
              temp += text;
              achievementTemp += text;
            }

            setStreamedJDData((prev: any) => prev + `</div> <br /> `);
            temp += `</div> <br /> `;
            const achivementsArray = fetchLIstOfStrings(achievementTemp);
            workExpArrObj.achievements = achivementsArray;
            workExpArr.push(workExpArrObj);
          } else {
            setShowConfettiRunning(false);
            setStreamedJDData("You ran out of credits!");
          }
        } catch (error) {
          console.log(error);
        }
      }
      setFinished(true);
      dispatch(setWorkExperienceArray({ workExperienceArray: workExpArr }));
      dispatch(setState({ name: "resumeLoading", value: false }));
      setResumeGenerated(true);
      dispatch(setWorkExperience(temp));

      // Ensure resume gets saved after work experience generation
      setTimeout(() => {
        saveResumeToDB();
      }, 1000);
    }
    // });
  };

  const getPrimarySkills = async () => {
    // return makeAPICallWithRetry(async () => {
    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        personName: userData?.firstName + " " + userData?.lastName,

        resumeType: resumeData.state.resumeType,
        jobPosition: resumeData.state.jobPosition,
        jobDescription: resumeData.state.jobDescription,

        creditsUsed: creditLimits.resume_skills,
        userData: aiInputUserData,

        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
      signal: abortController?.signal,
    })
      .then(async (resp: any) => {
        const res = await resp.json();
        if (res.success) {
          if (res?.result) {
            let myJSON = JSON.parse(JSON.stringify(res.result));
            myJSON = JSON.parse(myJSON);
            dispatch(setPrimarySkills({ primarySkills: myJSON }));
          }
        } else {
          setShowConfettiRunning(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // });
  };

  useEffect(() => {
    if (!resumeData.state.resumeLoading && resumeData?.name) {
      setFinished(true);
    }
    if (
      resumeGenerated &&
      !resumeData.state.resumeLoading &&
      resumeData?.name &&
      !outOfCredits
    ) {
      runConfetti();
      saveResumeToDB();
    }
  }, [resumeData?.state?.resumeLoading]);

  // Additional useEffect to ensure resume gets saved after generation
  useEffect(() => {
    if (
      resumeGenerated &&
      !resumeData.state.resumeLoading &&
      (resumeData?.name || resumeData?.contact?.email || resumeData?.summary) &&
      !outOfCredits
    ) {
      // Save the resume when generation is complete and we have some basic data
      saveResumeToDB();
    }
  }, [
    resumeGenerated,
    resumeData.state.resumeLoading,
    resumeData?.name,
    resumeData?.contact?.email,
    resumeData?.summary,
    outOfCredits,
  ]);

  // Additional safeguard to save when loading state changes to false
  useEffect(() => {
    if (
      !resumeData.state.resumeLoading &&
      resumeGenerated &&
      (resumeData?.name ||
        resumeData?.contact?.email ||
        resumeData?.summary ||
        resumeData?.primarySkills?.length > 0)
    ) {
      // Ensure resume is saved when loading completes
      setTimeout(() => {
        saveResumeToDB();
      }, 2000);
    }
  }, [resumeData.state.resumeLoading, resumeGenerated]);

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        linkedin: userData?.linkedin,
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData?.tours) {
      if (!userData.tours.resumeBuilder) {
        setTimeout(() => {
          tourBotRef?.current?.click();
        }, 500);
      }
    }
  }, [tourBotRef]);

  useEffect(() => {
    if (outOfCredits) {
      setShowConfettiRunning(false);
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);

  const tourBotConfig = {
    name: "resumeBuilder",
    audios: [
      {
        url: "/resume-history-card.mp3",
        for: "history",
      },
      {
        url: "/resume-builder-main.mp3",
        for: "tool",
      },
    ],
    toolRefs: [
      {
        ref: historyCardRef,
        for: "history",
      },
      {
        ref: resumeElementRef,
        for: "tool",
      },
    ],
  };
  const tourBotConfig2 = {
    name: "resumeBuilder",
    audios: [
      {
        url: "/OutOfCredits.mp3",
        for: "history",
      },
    ],
    toolRefs: [
      {
        ref: availableCreditsRef,
        for: "history",
      },
    ],
  };

  return (
    <>
      {/* <CreditInfoModal ref={creditsInfoRef} handleGenerate={handleGenerate} /> */}
      {showTemplatePopup && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/90">
          <div className="flex flex-col items-center gap-4 py-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between w-full px-4">
              <h1 className="font-semibold xs:text-xl md:text-2xl">
                Select a Design for your Resume
              </h1>
              <h1
                className="font-semibold cursor-pointer xs:text-xl md:text-2xl"
                onClick={() => setShowTemplatePopup(false)}
              >
                {crossIcon}
              </h1>
            </div>
            <div className="flex justify-start w-full px-4">
              <p>Pick a template that aligns with your professional image.</p>
            </div>
            <div className=" xs:w-[300px] md:w-[44rem] lg:w-[55rem] xl:w-[55rem] rounded-xl z-50">
              <TemplateSlider
                templates={ALL_TEMPLATES.filter((template) => template.active)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full sm:w-full z-1000 ">
        <div className="ml-0 px-[15px] lg:mb-[72px]">
          <RecentResumeCard
            source="dashboard"
            componentRef={componentRef}
            setFinished={setFinished}
          />
          {showAlert && (
            <div
              className="fixed flex flex-row items-center justify-center gap-2 px-4 py-2 text-white transition-opacity bg-green-600 rounded-lg cursor-pointer bottom-10 right-10 hover:bg-green-700"
              onClick={() => setShowAlert(false)}
            >
              {checkIconSmall}
              Auto saved
            </div>
          )}
          <div>
            <GenerateResume jobId={jobId} handleGenerate={handleGenerate} />
          </div>
          <div className="fixed bottom-0 flex items-center justify-center">
            <Confetti active={confettingRunning} config={confettiConfig} />
          </div>

          {resumeData &&
            (resumeData?.name ||
              resumeData?.contact?.email ||
              resumeData?.summary) &&
               (
              <>
                <div
                  className={`my-10 ${
                    resumeData.state.resumeLoading ? "animate-pulse" : ""
                  }`}
                >
                  <div className=" whitespace-nowrap w-full ml-auto xs:mt-4 xs:flex xs:justify-center md:inline-block gap-3 xs:pb-0 md:pb-4 md:sticky top-4 right-0 z-[35]">
                    <button
                      className="no-underline w-fit"
                      onClick={handlePrintClick}
                    >
                      <div
                        className={`flex flex-row gap-2 items-center xs:flex-1 w-fit ml-auto lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full  bg-[#e4e9f7]  dark:bg-[#18181b] text-gray-900 cursor-pointer dark:text-gray-300 border-[1px] border-gray-950/80 dark:border-[#f0f0f0] `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Print Resume
                      </div>
                    </button>
                  </div>
                  <div
                    className={`bg-white ${
                      resumeData.state.resumeLoading ? "animate-pulse" : ""
                    }`}
                    ref={componentRef}
                  >
                    <ResumeTemplate1
                      streamedSummaryData={streamedSummaryData}
                      streamedJDData={streamedJDData}
                      setStreamedJDData={setStreamedJDData}
                      setStreamedSummaryData={setStreamedSummaryData}
                    />
                  </div>
                </div>
              </>
            )}
          {/* {showPopup && (
            <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
           
              Credit Limit Reached !
            </div>
          )} */}
        </div>
      </div>
      {/* <TourBot config={outOfCredits ? tourBotConfig2 : tourBotConfig} /> */}
    </>
  );
};
export default ResumeBuilder;
