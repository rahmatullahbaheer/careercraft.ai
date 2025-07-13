"use client";

import { useDispatch, useSelector } from "react-redux";
import DidYouKnowCard from "./DidYouKnowCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import {
  setScrapped,
  setScrapping,
  setStepEight,
  setStepEleven,
  setStepFive,
  setStepFour,
  setStepFourteen,
  setStepNine,
  setStepOne,
  setStepSeven,
  setStepSix,
  setStepTen,
  setStepThirteen,
  setStepThree,
  setStepTwelve,
  setStepTwo,
} from "@/store/registerSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

import { getPackageID } from "@/ServerActions";
import { setField, setUserData } from "@/store/userDataSlice";
import { makeid } from "../makeid";

const ProfileCreationLayer = ({ children }) => {
  const pathname = usePathname();
  // Redux
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const register = useSelector((state) => state.register);
  const resume = useSelector((state) => state.resume);
  const [showStuckError, setShowStuckError] = useState(false);
  const goToProfile = params?.get("goToProfile");
  // useeffect to show stuck error to true after 2 minutes
  useEffect(() => {
    const t = setTimeout(() => {
      setShowStuckError(true);
    }, 120000);
    return () => clearTimeout(t);
  }, []);

  const createProfileFromResume = () => {
    if (register.scrappedContent && !userData.wizardCompleted) {
      fetchBasicDataFromResume();
      writeBasicSummaryFromResume();
      fetchEducationDataFromResume();
      fetchExperienceDataFromResume();
      fetchSkillsDataFromResume();
      fetchCertificatesDataFromResume();
      fetchAwardsDataFromResume();
      fetchInterestsDataFromResume();
      fetchLanguagesDataFromResume();
      fetchTrainingsDataFromResume();
      fetchPublicationsDataFromResume();
      fetchReferencesDataFromResume();
      fetchProjectsDataFromResume();
    }
  };

  const fetchBasicDataFromResume = async () => {
    if (
      register.scrapping.basic === false &&
      register.scrappedContent !== "" &&
      register.scrapped.basic === false
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ basic: true }));

      const formData = {
        type: "basicInfo",

        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                dispatch(setScrapped({ basic: true }));
                dispatch(setScrapping({ basic: false }));
                dispatch(
                  setStepOne({
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                  })
                );
                dispatch(
                  setStepTwo({
                    phoneNumber: data?.phone,
                    Email: data?.email,
                    linkedin: data?.linkedin,
                  })
                );
                dispatch(
                  setStepThree({
                    country: data?.country,
                    street: data?.street,
                    cityState: data?.cityState,
                    postalCode: data?.postalCode,
                  })
                );
              } catch (error) {
                dispatch(setScrapped({ basic: true }));
                dispatch(setScrapping({ basic: false }));
              }
            } else {
              dispatch(setScrapped({ basic: true }));
              dispatch(setScrapping({ basic: false }));
            }
          } else {
            dispatch(setScrapped({ basic: true }));
            dispatch(setScrapping({ basic: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ basic: true }));
          dispatch(setScrapping({ basic: false }));
        });
    }
  };

  const fetchEducationDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.education === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.education === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ education: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchEducationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }

                const formattedArr = data?.education.map((item) => {
                  return {
                    id: makeid(),
                    educationLevel: item?.educationLevel,
                    fieldOfStudy: item?.fieldOfStudy,
                    schoolName: item?.schoolName,
                    schoolLocation: item?.schoolLocation,
                    fromMonth: item?.fromMonth,
                    fromYear: item?.fromYear,
                    isContinue: item?.isContinue,
                    toMonth: item?.toMonth,
                    toYear: item?.toYear,
                  };
                });
                // Sort the array by fromYear and fromMonth
                // formattedArr.sort((a: any, b: any) => {
                //   const yearComparison = a.fromYear.localeCompare(b.fromYear);
                //   if (yearComparison !== 0) {
                //     return yearComparison;
                //   }
                //   return a.fromMonth.localeCompare(b.fromMonth);
                // });
                // formattedArr.reverse();
                formattedArr.sort((a, b) => {
                  const hasFromMonthA = a.hasOwnProperty("fromMonth");
                  const hasFromMonthB = b.hasOwnProperty("fromMonth");
                  const hasToYearA = a.hasOwnProperty("toYear");
                  const hasToYearB = b.hasOwnProperty("toYear");

                  if (
                    (hasFromMonthA && hasFromMonthB) ||
                    (hasToYearA && hasToYearB)
                  ) {
                    // Objects have either fromMonth or toYear property
                    if (hasFromMonthA && hasFromMonthB) {
                      const yearComparison = a.fromYear.localeCompare(
                        b.fromYear
                      );
                      if (yearComparison !== 0) {
                        return yearComparison;
                      }

                      const monthComparison = a.fromMonth.localeCompare(
                        b.fromMonth
                      );
                      return monthComparison;
                    } else if (
                      (!hasFromMonthA && hasFromMonthB) ||
                      (hasFromMonthA && !hasFromMonthB)
                    ) {
                      return hasFromMonthA ? -1 : 1; // Place object with fromMonth before the one without it
                    } else {
                      const fromYearComparison = a.fromYear.localeCompare(
                        b.fromYear
                      );
                      if (fromYearComparison !== 0) {
                        return fromYearComparison;
                      }

                      return hasToYearA ? -1 : 1; // Place object with toYear before the one without it
                    }
                  } else {
                    // Objects lack both fromYear and toYear properties
                    return 0; // Maintain the existing order if neither fromYear nor toYear is present
                  }
                });

                const shouldReverse = formattedArr.some(
                  (item) =>
                    item.hasOwnProperty("fromYear") ||
                    item.hasOwnProperty("toYear")
                );

                if (shouldReverse) {
                  formattedArr.reverse();
                }

                dispatch(setStepFour({ list: formattedArr }));
                dispatch(setScrapped({ education: true }));
                dispatch(setScrapping({ education: false }));
              } catch (error) {
                // console.log("Error in sorting education array: ", error);
                dispatch(setScrapped({ education: true }));
                dispatch(setScrapping({ education: false }));
              }
            } else {
              dispatch(setScrapped({ education: true }));
              dispatch(setScrapping({ education: false }));
            }
          } else {
            dispatch(setScrapped({ education: true }));
            dispatch(setScrapping({ education: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ education: true }));
          dispatch(setScrapping({ education: false }));
        });
    }
  };

  const writeBasicSummaryFromResume = async () => {
    const formData = {
      content: register.scrappedContent,
      trainBotData: {
        userEmail: userData.email,
        fileAddress: userData.defaultResumeFile,
      },
    };

    fetch("/api/homepage/writeSummary", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (resp) => {
        const res = await resp.json();
        if (res.success) {
          if (res.result) {
            dispatch(setField({ name: "summary", value: res.result }));
          }
        }
      })
      .catch((error) => {});
  };

  const fetchCertificatesDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.certifications === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.certifications === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ certifications: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchCertificationsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.certifications.map((item) => {
                  return {
                    id: makeid(),
                    title: item?.title,
                    issuingOrganization: item?.issuingOrganization,
                    date: item?.date,
                    description: item?.description,
                  };
                });

                dispatch(setStepSix({ list: formattedArr }));
                dispatch(setScrapped({ certifications: true }));
                dispatch(setScrapping({ certifications: false }));
              } catch (error) {
                // console.log("Error in sorting certifications array: ", error);
                dispatch(setScrapped({ certifications: true }));
                dispatch(setScrapping({ certifications: false }));
              }
            } else {
              dispatch(setScrapped({ certifications: true }));
              dispatch(setScrapping({ certifications: false }));
            }
          } else {
            dispatch(setScrapped({ certifications: true }));
            dispatch(setScrapping({ certifications: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ certifications: true }));
          dispatch(setScrapping({ certifications: false }));
        });
    }
  };

  const fetchAwardsDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.awards === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.awards === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ awards: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchAwardsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.awards.map((item) => {
                  return {
                    id: makeid(),
                    title: item?.title,
                    awardingOrganization: item?.awardingOrganization,
                    date: item?.date,
                    description: item?.description,
                  };
                });

                dispatch(setStepNine({ list: formattedArr }));
                dispatch(setScrapped({ awards: true }));
                dispatch(setScrapping({ awards: false }));
              } catch (error) {
                // console.log("Error in sorting awards array: ", error);
                dispatch(setScrapped({ awards: true }));
                dispatch(setScrapping({ awards: false }));
              }
            } else {
              dispatch(setScrapped({ awards: true }));
              dispatch(setScrapping({ awards: false }));
            }
          } else {
            dispatch(setScrapped({ awards: true }));
            dispatch(setScrapping({ awards: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ awards: true }));
          dispatch(setScrapping({ awards: false }));
        });
    }
  };
  const fetchInterestsDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.interests === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.interests === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ languages: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchHobbiesData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.interests.map((item) => {
                  return {
                    id: makeid(),
                    description: item,
                  };
                });

                dispatch(setStepTen({ list: formattedArr }));
                dispatch(setScrapped({ interests: true }));
                dispatch(setScrapping({ interests: false }));
              } catch (error) {
                // console.log("Error in sorting interests array: ", error);
                dispatch(setScrapped({ interests: true }));
                dispatch(setScrapping({ interests: false }));
              }
            } else {
              dispatch(setScrapped({ interests: true }));
              dispatch(setScrapping({ interests: false }));
            }
          } else {
            dispatch(setScrapped({ interests: true }));
            dispatch(setScrapping({ interests: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ interests: true }));
          dispatch(setScrapping({ interests: false }));
        });
    }
  };
  const fetchLanguagesDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.languages === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.languages === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ languages: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchLanguagesData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.languages.map((item) => {
                  return {
                    id: makeid(),
                    language: item?.language,
                    proficiency: item?.proficiency,
                  };
                });

                dispatch(setStepEleven({ list: formattedArr }));
                dispatch(setScrapped({ languages: true }));
                dispatch(setScrapping({ languages: false }));
              } catch (error) {
                // console.log("Error in sorting interests array: ", error);
                dispatch(setScrapped({ languages: true }));
                dispatch(setScrapping({ languages: false }));
              }
            } else {
              dispatch(setScrapped({ languages: true }));
              dispatch(setScrapping({ languages: false }));
            }
          } else {
            dispatch(setScrapped({ languages: true }));
            dispatch(setScrapping({ languages: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ languages: true }));
          dispatch(setScrapping({ languages: false }));
        });
    }
  };
  const fetchReferencesDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.references === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.references === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ references: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchReferencesData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.references.map((item) => {
                  return {
                    id: makeid(),
                    name: item?.name,
                    position: item?.position,
                    company: item?.company,
                    contactInformation: item?.contactInformation,
                  };
                });

                dispatch(setStepTwelve({ list: formattedArr }));
                dispatch(setScrapped({ references: true }));
                dispatch(setScrapping({ references: false }));
              } catch (error) {
                // console.log("Error in sorting interests array: ", error);
                dispatch(setScrapped({ references: true }));
                dispatch(setScrapping({ references: false }));
              }
            } else {
              dispatch(setScrapped({ references: true }));
              dispatch(setScrapping({ references: false }));
            }
          } else {
            dispatch(setScrapped({ references: true }));
            dispatch(setScrapping({ references: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ references: true }));
          dispatch(setScrapping({ references: false }));
        });
    }
  };
  const fetchProjectsDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.projects === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.projects === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ projects: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchProjectsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.projects.map((item) => {
                  return {
                    id: makeid(),
                    title: item?.title,
                    description: item?.description,
                  };
                });

                dispatch(setStepFourteen({ list: formattedArr }));
                dispatch(setScrapped({ projects: true }));
                dispatch(setScrapping({ projects: false }));
              } catch (error) {
                // console.log("Error in sorting interests array: ", error);
                dispatch(setScrapped({ projects: true }));
                dispatch(setScrapping({ projects: false }));
              }
            } else {
              dispatch(setScrapped({ projects: true }));
              dispatch(setScrapping({ projects: false }));
            }
          } else {
            dispatch(setScrapped({ projects: true }));
            dispatch(setScrapping({ projects: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ projects: true }));
          dispatch(setScrapping({ projects: false }));
        });
    }
  };
  const fetchPublicationsDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.publications === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.publications === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ publications: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchPublicationsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.publications.map((item) => {
                  return {
                    id: makeid(),
                    title: item?.title,
                    publisher: item?.publisher,
                    date: item?.date,
                    description: item?.description,
                  };
                });

                dispatch(setStepEight({ list: formattedArr }));
                dispatch(setScrapped({ publications: true }));
                dispatch(setScrapping({ publications: false }));
              } catch (error) {
                // console.log("Error in sorting interests array: ", error);
                dispatch(setScrapped({ publications: true }));
                dispatch(setScrapping({ publications: false }));
              }
            } else {
              dispatch(setScrapped({ publications: true }));
              dispatch(setScrapping({ publications: false }));
            }
          } else {
            dispatch(setScrapped({ publications: true }));
            dispatch(setScrapping({ publications: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ publications: true }));
          dispatch(setScrapping({ publications: false }));
        });
    }
  };

  const fetchExperienceDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.workExperience === false) &&
      register.scrapping.workExperience === false &&
      register.scrappedContent !== ""
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ workExperience: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchExperienceData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();

          if (res.success) {
            if (res?.result) {
              let data;
              if (typeof res.result === "object") {
                data = res.result;
              } else {
                data = await JSON.parse(res.result);
              }

              const experiencesWithTitle = data?.experiences;
              // loop through this array and call an api for individual one
              // if the result of an api is not done donot make call to another api

              const promises = [];
              experiencesWithTitle.map((experience, index) => {
                const promise = axios
                  .post("/api/homepage/fetchExperienceIndividualTrainedModel", {
                    content: register.scrappedContent,
                    jobTitle: experience?.jobTitle,
                    company: experience?.company,
                    trainBotData: {
                      userEmail: userData.email,
                      fileAddress: userData.defaultResumeFile,
                    },
                    timeout: 120000, // abort api call after 2 minutes
                  })
                  .then(async (resp) => {
                    const res = resp.data;
                    if (res.success) {
                      try {
                        let otherFields;
                        if (typeof res.result === "object") {
                          otherFields = res.result;
                        } else {
                          otherFields = await JSON.parse(res.result);
                        }
                        return {
                          jobTitle: experience?.jobTitle,
                          company: experience?.company,
                          ...otherFields,
                        };
                      } catch (error) {
                        // skip this promise
                      }
                    }
                  });

                promises.push(promise);
              });

              let completeExperiences = [];
              // wait for all the promises in the promises array to resolve
              Promise.all(promises)
                .then((results) => {
                  completeExperiences = results;

                  const formattedArr = completeExperiences.map((item) => {
                    return {
                      id: makeid(),
                      jobTitle: item?.jobTitle,
                      company: item?.company,
                      country: item?.country,
                      cityState: item?.cityState,
                      fromMonth: item?.fromMonth,
                      fromYear: item?.fromYear,
                      isContinue: item?.isContinue,
                      toMonth: item?.toMonth,
                      toYear: item?.toYear,
                      description: item?.description,
                    };
                  });
                  // Sort the array by fromYear and fromMonth
                  try {
                    // formattedArr.sort((a: any, b: any) => {
                    //   const yearComparison = a.fromYear.localeCompare(
                    //     b.fromYear
                    //   );
                    //   if (yearComparison !== 0) {
                    //     return yearComparison;
                    //   }
                    //   return a.fromMonth.localeCompare(b.fromMonth);
                    // });
                    // formattedArr.reverse();

                    formattedArr.sort((a, b) => {
                      const hasFromMonthA = a.hasOwnProperty("fromMonth");
                      const hasFromMonthB = b.hasOwnProperty("fromMonth");
                      const hasToYearA = a.hasOwnProperty("toYear");
                      const hasToYearB = b.hasOwnProperty("toYear");

                      if (hasFromMonthA && hasFromMonthB) {
                        // Both objects have fromMonth property
                        const yearComparison = a.fromYear.localeCompare(
                          b.fromYear
                        );
                        if (yearComparison !== 0) {
                          return yearComparison;
                        }

                        const monthComparison = a.fromMonth.localeCompare(
                          b.fromMonth
                        );
                        return monthComparison;
                      } else if (
                        (!hasFromMonthA && hasFromMonthB) ||
                        (hasFromMonthA && !hasFromMonthB)
                      ) {
                        // Only one object has fromMonth property
                        // Sort these cases based on the presence of fromMonth
                        return hasFromMonthA ? -1 : 1; // Place object with fromMonth before the one without it
                      } else {
                        // Neither object has fromMonth property
                        const fromYearComparison = a.fromYear.localeCompare(
                          b.fromYear
                        );
                        if (fromYearComparison !== 0) {
                          return fromYearComparison;
                        }

                        // Check if both objects have toYear property
                        if (hasToYearA && hasToYearB) {
                          // Compare based on toYear if fromYear is the same
                          return a.toYear.localeCompare(b.toYear);
                        } else {
                          // If only one object has toYear property, sort based on its presence
                          return hasToYearA ? -1 : 1; // Place object with toYear before the one without it
                        }
                      }
                    });
                    formattedArr.reverse();
                  } catch (error) {
                    // console.log("Error in sorting experience array: ", error);
                  }
                  // console.log("formattedArr: ", formattedArr);

                  dispatch(setStepFive({ list: formattedArr }));
                  dispatch(setScrapped({ workExperience: true }));
                  dispatch(setScrapping({ workExperience: false }));
                })
                .catch(() => {
                  dispatch(setScrapped({ workExperience: true }));
                  dispatch(setScrapping({ workExperience: false }));
                });
            } else {
              dispatch(setScrapped({ workExperience: true }));
              dispatch(setScrapping({ workExperience: false }));
            }
          } else {
            dispatch(setScrapped({ workExperience: true }));
            dispatch(setScrapping({ workExperience: false }));
          }
        })
        .catch((err) => {
          dispatch(setScrapped({ workExperience: true }));
          dispatch(setScrapping({ workExperience: false }));
        });
    }
  };

  const fetchSkillsDataFromResume = () => {
    if (
      register.scrapped.skills === false &&
      register.scrapping.skills === false &&
      register.scrappedContent !== ""
    ) {
      dispatch(setScrapping({ skills: true }));
      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchSkillsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();

          if (res.success && res?.result) {
            let result;
            if (typeof res.result === "object") {
              result = res.result;
            } else {
              result = await JSON.parse(res.result);
            }
            try {
              dispatch(setScrapped({ skills: true }));
              dispatch(setScrapping({ skills: false }));
              dispatch(setStepThirteen({ list: result }));
            } catch (error) {
              dispatch(setScrapped({ skills: true }));
              dispatch(setScrapping({ skills: false }));
            }
          } else {
            dispatch(setScrapped({ skills: true }));
            dispatch(setScrapping({ skills: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ skills: true }));
          dispatch(setScrapping({ skills: false }));
        });
    }
  };
  const fetchTrainingsDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.trainings === false) &&
      register.scrappedContent !== "" &&
      register.scrapping.trainings === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ trainings: true }));

      const formData = {
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchTrainingsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
                const formattedArr = data?.trainings.map((item) => {
                  return {
                    id: makeid(),
                    name: item?.language,
                    position: item?.proficiency,
                    company: item?.company,
                    contactInformation: item?.contactInformation,
                  };
                });

                dispatch(setStepSeven({ list: formattedArr }));
                dispatch(setScrapped({ trainings: true }));
                dispatch(setScrapping({ trainings: false }));
              } catch (error) {
                // console.log("Error in sorting interests array: ", error);
                dispatch(setScrapped({ trainings: true }));
                dispatch(setScrapping({ trainings: false }));
              }
            } else {
              dispatch(setScrapped({ trainings: true }));
              dispatch(setScrapping({ trainings: false }));
            }
          } else {
            dispatch(setScrapped({ trainings: true }));
            dispatch(setScrapping({ trainings: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ trainings: true }));
          dispatch(setScrapping({ trainings: false }));
        });
    }
  };
  const updateUser = async () => {
    // Make an object
    const obj = {
      firstName: register.stepOne.firstName,
      lastName: register.stepOne.lastName,
      summary: userData.summary,
      email: userData.email,
      linkedin: register.stepTwo.linkedin,
      file: resume.uploadedFileName,
      phone: register.stepTwo.phoneNumber,
      contact: {
        country: register.stepThree.country,
        street: register.stepThree.street,
        cityState: register.stepThree.cityState,
        postalCode: register.stepThree.postalCode,
      },
      education: register.stepFour.list,
      certifications: register.stepSix.list,
      publications: register.stepEight.list,
      references: register.stepTwelve.list,
      trainings: register.stepSeven.list,
      languages: register.stepEleven.list,
      interests: register.stepTen.list,
      awards: register.stepNine.list,
      experience: register.stepFive.list,
      skills: register.stepThirteen.list,
      projects: register.stepFourteen.list,
      wizardCompleted: true,
    };

    return axios
      .post("/api/users/updateUserData", {
        data: obj,
      })
      .then(async (resp) => {
        if (window) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  // watch scrapped data and if all scrapped data is scrapped
  useEffect(() => {
    if (
      register.scrapped.basic &&
      register.scrapped.education &&
      register.scrapped.workExperience &&
      register.scrapped.skills
    ) {
      updateUser();
    }
  }, [register.scrapped]);

  // if the user data loaded, data scrapped, profile wizard isn't completed Make profile from resume
  useEffect(() => {
    if (userData.email !== "") {
      createProfileFromResume();
    }
    // const confirmExit = (e) => {
    //   // Display a confirmation message when leaving or refreshing the page
    //   e.returnValue =
    //     "You are leaving this page, your changes are not saved, you will lose your data.";
    // };

    // // Listen for the beforeunload event
    // window.addEventListener("beforeunload", confirmExit);

    // return () => {
    //   // Remove the event listener when the component unmounts
    //   window.removeEventListener("beforeunload", confirmExit);
    // };
  }, [userData.email]);

  // Handle free package assignment when wizard is completed but no package
  useEffect(() => {
    if (
      userData.email &&
      userData.wizardCompleted &&
      pathname !== "/subscribe" &&
      pathname !== "/subscribed" &&
      (userData.creditPackage === "" || userData.userCredits === 0)
    ) {
      updateUserWithFreePackage();
    }
  }, [
    userData.email,
    userData.wizardCompleted,
    userData.creditPackage,
    userData.userCredits,
    pathname,
  ]);

  const updateUserWithFreePackage = async () => {
    const creditPackageId = await getPackageID();
    if (creditPackageId) {
      const creditPackage = await getCreditPackageDetails(creditPackageId);

      if (creditPackage) {
        const obj = {
          email: userData.email,
          creditPackage: creditPackage._id,
          userCredits: creditPackage.totalCredits,
          totalCredits: creditPackage.totalCredits,
        };
        // TODO!! move this code to backeND

        await axios
          .post("/api/users/updateUserData", {
            data: obj,
          })
          .then(async (resp) => {
            if (resp.data.success) {
              dispatch(
                setUserData({
                  ...userData,
                  creditPackage: obj.creditPackage,
                  userCredits: obj.userCredits,
                })
              );
              if (goToProfile === "true") {
                router.replace(`/profile/${userData._id}`);
              } else {
                router.push("/dashboard");
              }
            }
            // TODO!!! Add new user subsription to db
            // TODO!! invalidate session on stripe
          });
      }
    }
  };

  const getCreditPackageDetails = async (creditPackageId) => {
    // get user package details
    const res2 = await fetch(
      `/api/users/getCreditPackageDetails?id=${creditPackageId}`
    );
    const data = await res2.json();

    if (data.success) {
      const creditPackage = data.result;
      return creditPackage;
      // set user package details to redux
    }

    return null;
  };
  // RENDERING LOGIC BLOW !!!!!!

  // if the user data is still loading
  if (userData.email === "") {
    return (
      <div className="flex flex-col items-center justify-center h-screen pt-30">
        {/* <h2 className="text-3xl font-bold text-center">Loading...</h2> */}
        <div className="fixed top-0 left-0 w-full h-screen  bg-gradient-to-bl from-[#340e53] via-[#000533] to-[#010111]  text-white  z-[9999] flex flex-col justify-center items-center">
          <Image
            src="/logo.png"
            alt="careercraft Logo Icon"
            className="animate-ping"
            width={100}
            height={100}
          />
        </div>
      </div>
    );
  }

  // if the user data is loaded and profile wizard is completed
  // return page content as it is
  if (userData.email && userData.wizardCompleted) {
    return <>{children}</>;
  } else {
    /// if the user data is loaded and profile wizard is NOT completed show loader
    return (
      <div className="flex flex-col items-center justify-center h-screen pt-30 !pb-42">
        <h2 className="text-3xl font-bold text-center">
          Welcome {userData?.firstName + " " + userData?.lastName}
        </h2>

        <div className="my-10">
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          }
        </div>
        <p className="text-center mb-4">
          Please wait! We are scanning your resume.
        </p>
        {showStuckError && (
          <p className="text-center mb-10">
            Stuck on this page for longer than expected? &nbsp;
            <Link href="/contact" target="_blank">
              Click here
            </Link>
            &nbsp; to report the issue for a quick fix
          </p>
        )}

        <div className="md:w-1/3 mx-2">
          <DidYouKnowCard />
        </div>
      </div>
    );
  }
};
export default ProfileCreationLayer;
