export const postService = {
    getPost: (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
    getComments: (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
    getPosts: () => fetch(`https://jsonplaceholder.typicode.com/posts`),
}