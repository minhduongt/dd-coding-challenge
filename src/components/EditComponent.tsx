import useComponentContext from "@/hooks/useComponentContext";
import { TComponent } from "@/types";
import { capitalizeFirst } from "@/utils";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { VisuallyHiddenInput } from "./input/HiddenInput";
import { useState } from "react";
import imageApi from "@/api/image";

type TEditComponentProps = {
  component: TComponent;
  currentSelectIndex: number;
};

function EditComponent({ component, currentSelectIndex }: TEditComponentProps) {
  const [txt, setTxt] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { components, setComponents } = useComponentContext();

  const handleEditComponentProps = (
    value: string | number,
    propName: string
  ) => {
    const newComponents = [...components];
    const currentProps = newComponents[currentSelectIndex].props;
    newComponents[currentSelectIndex].props = {
      ...currentProps,
      [propName]: value,
    };
    setComponents(newComponents);
  };

  const onChangeProps = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    propName: string
  ) => {
    handleEditComponentProps(e.target.value, propName);
  };

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      var file: File;
      if (e.target.files) {
        file = e.target.files[0];
        if (file) {
          formData.append("image", file);
          const res = await imageApi.uploadImage(formData);
          handleEditComponentProps(res.url, "imageUrl");
        }
      }
      setTxt("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  const getEditProps = () => {
    switch (component.element) {
      case "button":
        return (
          <>
            <Typography>{`Text:`}</Typography>
            <TextField
              sx={{ color: "#000" }}
              onChange={(e) => onChangeProps(e, "text")}
              value={components[currentSelectIndex].props?.text}
            />
            <Typography>{`Message:`}</Typography>
            <TextField
              sx={{ color: "#000" }}
              onChange={(e) => onChangeProps(e, "message")}
              value={components[currentSelectIndex].props?.message}
            />
          </>
        );
      case "paragraph":
        return (
          <>
            <Typography>{`Text:`}</Typography>
            <TextField
              sx={{ color: "#000" }}
              onChange={(e) => onChangeProps(e, "text")}
              value={components[currentSelectIndex].props?.text}
            />
          </>
        );
      case "image":
        return (
          <>
            <Typography>{`Image Source:`}</Typography>
            <TextField
              sx={{ color: "#000" }}
              onChange={(e) => onChangeProps(e, "imageUrl")}
              value={components[currentSelectIndex].props?.imageUrl}
            />
            <Typography>{`Upload an image`}</Typography>

            <Button
              disabled={isUploading ? true : false}
              component="label"
              role={undefined}
              tabIndex={-1}
            >
              {isUploading ? "Uploading..." : "Upload"}
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                value={txt}
                onChange={onUploadImage}
              />
            </Button>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      {currentSelectIndex >= 0 && component ? (
        <Stack sx={{ width: "95%", mt: 0 }}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={"bold"}>
              {capitalizeFirst(component?.element)} properties:
            </Typography>
          </Stack>

          {getEditProps()}
        </Stack>
      ) : (
        components.length > 0 && (
          <Typography>Select a component to edit.</Typography>
        )
      )}
    </>
  );
}

export default EditComponent;
