import React from "react";

function Table() {
  return (
    <>
      <div class="">
        <div class=" justify-start text-zinc-700/90 text-2xl font-medium font-['Inter'] capitalize leading-loose">
          Packages list
        </div>
      </div>
      <div className="flex justify-end">
        <div class="bg-violet-500 p-2 rounded-[5px] shadow-[0px_4px_8px_-4px_rgba(58,53,65,0.42)] flex justify-center items-center overflow-hidden">
          <div class=" text-white text-sm font-medium font-['Inter'] uppercase leading-normal tracking-wide">
            add Package
          </div>
        </div>
      </div>
      <div class="w-[540px] px-5 py-2.5 bg-white rounded-md inline-flex flex-col justify-end items-end gap-5">
        <div class="self-stretch inline-flex justify-between items-center">
          <div class="w-28 h-8 relative">
            <div class="left-0 top-0 absolute justify-start text-zinc-700/90 text-xl font-medium font-['Inter'] capitalize leading-loose tracking-tight">
              add new Package
            </div>
          </div>
          <div class="w-7 h-4 origin-top-left -rotate-45 flex justify-center items-center gap-2.5">
            <div
              data-size="Medium"
              data-variant="Round"
              class="flex-1 self-stretch p-3 bg-rose-500 rounded-3xl shadow-[0px_1px_14px_0px_rgba(58,53,65,0.12)] shadow-[0px_5px_8px_0px_rgba(58,53,65,0.14)] shadow-[0px_3px_5px_-1px_rgba(58,53,65,0.20)] flex justify-center items-center gap-2 overflow-hidden"
            >
              <div class="w-8 h-8 relative overflow-hidden">
                <div class="w-5 h-5 left-[7.07px] top-[7.07px] absolute bg-white"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="self-stretch flex flex-col justify-start items-start gap-[3px]">
          <div class="self-stretch px-3 rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-700/25 flex flex-col justify-start items-start">
            <div class="h-0.5 px-1 bg-white inline-flex justify-start items-center gap-2.5">
              <div class="justify-center text-zinc-700/70 text-xs font-normal font-['Inter'] leading-3 tracking-tight">
                Name*
              </div>
            </div>
            <div class="self-stretch pl-[5px] py-3.5 inline-flex justify-start items-center gap-2 overflow-hidden">
              <div class="flex-1 justify-center text-zinc-700/90 text-base font-normal font-['Inter'] leading-normal tracking-tight">
                Free Trial
              </div>
              <div class="flex justify-start items-start gap-2.5">
                <div class="w-6 h-6 relative"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="self-stretch flex flex-col justify-start items-start gap-[3px]">
          <div class="self-stretch px-3 rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-700/25 flex flex-col justify-start items-start">
            <div class="h-0.5 px-1 bg-white inline-flex justify-start items-center gap-2.5">
              <div class="justify-center text-zinc-700/70 text-xs font-normal font-['Inter'] leading-3 tracking-tight">
                Price*
              </div>
            </div>
            <div class="self-stretch pl-[5px] py-3.5 inline-flex justify-start items-center gap-2 overflow-hidden">
              <div class="flex-1 justify-center text-zinc-700/90 text-base font-normal font-['Inter'] leading-normal tracking-tight">
                0
              </div>
              <div class="flex justify-start items-start gap-2.5">
                <div class="w-6 h-6 relative"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="self-stretch flex flex-col justify-start items-start gap-[3px]">
          <div class="self-stretch px-3 rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-700/25 flex flex-col justify-start items-start">
            <div class="h-0.5 px-1 bg-white inline-flex justify-start items-center gap-2.5">
              <div class="justify-center text-zinc-700/70 text-xs font-normal font-['Inter'] leading-3 tracking-tight">
                Type*
              </div>
            </div>
            <div class="self-stretch pl-[5px] py-3.5 inline-flex justify-start items-center gap-2 overflow-hidden">
              <div class="flex-1 justify-center text-zinc-700/90 text-sm font-normal font-['Inter'] leading-tight tracking-tight">
                Free
              </div>
              <div class="flex justify-start items-start gap-2.5">
                <div class="w-6 h-6 relative overflow-hidden">
                  <div class="w-2.5 h-[5px] left-[7px] top-[10px] absolute bg-zinc-700/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="self-stretch flex flex-col justify-start items-start gap-[3px]">
          <div class="self-stretch px-3 rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-700/25 flex flex-col justify-start items-start">
            <div class="h-0.5 px-1 bg-white inline-flex justify-start items-center gap-2.5">
              <div class="justify-center text-zinc-700/70 text-xs font-normal font-['Inter'] leading-3 tracking-tight">
                Description
              </div>
            </div>
            <div class="self-stretch pl-[5px] py-3.5 inline-flex justify-start items-center gap-2 overflow-hidden">
              <div class="flex-1 justify-center text-zinc-700/90 text-base font-normal font-['Inter'] leading-normal tracking-tight">
                Enter Description
              </div>
              <div class="flex justify-start items-start gap-2.5">
                <div class="w-6 h-6 relative"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="self-stretch inline-flex justify-end items-center gap-3.5">
          <div class="h-9 px-[5px] bg-lime-600 rounded-[5px] shadow-[0px_4px_8px_-4px_rgba(58,53,65,0.42)] flex justify-center items-center gap-0.5">
            <div class="w-4 h-3 outline outline-2 outline-offset-[-1px] outline-white"></div>
            <div class="bg-lime-600 rounded-[5px] inline-flex flex-col justify-center items-center overflow-hidden">
              <div
                data-icon-left="False"
                data-icon-right="False"
                data-size="Medium"
                data-variant="Contained"
                class="px-[5px] py-1.5 flex flex-col justify-start items-start gap-2 overflow-hidden"
              >
                <div class="justify-start text-white text-sm font-medium font-['Inter'] uppercase leading-normal tracking-wide">
                  add plan
                </div>
              </div>
            </div>
          </div>
          <div class="bg-neutral-400 rounded-[5px] shadow-[0px_4px_8px_-4px_rgba(58,53,65,0.42)] inline-flex flex-col justify-center items-center overflow-hidden">
            <div
              data-icon-left="False"
              data-icon-right="False"
              data-size="Medium"
              data-variant="Contained"
              class="px-5 py-1.5 flex flex-col justify-start items-start gap-2 overflow-hidden"
            >
              <div class="justify-start text-white text-sm font-medium font-['Inter'] uppercase leading-normal tracking-wide">
                cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
