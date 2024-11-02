import { Block } from '../../core';

import messageTemplate from './message.tmpl';
import './message.scss';

export type TMessage = {
  myMessage: boolean;
  read: boolean;
  text: string;
  time: string;
  readIcon?: any;
  photo?: string;
};

export class Message extends Block {
  constructor(context: TMessage, events: Object = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: messageTemplate,
      events,
    });
  }
}
