import EventBus from './event-bus';

interface Meta {
  tagName?: string,
  props?: object,
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public static _instances: Block[];

  public props: any;

  private _id: string;

  private eventBus: EventBus;

  private _meta: Meta;

  private _element?: HTMLElement;

  private _subscriptions: Map<HTMLElement, object>;

  static hydrate: () => void;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName: string = 'div', props: object = {}) {
    Block._instances.push(this);

    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    // eslint-disable-next-line radix
    this._id = `uniq${parseInt(`${Math.random() * 1000000}`)}`;

    this.props = this._makePropsProxy(props);

    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getId() {
    return this._id;
  }

  setElement(element: HTMLElement) {
    this._element = element;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(oldProps?: any) {
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    this.componentDidUpdate(oldProps, newProps);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    if (this._element) {
      if (!this._element!.innerHTML) {
        this._element.innerHTML = block;
      } else {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.render();
        const element = wrapper.children[0];
        this._element.innerHTML = element.innerHTML;
      }
    }
  }

  renderToString() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.render();
    const element = wrapper.children[0];
    element.setAttribute('_key', this.getId());

    return wrapper.innerHTML;
  }

  // Может переопределять пользователь, необязательно трогать
  render():string {
    return '';
  }

  getContent() {
    return this.element;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    Block.hydrate();
  };

  _makePropsProxy(props: any) {
    const proxyData = new Proxy(props, {
      set: (target, prop, value) => {
        const oldProps = { ...this._meta.props };

        if (target[prop] !== value) {
          // eslint-disable-next-line no-param-reassign
          target[prop] = value;
          this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);

          return true;
        }

        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        return true;
      },
      deleteProperty: () => {
        throw new Error('нет доступа');
      },
    });

    return proxyData;
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _attachListeners() {
    this._gatherListeners();

    const iterator = this._subscriptions.entries();
    let item = iterator.next();

    while (!item.done) {
      const [elem, events] = item.value;

      Object.keys(events).forEach((eventName) => {
        elem.addEventListener(eventName, events[eventName]);
      });

      item = iterator.next();
    }
  }

  _gatherListeners() {
    const stack = [this._element];
    const subscriptions = new Map();

    while (stack.length) {
      const current = stack.pop();

      if (!current) {
        break;
      }

      const attrs = Array.from(current.attributes).filter((attr) => attr.name.startsWith('on'));

      if (!attrs.length) {
        // const children = Array.from(current.children);
        // stack.push(...children);

        // eslint-disable-next-line no-continue
        continue;
      }

      if (!subscriptions.get(current)) {
        subscriptions.set(current, {});
      }

      const events = subscriptions.get(current);

      attrs.forEach((attr: Attr) => {
        const eventName = attr.name.substring(2).toLocaleLowerCase();
        const handler = this.props.handlers[attr.value];
        events[eventName] = handler;

        current.removeAttribute(attr.name);
      });

      // const children = Array.from(current.children);
      // stack.push(...children);
    }

    this._subscriptions = subscriptions;
  }
}

Block._instances = [];

Block.hydrate = function () {
  // eslint-disable-next-line no-restricted-syntax
  for (const i of this._instances) {
    i.setElement(document.querySelector(`[_key=${i.getId()}`));
    i._attachListeners();
  }
};
