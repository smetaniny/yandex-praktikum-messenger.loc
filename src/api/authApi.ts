import HTTPTransport from '../utils/HTTPTransport';

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export class AuthApi {
  authAPIInstance = new HTTPTransport('/auth');

  signUp(data: ISignUpData): Promise<XMLHttpRequest> {
    return this.authAPIInstance.post('/signup', data);
  }

  signIn(data: ILoginData): Promise<XMLHttpRequest> {
    return this.authAPIInstance.post('/signin', data);
  }

  getUser(): Promise<XMLHttpRequest> {
    return this.authAPIInstance.get('/user');
  }

  logOut(): Promise<XMLHttpRequest> {
    return this.authAPIInstance.post('/logout');
  }
}
