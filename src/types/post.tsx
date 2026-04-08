import type { ReactNode } from "react";

export type Post = {
    //userId: number
    id: number
    title: string
    body: string
}

export type Comment = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export type Sort = 'title' | 'body';

export type PostService = {
    getPost: (id: number) => Promise<Post>,
    getComments: (id: number) => Promise<Comment[]>,
    getPosts: () => Promise<Post[]>
}

export type PropsList = {
    posts: Post[]
    onDelete: (id: number) => void
    lastElementRef: {
        current: HTMLLIElement | null
    }
    onOpenPost: (id: number) => void
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
    onCreate: (newPost: Post) => void
}

export type AuthContextValue = {
  isAuth: boolean
  authReady: boolean
  login: () => void
  logout: () => void
}

export type Child = {
    //children: () => void
    children: ReactNode
}

//lastElementRef: RefObject<HTMLElement | null>