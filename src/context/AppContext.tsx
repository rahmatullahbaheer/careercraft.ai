"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

// Define a type for your references
interface AppContexts {
  availableCredits: boolean;
  setAvailableCredits: React.Dispatch<React.SetStateAction<boolean>>;
  abortController: AbortController | null;
  setAbortController: React.Dispatch<React.SetStateAction<AbortController|null>>;
  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  template15: boolean;
  setTemplate15: React.Dispatch<React.SetStateAction<boolean>>;
  outOfCredits: boolean;
  setOutOfCredits: React.Dispatch<React.SetStateAction<boolean>>;
  // Add more references as needed
}

// Create a context with an initial value
const AppContext = createContext<AppContexts | undefined>(undefined);

// Create a provider component to wrap your app
interface AppContextsProvider {
  children: ReactNode;
}

const AppContextsProvider: React.FC<AppContextsProvider> = ({ children }) => {
  // Create refs for each reference
  const [availableCredits, setAvailableCredits] = useState<boolean>(false);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [template15, setTemplate15] = useState<boolean>(false);
  const [outOfCredits, setOutOfCredits] = useState<boolean>(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(new AbortController());
  // Define the context value
  const contextValue: AppContexts = {
    template15,
    setTemplate15,
    isSidebar,
    setIsSidebar,
    availableCredits,
    setAvailableCredits,
    abortController,
    setAbortController,
    outOfCredits,
    setOutOfCredits
  };

  return (
    <AppContext.Provider value={{ ...contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to access the context values
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a TourContextProvider");
  }
  return context;
};

export { AppContextsProvider, useAppContext };
