import { Button } from "@mui/material";

const HeaderButton = (props: any) => {
  return (
    <Button {...props} sx={{ color: "white", ...props.sx }}>
      {props.children}
    </Button>
  );
};

export default HeaderButton;
