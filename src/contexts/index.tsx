"use client";

import { ComponentContextProvider } from "./ComponentContext";

type ProvidersProps = {
  children: any;
};

function ContextProviders({ children }: ProvidersProps) {
  return <ComponentContextProvider>{children}</ComponentContextProvider>;
}

export default ContextProviders;
