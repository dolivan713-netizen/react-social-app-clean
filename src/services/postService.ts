import type { PostService, Post } from "../types/post"

export const postService: PostService = {
    getPost: (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    }),

    getComments: (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    }),

    deletePost: (id: number) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("Failed to delete post");
        }
    }),

    createPost: (newPost) => fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("Failed to create post");
        }
    }),
    
    // у jsonplaceholder нет эндпоинта лайков — имитируем успешный ответ сервера
    toggleLike: () => new Promise<void>((resolve) => setTimeout(resolve, 1000)),

    getPostsPage: (page: number) => fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed postsPage");
        } 
        return response.json()
    })
    .then((items: Post[]) => ({
            items: items.map(item => ({...item, likedByMe: false, likesCount: 0})),
            nextPage: items.length < 10 ? null : page + 1
        }
    ))
}
