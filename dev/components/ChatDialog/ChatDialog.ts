import Block from '../../blocks/block';
import { ChatDialogProps } from './types';

// @ts-ignore
import template from './ChatDialog.handlebars';

export default class ChatDialog extends Block {
  public props: ChatDialogProps;

  constructor(props: ChatDialogProps) {
    super('a', props);
  }

  render() {
    const {
      time, imageSrc, person, context,
    } = this.props;

    return template({
      time,
      imageSrc,
      person,
      context,
    });
  }
}
