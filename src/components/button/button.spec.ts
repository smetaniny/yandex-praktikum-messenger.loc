import { expect } from 'chai';
import { Button, TButton } from './button';

describe('Button component tests', () => {
  beforeEach(() => {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(
      '<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>'
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });

  const createButton = (context: TButton) => {
    const btn = new Button(context);
    return btn.transformToString();
  };

  it('should render button', () => {
    const context = {
      title: 'Отмена',
      buttonClassName: 'back-chat-button',
      buttonType: 'button',
    };
    const btn = createButton(context);
    expect(btn).to.not.be.null;
  });
});
