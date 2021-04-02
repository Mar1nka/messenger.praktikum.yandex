import Block from '../../blocks/block';
import SmallHeader from '../SmallHeader/SmallHeader';
import Link from '../Link/Link';

// @ts-ignore
import template from './Error404.handlebars';

import { ErrorProps } from './types';

export default class Error404 extends Block {
  public props: ErrorProps;

  private header: SmallHeader;

  private homeLink: Link;

  constructor(props: ErrorProps) {
    super('section', props);

    this.createComponents();
  }

  createComponents = () => {
    const headerData = {
      header: 'Messenger',
    };

    const homeLinkData = {
      href: '/home',
      title: 'Вернуться на главную страницу',
      classNames: 'main-error__link',
    };

    this.header = new SmallHeader(headerData);

    this.homeLink = new Link(homeLinkData);
  };

  render() {
    const { header, homeLink } = this;

    const code = '404';
    const description = 'Страница не найдена';

    return template({
      header: header ? header.renderToString() : '',
      code,
      description,
      homeLink: homeLink ? homeLink.renderToString() : '',
    });
  }
}
