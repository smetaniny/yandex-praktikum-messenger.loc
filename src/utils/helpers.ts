import router from '../router';

export const isClassDefined = (className: string | undefined) =>
  className && className !== undefined ? className : '';

export const classIfElse = (
  isFirstClass: boolean | undefined,
  firstClassName: string,
  secondClassName: string
) => (isFirstClass ? firstClassName : secondClassName);

export const redirect = (err: unknown) => {
  if (err === 'Cookie is not valid') {
    router.go('/401');
  } else if (err === 'User already in system') {
    router.go('/messenger');
  }
};

export const render = (block: any) => {
  const app: HTMLElement | null = document.getElementById('app');
  if (app) app.innerHTML = block.transformToString();
};
