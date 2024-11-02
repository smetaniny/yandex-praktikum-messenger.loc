import * as Handlebars from 'handlebars';

import { Button } from '../../../../components/button';
import { Form } from '../../../../components/form';
import { Input } from '../../../../components/input';
import { Message } from '../../../../components/message';
import { ChatController, IChatData } from '../../../../controllers';
import { Block, Dictionary } from '../../../../core';
import router from '../../../../router';
import addIcon from '../../../../static/icons/add.svg';
import deleteIcon from '../../../../static/icons/delete.svg';
import chatSettingsIcon from '../../../../static/icons/dots.svg';
import fileIcon from '../../../../static/icons/file.svg';
import imageIcon from '../../../../static/icons/image.svg';
import locationIcon from '../../../../static/icons/location.svg';
import readIcon from '../../../../static/icons/read.svg';
import sendIcon from '../../../../static/icons/send.svg';
import addFileIcon from '../../../../static/icons/staple.svg';
import { store } from '../../../../store';
import {
  avatarIconBase64,
  checkValidation,
  createChatWebSocket,
} from '../../../../utils';
import { closeModal, showModal } from '../../chat';

import selectedTemplate from './chatSelected.tmpl';
import newUserTemplate from './newUser.tmpl';
import './chatSelected.scss';

const chatController = new ChatController();

const getDataFromChat = (
  currentChatId: string,
  localStorageKey: string,
  valueKey: string
) => {
  let value: string | string[] = valueKey === 'users' ? [] : '';
  const item = localStorage.getItem(localStorageKey);
  let chats;
  if (item) {
    chats = JSON.parse(item);
  }

  if (currentChatId && chats) {
    const chat = chats.filter(
      (el: IChatData) => el.id.toString() === currentChatId
    );
    if (chat.length > 0) {
      value = chat[0][valueKey];
    }
  }

  return value;
};

const sendMessage = async (socket: WebSocket) => {
  const messageInput = document.querySelector(
    '.input__message'
  ) as HTMLInputElement;
  if (messageInput) {
    const message = {
      content: messageInput.value,
      type: 'message',
    };
    socket.send(JSON.stringify(message));
    messageInput.value = '';
    await chatController.getAllChats();
    router.go('/messenger-active');
  }
};

const getOldMessages = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  });
};

