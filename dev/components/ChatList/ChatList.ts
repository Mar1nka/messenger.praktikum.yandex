import Block from '../../blocks/block';
import Link from '../Link/Link';
import Chats from '../Chats/Chats';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import CreateChatModal from '../CreateChatModal/CreateChatModal';
import AddUsersToChatModal from '../AddUsersToChatModal/AddUsersToChatModal';
import RemoveUsersFromChatModal from '../RemoveUsersFromChatModal/RemoveUsersFromChatModal';
// @ts-ignore
import template from './ChatList.handlebars';

import chatsApi from '../../api/chatsApi';

import { ChatListProps } from './types';

export default class ChatList extends Block {
  private profileLink: Link;

  private chats: Chats;

  private createChatButton: Button;

  private createChatModal: Modal;

  private addUsersToChatButton: Button;

  private removeUsersFromChatButton: Button;

  private addUsersToChatModal: Modal;

  private removeUsersFromChatModal: Modal;

  constructor(props: ChatListProps) {
    super('div', props);

    this.fetchChats();
  }

  createComponents() {
    const { chats } = this.props;

    this.chats = new Chats({
      // @ts-ignore
      onSelectChat: this.handleSelectChat,
      chats,
    });

    const profileLinkData = {
      href: '/profile',
      title: 'Профиль',
      classNames: 'link--contrast',
    };

    this.profileLink = new Link(profileLinkData);

    const createChatButtonData = {
      title: 'Создать чат',
      type: 'button',
      classNames: '',
      handlers: {
        clickHandler: () => {
          this.handleClickCreateChatButton();
        },
      },
    };

    this.createChatButton = new Button(createChatButtonData);

    if (this.props.isOpenCreateChatModal) {
      const createChatModalContent = new CreateChatModal({
        // @ts-ignore
        onSubmit: this.handleCreateChat,
      });

      const createChatModalData = {
        contentComponent: createChatModalContent,
        title: 'Создание чата',
        onCloseModal: this.handleCloseCreateChatModal,
      };

      this.createChatModal = new Modal(createChatModalData);
    }

    this.chats = new Chats({
      // @ts-ignore
      onSelectChat: this.handleSelectChat,
      chats,
    });

    const addUsersToChatButtonData = {
      title: 'Добавить пользователей в чат',
      type: 'button',
      classNames: 'messages__action-button',
      handlers: {
        clickHandler: () => {
          this.handleClickAddUsersToChatButton();
        },
      },
    };

    if (this.props.isOpenAddUsersToChatModal) {
      const addUsersToChatModalContent = new AddUsersToChatModal(
        { chatId: this.props.selectedChatId },
      );

      const addUsersToChatModalData = {
        contentComponent: addUsersToChatModalContent,
        title: 'Добавление пользователей в чат',
        onCloseModal: this.handleCloseAddUsersToChatModal,
      };

      this.addUsersToChatModal = new Modal(addUsersToChatModalData);
    }

    this.addUsersToChatButton = new Button(addUsersToChatButtonData);

    if (this.props.isOpenRemoveUsersFromChatModal) {
      const removeUsersFromChatModalContent = new RemoveUsersFromChatModal(
        { chatId: this.props.selectedChatId },
      );

      const removeUsersFromChatModalData = {
        contentComponent: removeUsersFromChatModalContent,
        title: 'Удаление пользователей из чата',
        onCloseModal: this.handleCloseRemoveUsersFromChatModal,
      };

      this.removeUsersFromChatModal = new Modal(removeUsersFromChatModalData);
    }

    const removeUsersFromChatButtonData = {
      title: 'Удалить пользователей из чата',
      type: 'button',
      classNames: 'messages__action-button',
      handlers: {
        clickHandler: () => {
          this.handleClickRemoveUsersFromChatButton();
        },
      },
    };

    this.removeUsersFromChatButton = new Button(removeUsersFromChatButtonData);
  }

  handleSelectChat = (event: any, chatId: string | number) => {
    event.preventDefault();
    this.setProps({ selectedChatId: chatId });
  };

  fetchChats() {
    chatsApi.getChats()
      .then((data) => {
        // @ts-ignore
        const chats = data.response;

        this.setProps({ chats });
      });
  }

  handleCreateChat = () => {
    this.fetchChats();

    this.setProps({ isOpenCreateChatModal: false });
  };

  handleCloseCreateChatModal = () => {
    this.setProps({ isOpenCreateChatModal: false });
  };

  handleClickCreateChatButton = () => {
    this.setProps({ isOpenCreateChatModal: true });
  };

  handleClickAddUsersToChatButton = () => {
    this.setProps({ isOpenAddUsersToChatModal: true });
  };

  handleCloseAddUsersToChatModal = () => {
    this.setProps({ isOpenAddUsersToChatModal: false });
  };

  handleClickRemoveUsersFromChatButton = () => {
    this.setProps({ isOpenRemoveUsersFromChatModal: true });
  };

  handleCloseRemoveUsersFromChatModal = () => {
    this.setProps({ isOpenRemoveUsersFromChatModal: false });
  };

  getChatName() {
    const { selectedChatId, chats } = this.props;

    if (selectedChatId && chats) {
      const selectedChat = chats.find((chat: any) => chat.id === selectedChatId);

      if (selectedChat) {
        return selectedChat.title;
      }
    }

    return '';
  }

  render() {
    this.createComponents();
    const {
      isOpenCreateChatModal, selectedChatId,
      isOpenAddUsersToChatModal, isOpenRemoveUsersFromChatModal,
    } = this.props;
    const {
      profileLink, chats, createChatButton, createChatModal,
      addUsersToChatButton, removeUsersFromChatButton,
      addUsersToChatModal, removeUsersFromChatModal,
    } = this;

    const header = 'Messenger';
    const noMessages = 'Выбирите чат чтобы отправить сообщение';

    return template({
      header,
      profileLink: profileLink ? profileLink.renderToString() : '',
      createChatButton: createChatButton ? createChatButton.renderToString() : '',
      chats: chats ? chats.renderToString() : '',
      noMessages,
      createChatModal: (isOpenCreateChatModal && createChatModal) ? createChatModal.renderToString() : '',
      selectedChatId,
      addUsersToChatButton: addUsersToChatButton ? addUsersToChatButton.renderToString() : '',
      removeUsersFromChatButton: removeUsersFromChatButton ? removeUsersFromChatButton.renderToString() : '',
      chatName: this.getChatName(),
      addUsersToChatModal: (isOpenAddUsersToChatModal && addUsersToChatModal) ? addUsersToChatModal.renderToString() : '',
      removeUsersFromChatModal: (isOpenRemoveUsersFromChatModal && removeUsersFromChatModal) ? removeUsersFromChatModal.renderToString() : '',
    });
  }
}
