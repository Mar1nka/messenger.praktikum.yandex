import Block from '../blocks/block';
import { isEqual } from '../helpers/common';

const render = (query: string, block: Block | null) => {
  const root = document.querySelector(query);
  // @ts-ignore
  root.innerHTML = block.renderToString();
  return root;
};

export default class Route {
  private _pathname: any;

  private _blockClass: any;

  private _block: Block | null;

  private _props: any;

  constructor(pathname: any, view: any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    Block.hydrate();
  }
}
