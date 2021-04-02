import Block from '../../blocks/block';
import { InputProps } from './types';
// @ts-ignore
import template from './Input.handlebars';

export default class Input extends Block {
  public props: InputProps;

  constructor(props: InputProps) {
    super('input', props);
  }

  handleBlur = ({ target }: { target: HTMLInputElement }) => {
    const { value, files } = target;
    const error = this.getError(value);
    // @ts-ignore
    this.props.onBlur({ error, value, files });
  };

  getError = (value: string) => {
    const { regexp } = this.props;
    if (!regexp) {
      return undefined;
    }

    const isValid = regexp.test(value);

    const { label } = this.props;

    if (isValid) {
      return undefined;
    }
    return `${label}: невалидное значение`;
  };

  render() {
    const {
      type, id, required, value, disabled, accept,
    } = this.props;

    return template({
      type,
      value,
      disabled: disabled ? 'disabled' : '',
      id,
      required,
      accept,
    });
  }
}
