import "../styles/global.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { isAuth } = useContext(AuthContext);

    return (
        <section className="home">
            <div className="home__hero">
                <h1 className="home__title">React Social App</h1>
                <p className="home__subtitle">
                    Учебный pet-project на React с авторизацией, постами,
                    поиском, сортировкой, бесконечной прокруткой и страницей деталей поста.
                </p>

                <div className="home__actions">
                    {isAuth ? (
                        <Link className="home__button" to="/posts">
                            Перейти к постам
                        </Link>
                    ) : (
                        <>
                            <Link className="home__button" to="/login">
                                Войти
                            </Link>
                            <Link
                                className="home__button home__button--secondary"
                                to="/register"
                            >
                                Регистрация
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="home__content">
                <div className="home__card">
                    <h2>О проекте</h2>
                    <p>
                        Этот проект помогает мне изучать React через реальное приложение:
                        роутинг, auth flow, кастомные хуки, работу с запросами
                        и декомпозицию интерфейса.
                    </p>
                </div>

                <div className="home__card">
                    <h2>Что уже реализовано</h2>
                    <ul className="home__list">
                        <li>Авторизация через Context и ProtectedRoute</li>
                        <li>Страница постов с поиском и сортировкой</li>
                        <li>Бесконечная прокрутка через IntersectionObserver</li>
                        <li>Добавление и удаление постов</li>
                        <li>Страница деталей поста</li>
                        <li>Загрузка комментариев по id поста</li>
                    </ul>
                </div>

                <div className="home__card">
                    <h2>Текущая цель</h2>
                    <p>
                        Построить проект шаг за шагом и понять не только,
                        как он работает, но и почему каждое архитектурное решение
                        сделано именно так.
                    </p>
                </div>
            </div>
        </section>
    );
}