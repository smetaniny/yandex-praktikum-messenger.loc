export default
`<div class='view-profile'>
  <div class='view-profile__form'>
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </div>
  <div class='profile__buttons-panel'>
    {{{changeData}}}
    {{{changePassword}}}
    <div class='profile__sign-out-link'>
      {{{signOut}}}
    </div>
  </div>
</div>`;
