export default
`<div class='profile-page'>
  <nav class='return-button'>
    {{{returnButton}}}
  </nav>
  <div class='profile-page__container'>
    <div class='profile-page__header'>
      {{{avatar}}}
      {{#if isViewMode}}
        <span class='profile-page__user-name'>{{header}}</span>
      {{/if}}
    </div>
    {{{content}}}
  </div>
</div>`;
