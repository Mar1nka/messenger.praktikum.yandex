import Block from '../../blocks/block';
import Link from '../Link/Link';
import Form from '../Form/Form';
import SmallHeader from '../SmallHeader/SmallHeader';
import ErrorModal from '../ErrorModal/ErrorModal';
import Modal from '../Modal/Modal';

// @ts-ignore
import template from './Registration.handlebars';

import Store from '../../store';
import authApi from '../../api/authApi';

import { RegistrationProps } from './types';
import { FieldProps } from '../Field/types';

export default class Registration extends Block {
  public props: RegistrationProps;

  private header: any;

  private form: any;

  private registrationLink: any;

  private errorModal: Modal | null;

  constructor(props: RegistrationProps) {
    super('section', props);
  }

  createComponents() {
    const firstNameFieldData: FieldProps = {
      label: 'Имя пользователя',
      id: 'registrationFirstName',
      name: 'firstName',
      inputData: {
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const secondNameFieldData: FieldProps = {
      label: 'Фамилия',
      id: 'registrationSecondName',
      name: 'secondName',
      inputData: {
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

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

    const emailFieldData: FieldProps = {
      label: 'Почта',
      id: 'registrationEmail',
      name: 'email',
      inputData: {
        type: 'email',
        required: true,
        regexp: /^\S+@\S+$/,
      },
    };

    const passwordFieldData: FieldProps = {
      label: 'Пароль',
      id: 'registrationPassword',
      name: 'password',
      inputData: {
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{6,}/,
      },
    };

    const phoneFieldData: FieldProps = {
      label: 'Номер телефона',
      id: 'registrationPhone',
      name: 'phone',
      inputData: {
        type: 'text',
        required: true,
        regexp: /^\+?\d*$/, // regexp: /^((8|+7)[- ]?)?((?\d{3})?[- ]?)?[\d- ]{7,10}$/,
      },
    };

    const headerData = {
      header: 'Messenger',
    };

    const formData = {
      formHeader: 'Регистрация',
      fieldsData: [
        firstNameFieldData,
        secondNameFieldData,
        loginFieldData,
        emailFieldData,
        passwordFieldData,
        phoneFieldData,
      ],
      submitButtonData: {
        title: 'Зарегистрироваться',
        type: 'submit',
        classNames: 'form__submit-button',
      },
    };

    const registrationLinkData = {
      href: '/login',
      title: 'Войти',
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
    authApi.signup(data)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((data) => data)
      .then(() => {
        authApi.getUser()
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .then((data) => {
            const store = new Store();
            // @ts-ignore
            store.setUser(data.response);
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
