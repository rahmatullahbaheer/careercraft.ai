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
                Total users
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
              <Image
                src="/icons/active.png"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
            <div className="w-48 inline-flex flex-col justify-start items-start">
              <div className="w-64 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                Active users
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
                Inactive users
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
              <Image src="/icons/2.png" alt="logo" width={100} height={100} />
            </div>
            <div className="w-48 inline-flex flex-col justify-start items-start">
              <div className="w-64 justify-start text-Theme-text-secondary/70 text-base font-normal font-['Inter'] leading-snug">
                Free users
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
