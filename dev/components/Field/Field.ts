import Block from '../../blocks/block';
import Input from '../Input/Input';
import { FieldProps } from './types';
// @ts-ignore
import template from './Field.handlebars';

export default class Field extends Block {
  public props: FieldProps;

  private input: Input;

  constructor(props: FieldProps) {
    super('article', { ...props, errorText: props.errorText || '' });
  }

  createComponents() {
    const {
      inputData, label, id, name,
    } = this.props;

    this.input = new Input({
      ...inputData,
      label,
      id,
      nameField: name,
      // @ts-ignore
      onBlur: this.updateField,
      handlers: {
        blurHandler: (event: any) => {
          this.input.handleBlur(event);
        },
      },
    });
  }

  updateField = (fieldData: any) => {
    const { value, error = '' } = fieldData;

    if (this.props.inputData.type === 'file') {
      return; // ToDo: add error case
    }

    // @ts-ignore
    if (error === this.props.errorText && value === this.props.inputData.value) {
      return;
    }

    this.setProps({
      errorText: error,
      inputData: {
        ...this.props.inputData,
        value,
      },
    });
  };

  getFieldData = () => {
    const { value, fields } = this.getFieldValue();
    const error = this.input.getError(value);
    const { name } = this.props;

    return {
      value, error, nameField: name, fields,
    };
  };

  getFieldValue = () => {
    const element = this.input!.getContent() as HTMLInputElement;

    return { value: element.value, fields: element.files };
  };

  render() {
    this.createComponents();
    // @ts-ignore
    const { label, id, errorText } = this.props;
    const { input } = this;

    return template({
      label,
      for: id,
      input: input ? input.renderToString() : '',
      errorText: errorText || '',
    });
  }
}
