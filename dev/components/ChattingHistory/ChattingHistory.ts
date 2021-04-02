import Block from '../../blocks/block';
import Link from '../Link/Link';
import Chats from '../Chats/Chats';
import Messages from '../Messages/Messages';

// @ts-ignore
import template from './ChattingHistory.handlebars';

import { ChattingHistoryProps } from './types';

export default class ChattingHistory extends Block {
  public props: ChattingHistoryProps;

  private profileLink: Link;

  private chats: Chats;

  private messages: Messages;

  constructor(props: ChattingHistoryProps) {
    super('div', props);

    this.createComponents();
  }

  createComponents = () => {
    const { profileLinkData, dialogsData, chattingData } = this.props;

    this.chats = new Chats({
      chats: dialogsData,
    });

    this.messages = new Messages({
      chatDialogData: chattingData,
    });

    this.profileLink = new Link(profileLinkData);
  };

  render() {
    const { header } = this.props;
    const { profileLink, chats, messages } = this;

    return template({
      header,
      profileLink: profileLink ? profileLink.renderToString() : '',
      chats: chats ? chats.renderToString() : '',
      messages: messages ? messages.renderToString() : '',
    });
  }
}
