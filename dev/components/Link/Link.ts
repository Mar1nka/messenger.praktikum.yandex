import Block from '../../blocks/block';
import { LinkProps } from './types';
import Router from '../../router/index';
// @ts-ignore
import template from './Link.handlebars';

const router = new Router('.wrapper');

export default class Link extends Block {
  public props: LinkProps;

  constructor(props: LinkProps) {
    super('link', {
      ...props,
      handlers: {
        clickHandler: (event: any) => {
          event.preventDefault();
          router.go(props.href);
        },
      },
    });
  }

  render() {
    const { href, title, classNames } = this.props;

    return template({
      href,
      title,
      classNames: `link ${classNames}`,
    });
  }
}