const handleMessages = (message: Dictionary | Dictionary[]) => {
  const isMessagesArray = message instanceof Array;
  const messagesContainer = document.querySelector('.messages__container');
  const chatContainer = document.querySelector('.current-chat__main');

  const addMessage = (elem: Dictionary) => {
    if (messagesContainer && elem.content) {
      const myMessage = elem.user_id == localStorage.getItem('myID');
      const dateObject = new Date(elem.time);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      const time = new Intl.DateTimeFormat('ru-RU', options).format(dateObject);
      const node = new Message({
        myMessage,
        time,
        read: elem.is_read,
        text: elem.content,
        readIcon: readIcon,
        //photo: file,
      });
      messagesContainer.appendChild(node.render());
    }
  };

  if (isMessagesArray) {
    // revert array of messages
    message.map((_, index, array) =>
      addMessage(array[array.length - 1 - index])
    );
  } else {
    addMessage(message);
  }
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);
  const userTempl = Handlebars.compile(newUserTemplate);

  const wsParamsString = localStorage.getItem('wsParams');
  let wsParams;
  if (wsParamsString) {
    wsParams = JSON.parse(wsParamsString);
  }

  const socket = createChatWebSocket(wsParams, handleMessages);

  getOldMessages(socket);

  const currentChatId = localStorage.getItem('currentChat');

  const addUsersToChat = async (chatId: string) => {
    const input = document.querySelector('.new-user-input') as HTMLInputElement;
    if (input) {
      const usersArray = input.value.split(',');
      const users = usersArray.map((s) => s.trim());
      await chatController.addUser({ users, chatId: parseInt(chatId, 10) });
      store.setStateAndPersist({ usersInChats: [{ id: chatId, users }] });
      closeModal('add-user-form', '.new-user-input');
      router.go('/messenger-active');
    }
  };

  const removeUsersFromChat = async (chatId: string) => {
    const input = document.querySelector(
      '.remove-user-input'
    ) as HTMLInputElement;
    if (input) {
      const users = input.value.split(',');
      await chatController.removeUser({ users, chatId: parseInt(chatId, 10) });
      closeModal('remove-user-form', '.remove-user-input');
      router.go('/messenger-active');
    }
  };

  const message = new Input(
    {
      label: 'Сообщение',
      inputClassName: 'input__message',
      name: 'message',
      type: 'text',
      dataType: 'message',
      inputContainerClassName: 'input__container-gray',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
      keyup: (event: KeyboardEvent) => {
        if (['Enter', 'NumpadEnter'].includes(event.key)) {
          event.preventDefault();
          sendMessage(socket);
        }
      },
    }
  );

  const sendButton = new Button(
    {
      isLink: true,
      icon: sendIcon,
      buttonClassName: 'send-button__icon',
      buttonType: 'button',
    },
    {
      click: () => {
        sendMessage(socket);
      },
    }
  );

  const createUser = new Button({
    buttonText: 'Добавить',
    buttonClassName: 'create-user-button',
    buttonType: 'submit',
  });

  const removeUserFromChat = new Button({
    buttonText: 'Удалить',
    buttonClassName: 'create-user-button',
    buttonType: 'submit',
  });

  const backButton = new Button(
    {
      isLink: true,
      linkText: 'Отмена',
      buttonClassName: 'back-chat-button',
      buttonType: 'button',
    },
    {
      click: () => {
        closeModal('add-user-form', '.new-user-input');
        closeModal('remove-user-form', '.remove-user-input');
      },
    }
  );

  const chatUserInput = new Input({
    name: 'title',
    label: 'Введите ID пользователя',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'new-user-input',
    inputContainerClassName: 'input__container-gray',
  });

  const chatRemoveUserInput = new Input({
    name: 'title',
    label: 'Введите ID пользователя',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'remove-user-input',
    inputContainerClassName: 'input__container-gray',
  });

  const addUserContext = {
    input: chatUserInput.transformToString(),
    createUser: createUser.transformToString(),
    backButton: backButton.transformToString(),
  };

  const removeUserContext = {
    input: chatRemoveUserInput.transformToString(),
    createUser: removeUserFromChat.transformToString(),
    backButton: backButton.transformToString(),
  };

  const addUserForm = new Form(
    {
      children: {
        inputs: [chatUserInput],
        button: createUser,
      },
      content: userTempl(addUserContext),
    },
    {
      submit: async () => {
        await addUsersToChat(currentChatId || '');
      },
    }
  );

  const removeUserForm = new Form(
    {
      children: {
        inputs: [chatRemoveUserInput],
        button: removeUserFromChat,
      },
      content: userTempl(removeUserContext),
    },
    {
      submit: async () => {
        await removeUsersFromChat(currentChatId || '');
      },
    }
  );

  const newUser = new Button(
    {
      buttonClassName: 'user-button',
      buttonType: 'button',
      isLink: true,
      icon: addIcon,
      linkText: 'Добавить пользователя',
    },
    {
      click: async () => {
        await showModal('add-user-form');
      },
    }
  );

  const removeUser = new Button(
    {
      buttonClassName: 'user-button',
      buttonType: 'button',
      isLink: true,
      icon: deleteIcon,
      linkText: 'Удалить пользователя',
    },
    {
      click: async () => {
        await showModal('remove-user-form');
      },
    }
  );

  const context = {
    deleteIcon: deleteIcon,
    sendButton: sendButton.transformToString(),
    chatTitle: getDataFromChat(currentChatId || '', 'chats', 'title'),
    message: message.transformToString(),
    addUser: newUser.transformToString(),
    removeUser: removeUser.transformToString(),
    addUserForm: addUserForm.transformToString(),
    removeUserForm: removeUserForm.transformToString(),
    newUserTitle: 'Добавить пользователя в чат',
    removeUserTitle: 'Удалить пользователя из чата',
    users: getDataFromChat(currentChatId || '', 'usersInChats', 'users'),
    avatarIcon: avatarIconBase64,
    chatSettingsIcon,
    addIcon,
    addFileIcon,
    imageIcon,
    fileIcon,
    locationIcon,
    sendIcon,
  };

  return template(context);
};

export class ChatSelectedPage extends Block {
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
