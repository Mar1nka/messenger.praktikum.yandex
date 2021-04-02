export type InputProps = {
  type: string;
  id: string;
  required: boolean,
  regexp?: RegExp,
  label: string,
  nameField: string,
  value?: unknown,
  disabled?: boolean,
  accept?: string,
};

export type InputPropsMin = {
  type: string;
  required: boolean,
  regexp?: RegExp,
  value?: unknown,
  disabled?: boolean,
  accept?: string,
};
