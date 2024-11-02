export default
`<button class='{{buttonClassName}}' data-id='{{id}}'>
  {{#if icon}}
    <div class='button__content'>
      <img
        class='button__icon'
        src='{{icon}}'
        alt='{{linkText}}.'
      />
      <p class='button__paragraph'>{{{linkText}}}</p>
    </div>
  {{else}}
    {{{linkText}}}
  {{/if}}
</button>`;
