import HTTPTransport from '../http-transport/index';
import { baseApiUrl } from '../constants';

const customFetch = new HTTPTransport({
  baseApiUrl,
});

const signup = (data: any) => {
  const options = {
    data: {
      first_name: data.firstName,
      second_name: data.secondName,
      login: data.login,
      email: data.email,
      password: data.password,
      phone: data.phone,
    },
  };

  return customFetch.post('/auth/signup', options);
};

const getUser = () => {
  return customFetch.get('/auth/user');
};

const signin = (data: any) => {
  const options = {
    data: {
      login: data.login,
      password: data.password,
    },
  };

  return customFetch.post('/auth/signin', options);
};

const logout = () => {
  return customFetch.post('/auth/logout');
};

const authApi = {
  signup,
  getUser,
  signin,
  logout,
};

export default authApi;
