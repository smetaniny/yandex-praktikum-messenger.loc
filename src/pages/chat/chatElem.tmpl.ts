export default
`<div class='profile__link'>
  <li class='conversation-card'>
    <div class='conversation-card__photo-wrapper'>
      <img
        src='{{avatar}}'
        class='conversation-card__photo'
        alt='Фото собеседника.'
      >
    </div>
    <p class='conversation-card__name'>
      {{title}}
    </p>
    <p class='conversation-card__last-messege'>
      {{last_message}}
    </p>
    <time class='conversation-card__date'>
      {{time}}
    </time>
    {{#if unread_count}}
      <p class='conversation-card__counter'>
        {{unread_count}}
      </p>
    {{/if}}
  </li>
</div>`;
