# React Social App Clean

Мини-соцсеть на React + Vite, которую я сделал как учебный pet-project для прокачки архитектурного мышления во frontend-разработке.

## О проекте

Проект сделан не просто как список постов, а как тренировочная площадка для следующих навыков:

- декомпозиция интерфейса на page / container / UI-компоненты
- разделение source of truth и derived data
- работа с маршрутизацией
- организация авторизации через context
- переиспользуемые custom hooks
- работа со списками, фильтрацией, сортировкой и infinite scroll
- обработка loading / error / empty states

## Функциональность

Сейчас в проекте реализовано:

- авторизация через `AuthContext`
- `ProtectedRoute`
- страницы `Home`, `Login`, `Register`, `Posts`, `PostDetails`
- список постов
- открытие страницы конкретного поста
- загрузка комментариев по `postId`
- создание поста через модальное окно
- удаление поста
- поиск
- сортировка
- infinite scroll
- custom hooks: `useFetch`, `useDebounce`, `useObserver`, `usePosts`

## Стек

- React
- Vite
- React Router
- JavaScript
- CSS
- ESLint

## Архитектура

Проект организован по слоям ответственности:

- `pages` — orchestration layer, связывает роутинг, данные и UI
- `components` — UI и предметные компоненты
- `hooks` — переиспользуемая логика
- `services` — HTTP-слой
- `context` — глобальное auth-состояние
- `styles` — глобальные стили
- `app` — верхний каркас приложения и layout

### Главные архитектурные идеи проекта

- `state` — источник истины для UI
- derived data не хранится в state, если может быть вычислена
- page-компоненты управляют сценарием страницы
- presentation-компоненты получают готовые данные через props
- browser/API-логика выносится в custom hooks
- route params читаются в page boundary, а вниз передаются обычные props

## Структура проекта

```text
src/
  app/
  components/
    post/
    ui/
  context/
  hooks/
  pages/
  services/
  styles/
  utils/
