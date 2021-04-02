import Block from '../../blocks/block';
import Link from '../Link/Link';
import SmallHeader from '../SmallHeader/SmallHeader';
import ListItem from '../ListItem/ListItem';
// @ts-ignore
import template from './Home.handlebars';

import { HomeProps } from './types';

export default class Home extends Block {
  public props: HomeProps;

  private header: SmallHeader;

  private itemList: ListItem[];

  constructor(props: HomeProps) {
    super('section', props);
    this.itemList = [];

    this.createComponents();
  }

  createComponents = () => {
    this.itemList = [];

    const headerData = {
      header: 'Messenger',
    };

    const itemListData = [
      {
        href: '/registration',
        title: 'Страница регистрации',
        classNames: '',
      },
      {
        href: '/login',
        title: 'Страница входа',
        classNames: '',
      },
      {
        href: '/error-404',
        title: 'Страница 404',
        classNames: '',
      },
      {
        href: '/error-505',
        title: 'Страница 505',
        classNames: '',
      },
      {
        href: '/chat-list',
        title: 'Список чатов',
        classNames: '',
      },
      {
        href: '/profile',
        title: 'Профиль',
        classNames: '',
      },
    ];

    this.header = new SmallHeader(headerData);

    itemListData.forEach((itemData) => {
      const link = new Link(itemData);

      const listItem = new ListItem({
        element: link,
        classNames: '',
      });

      this.itemList.push(listItem);
    });
  };

  render() {
    const { header, itemList } = this;

    const headerList = 'Чтобы посмотреть все страницы, перейдите по ссылкам:';

    return template({
      header: header ? header.renderToString() : '',
      headerList,
      itemList: itemList || [],
    });
  }
}
