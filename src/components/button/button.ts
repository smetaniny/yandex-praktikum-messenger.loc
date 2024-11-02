import { Block } from '../../core/block';
import { isClassDefined } from '../../utils';

import buttonTemplate from './button.tmpl';
import linkTemplate from './link.tmpl';
import './button.scss';

export type TButton = {
  buttonText?: string;
  isLink?: boolean;
  linkText?: string;
  buttonClassName?: string;
  //todo add type svg
  icon?: unknown;
  buttonType: string;
};

const getClassName = (context: TButton): string => {
  const className = context.isLink ? 'button-link' : 'button';
  return `${className} ${isClassDefined(context.buttonClassName)}`;
};

export class Button extends Block {
  constructor(context: TButton, events: Object = {}) {
    super('div', {
      context: {
        ...context,
        buttonClassName: getClassName(context),
      },
      template: context.isLink ? linkTemplate : buttonTemplate,
      events,
    });
  }
}
