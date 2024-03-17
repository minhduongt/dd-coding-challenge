"use client";

import { useState } from "react";
import { Stack, Box, Typography, Divider, useMediaQuery } from "@mui/material";
import AdminRenders from "@/components/AdminRenders";
import { TComponent, TComponentHistories } from "@/types";
import Header from "@/components/header";
import useComponentContext from "@/hooks/useComponentContext";
import EditComponent from "@/components/EditComponent";
import { componentStyles } from "@/components/styles";
import Error from "@/components/error";

export default function AdminPage() {
  const breakpoint = useMediaQuery("(min-width:1024px)");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const {
    components,
    setComponents,
    histories,
    setHistories,
    setCurrentHistoryNum,
  } = useComponentContext();
  const [currentSelectIndex, setCurrentSelectIndex] = useState<number>(-1);

  const onDragComponent = (
    e: React.DragEvent<HTMLDivElement>,
    element: string
  ) => {
    setIsDragging(true);
    e.dataTransfer.setData("element", element);
  };
  const onDragEndComponent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDropComponent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const newComponent: TComponent = {
      componentNumber: components.length + 1,
      element: e.dataTransfer!.getData("element"),
      props: {
        text: `New ${e.dataTransfer!.getData("element")}`,
        label: "",
        message: "",
      },
    };
    const newComponents = [...components, newComponent];

    const newHistory: TComponentHistories = {
      num: histories.length + 1,
      components: newComponents,
    };
    if (histories.length > 0 && components.length === 0) {
      setHistories([]);
      setCurrentHistoryNum(0);
    } else {
      setCurrentHistoryNum(histories.length + 1);
      setHistories([...histories, newHistory]);
    }

    setComponents(newComponents);
  };

  const onSelectComponent = (index: number) => {
    setCurrentSelectIndex(index);
  };

  const onChangeComponent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newComponents = [...components];
    newComponents[index].props = {
      text: e.target.value,
    };
    setComponents(newComponents);
  };

  return (
    <>
      {breakpoint ? (
        <Stack>
          <Header />
          <Stack sx={{ flexDirection: "row" }}>
            <Stack
              gap={3}
              sx={{
                height: "100%",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
              pt={2}
            >
              <Typography variant="h5" fontWeight={"bold"}>
                Components
              </Typography>
              <Divider sx={{ borderWidth: 1, width: "80%" }} />
              <Stack
                gap={3}
                sx={{
                  // maxHeight: "12rem",
                  // overflowY: "scroll",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 0px 15px -5px #000",
                  padding: "1rem",
                }}
              >
                <Box
                  draggable
                  sx={componentStyles()}
                  onDragStart={(e) => onDragComponent(e, "paragraph")}
                  onDragEnd={(e) => onDragEndComponent(e)}
                >
                  Paragraph
                </Box>
                <Box
                  draggable
                  sx={componentStyles({ borderRadius: "12px" })}
                  onDragStart={(e) => onDragComponent(e, "button")}
                  onDragEnd={(e) => onDragEndComponent(e)}
                >
                  Button
                </Box>
                <Box
                  draggable
                  sx={componentStyles({ minHeight: "5rem", width: "5rem" })}
                  onDragStart={(e) => onDragComponent(e, "image")}
                  onDragEnd={(e) => onDragEndComponent(e)}
                >
                  Image
                </Box>
              </Stack>
              <Divider sx={{ borderWidth: 1, width: "100%", py: 0 }} />

              <EditComponent
                currentSelectIndex={currentSelectIndex}
                component={components[currentSelectIndex]}
              />
            </Stack>

            <Stack
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDropComponent(e)}
              sx={{
                height: "auto",
                minHeight: "100vh",
                width: "100%",
                alignItems: "center",
                position: "relative",
                zIndex: "97",
                overflowY: "hidden",
                borderInline: "solid 1px #000",
                backgroundColor: isDragging ? "#92929267" : "#FFF",
              }}
            >
              <Box
                onClick={() => setCurrentSelectIndex(-1)}
                sx={{
                  position: "absolute",
                  zIndex: "97",
                  height: "100%",
                  width: "100%",
                }}
              />
              <AdminRenders
                components={components}
                onSelectComponent={onSelectComponent}
                currentSelectIndex={currentSelectIndex}
                onChangeComponent={onChangeComponent}
              />
              {isDragging && (
                <Typography
                  sx={{
                    zIndex: "99",
                    position: "fixed",
                    right: "37.5vw",
                    top: "50vh",
                    color: "#000000",
                  }}
                  variant="h4"
                >
                  +
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Error />
      )}
    </>
  );
}
