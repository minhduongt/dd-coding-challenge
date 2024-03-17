import { Stack } from "@mui/material";

const ParagraphElement = (props: any) => {
  return (
    <Stack
      {...props}
      sx={{
        ...props.sx,
        minHeight: "3rem",
        height: "auto",
        width: "15rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.children}
    </Stack>
  );
};

export default ParagraphElement;
