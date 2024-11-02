export default
`<div class='{{inputContainerClassName}}'>
  <label for='{{name}}' class='input-profile__label'>
    {{label}}
  </label>
  <input
    class='{{inputClassName}}'
    type='{{type}}'
    name='{{name}}'
    value='{{value}}'
    required={{required}}
    data-id='{{id}}'
    data-type='{{dataType}}'
    {{#if disabledInput }}disabled{{/if}}
  />
  <div class='input-profile__error-message hidden'>
    {{errorMessage}}
  </div>
</div>`;
