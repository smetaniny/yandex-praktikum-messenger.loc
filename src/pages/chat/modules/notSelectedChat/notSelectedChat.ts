import * as Handlebars from 'handlebars';

import { Block } from '../../../../core';

import notSelectedTemplate from './notSelectedChat.tmpl';
import './notSelectedChat.scss';

const getTemplate = () => {
  const template = Handlebars.compile(notSelectedTemplate);

  const context = {
    emptyChatTitle: 'Выберите чат, чтобы отправить сообщение',
  };

  return template(context);
};

export class NotSelectedChatPage extends Block {
  constructor(context = {}, events = {}) {
    super(
      'div',
      {
        context: {
          ...context,
        },
        template: getTemplate(),
        events,
      },
      'current-chat-container'
    );
  }
}
