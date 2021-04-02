import Block from '../../blocks/block';
import Form from '../Form/Form';
import ErrorModal from '../ErrorModal/ErrorModal';
import Modal from '../Modal/Modal';

import { CreateChatModalProps } from './types';
import { FieldProps } from '../Field/types';

import chatsApi from '../../api/chatsApi';

// @ts-ignore
import template from './CreateChatModal.handlebars';

export default class CreateChatModal extends Block {
  public props: CreateChatModalProps;

  private form: Form;

  private errorModal: Modal | null;

  constructor(props: CreateChatModalProps) {
    super('section', props);
  }

  createComponents() {
    const titleChatFieldData: FieldProps = {
      label: 'Название чата',
      id: 'titleChat',
      name: 'title',
      inputData: {
        value: '',
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{2,}/,
      },
    };

    const formData = {
      formHeader: 'Создание чата',
      fieldsData: [
        titleChatFieldData,
      ],
      submitButtonData: {
        title: 'Создать',
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

  handleSubmit = (data: any) => {
    chatsApi.createChat(data)
      // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unused-vars
      .then((data) => {
        // @ts-ignore
        const { onSubmit } = this.props;

        onSubmit();
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

    const { form, errorModal } = this;

    return template({
      form: form ? form.renderToString() : '',
      errorModal: errorModal ? errorModal.renderToString() : '',
    });
  }
}
