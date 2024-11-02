## Ссылка на PR: https://github.com/kapitoshka808/middle.messenger.praktikum.yandex/pull/9

# Учебный проект - мессенджер

Потрясающий мессенджер - убийца телеграма (ну почти🙃)

[![Netlify Status](https://api.netlify.com/api/v1/badges/bfea2cc6-bcb5-4036-950e-689719201d97/deploy-status)](https://app.netlify.com/sites/messenger-yap/deploys)

Ссылка на Netlify: https://messenger-yap.netlify.app/

Ссылка на Heroku: https://messenger-yap.herokuapp.com/

## Что под капотом?

HTML, SCSS, TypeScript и не грамма магии✨

Для тестирования кода используется Mocha + Chai📝

Проект разрабатывается в соответствии с архитектурным паттерном MVC🔌

Для линтинга используется ESlint, Stylelint и Prettier👨‍🔧

Чтобы не повторять одни и те же участки кода - используется шаблонизатор Handlebars🧩

И всё это объединяет сборщик Webpack📦

Данные раздаются с помощью Express.js🚀

Для контейнеризации используется Docker🐳

## Сборка и локальный запуск проекта

Для начала клонируйте проект и установите зависимости:

```sh
npm install
```

Для запуска проекта в режиме разработки запустите команду:

```sh
npm run dev
```

Чтобы собрать проект:

```sh
npm run build
```

Чтобы запустить проект на express сервере:

```sh
npm run start
```

Чтобы форматировать код:

```sh
npm run npm-run-all stylelint:fix eslint:fix
```

Запуск тестов:

```sh
npm run test
```

## Макет проекта

За основу взят макет, предоставленный платформой Яндекс Практикум:
<https://www.figma.com/file/X9BGH23POw0LJj99qr6Sl8/messenger>
