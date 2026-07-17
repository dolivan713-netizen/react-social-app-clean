# React Social App

Учебный pet-project: мини-соцсеть на React + TypeScript. Посты с пагинацией, поиском и сортировкой, лайки с оптимистичным обновлением, комментарии, создание и удаление постов, авторизация с защищёнными роутами.

Данные — из публичного mock-API [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Стек

- **React 19** + **TypeScript** (strict)
- **Vite** + React Compiler
- **TanStack Query v5** — работа с server state
- **React Router v7**
- **Mantine** — UI-компоненты
- ESLint (typescript-eslint)

## Что реализовано

- Авторизация через Context + `ProtectedRoute` (mock: без бэкенда, флаг в localStorage)
- Список постов с постраничной загрузкой через `useInfiniteQuery`
- Поиск с debounce и сортировка
- Лайки с оптимистичным обновлением кэша (`onMutate` → откат в `onError`)
- Создание и удаление постов через `useMutation`
- Страница деталей поста с комментариями
- Кастомные хуки: `useAuth`, `useDebounce`, `usePosts`, `useToggleLike`

## Архитектурные решения

- **Server state отделён от client state.** Данные сервера (посты, комментарии) живут в кэше TanStack Query; клиентское состояние (auth, поиск, модалка) — в `useState` и Context.
- **Слои ответственности:** `pages` оркеструют данные и сценарии страниц, `components` — презентационные, `services` — HTTP-слой, `hooks` — переиспользуемая логика.
- **Derived data не хранится в state:** отфильтрованный и отсортированный список вычисляется через `useMemo` из данных кэша.
- **Нормализация на границе:** `postService` приводит ответы API к типам приложения — например, добавляет поля `likedByMe` / `likesCount`, которых нет в JSONPlaceholder.

## Два паттерна мутаций (намеренно)

JSONPlaceholder не сохраняет изменения: POST/DELETE отвечают успехом, но данные на сервере не меняются. Поэтому в проекте сознательно показаны оба подхода к мутациям:

- **Create / Delete — канонический паттерн с `invalidateQueries`.** После мутации кэш инвалидируется, и данные перезапрашиваются с сервера. На реальном API это предпочтительный путь: сервер — источник истины. На mock-API рефетч возвращает исходные данные, поэтому созданный пост «исчезает», а удалённый «возвращается» — это ожидаемое следствие мока, а не баг.
- **Лайки — оптимистичное обновление.** Кэш меняется мгновенно в `onMutate` (снапшот предыдущего состояния сохраняется), при ошибке состояние откатывается в `onError`. Эндпоинт лайков замокан в сервисе (у JSONPlaceholder его нет), но вся логика оптимистики настоящая.

## Ограничения

- Авторизация фейковая: проверяется только заполненность полей, флаг хранится в localStorage.
- Лайки живут в кэше клиента — обновление страницы их сбрасывает.
- Поиск и сортировка работают по уже загруженным страницам; в реальном проекте параметры поиска уходили бы на сервер и включались в `queryKey`.

## Запуск

```bash
npm install
npm run dev        # дев-сервер
npm run build      # прод-сборка
npm run typecheck  # проверка типов
npm run lint       # линтер
```

## Структура проекта

```text
src/
  app/          # каркас приложения: App (роуты), Layout
  components/
    post/       # PostList, PostFilters
    ui/         # Modal
    ProtectedRoute/
  context/      # AuthContext (провайдер) + auth (createContext)
  hooks/        # useAuth, useDebounce, usePosts, useToggleLike
  pages/        # Home, Login, Register, Posts, PostDetails, Comments
  services/     # postService — весь HTTP-слой
  types/        # общие типы
```
