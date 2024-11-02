export default
`<div class='{{inputContainerClassName}}'>
  <input
    class='{{inputClassName}}'
    type='{{type}}'
    name='{{name}}'
    value='{{value}}'
    data-id='{{id}}'
    placeholder='{{{label}}}'
    required={{required}}
    data-type='{{dataType}}'
  />
  <div class='input__error-message hidden'>
    {{errorMessage}}
  </div>
</div>`;
