import { Block } from '../../core';
import { isClassDefined } from '../../utils';

import avatarTemplate from './avatar.tmpl';
import './avatar.scss';
import '../../static/js/eins-modal.min.js';

export type TAvatar = {
  className: string;
  src?: string;
};

export class Avatar extends Block {
  constructor(context: TAvatar, events = {}) {
    super('div', {
      context: {
        ...context,
        className: `${isClassDefined(context.className)}`,
      },
      template: avatarTemplate,
      events,
    });
  }
}
