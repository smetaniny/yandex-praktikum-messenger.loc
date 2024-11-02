import { Dictionary } from '../core/block';

const showWarningMessage = (input: HTMLInputElement, isError: boolean) => {
  const parent = input.parentNode || input.parentElement;
  const messageElement =
    parent &&
    (parent.querySelector('.input__error-message') ||
      parent.querySelector('.input-profile__error-message'));

  if (messageElement) {
    if (isError) {
      messageElement.classList.remove('hidden');
    } else {
      messageElement.classList.add('hidden');
    }
  }
};

const REGEXP = {
  checkLogin: /^[a-zA-Z0-9-_]{3,20}$/g,
  checkPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g,
  checkPhoneNumber: /^((8|\+7)[-]?)?(\(?\d{3}\)?[-]?)?[\d-]{7,10}$/,
  checkMail: /^([\w.-])+@([\w.-])+\.([A-Za-z]{2,4})$/,
  checkName: /^[А-ЯA-Z][a-zа-я-]{1,20}$/g,
};

const checkLoginField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkLogin } = REGEXP;
    const { value } = input;
    isError = !value.match(checkLogin) || value.length < 3 || value.length > 20;
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkPasswordField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkPassword } = REGEXP;
    const { value } = input;
    isError =
      !value.match(checkPassword) || value.length < 8 || value.length > 40;
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkPhoneNumberField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkPhoneNumber } = REGEXP;
    const { value } = input;
    isError =
      !value.match(checkPhoneNumber) || value.length < 10 || value.length > 15;
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkMailField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkMail } = REGEXP;
    const { value } = input;
    isError = !value.match(checkMail);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkNameField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkName } = REGEXP;
    const { value } = input;
    isError = !value.match(checkName);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkMessageField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = value === '';
  }
  return isError;
};

export const checkValidation = (data: {
  event?: Event | null;
  input?: HTMLInputElement;
}): boolean => {
  const input = (data.event?.target as HTMLInputElement) || data.input;
  const type = input.getAttribute('data-type') || 'text';

  switch (type) {
    case 'password':
      return checkPasswordField(input);
    case 'login':
      return checkLoginField(input);
    case 'email':
      return checkMailField(input);
    case 'name':
      return checkNameField(input);
    case 'phone':
      return checkPhoneNumberField(input);
    case 'message':
      return checkMessageField(input);
    default:
      return false;
  }
};

const getFormModel = (form: HTMLFormElement): Dictionary => {
  const inputs = form.querySelectorAll('input');

  if (!inputs || inputs?.length === 0) {
    return {};
  }

  const data: Dictionary = [...inputs].reduce(
    (model: Dictionary, input: HTMLInputElement) => {
      const { name, value } = input;
      model[name] = value;
      return model;
    },
    {}
  );

  return data;
};

const checkAllInputsFields = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');
  if (inputs) {
    return [...inputs]
      .map((input) => checkValidation({ input }))
      .every((isError) => isError === false);
  }
};

export const checkAndCollectData = async (
  event: Event,
  controller?: any,
  method?: string
) => {
  const form = event.target as HTMLFormElement;
  if (form && checkAllInputsFields(form)) {
    const data = getFormModel(form);
    if (method) {
      const isError = await controller[method](data);
      return isError;
    }
  }
};
