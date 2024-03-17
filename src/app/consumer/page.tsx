"use client";

import ConsumerRenders from "@/components/ConsumerRenders";
import useComponentContext from "@/hooks/useComponentContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Stack } from "@mui/material";

export default function Consumer() {
  const { components } = useComponentContext();
  const [localComponents, setLocalComponents] = useLocalStorage(
    "components",
    []
  );

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ConsumerRenders
        components={components.length > 0 ? components : localComponents}
      />
    </Stack>
  );
}
