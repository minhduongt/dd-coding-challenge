export const componentStyles = (props?: any) => {
  return {
    height: "2rem",
    minHeight: "2rem",
    width: "10rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 1px #000",
    cursor: "move",
    transition: "all 0.1s linear",
    textAlign: "center",
    ":active": {
      border: "solid 1px #ff0000",
      position: "relative",
    },
    ...props,
  };
};
