import { User } from './types';

export default class Store {
  private user: User | null;

  private static __instance: Store ;

  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }

    Store.__instance = this;

    this.user = null;
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
