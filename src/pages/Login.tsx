import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    function handleLogin() {
        setError('')
        if (!userName) {
            setError('Enter userName');
            return;
        }
        if (!password) {
            setError('Enter password');
            return;
        }
        login();
        navigate('/posts');
    }

    return (
        <Paper withBorder radius="md" p="xl" maw={400} mx="auto" mt="xl">
            <Stack>
                <Title order={2}>Login</Title>

                <TextInput
                    label="Username"
                    placeholder="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.currentTarget.value)}
                />

                <PasswordInput
                    label="Password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />

                {error && <Text c="red" size="sm">{error}</Text>}

                <Group>
                    <Button onClick={handleLogin}>Login</Button>
                    <Button variant="subtle" onClick={() => navigate("/register")}>
                        Register
                    </Button>
                </Group>
            </Stack>
        </Paper>
    )
}
