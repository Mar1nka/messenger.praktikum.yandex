import { METHODS } from '../constants';
import { Options } from '../types';

function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
  private baseApiUrl: string;

  private credentials: string;

  private mode: string;

  private headers: object;

  constructor({
    baseApiUrl = '', credentials = 'include', mode = 'cors', headers = {
      'content-type': 'application/json',
    },
  }) {
    this.baseApiUrl = baseApiUrl;
    this.credentials = credentials;
    this.mode = mode;
    this.headers = headers;
  }

  get = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: Options) => {
    const {
      headers = this.headers, method, data,
      credentials = this.credentials, isNotJson = false, timeout = 5000,
    } = options;

    const { baseApiUrl } = this;

    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet: boolean = method === METHODS.GET;

      xhr.open(
        method,
        isGet && data
          ? `${baseApiUrl}${url}${queryStringify(data)}`
          : `${baseApiUrl}${url}`,
      );

      Object.keys(headers).forEach((key) => {
        // @ts-ignore
        xhr.setRequestHeader(key, headers[key]);
      });

      if (credentials === 'include') {
        xhr.withCredentials = true;
      }

      xhr.responseType = 'json';

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (isNotJson) {
        // @ts-ignore
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
