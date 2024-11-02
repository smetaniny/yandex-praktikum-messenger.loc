import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import router from '.';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const dom = new JSDOM(
  '<!DOCTYPE html><html><body><div class="app"></div></body></html>',
  {
    url: 'http://localhost',
  }
);

const { window } = dom;
// @ts-ignore
global.window.router = router;

describe('Router tests', () => {
  it('should return all routs', () => {
    expect(router.routes.length).to.eq(13);
  });

  it('should return undefined', () => {
    expect(router.getCurrentRoute()).to.eq(undefined);
  });

  it('should return "/sign-in"', () => {
    window.history.pushState({}, '', '/sign-in');
    expect(window.location.pathname).to.eq('/sign-in');
  });

  it('should return 2', () => {
    expect(window.history.length).to.eq(2);
  });
});
