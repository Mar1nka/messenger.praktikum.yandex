import Block from '../../blocks/block';
import ListItem from '../ListItem/ListItem';
import User from '../User/User';
import { RemoveUsersFromChatModalProps } from './types';
import chatsApi from '../../api/chatsApi';
// @ts-ignore
import template from './RemoveUsersFromChatModal.handlebars';

// @ts-ignore
export default class RemoveUsersFromChatModal extends Block {
  public props: RemoveUsersFromChatModalProps;

  private itemList: ListItem[];

  constructor(props: RemoveUsersFromChatModalProps) {
    super('section', props);

    this.itemList = [];
    this.fetchUsers();
  }

  createComponents() {
    // @ts-ignore
    const { users = [] } = this.props;

    this.itemList = [];

    users.forEach((itemData: any) => {
      const user = new User({
        ...itemData,
        handlers: {
          clickHandler: (event: any) => {
            // @ts-ignore
            this.handleRemoveUser(event, itemData);
          },
        },
      });

      const listItem = new ListItem({
        element: user,
        classNames: 'user-wrapper',
      });

      this.itemList.push(listItem);
    });
  }

  fetchUsers() {
    const { chatId } = this.props;

    chatsApi.getChatUsers(chatId)
      .then((data) => {
        // @ts-ignore
        const users = data.response;

        this.setProps({ users });
      });
  }

  handleRemoveUser = (event: any, user: any) => {
    event.preventDefault();
    const { chatId } = this.props;

    const data = {
      users: [user.id],
      chatId,
    };

    chatsApi.deleteUsersFromChat(data)
      .then(() => {
        this.fetchUsers();
      });
  };

  render() {
    this.createComponents();
    const { itemList } = this;

    return template({
      itemList: itemList || [],
    });
  }
}
