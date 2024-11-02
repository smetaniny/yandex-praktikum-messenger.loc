import * as Handlebars from 'handlebars';

import { Button } from '../../components/button';
import { Block } from '../../core';
import router from '../../router';

import errorPageTemplate from './error.tmpl';
import './error.scss';

export type Scheme = {
  code: string;
  title: string;
  linkTitle: string;
};

export type TErrorPage = {
  scheme?: Scheme;
};

const getTemplate = (scheme?: Scheme) => {
  const template = Handlebars.compile(errorPageTemplate);

  const messengerLink = new Button(
    {
      buttonType: 'button',
      isLink: true,
      buttonClassName: 'error-page__link',
      linkText: 'Назад к чатам',
    },
    {
      click: async () => {
        router.go('/');
      },
    }
  );

  const context = {
    code: scheme?.code,
    title: scheme?.title,
    messengerLink: messengerLink.transformToString(),
  };

  return template(context);
};

export class ErrorPage extends Block {
  constructor(context: TErrorPage, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(context.scheme),
      events,
    });
  }
}
