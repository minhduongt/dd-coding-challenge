import { Button } from "@mui/material";

const ButtonElement = (props: any) => {
  return (
    <Button
      {...props}
      sx={{
        ...props.sx,
        padding: "28px",
        width: "15rem",
        height: "3rem",
        borderRadius: "12px",
      }}
    >
      {props.children}
    </Button>
  );
};

export default ButtonElement;
