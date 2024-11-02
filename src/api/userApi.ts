import HTTPTransport from '../utils/HTTPTransport';

import { ISignUpData } from '.';

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserApi {
  userAPIInstance = new HTTPTransport('/user');

  changeUserProfile(data: ISignUpData): Promise<XMLHttpRequest> {
    return this.userAPIInstance.put('/profile', data);
  }

  changeUserAvatar(avatar: FormData): Promise<XMLHttpRequest> {
    return this.userAPIInstance.put('/profile/avatar', avatar);
  }

  changeUserPassword(data: IPasswordData): Promise<XMLHttpRequest> {
    return this.userAPIInstance.put('/password', data);
  }
}
