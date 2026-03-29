import { useState, useMemo} from "react"
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

export default function SearchUsers() {
    const [search, setSearch] = useState('')
    const {data, error, loading} = useFetch('https://jsonplaceholder.typicode.com/posts'); // 'https://api.github.com/user'
    const debouncedSearch = useDebounce(search, 300)

    const result = useMemo(() => {
        if (!data) return [];
        let sorted = [...data].sort((a, b) => a.title.localeCompare(b.title)) // on post a.title
        let finded  = sorted.filter(post => post.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
        return finded
    },[debouncedSearch, data]) // debounce

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (!data) return <p>Not data</p>
    
    return (
        <div>
            <h1>Posts</h1>

            <input 
                value={search} 
                onChange={e => setSearch(e.target.value)}  
                type="text"
                placeholder="Search..." 
            />
            {result.length === 0 && <p>Not found</p>}
            <ul>
                {result.map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))} 
            </ul>
        </div>
    )
}


// 31 on post