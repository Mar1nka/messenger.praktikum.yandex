import Block from '../../blocks/block';
import Router from '../../router/index';

import Link from '../Link/Link';
import Form from '../Form/Form';
import Button from '../Button/Button';
import ErrorModal from '../ErrorModal/ErrorModal';
import Modal from '../Modal/Modal';

import { ProfileProps } from './types';
import { FieldProps } from '../Field/types';

import Store from '../../store';
import userApi from '../../api/userApi';
import authApi from '../../api/authApi';

// @ts-ignore
import template from './Profile.handlebars';

const baseUrl = 'https://ya-praktikum.tech';

export default class Profile extends Block {
  public props: ProfileProps;

  private form: Form;

  private chatListLink: Link;

  private store: Store;

  private logoutButton: Button;

  private router: Router;

  private avatarSrc: string | null;

  private errorModal: Modal | null;

  constructor(props: ProfileProps) {
    super('section', props);

    this.store = new Store();
    this.router = new Router('.wrapper');
  }

  // eslint-disable-next-line consistent-return
  createComponents(): void {
    // @ts-ignore

    if (!this.store) {
      return undefined;
    }

    const user = this.store.getUser();

    this.avatarSrc = user && user.avatar ? `${baseUrl}${user.avatar}` : 'https://upload.wikimedia.org/wikipedia/commons/7/79/2010-brown-bear.jpg';

    const firstNameFieldData: FieldProps = {
      label: 'Имя пользователя',
      id: 'profileFirstName',
      name: 'first_name',
      inputData: {
        value: user ? user.first_name : '',
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const secondNameFieldData: FieldProps = {
      label: 'Фамилия',
      id: 'profileSecondName',
      name: 'second_name',
      inputData: {
        value: user ? user.second_name : '',
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const displayNameFieldData: FieldProps = {
      label: 'Отображаемое имя',
      id: 'profileDisplayName',
      name: 'display_name',
      inputData: {
        value: user ? user.display_name : '',
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const loginFieldData: FieldProps = {
      label: 'Логин',
      id: 'profileLogin',
      name: 'login',
      inputData: {
        value: user ? user.login : '',
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const emailFieldData: FieldProps = {
      label: 'Почта',
      id: 'profileEmail',
      name: 'email',
      inputData: {
        value: user ? user.email : '',
        type: 'email',
        required: true,
        regexp: /^\S+@\S+$/,
      },
    };

    const oldPasswordFieldData: FieldProps = {
      label: 'Старый пароль',
      id: 'profileOldPassword',
      name: 'oldPassword',
      inputData: {
        value: '',
        type: 'text',
        required: false,
        regexp: /(?: [0-9a-zA-Z]{6,} )?/,
      },
    };

    const newPasswordFieldData: FieldProps = {
      label: 'Новый пароль',
      id: 'profileNewPassword',
      name: 'newPassword',
      inputData: {
        value: '',
        type: 'text',
        required: false,
        regexp: /(?: [0-9a-zA-Z]{6,} )?/,
      },
    };

    const phoneFieldData: FieldProps = {
      label: 'Номер телефона',
      id: 'profilePhone',
      name: 'phone',
      inputData: {
        value: user ? user.phone : '',
        type: 'text',
        required: true,
        regexp: /^\+?\d*$/,
      },
    };

    const avatarFieldData: FieldProps = {
      label: 'Аватар',
      id: 'profileAvatar',
      name: 'avatar',
      inputData: {
        value: '',
        type: 'file',
        required: false,
        accept: 'image/*',
      },
    };

    const formData = {
      formHeader: 'Профиль',
      fieldsData: [
        firstNameFieldData,
        secondNameFieldData,
        displayNameFieldData,
        loginFieldData,
        emailFieldData,
        oldPasswordFieldData,
        newPasswordFieldData,
        phoneFieldData,
        avatarFieldData,
      ],
      submitButtonData: {
        title: 'Сохранить',
        type: 'submit',
        classNames: 'form__submit-button',
      },
    };

    this.form = new Form({
      ...formData,
      onSubmit: this.handleSubmit,
      // @ts-ignore
      handlers: {
        submitHandler: (event: any) => {
          this.form.handleSubmit(event);
        },
      },
    });

    const chatListLinkData = {
      href: '/chat-list',
      title: 'Диалоги',
      classNames: 'link--contrast',
    };

    this.chatListLink = new Link(chatListLinkData);

    const logoutButtonData = {
      title: 'Выйти',
      type: 'button',
      classNames: '',
      handlers: {
        clickHandler: () => {
          this.handleClickLogoutButton();
        },
      },
    };

    this.logoutButton = new Button(logoutButtonData);

    if (this.props.errors) {
      const errorModalContent = new ErrorModal({
        errors: this.props.errors,
      });

      const errorModalData = {
        contentComponent: errorModalContent,
        onCloseModal: this.handleCloseErrorModal,
        title: 'Ошибка',
      };

      this.errorModal = new Modal(errorModalData);
    } else {
      this.errorModal = null;
    }
  }

  handleCloseErrorModal = () => {
    this.setProps({ errors: '' });
  };

  handleSubmit = (data: any) => {
    userApi.changeUserProfile(data)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((data) => {
        // @ts-ignore
        const user = data.response;
        this.store.setUser(user);
        this.setProps({ test: 'test' });
      })
      .catch((xhr) => {
        const { response } = xhr;

        this.setProps({
          errors: response.reason,
        });
      });

    if (data.oldPassword && data.newPassword) {
      userApi.changeUserPassword(data)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then((data) => {
          // @ts-ignore
          const user = data.response;
          this.store.setUser(user);
          this.setProps({ test: 'test' });
        })
        .catch(() => {
          this.setProps({
            errors: 'Password is incorrect',
          });
        });
    }

    if (data.avatar.length) {
      userApi.changeUserAvatar(data.avatar)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then((data) => {
          // @ts-ignore
          const user = data.response;
          this.store.setUser(user);
          this.setProps({ test: 'test' });
        })
        .catch(() => {
          this.setProps({
            errors: 'Bad Request',
          });
        });
    }
  };

  handleClickLogoutButton() {
    authApi.logout()
      .then(() => {
        this.router.go('/login');
      });
  }

  render() {
    this.createComponents();

    const {
      form, chatListLink, logoutButton, avatarSrc, errorModal,
    } = this;

    const header = 'Messenger';

    return template({
      header,
      form: form ? form.renderToString() : '',
      chatListLink: chatListLink ? chatListLink.renderToString() : '',
      logoutButton: logoutButton ? logoutButton.renderToString() : '',
      avatarSrc,
      errorModal: errorModal ? errorModal.renderToString() : '',
    });
  }
}
