import { Link } from "react-router-dom";
import { Button, Card, Group, List, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import useAuth from "../hooks/useAuth";

export default function Home() {
    const { isAuth } = useAuth();

    return (
        <Stack gap="xl">
            <Stack gap="sm" align="center" ta="center" py="xl">
                <Title>React Social App</Title>
                <Text c="dimmed" maw={520}>
                    Учебный pet-project на React с авторизацией, постами,
                    поиском, сортировкой, пагинацией и страницей деталей поста.
                </Text>

                <Group mt="md">
                    {isAuth ? (
                        <Button component={Link} to="/posts">
                            Перейти к постам
                        </Button>
                    ) : (
                        <>
                            <Button component={Link} to="/login">
                                Войти
                            </Button>
                            <Button component={Link} to="/register" variant="default">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Group>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <Card withBorder radius="md" padding="lg">
                    <Title order={3} mb="sm">О проекте</Title>
                    <Text size="sm">
                        Этот проект помогает мне изучать React через реальное приложение:
                        роутинг, auth flow, кастомные хуки, работу с запросами
                        и декомпозицию интерфейса.
                    </Text>
                </Card>

                <Card withBorder radius="md" padding="lg">
                    <Title order={3} mb="sm">Что уже реализовано</Title>
                    <List size="sm" spacing="xs">
                        <List.Item>Авторизация через Context и ProtectedRoute</List.Item>
                        <List.Item>Посты с поиском и сортировкой</List.Item>
                        <List.Item>Пагинация через useInfiniteQuery</List.Item>
                        <List.Item>Лайки с оптимистичным обновлением</List.Item>
                        <List.Item>Создание и удаление постов</List.Item>
                        <List.Item>Страница деталей и комментарии</List.Item>
                    </List>
                </Card>

                <Card withBorder radius="md" padding="lg">
                    <Title order={3} mb="sm">Текущая цель</Title>
                    <Text size="sm">
                        Построить проект шаг за шагом и понять не только,
                        как он работает, но и почему каждое архитектурное решение
                        сделано именно так.
                    </Text>
                </Card>
            </SimpleGrid>
        </Stack>
    );
}
