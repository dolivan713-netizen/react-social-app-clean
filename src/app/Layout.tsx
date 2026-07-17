import { NavLink, Outlet } from "react-router-dom";
import { Anchor, Box, Button, Container, Group, Text } from "@mantine/core";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const { isAuth, logout } = useAuth();

    return (
        <>
            <Box
                component="header"
                py="md"
                style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
            >
                <Container size="md">
                    <Group justify="space-between">
                        <Text fw={700}>React Social App</Text>

                        <Group gap="md">
                            <Anchor component={NavLink} to="/" underline="hover">
                                Home
                            </Anchor>

                            {isAuth && (
                                <Anchor component={NavLink} to="/posts" underline="hover">
                                    Posts
                                </Anchor>
                            )}

                            {!isAuth && (
                                <>
                                    <Anchor component={NavLink} to="/login" underline="hover">
                                        Login
                                    </Anchor>
                                    <Anchor component={NavLink} to="/register" underline="hover">
                                        Register
                                    </Anchor>
                                </>
                            )}

                            {isAuth && (
                                <Button variant="light" size="xs" onClick={logout}>
                                    Logout
                                </Button>
                            )}
                        </Group>
                    </Group>
                </Container>
            </Box>

            <Container component="main" size="md" py="xl">
                <Outlet />
            </Container>
        </>
    );
};

export { Layout };
