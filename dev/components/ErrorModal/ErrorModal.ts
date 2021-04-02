import Block from '../../blocks/block';
// @ts-ignore
import template from './ErrorModal.handlebars';

import { ErrorModalProps } from './types';

export default class ErrorModal extends Block {
  public props: ErrorModalProps;

  constructor(props: ErrorModalProps) {
    super('div', props);
  }

  render() {
    const { errors } = this.props;

    return template({
      errors,
    });
  }
}
