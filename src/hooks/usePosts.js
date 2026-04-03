import { useMemo } from "react";

export default function usePosts(posts, sort, debouncedSearch) {

    const sortedPosts = useMemo(() => {
        if (!sort) return posts;
        return [...posts].sort((a, b) => (a[sort] ?? "").localeCompare(b[sort] ?? ""));
    }, [posts, sort]);

    const visiblePosts = useMemo(() => {
        return sortedPosts.filter((post) => (post.title ?? "").toLowerCase().includes(debouncedSearch.toLowerCase()))
    }, [sortedPosts, debouncedSearch]);

    return visiblePosts;
}