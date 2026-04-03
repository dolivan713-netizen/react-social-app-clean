import { useEffect, useState, useRef, useMemo, useCallback} from "react";
import { postService } from '../services/postService';
import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import usePosts from "../hooks/usePosts";
import useDebounce from "../hooks/useDebounce"
import useObserver from "../hooks/useObserver"
import PostList from "../components/post/PostList";
import PostFilters from "../components/post/PostFilters";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Posts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const isInitialized = useRef(false);
    const debouncedSearch = useDebounce(search, 300);
    const visiblePosts = usePosts(posts, sort, debouncedSearch)
    const navigate = useNavigate();
    const fetchPosts = useCallback(() => postService.getPosts(), []);
    const { data, error, loading } = useFetch(fetchPosts);
    const LIMIT = 10;
    
    function openPost(id) {
        navigate(`/posts/${id}`)
    }

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, sort]);
    
    const paginatedPosts = useMemo(() => {
        return visiblePosts.slice(0, page * LIMIT)
    }, [page, visiblePosts])

    const lastElementRef = useRef(null)
    const totalPages = Math.ceil(visiblePosts.length / LIMIT);

    const handleObserver = useCallback(() => {
    setPage(prev => {
        if (prev < totalPages) { 
            return prev + 1
        } return prev
    })
    },[totalPages])
    const observe = useObserver(handleObserver)

    useEffect(() => {
        if (lastElementRef.current) {
            observe(lastElementRef.current)
        }
    }, [paginatedPosts, observe])

    useEffect(() => {
        if(data && !isInitialized.current) {
            setPosts(data)
            isInitialized.current = true
        } 
    },[data]);

    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }
    function addPost(newPost) {
        setPosts(prev => [...prev, newPost])
    }
    function deletePost(id) {
        setPosts(prev => prev.filter(post => post.id !== id))
    }
    function handleSearchChange(value) {
        setSearch(value)
    }
    function handleSortChange(value) {
        setSort(value)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
        <h1>Vk</h1>
        <h2>Posts</h2>
        <PostFilters
            search={search}
            sort={sort}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
        />
        {posts.length === 0 ? (
            <p>No posts yet</p>
        ) : visiblePosts.length === 0 ? (
            <p>Not found</p>
        ) : (
            <PostList
                posts={paginatedPosts}
                onDelete={deletePost}
                lastElementRef={lastElementRef}
                onOpenPost={openPost}
            />
        )}

        <Button onOpen={openModal} />
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onCreate={addPost}
        />
        </div>
    )
}
