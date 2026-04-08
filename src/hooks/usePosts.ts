import { useMemo } from "react";
import type { Post } from "../types/post";

export default function usePosts(posts: Post[], sort: string, debouncedSearch: string) {

    const sortedPosts = useMemo(() => {
        if (!sort) return posts;
        if (sort === 'title' || sort === 'body') {
            return [...posts].sort((a, b) => (a[sort]).localeCompare(b[sort]));
        } return posts
    }, [posts, sort]);

    const visiblePosts = useMemo(() => {
        return sortedPosts.filter((post) => (post.title ?? "").toLowerCase().includes(debouncedSearch.toLowerCase()))
    }, [sortedPosts, debouncedSearch]);

    return visiblePosts;
}