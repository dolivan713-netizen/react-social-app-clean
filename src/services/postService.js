export const postService = {
    getPost: (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    }),
    getComments: (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    }),
    getPosts: () => fetch(`https://jsonplaceholder.typicode.com/posts`).then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    }),
}