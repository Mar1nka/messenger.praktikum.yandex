import HTTPTransport from '../http-transport/index';
import { baseApiUrl } from '../constants';

const customFetch = new HTTPTransport({
  baseApiUrl,
});

const changeUserProfile = (data: any) => {
  const options = {
    data: {
      first_name: data.first_name,
      second_name: data.second_name,
      login: data.login,
      email: data.email,
      phone: data.phone,
      display_name: data.display_name,
    },
  };

  return customFetch.put('/user/profile', options);
};

const changeUserPassword = (data: any) => {
  const options = {
    data: {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    },
  };

  return customFetch.put('/user/password', options);
};

const changeUserAvatar = (files: any) => {
  const formData = new FormData();
  formData.append('avatar', files[0]);

  const options = {
    data: formData,
    credentials: 'include',
    mode: 'cors',
    headers: {
      accept: 'application/json',
    },
    isNotJson: true,

  };

  return customFetch.put('/user/profile/avatar', options);
};

const searchForUserByLogin = (data: any) => {
  const options = {
    data: {
      login: data.login,
    },
  };

  return customFetch.post('/user/search', options);
};

const userApi = {
  changeUserProfile,
  changeUserPassword,
  changeUserAvatar,
  searchForUserByLogin,
};

export default userApi;
