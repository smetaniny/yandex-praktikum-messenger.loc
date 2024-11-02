import {ChatPage} from '../pages/chat';
import {ErrorPage} from '../pages/error';
import {HomePage} from '../pages/home';
import {ProfilePage} from '../pages/profile';
import {editProfilePage, errorPageSchema, routes} from '../utils';

import {Router} from './Router';

export {IRoute} from './Route';
export {IRouter} from './Router';

const router = new Router('.app');

const getErrorScheme = (code: string) => ({
  code,
  title: errorPageSchema[code].title,
  linkTitle: errorPageSchema[code].linkTitle,
});

router
  .use('/', HomePage, {isLogin: true})
  .use(`/${routes.login}`, HomePage, {isLogin: true})
  .use(`/${routes.registration}`, HomePage, {isLogin: false})
  .use(`/${routes.notSelectedChat}`, ChatPage, {isChatSelected: false})
  .use(`/${routes.chatSelected}`, ChatPage, {isChatSelected: true})
  .use(`/${routes.viewProfile}`, ProfilePage, {isViewProfile: true})
  .use(`/${routes.editProfileData}`, ProfilePage, {
    isViewProfile: false,
    profileType: editProfilePage.editProfileData,
  })
  .use(`/${routes.editProfilePassword}`, ProfilePage, {
    isViewProfile: false,
    profileType: editProfilePage.editProfilePassword,
  })
  .use(`/${routes.serviceUnavailable}`, ErrorPage, {
    scheme: getErrorScheme(routes.serviceUnavailable),
  })
  .use(`/${routes.forbidden}`, ErrorPage, {
    scheme: getErrorScheme(routes.forbidden),
  })
  .use(`/${routes.internalServerError}`, ErrorPage, {
    scheme: getErrorScheme(routes.internalServerError),
  })
  .use(`/${routes.unauthorized}`, ErrorPage, {
    scheme: getErrorScheme(routes.unauthorized),
  })
  .use(`/${routes.notFound}`, ErrorPage, {
    scheme: getErrorScheme(routes.notFound),
  })
  .notFound(ErrorPage, {scheme: getErrorScheme(routes.notFound)});

export default router;
