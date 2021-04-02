import Block from '../../blocks/block';
import { ListItemProps } from './types';
// @ts-ignore
import template from './ListItem.handlebars';

export default class ListItem extends Block {
  public props: ListItemProps;

  constructor(props: ListItemProps) {
    super('li', props);
  }

  render() {
    const { element, classNames } = this.props;

    return template({
      // @ts-ignore
      component: element.renderToString(),
      classNames: `list__item ${classNames}`,
    });
  }
}
