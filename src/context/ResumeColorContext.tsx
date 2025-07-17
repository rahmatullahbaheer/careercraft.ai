"use client";
import React, { createContext, useContext,  ReactNode, useState } from "react";

// Define a type for your references
interface ColorContexts {
  color: string;
  setColor:any
  color_second:string;
  setColor_second:any
  // Add more references as needed
}

// Create a context with an initial value
const ColorContext = createContext<ColorContexts | undefined>(undefined);

// Create a provider component to wrap your app
interface ColorContextProvider {
  children: ReactNode;
}

const ColorContextProvider: React.FC<ColorContextProvider> = ({
  children,
}) => {
  // Create refs for each reference
  const [color,setColor] = useState<string>("")
  const [color_second, setColor_second] = useState<string>("");
  
  // Define the context value
  const contextValue: ColorContexts = {
    color,
    setColor,
    color_second,
    setColor_second
  };

  return (
    <ColorContext.Provider value={{ ...contextValue }}>
      {children}
    </ColorContext.Provider>
  );
};

// Create a custom hook to access the context values
const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorContextProvider");
  }
  return context;
};

export { ColorContextProvider, useColorContext };
