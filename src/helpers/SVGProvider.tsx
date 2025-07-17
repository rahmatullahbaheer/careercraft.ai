"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

const SVGProvider = ({ type }: { type: string }) => {
  const { theme } = useTheme();
  if (type === "svg1") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] dark:bg-gradient-to-l dark:from-rgba-50-51-55-0.4 dark:via-transparent dark:to-rgba-70-79-111-0.2 text-[#0000ff9c] bg-[#0d6efd] dark:text-[#e6f85e] dark:border-white dark:border-opacity-10 border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20"></path>
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10 29.334 6.667 27.5v-4.166m0-6.668V12.5L10 10.666m6.667-3.833L20 5l3.334 1.833M30 10.666l3.333 1.834v4.166m0 6.668V27.5L30 29.367m-6.666 3.799L20 35l-3.333-1.834M20 20l3.333-1.834M30 14.333l3.333-1.833M20 20v4.167m0 6.667V35m0-15-3.333-1.867M10 14.333 6.667 12.5"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }

  if (type === "svg2") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20" />
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z" />
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20"></path>
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "svg3") {
    return (
      <>
        {theme === "dark" ? (
          <div className="  icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M30.167 10c-1.833 4.855-3.167 8.188-4 10m0 0c-3.132 6.813-6.188 10-10 10-4 0-8-4-8-10s4-10 8-10c3.778 0 6.892 3.31 10 10Zm0 0c.853 1.837 2.187 5.17 4 10" />
              </g>
            </svg>
          </div>
        ) : (
          <div className="  icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary text-primary border-primary bg-opacity-10 dark:bg-gradient-3   dark:text-[#0000ff9c] dark:text-[#e6f85e]  dark:border-white border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M30.167 10c-1.833 4.855-3.167 8.188-4 10m0 0c-3.132 6.813-6.188 10-10 10-4 0-8-4-8-10s4-10 8-10c3.778 0 6.892 3.31 10 10Zm0 0c.853 1.837 2.187 5.17 4 10" />
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "svg4") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20"></path>
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20"></path>
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "featuresvg1") {
    return (
      <>
        {theme === "dark" ? (
          <div className="feature-img">
            <Image
              width={506}
              height={555}
              src="assets/images/illustrations/feature-illustration-1-dark.svg"
              alt=""
              className="img-fluid"
            />
          </div>
        ) : (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-1-blue.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        )}
      </>
    );
  }
  if (type === "featuresvg2") {
    return (
      <>
        {theme === "dark" ? (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-1-dark.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        ) : (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-1-blue.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        )}
      </>
    );
  }
  if (type === "featuresvg3") {
    return (
      <>
        {theme === "dark" ? (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-2-dark.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        ) : (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-2-blue.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        )}
      </>
    );
  }
  if (type === "featuresvg4") {
    return (
      <>
        {theme === "dark" ? (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-3-dark.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        ) : (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-3-blue.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        )}
      </>
    );
  }
  if (type === "featuresvg5") {
    return (
      <>
        {theme === "dark" ? (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-1-dark.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        ) : (
          <div className="feature-img">
            <Image
              src="assets/images/illustrations/feature-illustration-1-blue.svg"
              alt=""
              width={506}
              height={555}
              className="img-fluid"
            />
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg1") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M13.333 35h13.334A8.333 8.333 0 0 0 35 26.667v-5a5 5 0 0 0-5-5h-1.667v-3.334A8.333 8.333 0 0 0 20 5h-6.667A8.333 8.333 0 0 0 5 13.333v13.334A8.333 8.333 0 0 0 13.333 35Z"></path>
                <path d="M11.667 14.167a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 1 1 0 5h-5a2.5 2.5 0 0 1-2.5-2.5Zm0 11.666a2.5 2.5 0 0 1 2.5-2.5h11.666a2.5 2.5 0 1 1 0 5H14.167a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M13.333 35h13.334A8.333 8.333 0 0 0 35 26.667v-5a5 5 0 0 0-5-5h-1.667v-3.334A8.333 8.333 0 0 0 20 5h-6.667A8.333 8.333 0 0 0 5 13.333v13.334A8.333 8.333 0 0 0 13.333 35Z"></path>
                <path d="M11.667 14.167a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 1 1 0 5h-5a2.5 2.5 0 0 1-2.5-2.5Zm0 11.666a2.5 2.5 0 0 1 2.5-2.5h11.666a2.5 2.5 0 1 1 0 5H14.167a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg2") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M8 18.667a5.333 5.333 0 0 1 5.333-5.334h37.334A5.334 5.334 0 0 1 56 18.667v26.666a5.333 5.333 0 0 1-5.333 5.334H13.333A5.333 5.333 0 0 1 8 45.333V18.667Z"></path>
                <path d="M18.667 40V29.333a5.334 5.334 0 0 1 10.666 0V40m-10.666-5.333h10.666m16-10.667v16h-4a4 4 0 1 1 4-4"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M8 18.667a5.333 5.333 0 0 1 5.333-5.334h37.334A5.334 5.334 0 0 1 56 18.667v26.666a5.333 5.333 0 0 1-5.333 5.334H13.333A5.333 5.333 0 0 1 8 45.333V18.667Z"></path>
                <path d="M18.667 40V29.333a5.334 5.334 0 0 1 10.666 0V40m-10.666-5.333h10.666m16-10.667v16h-4a4 4 0 1 1 4-4"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg3") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10.667 13.333a2.667 2.667 0 0 1 2.666-2.666h37.334a2.667 2.667 0 0 1 2.666 2.666v37.334a2.667 2.667 0 0 1-2.666 2.666H13.333a2.667 2.667 0 0 1-2.666-2.666V13.333Zm0 8h42.666m-32-10.666v10.666"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10.667 13.333a2.667 2.667 0 0 1 2.666-2.666h37.334a2.667 2.667 0 0 1 2.666 2.666v37.334a2.667 2.667 0 0 1-2.666 2.666H13.333a2.667 2.667 0 0 1-2.666-2.666V13.333Zm0 8h42.666m-32-10.666v10.666"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg4") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M24 32a8 8 0 1 0 16.001 0A8 8 0 0 0 24 32Z"></path>
                <path d="M10.667 32a21.334 21.334 0 1 0 42.667 0 21.334 21.334 0 0 0-42.667 0ZM32 5.333v5.334m0 42.666v5.334M53.333 32h5.334M5.333 32h5.334"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M24 32a8 8 0 1 0 16.001 0A8 8 0 0 0 24 32Z"></path>
                <path d="M10.667 32a21.334 21.334 0 1 0 42.667 0 21.334 21.334 0 0 0-42.667 0ZM32 5.333v5.334m0 42.666v5.334M53.333 32h5.334M5.333 32h5.334"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg5") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M34.667 13.333H56M34.667 24H48M34.667 40H56M34.667 50.667H48M8 13.333a2.667 2.667 0 0 1 2.667-2.666h10.666A2.667 2.667 0 0 1 24 13.333V24a2.667 2.667 0 0 1-2.667 2.667H10.667A2.667 2.667 0 0 1 8 24V13.333ZM8 40a2.667 2.667 0 0 1 2.667-2.667h10.666A2.667 2.667 0 0 1 24 40v10.667a2.667 2.667 0 0 1-2.667 2.666H10.667A2.667 2.667 0 0 1 8 50.667V40Z"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M34.667 13.333H56M34.667 24H48M34.667 40H56M34.667 50.667H48M8 13.333a2.667 2.667 0 0 1 2.667-2.666h10.666A2.667 2.667 0 0 1 24 13.333V24a2.667 2.667 0 0 1-2.667 2.667H10.667A2.667 2.667 0 0 1 8 24V13.333ZM8 40a2.667 2.667 0 0 1 2.667-2.667h10.666A2.667 2.667 0 0 1 24 40v10.667a2.667 2.667 0 0 1-2.667 2.666H10.667A2.667 2.667 0 0 1 8 50.667V40Z"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg6") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M8 13.333a2.667 2.667 0 0 1 2.667-2.666h42.666A2.667 2.667 0 0 1 56 13.333V40a2.667 2.667 0 0 1-2.667 2.667H10.667A2.667 2.667 0 0 1 8 40V13.333Zm10.667 40h26.666M24 42.667v10.666m16-10.666v10.666M24 32v-3.2m8 3.2v-5.6m8 5.6V21.6"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M8 13.333a2.667 2.667 0 0 1 2.667-2.666h42.666A2.667 2.667 0 0 1 56 13.333V40a2.667 2.667 0 0 1-2.667 2.667H10.667A2.667 2.667 0 0 1 8 40V13.333Zm10.667 40h26.666M24 42.667v10.666m16-10.666v10.666M24 32v-3.2m8 3.2v-5.6m8 5.6V21.6"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg7") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10.667 21.333a10.667 10.667 0 0 1 10.666-10.666h21.334a10.667 10.667 0 0 1 10.666 10.666v21.334a10.667 10.667 0 0 1-10.666 10.666H21.333a10.667 10.667 0 0 1-10.666-10.666V21.333Z"></path>
                <path d="M24 21.333a8 8 0 0 0 16 0"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10.667 21.333a10.667 10.667 0 0 1 10.666-10.666h21.334a10.667 10.667 0 0 1 10.666 10.666v21.334a10.667 10.667 0 0 1-10.666 10.666H21.333a10.667 10.667 0 0 1-10.666-10.666V21.333Z"></path>
                <path d="M24 21.333a8 8 0 0 0 16 0"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "usecasesvg8") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-gradient-3 text-[#0000ff9c] dark:text-[#e6f85e] border-white border-opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M32 10.667 10.667 21.333 32 32l21.333-10.667L32 10.667ZM10.667 32 32 42.667 53.333 32M10.667 42.667 32 53.333l21.333-10.666"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border-[1px] bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M32 10.667 10.667 21.333 32 32l21.333-10.667L32 10.667ZM10.667 32 32 42.667 53.333 32M10.667 42.667 32 53.333l21.333-10.666"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
  if (type === "aboutimage") {
    return (
      <>
        {theme === "dark" ? (
          <div className="text-center">
            <Image
              width={530}
              height={491}
              className="img-fluid d-inline-block"
              src="/assets/images/screens/screen-4.png"
              alt=""
            />
          </div>
        ) : (
          <div className="text-center">
            <Image
              width={530}
              height={491}
              className="img-fluid d-inline-block"
              src="/assets/images/screens/screen-8.png"
              alt=""
            />
          </div>
        )}
      </>
    );
  }
  if (type === "aboutimage1") {
    return (
      <>
        {theme === "dark" ? (
          <div className="d-flex gap-8 align-center justify-center mt-12 review-badges">
            <Image
              width={185}
              height={38}
              className="img-fluid"
              src="assets/images/review-logos/trustpilot_reviews.svg"
              alt=""
            />
            <Image
              width={185}
              height={38}
              className="img-fluid"
              src="assets/images/review-logos/capterra_reviews.svg"
              alt=""
            />
          </div>
        ) : (
          <div className="d-flex gap-8 align-center justify-center mt-12 review-badges">
            <Image
              width={185}
              height={38}
              className="img-fluid"
              src="assets/images/review-logos/trustpilot_reviews_2.svg"
              alt=""
            />
            <Image
              width={185}
              height={38}
              className="img-fluid"
              src="assets/images/review-logos/capterra_reviews_2.svg"
              alt=""
            />
          </div>
        )}
      </>
    );
  }
};

export default SVGProvider;
