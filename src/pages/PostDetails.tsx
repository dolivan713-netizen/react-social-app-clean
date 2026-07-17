import { useParams } from "react-router-dom"
import { postService } from '../services/postService';
import Comments from "./Comments";
import { useQuery } from "@tanstack/react-query";
import { Alert, Center, Loader, Stack, Text, Title } from "@mantine/core";
import type { Post } from "../types/post";

export default function PostDetails() {
    const { id } = useParams();
    const postId = Number(id);
    const isInvalidId = !id || Number.isNaN(postId);

    const {
        data: post,
        isPending,
        isError,
    } = useQuery<Post, Error>({
        queryKey: ['posts', postId],
        queryFn: () => postService.getPost(postId),
        enabled: Boolean(postId)
    })

    if (isInvalidId) return <Alert color="red">Invalid post ID</Alert>;
    if (isPending) return <Center py="xl"><Loader /></Center>;
    if (isError) return <Alert color="red">Failed to load post</Alert>;

    return (
        <Stack gap="md">
            <Title order={2}>{post.title}</Title>
            <Text>{post.body}</Text>

            <Comments postId={postId} />
        </Stack>
    );
}
