import { InputPropsMin } from '../Input/types';

export type FieldProps = {
  label: string,
  id: string,
  name: string,
  inputData: InputPropsMin,
  errorText?: string
};
