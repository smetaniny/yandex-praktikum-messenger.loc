export default
`<article class='message-cloud {{#if this.myMessage}}myMessage{{/if}}'>
  {{#if this.photo}}
    <img
      src={{photo}}
      alt='Фото, приложенное к сообщению.'
      class='message-cloud__photo'
    />
  {{/if}}
  {{#if this.text}}
    <p class='message-cloud__text'>{{text}}</p>
  {{/if}}
  <date class='message-cloud__time'>
    {{#if this.read}}
      <img src={{readIcon}} alt='Сообщение прочитано.'/>
    {{/if}}
    {{time}}
  </date>
</article>`;
