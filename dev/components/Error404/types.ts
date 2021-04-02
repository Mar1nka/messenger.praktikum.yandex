import { SmallHeaderProps } from '../SmallHeader/types';
import { LinkProps } from '../Link/types';

export type ErrorProps = {
  headerData: SmallHeaderProps,
  code: string,
  description: string,
  homeLinkData: LinkProps,
};
