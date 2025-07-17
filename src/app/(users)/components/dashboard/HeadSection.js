import Image from "next/image";
import React from "react";

function HeadSection() {
  return (
    <div className=" w-full p-5 bg-white rounded-md shadow-[0px_3px_5px_0px_rgba(46,38,61,0.10)] inline-flex flex-col justify-center items-start gap-5">
      <div className=" h-8 ">
        <div className="justify-start text-zinc-700/90 text-2xl font-medium font-['Inter'] capitalize leading-loose">
          dashboard
        </div>
      </div>
      <div className="inline-flex justify-start items-start gap-5 flex-wrap content-start">
        <div className="md:w-[320px] lg:w-[320px] xl:w-[490px] h-32 px-5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b border-yellow-500 inline-flex flex-col justify-start items-start">
          <div className="w-44 flex-1 inline-flex justify-start items-center gap-3">
            <div className="w-10 h-10 p-2 bg-yellow-500 rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center flex-wrap content-center">
              <Image src="/icons/1.png" alt="logo" width={100} height={100} />
            </div>
            <div className="w-32 inline-flex flex-col justify-start items-start">
              <div className="w-36 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                Generate Resume
              </div>
              <div className="self-stretch justify-start text-Theme-text-primary/90 text-lg font-medium font-['Inter'] leading-7">
                9
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[320px] lg:w-[320px] xl:w-[490px] h-32 px-5 py-2.5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b border-purple-500 inline-flex flex-col justify-center items-start gap-2.5">
          <div className="w-44 flex-1 inline-flex justify-start items-center gap-3">
            <div className="w-10 h-10 p-2 bg-purple-500 rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <div className="w-48 inline-flex flex-col justify-start items-start">
              <div className="w-64 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                Generate the Remaining Resume
              </div>
              <div className="self-stretch justify-start text-Theme-text-primary/90 text-lg font-medium font-['Inter'] leading-7">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-start items-start gap-5 flex-wrap content-start">
        <div className="md:w-[320px] lg:w-[320px] xl:w-[490px] h-32 px-5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b border-yellow-500 inline-flex flex-col justify-start items-start">
          <div className="w-44 flex-1 inline-flex justify-start items-center gap-3">
            <div className="w-10 h-10 p-2 bg-lime-600 rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center flex-wrap content-center">
              <Image src="/icons/2.png" alt="logo" width={100} height={100} />
            </div>
            <div className="w-32 inline-flex flex-col justify-start items-start">
              <div className="w-36 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                Resume Builder
              </div>
              <div className="self-stretch justify-start text-Theme-text-primary/90 text-lg font-medium font-['Inter'] leading-7">
                9
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[320px] lg:w-[320px] xl:w-[490px] h-32 px-5 py-2.5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b border-purple-500 inline-flex flex-col justify-center items-start gap-2.5">
          <div className="w-44 flex-1 inline-flex justify-start items-center gap-3">
            <div className="w-10 h-10 p-2 bg-pink-600 rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
            <div className="w-48 inline-flex flex-col justify-start items-start">
              <div className="w-64 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                LinkedIn Optimizer
              </div>
              <div className="self-stretch justify-start text-Theme-text-primary/90 text-lg font-medium font-['Inter'] leading-7">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" inline-flex justify-start items-start gap-5 flex-wrap content-start">
        <div className="md:w-[320px] lg:w-[320px] xl:w-[490px] h-32 px-5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b border-yellow-500 inline-flex flex-col justify-start items-start">
          <div className="w-44 flex-1 inline-flex justify-start items-center gap-3">
            <div className="w-10 h-10 p-2 bg-sky-500 rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center flex-wrap content-center">
              <Image
                src="/icons/setting.png"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
            <div className="w-32 inline-flex flex-col justify-start items-start">
              <div className="w-36 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                Paid users
              </div>
              <div className="self-stretch justify-start text-Theme-text-primary/90 text-lg font-medium font-['Inter'] leading-7">
                9
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadSection;
