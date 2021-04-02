import { SmallHeaderProps } from '../SmallHeader/types';
import { LinkProps } from '../Link/types';

export type HomeProps = {
  headerData: SmallHeaderProps,
  headerList: string,
  itemListData: LinkProps[],
};
