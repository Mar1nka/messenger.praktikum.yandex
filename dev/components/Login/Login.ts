import Block from '../../blocks/block';
import Link from '../Link/Link';
import Form from '../Form/Form';
import SmallHeader from '../SmallHeader/SmallHeader';
import Router from '../../router/index';
// @ts-ignore
import template from './Login.handlebars';

import { LoginProps } from './types';

import { FieldProps } from '../Field/types';
import authApi from '../../api/authApi';
import Store from '../../store';
import ErrorModal from '../ErrorModal/ErrorModal';
import Modal from '../Modal/Modal';

export default class Login extends Block {
  public props: LoginProps;

  private header: SmallHeader;

  private form: Form;

  private registrationLink: Link;

  private router: Router;

  private errorModal: Modal | null;

  constructor(props: LoginProps) {
    super('section', props);

    this.router = new Router('.wrapper');
  }

  createComponents() {
    const loginFieldData: FieldProps = {
      label: 'Логин',
      id: 'registrationLogin',
      name: 'login',
      inputData: {
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const passwordFieldData = {
      label: 'Пароль',
      id: 'registrationPassword',
      name: 'password',
      inputData: {
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{6,}/,
      },
    };

    const headerData = {
      header: 'Messenger',
    };

    const formData = {
      formHeader: 'Вход',
      fieldsData: [
        loginFieldData,
        passwordFieldData,
      ],
      submitButtonData: {
        title: 'Войти',
        type: 'submit',
        classNames: 'form__submit-button',
      },
    };

    const registrationLinkData = {
      href: '/registration',
      title: 'Зарегистрироваться',
      classNames: 'form__link',
    };

    this.header = new SmallHeader(headerData);

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

    this.registrationLink = new Link(registrationLinkData);

    if (this.props.errors) {
      const errorModalContent = new ErrorModal({
        errors: this.props.errors,
      });

      const errorModalData = {
        contentComponent: errorModalContent,
        title: 'Ошибка',
        onCloseModal: this.handleCloseErrorModal,
      };

      this.errorModal = new Modal(errorModalData);
    } else {
      this.errorModal = null;
    }
  }

  handleCloseErrorModal = () => {
    this.setProps({ errors: '' });
  };

  handleSubmit = async (data: any) => {
    authApi.signin(data)
      .then(
        (xhr) =>
          // @ts-ignore
          // eslint-disable-next-line implicit-arrow-linebreak
          xhr.response,
      )
      .then(() => {
        authApi.getUser()
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .then((data) => {
            // @ts-ignore
            const user = data.response;
            const store = new Store();
            store.setUser(user);
            this.router.go('/profile');
          });
      })
      .catch((xhr) => {
        const { response } = xhr;

        this.setProps({
          errors: response.reason,
        });
      });
  };

  render() {
    this.createComponents();
    const {
      header, form, registrationLink, errorModal,
    } = this;

    return template({
      header: header ? header.renderToString() : '',
      form: form ? form.renderToString() : '',
      registrationLink: registrationLink ? registrationLink.renderToString() : '',
      errorModal: errorModal ? errorModal.renderToString() : '',
    });
  }
}
