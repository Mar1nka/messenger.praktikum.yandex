export type Options = {
  timeout?: number,
  method?: string,
  data?: object,
  headers?: object | undefined,
  credentials?: string,
  isNotJson?: boolean,
};

export type User = {
  id: string,
  'first_name': string,
  'second_name': string,
  'display_name'?: string,
  login: string,
  email: string,
  phone: string,
  avatar?: string,
};
