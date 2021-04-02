import Block from '../../blocks/block';
import { UserProps } from './types';
// @ts-ignore
import template from './User.handlebars';

const baseUrl = 'https://ya-praktikum.tech';

export default class User extends Block {
  public props: UserProps;

  constructor(props: UserProps) {
    super('a', props);
  }

  render() {
    // @ts-ignore
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      email, avatar, first_name, second_name,
    } = this.props;

    const avatarStc = avatar ? `${baseUrl}${avatar}` : 'https://upload.wikimedia.org/wikipedia/commons/7/79/2010-brown-bear.jpg';

    return template({
      email,
      firstName: first_name,
      secondName: second_name,
      avatar: avatarStc,
    });
  }
}
