import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack sx={{ height: "100vh", justifyContent: "center" }}>
      <Stack
        gap={3}
        sx={{
          backgroundColor: "#ddddddcc",
          justifyContent: "center",
          alignItems: "center",
          height: "20rem",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h4">Welcome to Drag and Drop</Typography>
        <Link href={"/admin"}>
          <Button sx={{ width: "20rem" }}>Go to Admin page</Button>
        </Link>
        <Link href={"/consumer"}>
          <Button sx={{ width: "20rem" }}>Go to Consumer page</Button>{" "}
        </Link>
      </Stack>
    </Stack>
  );
}
