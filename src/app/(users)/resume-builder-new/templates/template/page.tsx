"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import { useDispatch, useSelector } from "react-redux";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import { useSession } from "next-auth/react";
import { setUserData } from "@/store/userDataSlice";
import { setResume } from "@/store/resumeSlice";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { chevronRight } from "@/helpers/iconsProvider";
import TourBot from "@/components/dashboard/TourBot";
import { useTourContext } from "@/context/TourContext";
import { useAppContext } from "@/context/AppContext";
import { RootState } from "@/store/store";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: RootState) => state);
  const { data: session } = useSession();
  const [refTop, setRefTop] = useState<number | null>(null);
  const [refLeft, setRefLeft] = useState<number | null>(null);
  const [scaleHeight, setScaleHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { outOfCredits } = useAppContext();
  const { availableCreditsRef, tourBotRef } = useTourContext();
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
  useEffect(() => {
    if (outOfCredits) {
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);
  const fetchDefaultResume = async () => {
    try {
      
      const res = await fetch(
        `/api/users/getOneByEmail?email=${session?.user?.email}`
      );
  
      const { result, success } = await res.json();
  
      if (success) {
        dispatch(setUserData(result));
        dispatch(setResume(result.resumes[0]));
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!resume.id) {
      fetchDefaultResume();
    }
  }, []);

  const [activeTemplate, setActiveTemplate] = useState<number>(0);

  useEffect(() => {
    if (templateId) {
      const activeIndex = ALL_TEMPLATES.filter(
        (template) => template.active
      ).findIndex((template) => template.id == templateId);
      if (activeIndex !== -1) {
        setActiveTemplate(activeIndex);
      }
    }
  }, [templateId]);

  useLayoutEffect(() => {
    if (componentRef.current && isMobile) {
      const height = Math.floor(componentRef.current.offsetHeight * 0.5 + 90);
      setScaleHeight(height);
      const refTop = Math.floor(
        (540 / 2275) * componentRef.current.offsetHeight
      );
      setRefTop(refTop);
      const width = Math.floor((175 / 390) * window.innerWidth);
      setRefLeft(width);
    }
  }, [componentRef.current, templateId]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="lg:ml-[234px] ml-0 px-[15px]">
        <RecentResumeCard componentRef={componentRef} templateId={templateId} />
        <div>
          <div className="flex items-center xs:flex-col md:flex-row justify-between pt-4 pb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase dark:text-white">
              Templates Designs
            </h2>
            <Link
              href="/resume-builder/templates"
              className="overflow-hidden xs:mt-3 md:mt-0 text-white no-underline rounded-lg"
            >
              <div
                className={`text-xs font-bold bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent flex items-center gap-2 text-center p-2`}
              >
                View All Templates<i className="">{chevronRight}</i>
              </div>
            </Link>
          </div>
          {pathname === "/resume-builder/templates" ? (
            <TemplateSlider
              templates={ALL_TEMPLATES.filter((template) => template.active)}
            />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 ">
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                rewind={true}
                speed={1200}
                navigation={true}
                autoplay={{ delay: 8500, disableOnInteraction: false }}
                modules={[Autoplay, Navigation]}
                className=""
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                  },
                  425: {
                    slidesPerView: 3,
                  },
                  640: {
                    slidesPerView: 4,
                  },
                  768: {
                    slidesPerView: 5,
                  },
                  1080: {
                    slidesPerView: 6,
                  },
                  1280: {
                    slidesPerView: 6,
                  },
                }}
              >
                {ALL_TEMPLATES.filter((template) => template.active).map(
                  (template, index) => (
                    <SwiperSlide key={`template-${index}`}>
                      <div
                        key={`template-${index}`}
                        className={`${
                          index === activeTemplate
                            ? " border-2 border-gray-950/80 dark:border-gray-100 rounded-md p-2 "
                            : " "
                        }box-border relative flex items-center overflow-hidden rounded-lg group`}
                      >
                        <Link
                          className="no-underline"
                          href={`/resume-builder/templates/template?templateId=${template.id}`}
                        >
                          <div className="absolute top-0 left-0 hidden w-full h-full overflow-hidden text-white rounded-lg group-hover:grid bg-slate-600/60 place-content-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                              />
                            </svg>
                          </div>
                          <Image
                            src={template.preview}
                            alt={`template-${index}`}
                            height={200}
                            width={150}
                            className="rounded-lg "
                          />
                          {templateId === index + 1 ? (
                            ""
                          ) : (
                            <div className="absolute top-0 left-0 hidden w-full h-full overflow-hidden text-white group-hover:grid bg-slate-600/60 place-content-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                                />
                              </svg>
                            </div>
                          )}

                          <div className="text-center h-full  absolute inset-0 flex justify-center items-center text-[#000] text-sm font-medium">
                            {index === activeTemplate && (
                              <span className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="3.5"
                                  stroke="currentColor"
                                  className="w-8 h-8 text-[#fff]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          )}
        </div>

        <div
          id="outerScaleDiv"
          className="my-10"
          style={{
            height: isMobile ? scaleHeight + "px" : undefined,
          }}
        >
          {resume &&
            (resume?.name || resume?.contact?.email || resume?.summary) && (
              <>
                <div className="xl:w-[75%] lg:w-[68%] md:w-[73%] xs:w-full xs:flex xs:justify-center md:inline-block xs:pb-0 md:pb-4 ">
                  <Link
                    href="/resume-builder"
                    // className="w-2 overflow-hidden text-white no-underline rounded-lg"
                    className={`text-[#fff] bg-gradient-to-r no-underline w-fit hover:from-purple-800 hover:to-pink-600 from-[#b324d7]  to-[#615dff] flex flex-row justify-center items-center gap-2 py-2 px-[26px]  rounded-full`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-100 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                    Generate New Resume
                  </Link>
                </div>
                <div className=" md:w-fit whitespace-nowrap xs:w-full xs:mt-4 xs:flex xs:justify-center md:inline-block gap-3 xs:pb-0 md:pb-4 md:sticky top-4 right-0 z-[35]">
                  <Link
                    className="no-underline"
                    href={`/resume-builder/preview-resume?templateId=${templateId}&resumeId=${resume.id}`}
                  >
                    <div
                      className={`flex flex-row gap-2 items-center xs:flex-1 lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full  bg-[#e4e9f7]  dark:bg-[#18181b] text-gray-900  dark:text-gray-300 border-[1px] border-gray-950/80 dark:border-[#f0f0f0] `}
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
                      Download / Print Preview
                    </div>
                  </Link>
                </div>

                <div
                  className="xs:relative"
                  style={{
                    top: isMobile ? "-" + refTop + "px" : undefined,
                    left: isMobile ? "-" + refLeft + "px" : undefined,
                  }}
                >
                  <div
                    ref={componentRef}
                    className={` bg-white xs:scale-50 xs:w-[200%] xs:absolute md:relative  md:w-[100%]  w-[100%] md:top-[0px] md:left-[0px] md:scale-100 scale-100`}
                  >
                    {ALL_TEMPLATES[templateId - 1].active ? (
                      ALL_TEMPLATES[templateId - 1].template({})
                    ) : (
                      <div className="grid w-full text-gray-700 place-content-center h-28">
                        <span className="block p-4 font-semibold uppercase border">
                          Template is In-Active
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="justify-end py-3 xs:hidden md:flex">
                  <Link
                    href="/resume-builder/templates"
                    className="overflow-hidden text-white no-underline rounded-lg"
                  >
                    <div
                      className={` font-bold bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent flex items-center gap-2 text-center py-1 px-2`}
                    >
                      View All Templates<i className="">{chevronRight}</i>
                    </div>
                  </Link>
                </div>
              </>
            )}
        </div>
      </div>
      {outOfCredits && (
        <TourBot config={tourBotConfig2}/>
      )}
    </>
  );
};

export default Template;
