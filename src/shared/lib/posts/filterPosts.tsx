import type { Post } from "../../../types/post";
import { postService } from "../../../services/postService";
import { useState } from "react";

type Props = {
    onClick: () => boolean
}
type ModalProps = {
    isOpen: boolean
}

export function Modall({isOpen}: ModalProps) {
    if(!isOpen) return null;
    return <div role="dialog">Modal</div>
}

export  function TestModal() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <button onClick={() => setIsOpen(false)}>Close</button>
            <Modall isOpen={isOpen}/>
        </div>
    )     
}
export function Button({onClick}: Props) {
    return <button onClick={onClick}>Open</button>
}
export async function loadPosts() {
  return postService.getPosts()
}

export default function filterPosts(search: string, sort: string, posts: Post[]) {
    const sortedPosts = !sort
        ? posts
        : sort === 'title' || sort === 'body' 
            ? [...posts].sort((a, b) => (a[sort]).localeCompare(b[sort]))
            : posts;

    return sortedPosts.filter((post: Post) => (post.title ?? '').toLowerCase().includes(search.toLowerCase()));
}