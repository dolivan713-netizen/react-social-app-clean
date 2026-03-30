import { useParams } from "react-router-dom"
import { postService } from '../services/postService';
import useFetch from "../hooks/useFetch"
import Comments from "./Comments";
import { useCallback } from "react";

export default function PostDetails() {
    const { id } = useParams()
    if (!id || isNaN(Number(id))) return <p>Invalid post ID</p>
    const handler = useCallback(() => postService.getPost(Number(id)), [id])
    const {data, error, loading} = useFetch(handler)
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (data === null) return <p>Post not found</p> 
    return (
        <div className="post-details">
            <p>{data.title}</p>
            <p>{data.body}</p>  
            <Comments />
        </div>
    )
}