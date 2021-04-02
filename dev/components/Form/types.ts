import { FieldProps } from '../Field/types';
import { ButtonProps } from '../Button/types';

export type FormProps = {
  formHeader: string,
  fieldsData: FieldProps[],
  submitButtonData: ButtonProps,
  errors?: string,
  onSubmit(data: object): void,
};
