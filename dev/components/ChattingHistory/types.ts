import { LinkProps } from '../Link/types';
import { DialogProps } from '../Dialog/types';
import { ChatDialogProps } from '../ChatDialog/types';

export type ChattingHistoryProps = {
  header: string,
  profileLinkData: LinkProps,
  dialogsData: DialogProps[],
  chattingData: ChatDialogProps[],
};
