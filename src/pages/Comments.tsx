import { postService } from '../services/postService';
import useFetch from "../hooks/useFetch"
import { useCallback, useEffect, useState } from 'react';

type id = {
    postId: number
}

export default function Comments({postId}: id) {
    const handler = useCallback(() => postService.getComments(Number(postId)),[postId])
    const { data, loading, error } = useFetch(handler)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (!data) return <p>No comments data</p> 
    if (data.length === 0) return <p>No comments yet</p>

    return (
        <div className="comments">
            <h2 className="comments__title">Comments</h2>

            <div className="comments__list">
                {data.map((comment, index) => (
                    <div key={comment.id} className="comment">
                        <div className="comment__meta">
                            <span className="comment__index">{index + 1}</span>
                            <p className="comment__name"><strong>{comment.name}</strong></p>
                        </div>

                        <p className="comment__body">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
