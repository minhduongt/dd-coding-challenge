import { TComponent } from "@/types";
import { Box, Stack } from "@mui/material";
import ButtonElement from "./elements/ButtonElement";
import ParagraphElement from "./elements/ParagraphElement";
import ImageElement from "./elements/ImageElement";

type TConsumerRendersProps = {
  components: TComponent[];
};

function ConsumerRenders({ components }: TConsumerRendersProps) {
  const getComponent = (component: TComponent) => {
    switch (component.element) {
      case "button":
        return (
          <ButtonElement onClick={() => window.alert(component.props.message)}>
            {component.props?.text}
          </ButtonElement>
        );
      case "paragraph":
        return <ParagraphElement>{component.props?.text}</ParagraphElement>;
      case "image":
        return (
          <Box>
            <ImageElement src={component.props.imageUrl} />
          </Box>
        );
      default:
        return <></>;
    }
  };

  return (
    <Stack
      pt={2}
      spacing={3}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      {components.map((component, index) => (
        <Stack
          key={component.element + index.toString()}
          gap={5}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>{getComponent(component)}</Box>
        </Stack>
      ))}
    </Stack>
  );
}

export default ConsumerRenders;
