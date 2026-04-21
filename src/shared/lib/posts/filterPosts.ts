type Post = {
    id: number
    title: string
    body: string
}

export function sum(a: number, b: number): number {
  return a + b
}

export default function filterPosts(search: string, sort: string, posts: Post[]) {
    const sortedPosts = !sort
        ? posts
        : sort === 'title' || sort === 'body' 
            ? [...posts].sort((a, b) => (a[sort]).localeCompare(b[sort]))
            : posts;

    return sortedPosts.filter((post: Post) => (post.title ?? '').toLowerCase().includes(search.toLowerCase()));
}