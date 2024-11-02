import { Block, Dictionary } from '../../core';

import formTemplate from './form.tmpl';

export type TForm = {
  children?: {
    inputs?: Dictionary[];
    button?: Dictionary;
  };
  content?: string;
};

export class Form extends Block {
  constructor(context: TForm, events: Object = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: formTemplate,
      events,
    });
  }
}
