import { postService } from '../services/postService';
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useCallback } from 'react';

export default function Comments() {
    const { id } = useParams()
    if (!id || isNaN(Number(id))) return <p>Invalid post ID</p>
    const handler = useCallback(() => postService.getComments(Number(id)),[id])
    const { data, loading, error } = useFetch(handler)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (data === null) return <p>No comments data</p> 
    if (data.length === 0) return <p>No comments yet</p>
    return (
        <div>
            {data.map(comment => (
                <div key={comment.id}>
                    <p>{comment.id}</p>
                    <p><strong>{comment.name}</strong></p>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    )
}
