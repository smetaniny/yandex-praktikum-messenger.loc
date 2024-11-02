export default
`<div class='chat-page'>
  <div class='chat-page__container'>
    <div class='chat-list-area'>
      <div class='profile'>
        {{{profileLink}}}
      </div>
      <div class='search-input' data-component='input' data-key='{{@index}}'>
        {{{searchInput}}}
      </div>
      {{{createChat}}}
      <div class='chat-form hidden' id='chat-form'>
          <div class='chat-form-title'>{{newChatTitle}}</div>
          {{{chatForm}}}
      </div>
      <ul class='chat-list'>
        {{#each contacts}}
          {{{this}}}
        {{/each}}
      </ul>
      <p>
        <a href='/'>Вход</a>
        <br>
        <a href='/registration'>Регистрация</a>
        <br>
        <a href='/notSelectedChat'>Пустой чат</a>
        <br>
        <a href='/chatSelected'>Чат с сообщениями</a>
        <br>
        <a href='/viewProfile'>Профиль</a>
        <br>
        <a href='/editProfileData'>Редактирование профиля</a>
        <br>
        <a href='/editProfilePassword'>Изменение пароля</a>
        <br>
        <a href='/forbidden'>403</a>
        <br>
        <a href='/notFound'>404</a>
        <br>
        <a href='/internalServerError'>500</a>
        <br>
        <a href='/serviceUnavailable'>503</a>
      </p>
    </div>
    {{{currentChatArea}}}
  </div>
</div>`;
