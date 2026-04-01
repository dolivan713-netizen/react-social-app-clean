import { useEffect, useState, useRef} from "react";
import { postService } from '../services/postService';
import PostList from "../components/post/PostList";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import useFetch from "../hooks/useFetch";

export default function Posts() {
    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const isInitialized = useRef(false);
    const {data, error, loading} = useFetch(() => postService.getPosts());
    

    useEffect(() => {
        if(data && !isInitialized.current) {
            setPosts(data)
            isInitialized.current = true
        } },[data])
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    function addPost(newPost) {
        setPosts(prev => [...prev, newPost])
    }
    function deletePost(id) {
        setPosts(prev => prev.filter(post => post.id !== id))
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (posts.length === 0) return <p>Not posts</p>

    return (
        <div>
        <h1>Vk</h1>
        <PostList
            posts={posts || []}
            onDelete={deletePost}
        />
        <Button onOpen={openModal} />
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            onCreate={addPost}
            postsNum={posts.length}
        />
        </div>
    )
}
