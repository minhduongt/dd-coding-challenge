"use client";

import { TComponent, TComponentHistories } from "@/types";
import { ReactNode, createContext, useState } from "react";

export type initialStateProps = {
  components: TComponent[];
  histories: TComponentHistories[];
  currentHistoryNum: number;
  setCurrentHistoryNum: Function;
  setHistories: Function;
  setComponents: Function;
};

const initialState: initialStateProps = {
  components: [],
  histories: [],
  currentHistoryNum: 0,
  setCurrentHistoryNum: () => {},
  setHistories: () => {},
  setComponents: () => {},
};

const ComponentContext = createContext(initialState);

type ComponentContextProviderProps = {
  children: ReactNode;
};

function ComponentContextProvider({ children }: ComponentContextProviderProps) {
  const [components, setComponents] = useState<TComponent[]>(
    initialState.components
  );
  const [histories, setHistories] = useState<TComponentHistories[]>(
    initialState.histories
  );
  const [currentHistoryNum, setCurrentHistoryNum] = useState<number>(
    initialState.currentHistoryNum
  );
  return (
    <ComponentContext.Provider
      value={{
        components,
        histories,
        currentHistoryNum,
        setHistories,
        setCurrentHistoryNum,
        setComponents,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
}
export { ComponentContextProvider, ComponentContext };
