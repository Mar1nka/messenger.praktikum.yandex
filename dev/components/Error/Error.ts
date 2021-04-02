import Block from '../../blocks/block';
import SmallHeader from '../SmallHeader/SmallHeader';
import Link from '../Link/Link';

// @ts-ignore
import template from './Error.handlebars';

import { ErrorProps } from './types';

export default class Error extends Block {
  public props: ErrorProps;

  private header: SmallHeader;

  private homeLink: Link;

  constructor(props: ErrorProps) {
    super('section', props);

    this.createComponents();
  }

  createComponents = () => {
    const { headerData, homeLinkData } = this.props;

    this.header = new SmallHeader(headerData);

    this.homeLink = new Link(homeLinkData);
  };

  render() {
    const { header, homeLink } = this;

    const { code, description } = this.props;

    return template({
      header: header ? header.renderToString() : '',
      code,
      description,
      homeLink: homeLink ? homeLink.renderToString() : '',
    });
  }
}
