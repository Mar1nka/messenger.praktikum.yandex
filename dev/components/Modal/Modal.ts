import Block from '../../blocks/block';
import { ModalProps } from './types';
import Button from '../Button/Button';
// @ts-ignore
import template from './Modal.handlebars';

export default class Modal extends Block {
  public props: ModalProps;

  private closeModalButton: Button;

  constructor(props: ModalProps) {
    super('div', props);
  }

  createComponents() {
    const closeModalButtonData = {
      title: 'Закрыть модальное окно',
      type: 'button',
      classNames: 'modal__close-button',
      handlers: {
        clickHandler: () => {
          this.handleCloseModal();
        },
      },
    };

    this.closeModalButton = new Button(closeModalButtonData);
  }

  handleCloseModal = () => {
    // @ts-ignore
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  render() {
    this.createComponents();

    const { closeModalButton } = this;
    const { contentComponent, title } = this.props;

    return template({
      // @ts-ignore
      component: contentComponent.renderToString(),
      closeModalButton: closeModalButton ? closeModalButton.renderToString() : '',
      title,
    });
  }
}
