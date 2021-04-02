import Block from '../../blocks/block';
import { SmallHeaderProps } from './types';
// @ts-ignore
import template from './SmallHeader.handlebars';

export default class SmallHeader extends Block {
  public props: SmallHeaderProps;

  constructor(props: SmallHeaderProps) {
    super('header', props);
  }

  render() {
    const { header } = this.props;

    return template({
      header,
    });
  }
}
