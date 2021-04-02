import Block from '../../blocks/block';
import { DialogProps } from './types';
// @ts-ignore
import template from './Dialog.handlebars';

const baseUrl = 'https://ya-praktikum.tech';

export default class Dialog extends Block {
  public props: DialogProps;

  constructor(props: DialogProps) {
    super('a', props);
  }

  render() {
    const { title, avatar } = this.props;

    const avatarStc = avatar ? `${baseUrl}${avatar}` : 'https://upload.wikimedia.org/wikipedia/commons/7/79/2010-brown-bear.jpg';

    return template({
      title,
      avatar: avatarStc,
    });
  }
}
