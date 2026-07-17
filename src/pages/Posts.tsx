import { useState } from "react";
import { postService } from '../services/postService';
import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { Alert, Button, Center, Group, Loader, Stack, Text, Title } from "@mantine/core";
import usePosts from "../hooks/usePosts";
import useDebounce from "../hooks/useDebounce"
import PostList from "../components/post/PostList";
import PostFilters from "../components/post/PostFilters";
import Modal from "../components/ui/Modal";
import type { Post, ResponsePagePosts } from "../types/post";
import useToggleLike from "../hooks/useToggleLike";

export default function Posts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const debouncedSearch = useDebounce(search, 300);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: likePost, isPending: isPendingLike} = useToggleLike();

    const {
        mutate: mutateDeletePost,
        isError: errorDelete,
        isPending: pendingDelete
    } = useMutation({
        mutationFn: postService.deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError
    } = useInfiniteQuery<ResponsePagePosts, Error>({
        queryKey: ['posts', 'infinite'],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => postService.getPostsPage(pageParam as number),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const postsPage = data?.pages.flatMap((page) => page.items) ?? []

    const visiblePosts = usePosts(postsPage, sort, debouncedSearch);

    const infiniteQuery = {visiblePosts, fetchNextPage, hasNextPage, isFetchingNextPage};
    const toggleLike = {likePost, isPendingLike};
    const deletePost = { mutateDeletePost, errorDelete, pendingDelete };

    const handles = {
        openPost: (id : Post["id"]) => navigate(`/posts/${id}`),
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        searchChange: (value : string) => setSearch(value),
        sortChange: (value : string) => setSort(value)
    }

    if (isPending) return <Center py="xl"><Loader /></Center>;
    if (isError) return <Alert color="red">Failed to load posts</Alert>;

    return (
        <Stack gap="lg">
            <Group justify="space-between">
                <Title order={2}>Posts</Title>

                <Button onClick={handles.openModal}>
                    Add post
                </Button>
            </Group>

            <PostFilters
                search={search}
                sort={sort}
                onSearchChange={handles.searchChange}
                onSortChange={handles.sortChange}
            />

            {postsPage.length === 0 ? (
                <Text c="dimmed">No posts yet</Text>
            ) : visiblePosts.length === 0 ? (
                <Text c="dimmed">Not found</Text>
            ) : (
                <PostList
                    infiniteQuery={infiniteQuery}
                    onOpenPost={handles.openPost}
                    toggleLike={toggleLike}
                    deletePost={deletePost}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handles.closeModal}
            />
        </Stack>
    )
}
