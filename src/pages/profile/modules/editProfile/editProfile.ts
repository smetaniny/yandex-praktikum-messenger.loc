import * as Handlebars from 'handlebars';

import { Button } from '../../../../components/button';
import { Form } from '../../../../components/form';
import { Input } from '../../../../components/input';
import { UserController } from '../../../../controllers';
import { Block, Dictionary } from '../../../../core';
import router from '../../../../router';
import { checkAndCollectData, checkValidation } from '../../../../utils';

import editProfileTemplate from './editProfile.tmpl';
import './editProfile.scss';

const controller = new UserController();

const getTemplate = (profileType: string) => {
  const template = Handlebars.compile(editProfileTemplate);

  const item = localStorage.getItem('user');
  let user;
  if (item) {
    user = JSON.parse(item);
  }

  const profileInputs: Dictionary = {
    passwordInputs: [
      new Input(
        {
          name: 'oldPassword',
          label: 'Старый пароль',
          type: 'password',
          required: true,
          errorMessage: 'Неверный пароль',
          dataType: 'password',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          name: 'newPassword',
          label: 'Новый пароль',
          type: 'password',
          required: true,
          errorMessage:
            'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
          dataType: 'password',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          name: 'newSecondPassword',
          label: 'Повторите новый пароль',
          type: 'password',
          required: true,
          errorMessage: 'Введенные пароли не совпадают',
          dataType: 'password',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
    ],
    profileDataInputs: [
      new Input(
        {
          value: user?.email || '',
          name: 'email',
          label: 'Почта',
          type: 'text',
          required: true,
          disabled: false,
          errorMessage:
            'Почта должна быть написана на латинице, допускаются цифры и спецсимволы',
          dataType: 'email',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          value: user?.login || '',
          name: 'login',
          label: 'Логин',
          type: 'text',
          required: true,
          disabled: false,
          errorMessage:
            'Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание.',
          dataType: 'login',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          value: user?.first_name || '',
          name: 'first_name',
          label: 'Имя',
          type: 'text',
          required: false,
          disabled: false,
          errorMessage:
            'Имя должно быть написано на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
          dataType: 'name',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          value: user?.second_name || '',
          name: 'second_name',
          label: 'Фамилия',
          type: 'text',
          required: false,
          disabled: false,
          errorMessage:
            'Фамилия должна быть написана на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
          dataType: 'name',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          value: user?.display_name || '',
          name: 'display_name',
          label: 'Имя в чате',
          type: 'text',
          required: true,
          disabled: false,
          errorMessage:
            'Имя должно быть написано на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
          dataType: 'name',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
      new Input(
        {
          value: user?.phone || '',
          name: 'phone',
          label: 'Телефон',
          type: 'text',
          required: false,
          disabled: false,
          errorMessage:
            'Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса.',
          dataType: 'phone',
          isProfileInput: true,
        },
        {
          focus: (event: Event) => {
            checkValidation({ event });
          },
          blur: (event: Event) => {
            checkValidation({ event });
          },
        }
      ),
    ],
  };

  const save = new Button({
    buttonText: 'Сохранить',
    buttonType: 'submit',
  });

  const inputs = profileInputs[profileType];

  const context = {
    inputs: inputs.map((input: Dictionary) => input.transformToString()),
    save: save.transformToString(),
  };

  const form = new Form(
    {
      children: {
        inputs,
        button: save,
      },
      content: template(context),
    },
    {
      submit: async (event: Event) => {
        const action =
          profileType === 'passwordInputs'
            ? 'changeUserPassword'
            : 'changeUserProfile';
        const isError = await checkAndCollectData(event, controller, action);
        if (!isError) {
          router.go('/settings');
        } else {
          console.warn(isError);
        }
      },
    }
  );

  return form.transformToString();
};

export type TEditProfilePage = {
  profileType: string;
};

export class EditProfilePage extends Block {
  constructor(context: TEditProfilePage, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(context.profileType),
      events,
    });
  }
}
