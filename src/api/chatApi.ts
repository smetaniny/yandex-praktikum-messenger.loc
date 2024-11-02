import HTTPTransport from '../utils/HTTPTransport';

export interface IChatUser {
  users: string[];
  chatId: number;
}

export interface ICreateChat {
  title: string;
}

export class ChatApi {
  chatAPIInstance = new HTTPTransport('/chats');

  get(): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.get('/');
  }

  createChat(data: ICreateChat): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.post('/', data);
  }

  addUser(data: IChatUser): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.put('/users', data);
  }

  removeUser(data: IChatUser): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.delete('/users', data);
  }

  getChatUsers(chatId: number = 0): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.post(`/token/${chatId}`);
  }
}
