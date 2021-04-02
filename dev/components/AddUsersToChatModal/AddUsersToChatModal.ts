import Block from '../../blocks/block';
import ListItem from '../ListItem/ListItem';
import User from '../User/User';

import { AddUsersToChatModalProps } from './types';

import userApi from '../../api/userApi';
import chatsApi from '../../api/chatsApi';

// @ts-ignore
import template from './AddUsersToChatModal.handlebars';

export default class AddUsersToChatModal extends Block {
  public props: AddUsersToChatModalProps;

  private itemList: ListItem[];

  constructor(props: AddUsersToChatModalProps) {
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
            this.handleAddUser(event, itemData);
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
    const data = {
      login: '',
    };

    userApi.searchForUserByLogin(data)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((data) => {
        // @ts-ignore
        const users = data.response;

        this.setProps({ users });
      });
  }

  handleAddUser = (event: any, user: any) => {
    event.preventDefault();
    const { chatId } = this.props;

    const data = {
      users: [user.id],
      chatId,
    };

    chatsApi.addUsersToChat(data)
      .then(() => {});
  };

  render() {
    this.createComponents();
    const { itemList } = this;

    return template({
      itemList: itemList || [],
    });
  }
}
