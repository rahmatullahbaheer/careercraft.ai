"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import "../../app/dashboard.css";
import { useTourContext } from "@/context/TourContext";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import { useSelector } from "react-redux";
import { crossIconSmall } from "@/helpers/iconsProvider";
import { useAppContext } from "@/context/AppContext";
import { RootState } from "@/store/store";
interface TooltipProps {
  text: string;
  children: React.ReactNode;
  audioPlayed: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, audioPlayed }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div onClick={toggleTooltip} className="relative inline-block">
      {children}
      {showTooltip && !audioPlayed && (
        <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black rounded bottom-full left-1/2 w-max bg-opacity-80 md:text-base xs:text-xs">
          {/* {text}
           */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

type Audio = {
  url: string;
  for: string;
};

type ToolRef = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  for: string;
};

type AudioBufferType = {
  arrayBufferView: Uint8Array;
  explanationFor: string;
};

type Prop = {
  config: { name: string; audios: Audio[]; toolRefs: ToolRef[] };
};

const TourBot = ({ config }: Prop) => {
  const { setOutOfCredits } = useAppContext();
  const userData = useSelector((state: RootState) => state.userData);
  const [toolRefs, setToolRefs] = useState<ToolRef[]>([]);
  const [showBot, setShowBot] = useState(true);
  const [audios, setAudios] = useState<Audio[]>([]);
  const [isGif, setIsGif] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioBuffers, setAudioBuffers] = useState<AudioBufferType[]>([]);
  const [audioCounter, setAudioCounter] = useState<number>(0);
  const audioPlayerRef: any = useRef(null);

  const { tourBotRef } = useTourContext();
  const { updateSaveHook } = useUpdateAndSave();
  const { updateAndSaveTourStatus } = updateSaveHook;

  useEffect(() => {
    if (config) {
      setToolRefs(config.toolRefs);
      setAudios(config.audios);
    }
  }, [config]);

  const removeStyles = () => {
    toolRefs.map((toolRef: any) => {
      // toolRef.ref.current?.classList.remove("un-focused-tool");
      toolRef.ref.current.classList.remove("dashboard-focused");
      toolRef.ref.current.classList.remove("dark:bg-[#11121c]");
      toolRef.ref.current.classList.remove("bg-[#F3F4F6]");
    });
  };

  const applyStyles = (toolRef: any) => {
    toolRef.ref.current.classList.add("dashboard-focused");
    toolRef.ref.current.classList.add("dark:bg-[#11121c]");
    toolRef.ref.current.classList.add("bg-[#F3F4F6]");
    // toolRef.ref.current?.classList.add("un-focused-tool");
  };

  const fetchAudio = async (audioFileUrl: any, explanationFor: string) => {
    try {
      const response = await fetch(audioFileUrl);
      const audioBlob = await response.blob();
      const audioData = await audioBlob.arrayBuffer();
      const arrayBufferView = new Uint8Array(audioData);
      return {
        arrayBufferView,
        explanationFor,
      }; // Return the Blob
    } catch (error) {
      console.error("Error fetching the audio file:", error);
    }
  };

  const focusTool = (audio: any, focusedElement: string) => {
    const audioBlob = new Blob([audio], {
      type: "audio/mpeg",
    });

    toolRefs.forEach((element: any) => {
      if (element.for === focusedElement) {
        removeStyles();
        applyStyles(element);
      }
    });

    const url = URL.createObjectURL(audioBlob);
    return url;
  };

  const handleClick = async () => {
    try {
      if (isGif) {
        setIsGif(false);
        if (isAudioPlaying) {
          audioPlayerRef.current.pause();
          setShowBot(false);
          if (!userData?.tours[config.name]) {
            updateAndSaveTourStatus({ [config.name]: true });
          }
          localStorage.setItem("botHidden", "true");
          removeStyles();
          setIsAudioPlaying(false);
        }
        return;
      }

      if (!isAudioPlaying) {
        // If audio is not playing, load and play it
        setShowBot(true);
        setIsGif(true);
        setIsAudioPlaying(true);
        setAudioPlayed(true);

        const promises = audios?.map((audio: any) =>
          fetchAudio(audio.url, audio.for)
        );

        Promise.all(promises)
          .then((audiosBuffers: any) => {
            setAudioBuffers(audiosBuffers);
          })
          .catch((error) => {
            console.error("Error fetching or decoding audio:", error);
          });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("botHidden") === "true") {
      setShowBot(false);
    }
  }, []);

  useEffect(() => {
    if (audioCounter === 1 && !userData?.tours[config.name]) {
      updateAndSaveTourStatus({ [config.name]: true });
    }
    if (audioBuffers.length > 0 && audioCounter < audioBuffers.length) {
      const audioUrl = focusTool(
        audioBuffers[audioCounter].arrayBufferView,
        audioBuffers[audioCounter].explanationFor
      );
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
    }

    if (audioCounter !== 0 && audioCounter === audioBuffers.length) {
      setShowBot(false);
      localStorage.setItem("botHidden", "true");
      audioPlayerRef.current.pause();
      removeStyles();
      setAudioCounter(0);
      setAudioBuffers([]);
      setIsGif(false);
      setIsAudioPlaying(false);
      if (setOutOfCredits) {
        setOutOfCredits(false);
      }
    }
  }, [
    audioBuffers,
    audioCounter,
    config.name,
    focusTool,
    removeStyles,
    setOutOfCredits,
    updateAndSaveTourStatus,
    userData?.tours,
  ]);

  useEffect(() => {
    const audio = audioPlayerRef.current;

    const handleAudioEnded = () => {
      setAudioCounter((prev) => prev + 1);
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  return (
    <div
      ref={(ref: any) => (tourBotRef.current = ref)}
      className={`fixed bottom-4 ${
        showBot
          ? "right-4 transition-all ease-in-out duration-500"
          : "xs:-right-20 lg:-right-40 transition-all ease-in-out duration-500"
      } mr-4 mb-4 cursor-pointer z-10 avatar-animate`}
      onClick={handleClick}
    >
      <Tooltip text="!" audioPlayed={audioPlayed}>
        <Image
          src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
          alt="GIF"
          width={200}
          height={200}
          className={`botImage  ${
            showBot
              ? ""
              : "transform -rotate-90 transition-transform duration-300 ease-in-out "
          }  xs:hidden md:hidden lg:block`}
        />
        <Image
          src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
          alt="GIF"
          width={100}
          height={100}
          className={`botImage  ${
            showBot
              ? ""
              : "transform -rotate-90 transition-transform duration-300 ease-in-out "
          }  xs:block md:block lg:hidden`}
        />
        <button
          className="absolute right-0 top-0 bg-black rounded-full p-0.5"
          title="Hide"
          onClick={(e) => {
            e.stopPropagation();
            setShowBot(false);
            if (!userData?.tours[config.name]) {
              updateAndSaveTourStatus({ [config.name]: true });
            }
            localStorage.setItem("botHidden", "true");
            setIsGif(false);
            if (isAudioPlaying) {
              audioPlayerRef.current.pause();
              removeStyles();
              setIsAudioPlaying(false);
            }
          }}
        >
          {crossIconSmall}
        </button>
      </Tooltip>
      <audio className="hidden" ref={audioPlayerRef} controls />
    </div>
  );
};

export default TourBot;
