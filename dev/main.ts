import Router from './router/index';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Error404 from './components/Error404/Error404';
import Error505 from './components/Error505/Error505';
import ChatList from './components/ChatList/ChatList';
import Profile from './components/Profile/Profile';

import Store from './store';
import authApi from './api/authApi';

const store = new Store();

const connectRouter = () => {
  const router = new Router('.wrapper');

  router
    .use('/home', Home)
    .use('/chat-list', ChatList)
    .use('/login', Login)
    .use('/registration', Registration)
    .use('/profile', Profile)
    .use('/error-404', Error404)
    .use('/error-505', Error505)
    .start();

  if (window.location.pathname === '/') {
    router.go('/home');
  }
};

authApi.getUser()
  .then((data) => {
    // @ts-ignore
    const user = data.response;
    store.setUser(user);
    connectRouter();
  })
  .catch(() => {
    connectRouter();
  });
