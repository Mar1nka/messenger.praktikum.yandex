import HTTPTransport from '../http-transport/index';
import { baseApiUrl } from '../constants';

const customFetch = new HTTPTransport({
  baseApiUrl,
});

const getChats = () => {
  return customFetch.get('/chats');
};

const createChat = (data: any) => {
  const options = {
    data: {
      title: data.title,
    },
  };

  return customFetch.post('/chats', options);
};

const addUsersToChat = (data: any) => {
  const options = {
    data: {
      users: data.users,
      chatId: data.chatId,
    },
  };

  return customFetch.put('/chats/users', options);
};

const getChatUsers = (chatId: any) => {
  return customFetch.get(`/chats/${chatId}/users`);
};

const deleteUsersFromChat = (data: any) => {
  const options = {
    data: {
      users: data.users,
      chatId: data.chatId,
    },
  };

  return customFetch.delete('/chats/users', options);
};

const chatsApi = {
  getChats,
  createChat,
  addUsersToChat,
  getChatUsers,
  deleteUsersFromChat,
};

export default chatsApi;
