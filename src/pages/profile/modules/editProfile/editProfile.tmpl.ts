export default
`<div class='edit-profile'>
  <div class='edit-profile__form'>
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </div>
  <div class='edit-profile__buttons-panel'>
    <div class='edit-profile__save-link'>
      {{{save}}}
    </div>
  </div>
</div>`;
