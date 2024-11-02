import * as Handlebars from 'handlebars';

import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { ChatController, LoginController, IChatData } from '../../controllers';
import { Block } from '../../core';
import router from '../../router';
import { store } from '../../store';
import { avatarIconBase64 } from '../../utils';

import chatPageTemplate from './chat.tmpl';
import chatElemTemplate from './chatElem.tmpl';
import { ChatSelectedPage } from './modules/chatSelected';
import { NotSelectedChatPage } from './modules/notSelectedChat';
import newChatTemplate from './newChat.tmpl';

import './chat.scss';

const chatController = new ChatController();
const loginController = new LoginController();

export const showModal = async (formId: string) => {
  const form = document.getElementById(formId);
  if (form?.classList.contains('hidden')) {
    form?.classList.remove('hidden');
  }
};

export const closeModal = (formId: string, inputClassName: string) => {
  const input = document.querySelector(inputClassName) as HTMLInputElement;
  const form = document.getElementById(formId);
  if (input) {
    input.value = '';
  }
  form.classList?.add('hidden');
};

const createNewChat = async () => {
  const input = document.querySelector('.new-chat-input') as HTMLInputElement;
  if (input) {
    const title = input.value;
    await chatController.createChat({ title });
    closeModal('chat-form', '.new-chat-input');
    router.go('/messenger');
  }
};

const getTemplate = (isChatSelected?: boolean) => {
  const template = Handlebars.compile(chatPageTemplate);
  const chatTemplate = Handlebars.compile(newChatTemplate);
  const elemTemplate = Handlebars.compile(chatElemTemplate);

  const currentChatArea = isChatSelected
    ? new ChatSelectedPage().transformToString()
    : new NotSelectedChatPage().transformToString();

  const searchInput = new Input({
    label: '🔎︎ Поиск',
    inputClassName: 'input__search',
    name: 'search',
    type: 'text',
    inputContainerClassName: 'input__container-gray',
  });

  const chatTitleInput = new Input({
    name: 'title',
    label: 'Название нового чата',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'new-chat-input',
    inputContainerClassName: 'input__container-gray',
  });

  const profileLink = new Button(
    {
      buttonType: 'button',
      isLink: true,
      buttonClassName: 'profile__link-title',
      linkText: 'Профиль >',
    },
    {
      click: async () => {
        router.go('/settings');
      },
    }
  );

  const createChat = new Button({
    buttonType: 'submit',
    buttonText: 'Создать чат',
    buttonClassName: 'create-chat-button',
  });

  const backButton = new Button(
    {
      buttonType: 'button',
      linkText: 'Отмена',
      isLink: true,
      buttonClassName: 'back-chat-button',
    },
    {
      click: () => {
        closeModal('chat-form', '.new-chat-input');
      },
    }
  );

  const newChatContext = {
    input: chatTitleInput.transformToString(),
    createChat: createChat.transformToString(),
    backButton: backButton.transformToString(),
  };

  const chatForm = new Form(
    {
      children: {
        inputs: [chatTitleInput],
        button: createChat,
      },
      content: chatTemplate(newChatContext),
    },
    {
      submit: async () => {
        await createNewChat();
      },
    }
  );

  const newChat = new Button(
    {
      buttonType: 'button',
      buttonText: 'Новый чат',
      buttonClassName: 'new-chat-button',
    },
    {
      click: async () => {
        await showModal('chat-form');
      },
    }
  );

  const item = localStorage.getItem('chats');
  let chatsData;
  if (item) {
    chatsData = JSON.parse(item);
    chatsData = chatsData.map((el: IChatData) => {
      const { unread_count } = el || {};
      const { content, time } = el.last_message || {};
      let messageTime = null;
      if (time) {
        const dateObject = new Date(time);
        messageTime = dateObject.getHours() + ':' + dateObject.getMinutes();
      }
      const elemContext = {
        ...el,
        //todo create base url
        avatar: el.avatar
          ? `https://ya-praktikum.tech/api/v2/resources/${el.avatar}`
          : avatarIconBase64,
        last_message: content,
        time: messageTime,
        unread_count,
      };

      const openSelectedChat = async () => {
        const { id } = elemContext;
        store.setStateAndPersist({ currentChat: id });

        const userData = localStorage.getItem('user');
        if (userData) {
          await chatController.connectToChat(JSON.parse(userData).id, id);
        }
        router.go('/messenger-active');
      };

      const elem = new Button(
        {
          buttonType: 'button',
          isLink: true,
          buttonClassName: 'new-chat-link',
          linkText: elemTemplate(elemContext),
        },
        {
          click: async () => {
            await openSelectedChat();
          },
        }
      );

      return elem.transformToString();
    });
  }

  const context = {
    currentChatArea,
    profileLink: profileLink.transformToString(),
    searchInput: searchInput.transformToString(),
    createChat: newChat.transformToString(),
    chatForm: chatForm.transformToString(),
    newChatTitle: 'Создание нового чата',
    contacts: chatsData || [],
  };

  return template(context);
};

export type TChatPage = {
  isChatSelected?: boolean;
  content?: string;
};

export class ChatPage extends Block {
  constructor(context: TChatPage, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(context.isChatSelected),
      events,
    });
  }

  componentDidMount() {
    loginController.getUser();
  }
}
