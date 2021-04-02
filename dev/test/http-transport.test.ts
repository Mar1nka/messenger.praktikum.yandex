// @ts-ignore
import mock from 'xhr-mock';
import HTTPTransport from '../http-transport/index';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
// @ts-ignore
// eslint-disable-next-line import/order
import { XHRMock } from 'xhr-mock/lib/XHRMock';

describe('HTTPTransport', () => {
  beforeEach(() => mock.setup());

  afterEach(() => mock.teardown());

  test('status get', async () => {
    const customFetch = new HTTPTransport({});

    mock.get('/home', {
      status: 201,
      body: '{"data":{"id":"abc-123"}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.get('/home');
    // @ts-ignore
    expect(xhr.status).toBe(201);
  });

  test('status put', async () => {
    const customFetch = new HTTPTransport({});

    mock.put('/home', {
      status: 201,
      body: '{"data":{"id":"abc-123"}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.put('/home');
    // @ts-ignore
    expect(xhr.status).toBe(201);
  });

  test('status post', async () => {
    const customFetch = new HTTPTransport({});

    mock.post('/home', {
      status: 201,
      body: '{"data":{"id":"abc-123"}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.post('/home');
    // @ts-ignore
    expect(xhr.status).toBe(201);
  });

  test('status delete', async () => {
    const customFetch = new HTTPTransport({});

    mock.delete('/home', {
      status: 201,
      body: '{"data":{"id":"abc-123"}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.delete('/home');
    // @ts-ignore
    expect(xhr.status).toBe(201);
  });

  test('response get', async () => {
    const customFetch = new HTTPTransport({});

    mock.get('/home', {
      status: 201,
      body: '{"data":{"id":"abc-123"}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.get('/home');
    // @ts-ignore
    expect(xhr.response.data.id).toBe('abc-123');
  });

  test('response put', async () => {
    const customFetch = new HTTPTransport({});

    mock.put('/home', {
      status: 201,
      body: '{"data":{"id":"abc-123"}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.put('/home');
    // @ts-ignore
    expect(xhr.response.data.id).toBe('abc-123');
  });

  test('response post', async () => {
    const customFetch = new HTTPTransport({});

    mock.post('/home', {
      status: 201,
      body: '{"data":{"userId": 2}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.post('/home');
    // @ts-ignore
    expect(xhr.response.data.userId).toBe(2);
  });

  test('response delete', async () => {
    const customFetch = new HTTPTransport({});

    mock.delete('/home', {
      status: 201,
      body: '{"data":{"id": 3}}',
    });

    // @ts-ignore
    const xhr: XHRMock = await customFetch.delete('/home');
    // @ts-ignore
    expect(xhr.response.data.id).toBe(3);
  });
});
