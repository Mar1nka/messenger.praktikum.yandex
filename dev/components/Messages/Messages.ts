import Block from '../../blocks/block';
import ListItem from '../ListItem/ListItem';
import ChatDialog from '../ChatDialog/ChatDialog';
import Form from '../Form/Form';

// @ts-ignore
import template from './Messages.handlebars';

import { MessagesProps } from './types';

export default class Messages extends Block {
  public props: MessagesProps;

  private itemList: ListItem[];

  private form: Form;

  constructor(props: MessagesProps) {
    super('a', props);

    this.itemList = [];
    this.createComponents();
  }

  createComponents = () => {
    this.itemList = [];
    const { chatDialogData } = this.props;

    chatDialogData.forEach((itemData: any) => {
      const chatDialog = new ChatDialog(itemData);

      const listItem = new ListItem({
        element: chatDialog,
        classNames: 'dialog-wrapper',
      });

      this.itemList.push(listItem);
    });

    const messageFieldData = {
      label: 'Сообщение',
      id: 'registrationPassword',
      inputData: {
        type: 'text',
        required: true,
        regexp: /[0-9a-zA-Z]{40,}/,
      },
    };

    const formData = {
      formHeader: '',
      fieldsData: [
        messageFieldData,
      ],
      submitButtonData: {
        title: 'Отправить',
        type: 'submit',
        classNames: 'form__submit-button',
      },
    };

    this.form = new Form({
      ...formData,
      // @ts-ignore
      handlers: {
        submitHandler: (event: any) => {
          this.form.handleSubmit(event);
        },
      },
    });
  };

  render() {
    const { itemList, form } = this;

    return template({
      itemList: itemList || [],
      form: form ? form.renderToString() : '',
    });
  }
}
