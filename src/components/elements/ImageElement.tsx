import { Box } from "@mui/material";

const ImageElement = (props: any) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        width: "20rem",
        height: "20rem",
      }}
    >
      <img
        src={props.src}
        width={"100%"}
        height={"100%"}
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
};

export default ImageElement;
