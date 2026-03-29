import { useParams } from "react-router-dom"
import { postService } from '../services/postService';
import useFetch from "../hooks/useFetch"
import Comments from "./Comments";



export default function PostDetails() {
    const { id } = useParams()
    if (!id || isNaN(Number(id))) return <p>Invalid post ID</p>
    const {data, error, loading} = useFetch(() => postService.getPost(Number(id)));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    return (
        <div className="post-details" key={data.id}>
            <p>{data.title}</p>
            <p>{data.body}</p>
            <Comments />
        </div>
    )
}