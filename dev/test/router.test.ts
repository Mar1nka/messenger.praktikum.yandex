import Router from '../router/index';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

const delay = (time = 500) => new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

describe('router', () => {
  test('go', () => {
    const router = new Router('.wrapper');

    router.go('/home');

    expect(window.location.pathname).toBe('/home');
  });

  test('back', async () => {
    const router = new Router('.wrapper');

    router.go('/home');
    router.go('/login');

    router.back();
    await delay();

    expect(window.location.pathname).toBe('/home');
  });

  test('back and forward', async () => {
    const router = new Router('.wrapper');

    router.go('/home');
    router.go('/login');
    router.back();
    await delay();

    router.forward();
    await delay();

    expect(window.location.pathname).toBe('/login');
  });

  test('forward without forward', async () => {
    const router = new Router('.wrapper');

    router.go('/home');
    router.forward();
    await delay();

    expect(window.location.pathname).toBe('/home');
  });
});
