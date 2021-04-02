import Block from '../../blocks/block';
import Button from '../Button/Button';
import Field from '../Field/Field';
import { FormProps } from './types';
// @ts-ignore
import template from './Form.handlebars';

export default class Form extends Block {
  public props: FormProps;

  private fields: Field[];

  private submitButton: Button;

  constructor(props: FormProps) {
    super('form', props);
  }

  createComponents() {
    this.fields = [];

    const { fieldsData, submitButtonData } = this.props;

    this.submitButton = new Button({
      ...submitButtonData,
      // @ts-ignore
      handlers: {
        clickHandler: () => {
        },
      },
    });

    fieldsData.forEach((fieldDate: any) => {
      const field = new Field({
        ...fieldDate,
        inputData: {
          ...fieldDate.inputData,
        },
      });

      this.fields.push(field);
    });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let errorsCounter = 0;

    this.fields.forEach((field) => {
      const { value, error } = field.getFieldData();

      field.updateField({ value, error });

      if (error) {
        errorsCounter += 1;
      }
    });

    event.preventDefault();

    if (!errorsCounter) {
      const data = {};

      this.fields.forEach((field) => {
        const { value, nameField, fields } = field.getFieldData();

        if (field.props.inputData.type === 'file') {
          // @ts-ignore
          data[nameField] = fields;
        } else {
          // @ts-ignore
          data[nameField] = value;
        }
      });

      const { onSubmit } = this.props;

      onSubmit(data);
    }
  };

  render() {
    this.createComponents();
    const { formHeader, errors } = this.props;
    const { fields, submitButton } = this;

    return template({
      formHeader,
      fields: fields || [],
      submitButton: submitButton ? submitButton.renderToString() : '',
      errors: errors || '',
    });
  }
}
