type TComponentProps = {
  text?: string;
  label?: string;
  message?: string;
  imageUrl?: string;
};

export type TComponent = {
  componentNumber: number;
  element: string;
  props: TComponentProps;
};

export type TComponentHistories = {
  components: TComponent[];
  num: number;
};
