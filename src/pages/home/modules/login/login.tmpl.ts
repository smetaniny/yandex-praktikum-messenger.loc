export default
`<div class='login'>
  <div class='login__form'>
    {{#each inputs}}
      <div data-component='input' data-key='{{@index}}'>
        {{{this}}}
      </div>
    {{/each}}
  </div>
  <div class='login__buttons-panel'>
    {{{button}}}
    {{{registrationLink}}}
  </div>
</div>`;
