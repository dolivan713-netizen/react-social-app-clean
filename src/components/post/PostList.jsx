export default function PostList({posts, onDelete, lastElementRef, onOpenPost}) {
    return (
        <div>
            <ul className="post-list">
            {posts.map((post, index) => {
                const isLastElement = index === posts.length - 1;
                    return (
                    <li ref={isLastElement ? lastElementRef : null}
                        key={post.id}
                    >
                        <p>{post.id}</p>
                        <p>{post.title}</p>
                        <p>{post.body}</p>
                        <button onClick={() => onDelete(post.id)}>Delete</button>
                        <button onClick={() => onOpenPost(post.id)}>Open</button> 
                    </li>
                )
            })}
            </ul>
        </div>
        
    )
}
