import { postService } from '../services/postService';
import { useQuery } from '@tanstack/react-query';
import { Alert, Badge, Center, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import type { Comment } from '../types/post';

type id = {
    postId: number
}

export default function Comments({postId}: id) {
    const {
        data: comments,
        isPending,
        isError,
    } = useQuery<Comment[], Error>({
        queryKey: ['comments', postId],
        queryFn: () => postService.getComments(Number(postId))
    })

    if (isPending) return <Center py="md"><Loader size="sm" /></Center>;
    if (isError) return <Alert color="red">Failed to load comments</Alert>;
    if (comments.length === 0) return <Text c="dimmed">No comments yet</Text>;

    return (
        <Stack mt="lg">
            <Title order={3}>Comments</Title>

            {comments.map((comment, index) => (
                <Paper key={comment.id} withBorder radius="md" p="md">
                    <Group gap="xs" mb="xs">
                        <Badge variant="light" size="sm">{index + 1}</Badge>
                        <Text fw={600} size="sm">{comment.name}</Text>
                    </Group>

                    <Text size="sm">{comment.body}</Text>
                </Paper>
            ))}
        </Stack>
    )
}
