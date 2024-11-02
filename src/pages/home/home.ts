import { Block } from '../../core';

import homePageTemplate from './home.tmpl';
import { LoginPage } from './modules/login';
import { RegistrationPage } from './modules/registration';

import './home.scss';

export type THomePage = {
  isLogin?: boolean;
  content?: string;
};

export class HomePage extends Block {
  constructor(context: THomePage, events = {}) {
    super('div', {
      context: {
        ...context,
        header: context.isLogin ? 'Вход' : 'Регистрация',
        content: context.isLogin
          ? new LoginPage().transformToString()
          : new RegistrationPage().transformToString(),
      },
      template: homePageTemplate,
      events,
    });
  }
}
