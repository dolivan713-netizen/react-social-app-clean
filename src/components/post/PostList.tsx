import type { Post, PropsList } from "../../types/post"


export default function PostList({posts, onDelete, lastElementRef, onOpenPost}: PropsList) {
    return (
        <ul className="post-list">
            {posts.map((post, index) => {
                const isLastElement = index === posts.length - 1;

                return (
                    <li
                        key={post.id}
                        ref={isLastElement ? lastElementRef : null}
                        className="post-item"
                    >
                        <div className="post-item__meta">
                            <span className="post-item__id">{post.id}</span>
                        </div>

                        <h3 className="post-item__title">{post.title}</h3>
                        <p className="post-item__body">{post.body}</p>

                        <div className="post-item__actions">
                            <button className="btn btn--danger" onClick={() => onDelete(post.id)}>
                                Delete
                            </button>
                            <button className="btn btn--secondary" onClick={() => onOpenPost(post.id)}>
                                Open
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
        
    )
}
