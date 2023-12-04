# Квиз-плиз
## О проекте
Квиз-плз - это приложение для проведения викторин с пользователем. Пользователю предлагается отвечать на вопросы разной сложности и получать результаты своей игры. 

## Установка
1. git clone <хеш для клонирования> - клонируйте репозиторий
2. npm install - для установке зависимостей
3. npm start - для запуска проекта

## О версиях
Приложение написано на React и Typescript
* Ветка main - state хранится с помощью redux-tollkit, а сохраняется с помощью localstorage
* Ветка feature/rtk - state хранится с помощью redux-tollkit, но запросы к серверу переписаны через rtk-query, а данные теперь сохрнаяются в базе данных на backend.
