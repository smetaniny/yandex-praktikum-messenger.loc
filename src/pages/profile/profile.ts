import * as Handlebars from 'handlebars';

import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { UserController, LoginController } from '../../controllers';
import { Block } from '../../core';
import router from '../../router';
import returnIcon from '../../static/icons/return.svg';
import { avatarIconBase64 } from '../../utils';

import { EditProfilePage } from './modules/editProfile';
import { ViewProfilePage } from './modules/viewProfile';
import profileTemplate from './profile.tmpl';
import './profile.scss';

export type TProfilePage = {
  isViewProfile?: boolean;
  profileType?: string;
  content?: string;
};

const controller = new UserController();
const loginController = new LoginController();

const getName = () => {
  const item = localStorage.getItem('user');
  let user;
  if (item) {
    user = JSON.parse(item);
  }

  return user?.display_name || user?.first_name || '';
};

const getAvatar = () => {
  const avatar = localStorage.getItem('avatarIcon');

  return avatar || avatarIconBase64;
};

const getTemplate = (profileType?: string, isViewProfile?: boolean) => {
  const template = Handlebars.compile(profileTemplate);

  const avatar = new Avatar(
    {
      className: 'profile-page__image__icon',
      src: getAvatar(),
    },
    {
      change: async (e: CustomEvent) => {
        const input = e.target as HTMLInputElement;
        const image = document.getElementById('avatar') as HTMLImageElement;
        const file = input.files[0];
        if (file && image) {
          await controller.changeUserAvatar(file, image);
        }
      },
    }
  );

  const returnButton = new Button(
    {
      buttonType: 'button',
      isLink: true,
      buttonClassName: 'return-button__link',
      icon: returnIcon,
    },
    {
      click: async () => {
        router.back();
      },
    }
  );

  const content = isViewProfile
    ? new ViewProfilePage().transformToString()
    : new EditProfilePage({
        profileType: profileType || 'profileDataInputs',
      }).transformToString();

  const context = {
    avatar: avatar.transformToString(),

    header: getName(),
    isViewMode: isViewProfile,
    returnButton: returnButton.transformToString(),
    content,
  };

  return template(context);
};

export class ProfilePage extends Block {
  constructor(context: TProfilePage, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(context.profileType, context.isViewProfile),
      events,
    });
  }

  componentDidMount() {
    loginController.getUser();
  }
}
