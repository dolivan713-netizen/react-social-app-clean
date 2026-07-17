import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import type { PropsList } from "../../types/post";

export default function PostList({ infiniteQuery, onOpenPost, toggleLike, deletePost }: PropsList) {
    const { likePost, isPendingLike } = toggleLike;
    const { mutateDeletePost, errorDelete, pendingDelete } = deletePost;
    const { visiblePosts, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

    return (
        <Stack>
            {visiblePosts.map((post) => (
                <Card key={post.id} withBorder radius="md" padding="lg">
                    <Badge variant="light" mb="xs">#{post.id}</Badge>

                    <Title order={4}>{post.title}</Title>
                    <Text size="sm" c="dimmed" mt="xs">{post.body}</Text>

                    <Group mt="md">
                        <Button
                            size="xs"
                            variant={post.likedByMe ? "filled" : "light"}
                            disabled={isPendingLike}
                            onClick={() => likePost(post.id)}
                        >
                            {post.likedByMe ? 'Unlike' : 'Like'} ({post.likesCount})
                        </Button>

                        <Button size="xs" variant="default" onClick={() => onOpenPost(post.id)}>
                            Open
                        </Button>

                        <Button
                            size="xs"
                            color="red"
                            variant="outline"
                            disabled={pendingDelete}
                            onClick={() => mutateDeletePost(post.id)}
                        >
                            Delete
                        </Button>
                    </Group>

                    {errorDelete && <Text c="red" size="sm" mt="xs">Error delete</Text>}
                </Card>
            ))}

            <Button
                variant="default"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage}
                loading={isFetchingNextPage}
            >
                {hasNextPage ? 'Load more' : 'No more posts'}
            </Button>
        </Stack>
    )
}
