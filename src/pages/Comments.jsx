import { postService } from '../services/postService';
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"

export default function Comments() {
    const { id } = useParams()
    if (!id || isNaN(Number(id))) return <p>Invalid post ID</p>
    const { data, loading, error } = useFetch(() => postService.getComments(Number(id)));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    return (
        <div>
            {data.map(comment => (
                <div key={comment.id}>
                    <p><strong>{comment.name}</strong></p>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    )
}


// {
// postId: 1,
// id: 1,
// name: "id labore ex et quam laborum",
// email: "Eliseo@gardner.biz",
// body: "laudantium enim quasi est quidem magnam voluptate ipsam eos
// tempora quo necessitatibus
// dolor quam autem quasi
// reiciendis et nam sapiente accusantium"
// },