import { TComponent } from "@/types";
import { Box, Stack, TextField, Tooltip } from "@mui/material";
import ButtonElement from "./elements/ButtonElement";
import ParagraphElement from "./elements/ParagraphElement";
import ImageElement from "./elements/ImageElement";

type TAdminRendersProps = {
  components: TComponent[];
  onSelectComponent: Function;
  onChangeComponent: Function;
  currentSelectIndex: number;
};

function AdminRenders({
  components,
  onSelectComponent,
  onChangeComponent,
  currentSelectIndex,
}: TAdminRendersProps) {
  const getComponent = (component: TComponent, index: number) => {
    const isSelected = index === currentSelectIndex;
    switch (component.element) {
      case "button":
        return isSelected ? (
          <TextField
            sx={{
              height: "3rem",
              width: "15rem",
            }}
            value={component.props?.text}
            onChange={(e) => onChangeComponent(e, currentSelectIndex)}
          />
        ) : (
          <Tooltip title="Click to edit text">
            <Box>
              <ButtonElement
                sx={{
                  cursor: "default",
                  border: "solid 1px #00000095",
                }}
              >
                {component.props?.text}
              </ButtonElement>
            </Box>
          </Tooltip>
        );
      case "paragraph":
        return isSelected ? (
          <TextField
            multiline
            minRows={2}
            sx={{
              height: "5rem",
              width: "15rem",
              padding: 0,
            }}
            value={component.props?.text}
            onChange={(e) => onChangeComponent(e, currentSelectIndex)}
          />
        ) : (
          <Tooltip title="Click to edit text">
            <Box>
              <ParagraphElement
                sx={{
                  border: "solid 1px #00000095",
                }}
              >
                {component.props?.text}
              </ParagraphElement>
            </Box>
          </Tooltip>
        );
      case "image":
        return (
          <Tooltip title="Click to edit image">
            <Box>
              <ImageElement
                src={component.props.imageUrl}
                sx={{
                  opacity: isSelected ? 0.6 : 1,
                  border: "solid 1px #00000095",
                }}
              />
            </Box>
          </Tooltip>
        );

      default:
        return <></>;
    }
  };

  return (
    <Stack
      pt={4}
      spacing={3}
      sx={{
        width: "fit-content",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: "98",
      }}
    >
      {components.map((component, index) => (
        <Stack
          key={component.element + index.toString()}
          gap={5}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box onClick={() => onSelectComponent(index)}>
            {getComponent(component, index)}
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

export default AdminRenders;
