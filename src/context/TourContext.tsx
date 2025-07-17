"use client";
import React, { createContext, useContext, useRef, ReactNode } from "react";

// Define a type for your references
interface TourRefs {
  contentScrollRef: React.MutableRefObject<HTMLDivElement | null>;
  dashboardRef: React.MutableRefObject<HTMLDivElement | null>;
  innerToolsRef: React.MutableRefObject<HTMLDivElement | null>;
  resumeElementRef: React.MutableRefObject<HTMLDivElement | null>;
  coverLetterElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinElementRef: React.MutableRefObject<HTMLDivElement | null>;
  emailElementRef: React.MutableRefObject<HTMLDivElement | null>;
  bidElementRef: React.MutableRefObject<HTMLDivElement | null>;
  coachElementRef: React.MutableRefObject<HTMLDivElement | null>;
  reviewElementRef: React.MutableRefObject<HTMLDivElement | null>;
  finderElementRef: React.MutableRefObject<HTMLDivElement | null>;
  atsElementRef: React.MutableRefObject<HTMLDivElement | null>;
  tourBotRef: React.MutableRefObject<HTMLDivElement | null>;
  historyCardRef: React.MutableRefObject<HTMLDivElement | null>;
  emailCardsElementRef: React.MutableRefObject<HTMLDivElement | null>;
  availableCreditsRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinAboutElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinAboutHistoryElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinHeadlineElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinHeadlineHistoryElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinJDElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinJDHistoryElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinKeywordsElementRef: React.MutableRefObject<HTMLDivElement | null>;
  linkedinKeywordsHistoryElementRef: React.MutableRefObject<HTMLDivElement | null>;
}

// Create a context with an initial value
const TourContext = createContext<TourRefs | undefined>(undefined);

// Create a provider component to wrap your app
interface TourContextProviderProps {
  children: ReactNode;
}

const TourContextProvider: React.FC<TourContextProviderProps> = ({
  children,
}) => {
  // Create refs for each reference
  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const innerToolsRef = useRef<HTMLDivElement | null>(null);
  const resumeElementRef = useRef<HTMLDivElement | null>(null);
  const coverLetterElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinElementRef = useRef<HTMLDivElement | null>(null);
  const emailElementRef = useRef<HTMLDivElement | null>(null);
  const bidElementRef = useRef<HTMLDivElement | null>(null);
  const coachElementRef = useRef<HTMLDivElement | null>(null);
  const reviewElementRef = useRef<HTMLDivElement | null>(null);
  const finderElementRef = useRef<HTMLDivElement | null>(null);
  const atsElementRef = useRef<HTMLDivElement | null>(null);
  const tourBotRef = useRef<HTMLDivElement | null>(null);
  const historyCardRef = useRef<HTMLDivElement | null>(null);
  const emailCardsElementRef = useRef<HTMLDivElement | null>(null);
  const availableCreditsRef = useRef<HTMLDivElement | null>(null);
  const linkedinAboutElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinAboutHistoryElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinHeadlineElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinHeadlineHistoryElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinJDElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinJDHistoryElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinKeywordsElementRef = useRef<HTMLDivElement | null>(null);
  const linkedinKeywordsHistoryElementRef = useRef<HTMLDivElement | null>(null);

  // Define the context value
  const contextValue: TourRefs = {
    contentScrollRef,
    innerToolsRef,
    dashboardRef,
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
    tourBotRef,
    historyCardRef,
    emailCardsElementRef,
    availableCreditsRef,
    linkedinAboutElementRef,
    linkedinAboutHistoryElementRef,
    linkedinHeadlineElementRef,
    linkedinHeadlineHistoryElementRef,
    linkedinJDElementRef,
    linkedinJDHistoryElementRef,
    linkedinKeywordsElementRef,
    linkedinKeywordsHistoryElementRef,
    // Add more references as needed
  };

  return (
    <TourContext.Provider value={{ ...contextValue }}>
      {children}
    </TourContext.Provider>
  );
};

// Create a custom hook to access the context values
const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTourContext must be used within a TourContextProvider");
  }
  return context;
};

export { TourContextProvider, useTourContext };
