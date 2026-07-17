import type { ReactNode } from "react";

export type Post = {
    id: number
    title: string
    body: string
    likedByMe: boolean,
    likesCount: number,
}
export type InfiniteData = {
    pages: ResponsePagePosts[];
    pageParams: unknown[];
}
export type ResponsePagePosts = {
    items: Post[],
    nextPage: null | number
}

export type Comment = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export type Sort = 'title' | 'body';

export type NewPost = {
    id: number
    title: string
    body: string
}

export type PostService = {
    getPost: (id: number) => Promise<Post>,
    getComments: (id: number) => Promise<Comment[]>
    deletePost: (id: number) => Promise<void>
    createPost: (post: NewPost) => Promise<void>
    toggleLike: (id: number) => Promise<void>
    getPostsPage: (page: number) => Promise<ResponsePagePosts>
}

export type PropsList = {
    infiniteQuery: InfiniteQuery
    onOpenPost: (id: number) => void
    toggleLike: ToggleLike
    deletePost: DeletePost
}

export type InfiniteQuery = {
    visiblePosts: Post[]
    fetchNextPage: () => void
    hasNextPage: boolean
    isFetchingNextPage: boolean
}

export type DeletePost = {
    mutateDeletePost: (postId: number) => void
    errorDelete: boolean
    pendingDelete: boolean
}

export type ToggleLike = {
    likePost: (postId: number) => void
    isPendingLike: boolean
}

export type PropsFilters = {
    search: string
    sort: string
    onSearchChange: (value: string) => void
    onSortChange: (value: string) => void
}

export type PropsModal = {
    isOpen: boolean
    onClose: () => void
}

export type AuthContextValue = {
  isAuth: boolean
  login: () => void
  logout: () => void
}

export type Child = {
    children: ReactNode
}
