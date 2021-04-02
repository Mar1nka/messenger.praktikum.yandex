import { SmallHeaderProps } from '../SmallHeader/types';
import { FormProps } from '../Form/types';
import { LinkProps } from '../Link/types';

export type LoginProps = {
  headerData: SmallHeaderProps,
  formData: FormProps,
  registrationLinkData: LinkProps,
  errors?: string,
};
