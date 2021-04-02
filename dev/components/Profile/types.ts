import { FormProps } from '../Form/types';
import { LinkProps } from '../Link/types';

export type ProfileProps = {
  header: string,
  formData: FormProps,
  chatListLinkData: LinkProps,
  errors?: string,
};
