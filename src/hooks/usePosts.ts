import { useMemo } from "react";
import type { Post } from "../types/post";
import filterPosts from "../shared/lib/posts/filterPosts";

export default function usePosts(posts: Post[], sort: string, debouncedSearch: string) {
    const visiblePosts = useMemo(() => {
        return filterPosts(debouncedSearch, sort, posts)
    }, [debouncedSearch, sort, posts]);
    return visiblePosts;
}