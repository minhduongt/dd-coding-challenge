import { Stack, Typography } from "@mui/material";

const Error = () => {
  return (
    <Stack
      sx={{
        p: 2,
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">
        This website haven't supported for mobile yet. Please try again using PC
        or Laptop. <br />
        Thank you
      </Typography>
    </Stack>
  );
};

export default Error;
