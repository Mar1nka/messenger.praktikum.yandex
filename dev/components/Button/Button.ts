import Block from '../../blocks/block';
import { ButtonProps } from './types';
// @ts-ignore
import template from './Button.handlebars';

export default class Button extends Block {
  public props: ButtonProps;

  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    const { title, classNames, type } = this.props;

    const element = template(
      {
        title,
        type,
        classNames: `button ${classNames}`,
      },
    );

    return element;
  }
}
