import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import HeaderButton from "./HeaderButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useComponentContext from "@/hooks/useComponentContext";
import { useState } from "react";

import Link from "next/link";
import { VisuallyHiddenInput } from "../input/HiddenInput";

function Header() {
  const [txt, setTxt] = useState("");
  const [file, setFile] = useState<File>();
  const {
    components,
    setComponents,
    histories,
    currentHistoryNum,
    setCurrentHistoryNum,
  } = useComponentContext();
  const [localComponents, setLocalComponents] = useLocalStorage("components");
  const onSave = () => {
    setLocalComponents(components);
  };

  const onUndo = () => {
    const foundHistoryBefore = histories.find(
      (history) => history.num === currentHistoryNum - 1
    );
    if (foundHistoryBefore) {
      setCurrentHistoryNum(currentHistoryNum - 1);
      setComponents(foundHistoryBefore.components);
    } else {
      setCurrentHistoryNum(0);
      setComponents([]);
    }
  };
  const onRedo = () => {
    const foundHistoryBefore = histories.find(
      (history) => history.num === currentHistoryNum + 1
    );
    if (foundHistoryBefore) {
      setCurrentHistoryNum(currentHistoryNum + 1);
      setComponents(foundHistoryBefore.components);
    }
  };
  const onExport = () => {
    if (components.length > 0) {
      const inputText = JSON.stringify(components);
      const element = document.createElement("a");
      const file = new Blob([inputText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "dnd_components.txt";
      document.body.appendChild(element);
      element.click();
    }
  };

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    var file: File;
    if (e.target.files) {
      file = e.target.files[0];
      if (file) {
        const fileText = await file.text();
        const importComponents = JSON.parse(fileText);
        setFile(file);
        if (components.length > 0) {
          let text =
            "Import will delete current components. Consider to export before continuing. Confirm?";
          if (window.confirm(text) == true) {
            setComponents(importComponents);
            setLocalComponents(importComponents);
          }
        } else {
          setComponents(importComponents);
          setLocalComponents(importComponents);
        }
      }
    }
    setTxt("");
  };

  const onClear = () => {
    const text = "Clear all components and changes?";
    if (window.confirm(text) == true) {
      setComponents([]);
      setLocalComponents([]);
    }
  };

  return (
    <Box paddingBottom={"3rem"}>
      <Stack
        flexDirection={"row"}
        sx={{
          px: 2,
          py: 4,
          zIndex: "99",
          position: "fixed",
          width: "100%",
          height: "3rem",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
        }}
      >
        <Link href={"/"}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Drag & Drop
          </Typography>
        </Link>

        <ButtonGroup variant="contained" aria-label="Header Button group">
          <HeaderButton
            disabled={components.length > 0 ? false : true}
            onClick={onUndo}
          >
            Undo
          </HeaderButton>
          <HeaderButton
            disabled={
              histories.length === 0 ||
              currentHistoryNum === histories[histories.length - 1]?.num
                ? true
                : false
            }
            onClick={onRedo}
          >
            Redo
          </HeaderButton>
          <HeaderButton onClick={onSave}>Save</HeaderButton>
          <HeaderButton component="label" role={undefined} tabIndex={-1}>
            Import
            <VisuallyHiddenInput type="file" value={txt} onChange={onImport} />
          </HeaderButton>
          <HeaderButton
            disabled={components.length > 0 ? false : true}
            onClick={onExport}
          >
            Export
          </HeaderButton>
          <HeaderButton onClick={onClear} sx={{ color: "red" }}>
            Clear
          </HeaderButton>
        </ButtonGroup>
        <Link href={"/consumer"}>
          <Button sx={{ width: "10rem", color: "white" }}>
            Go to Consumer
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Header;
