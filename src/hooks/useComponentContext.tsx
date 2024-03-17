"use client";

import { ComponentContext } from "@/contexts/ComponentContext";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useComponentContext = () => useContext(ComponentContext);

export default useComponentContext;
