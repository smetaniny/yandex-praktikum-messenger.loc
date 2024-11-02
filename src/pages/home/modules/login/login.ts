import * as Handlebars from 'handlebars';

import { Button } from '../../../../components/button';
import { Form } from '../../../../components/form';
import { Input } from '../../../../components/input';
import { LoginController, ChatController } from '../../../../controllers';
import { Block } from '../../../../core';
import router from '../../../../router';
import { checkValidation, checkAndCollectData } from '../../../../utils';

import loginTemplate from './login.tmpl';
import './login.scss';

const controller = new LoginController();
const chatController = new ChatController();

const getTemplate = () => {
  const template = Handlebars.compile(loginTemplate);

  const loginInput = new Input(
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      required: true,
      dataType: 'login',
      errorMessage: 'Неверный логин',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }
  );

  const passwordInput = new Input(
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      required: true,
      dataType: 'password',
      errorMessage: 'Неверный пароль',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }
  );

  const button = new Button({
    buttonText: 'Авторизоваться',
    buttonType: 'submit',
  });

  const registrationLink = new Button(
    {
      buttonType: 'button',
      isLink: true,
      buttonClassName: 'login__registration-link',
      linkText: 'Нет аккаунта?',
    },
    {
      click: async () => {
        router.go('/sign-up');
      },
    }
  );

  const context = {
    inputs: [loginInput.transformToString(), passwordInput.transformToString()],
    button: button.transformToString(),
    registrationLink: registrationLink.transformToString(),
  };

  const form = new Form(
    {
      children: {
        inputs: [loginInput, passwordInput],
        button,
      },
      content: template(context),
    },
    {
      submit: async (event: CustomEvent) => {
        const isError = await checkAndCollectData(event, controller, 'login');
        if (!isError) {
          await chatController.getAllChats();
          router.go('/messenger');
        } else {
          console.warn(isError);
        }
      },
    }
  );

  return form.transformToString();
};

export class LoginPage extends Block {
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
