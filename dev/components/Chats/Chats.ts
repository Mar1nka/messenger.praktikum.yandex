import Block from '../../blocks/block';
import ListItem from '../ListItem/ListItem';
import Dialog from '../Dialog/Dialog';
import { ChatsProps } from './types';
// @ts-ignore
import template from './Chats.handlebars';

export default class Chats extends Block {
  public props: ChatsProps;

  private itemList: ListItem[];

  constructor(props: ChatsProps) {
    super('a', props);

    this.itemList = [];
    this.createComponents();
  }

  createComponents() {
    const { chats = [] } = this.props;

    this.itemList = [];

    chats.forEach((itemData: any) => {
      const dialog = new Dialog({
        ...itemData,
        // @ts-ignore
        handlers: {
          clickHandler: (event: any) => {
            // @ts-ignore
            this.props.onSelectChat(event, itemData.id);
          },
        },
      });

      const listItem = new ListItem({
        element: dialog,
        classNames: 'dialog-wrapper',
      });

      this.itemList.push(listItem);
    });
  }

  render() {
    const { itemList } = this;

    return template({
      itemList: itemList || [],
    });
  }
}
