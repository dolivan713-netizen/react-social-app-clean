import { useParams } from "react-router-dom"
import { postService } from '../services/postService';
import useFetch from "../hooks/useFetch"
import Comments from "./Comments";
import { useCallback } from "react";

export default function PostDetails() {
    const { id } = useParams();
    const postId = Number(id);
    const isInvalidId = !id || Number.isNaN(postId);

    const fetchPost = useCallback(() => postService.getPost(postId), [postId]);
    const { data, error, loading } = useFetch(fetchPost);

    if (isInvalidId) return <p>Invalid post ID</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Post not found</p>;

    return (
        <div className="post-details">
            <p>{data.title}</p>
            <p>{data.body}</p>
            <Comments postId={postId} />
        </div>
    );
}