export default
`<div class='registration'>
  <div class='registration__form'>
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </div>
  <div class='registration__buttons-panel'>
    {{{button}}}
    {{{loginLink}}}
  </div>
</div>`;
