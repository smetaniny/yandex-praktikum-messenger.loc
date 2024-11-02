import * as Handlebars from 'handlebars';

import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { LoginController } from '../../../../controllers';
import { Block } from '../../../../core';
import router from '../../../../router';

import viewProfileTemplate from './viewProfile.tmpl';
import './viewProfile.scss';

const controller = new LoginController();

const getTemplate = () => {
  const template = Handlebars.compile(viewProfileTemplate);

  const item = localStorage.getItem('user');
  let user;
  if (item) {
    user = JSON.parse(item);
  }

  const inputs = [
    new Input({
      value: user?.email || '',
      name: 'email',
      label: 'Почта',
      type: 'text',
      required: true,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: user?.login || '',
      name: 'login',
      label: 'Логин',
      type: 'text',
      required: true,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: user?.first_name || '',
      name: 'first_name',
      label: 'Имя',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: user?.second_name || '',
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: user?.display_name || '',
      name: 'display_name',
      label: 'Имя в чате',
      type: 'text',
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: user?.phone || '',
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true,
    }),
  ];

  const signOutButton = new Button(
    {
      linkText: 'Выйти',
      isLink: true,
      buttonType: 'submit',
      buttonClassName: 'sign-out-button',
    },
    {
      click: async () => {
        await controller.logOut();
        router.go('/');
      },
    }
  );

  const changeData = new Button(
    {
      buttonType: 'button',
      isLink: true,
      buttonClassName: 'profile__change-data-link',
      linkText: 'Изменить данные',
    },
    {
      click: async () => {
        router.go('/settings-edit-data');
      },
    }
  );

  const changePassword = new Button(
    {
      buttonType: 'button',
      isLink: true,
      buttonClassName: 'profile__change-password-link',
      linkText: 'Изменить пароль',
    },
    {
      click: async () => {
        router.go('/settings-edit-password');
      },
    }
  );

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
    signOut: signOutButton.transformToString(),
    changeData: changeData.transformToString(),
    changePassword: changePassword.transformToString(),
  };

  return template(context);
};

export class ViewProfilePage extends Block {
  constructor(context = {}, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(),
      events,
    });
  }
}
