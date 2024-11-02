export default
`<div class='current-chat-area__selected'>
  <div class='current-chat__header'>
    <div class='current-chat__header-image'>
      <img
        src='{{avatarIcon}}'
        class='current-chat__header-icon'
        alt='Фото пользователя.'
      >
    </div>
    <div class='current-chat-name'>
      {{chatTitle}}
    </div>
    <div class='users-list'>
      <span>
       Пользователи в чате:
      </span>
      {{#each users}}
        <span class='user-item'>
          {{{this}}},
        </span>
      {{/each}}
    </div>
    <div class='popover__wrapper actions__button'>
      <div class='chat-settings'>
        <img
          src='{{chatSettingsIcon}}'
          class='chat-settings__icon'
          alt='Настройка чата.'
        >
      </div>
      <div class='popover__content popover__content--bottom-left'>
        {{{addUser}}}
        {{{removeUser}}}
      </div>
    </div>
  </div>
  <div class='current-chat__main'>
    <div class='messages__container'></div>
    <div class='user-form hidden' id='add-user-form'>
      <div class='user-form-title'>
        {{newUserTitle}}
      </div>
      {{{addUserForm}}}
    </div>
    <div class='user-form hidden' id='remove-user-form'>
      <div class='user-form-title'>
        {{removeUserTitle}}
      </div>
      {{{removeUserForm}}}
    </div>
  </div>
  <footer class='current-chat__footer'>
    <div class='popover__wrapper'>
          <button class='add-file-button' type='button'>
            <img
              src='{{addFileIcon}}'
              alt='Прикрепить дополнения.'
            />
          </button>
          <div class='popover__content popover__content--top-right'>
            <a class='popover__item'>
              <img
                src='{{imageIcon}}'
                alt='Добавить фото или видео.'
              />
              <p class='popover__paragraph'>Фото или Видео</p>
            </a>
            <a class='popover__item'>
              <img
                src='{{fileIcon}}'
                alt='Добавить файл.'
              />
              <p class='popover__paragraph'>Файл</p>
            </a>
            <a class='popover__item'>
              <img
                src='{{locationIcon}}'
                alt='Добавить геопозицию.'
              />
              <p class='popover__paragraph'>Локация</p>
            </a>
          </div>
        </div>
    <div class='message-input'>
      {{{message}}}
    </div>
    <div class='send-button'>
      {{{sendButton}}}
    </div>
  </footer>
</div>`;
