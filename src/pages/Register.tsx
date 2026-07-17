import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const { login } = useAuth();

    function handleRegister() {
        setError("")
        if (!email.trim()) {
            setError('Enter email');
            return;
        }
        if (!password.trim()) {
            setError('Enter password');
            return;
        }
        if (!userName.trim()) {
            setError('Enter userName');
            return;
        }
        login();
        navigate('/posts');
    }

    return (
        <Paper withBorder radius="md" p="xl" maw={400} mx="auto" mt="xl">
            <Stack>
                <Title order={2}>Register</Title>

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

                <TextInput
                    label="Email"
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />

                {error && <Text c="red" size="sm">{error}</Text>}

                <Group>
                    <Button onClick={handleRegister}>Register</Button>
                    <Button variant="subtle" onClick={() => navigate('/login')}>
                        Already have an account? Login
                    </Button>
                </Group>
            </Stack>
        </Paper>
    )
}
