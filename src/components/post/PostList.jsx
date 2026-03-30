import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import useDebounce from "../../hooks/useDebounce"
import useObserver from "../../hooks/useObserver";
import { useNavigate } from "react-router-dom"

export default function PostList({posts, onDelete}) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 300);
    const LIMIT = 10;
    const navigate = useNavigate()

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, sort]) // if search - pages clear

    const processedPosts = useMemo(() => {
        const sorted = [...posts]
        if (sort) {
            sorted.sort((a, b) => {
                const aValue = a[sort] || '';
                const bValue = b[sort] || '';
                return aValue.localeCompare(bValue)
            })
        }
        const searchQuery = debouncedSearch.toLowerCase()
        return sorted.filter(post => post.title.toLowerCase().includes(searchQuery))
    }, [posts, debouncedSearch, sort])

    const paginatedPosts = useMemo(() => {
        return processedPosts.slice(0, page * LIMIT)
    }, [page, processedPosts])

    const lastElementRef = useRef(null)
    const totalPages = Math.ceil(processedPosts.length / LIMIT)

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

    if (!posts.length)  return <p>No posts yet</p>
    if (processedPosts.length === 0 ) return <p>Not found</p>

    return (
        <div>
            <h1>Posts</h1>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">No sort</option>
                <option value="title">Sort by title</option>
                <option value="body">Sort by body</option>
            </select>

            <input 
                value={search} 
                onChange={e => setSearch(e.target.value)}  
                type="text"
                placeholder="Search..." 
            />
            <ul className="post-list">
            {paginatedPosts.map((post, index) => {
                const isLastElement = index === paginatedPosts.length - 1;
                    return (
                    <li ref={isLastElement ? lastElementRef : null}
                        key={post.id}
                    >
                        <p>{post.id}</p>
                        <p>{post.title}</p>
                        <p>{post.body}</p>
                        <button onClick={() => onDelete(post.id)}>Delete</button>
                        <button onClick={() => navigate(`/posts/${post.id}`)}>Open</button> 
                    </li>
                )
            })}
            </ul>
        </div>
        
    )
}
