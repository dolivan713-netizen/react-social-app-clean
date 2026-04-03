import { postService } from '../services/postService';
import useFetch from "../hooks/useFetch"
import { useCallback, useEffect, useState } from 'react';

export default function Comments({postId}) {
    const handler = useCallback(() => postService.getComments(Number(postId)),[postId])
    const { data, loading, error } = useFetch(handler)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (!data) return <p>No comments data</p> 
    if (data.length === 0) return <p>No comments yet</p>

    return (
        <div>
            {data.map((comment, index) => (
                <div key={comment.id}>
                    <p>{index + 1}</p>
                    <p><strong>{comment.name}</strong></p>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    )
}
