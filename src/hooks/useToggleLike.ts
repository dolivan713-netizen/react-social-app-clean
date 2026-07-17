import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postService } from '../services/postService'
import type { Post, InfiniteData } from '../types/post'

export default function useToggleLike() {
    const queryClient = useQueryClient();
    const postsQueryKey = ['posts', 'infinite'] as const;

    return useMutation({
        mutationFn: (postId: number) => postService.toggleLike(postId),

        onMutate: async (postId) => {
            const postQueryKey = ['posts', postId] as const;

            await Promise.all([
                queryClient.cancelQueries({ queryKey: postQueryKey }),
                queryClient.cancelQueries({ queryKey: postsQueryKey })
            ])
        
            const previousPost = queryClient.getQueryData<Post>(postQueryKey);
            const previousPosts = queryClient.getQueryData<InfiniteData>(postsQueryKey);

            queryClient.setQueryData<InfiniteData>(postsQueryKey, (oldPosts) => {
                if(!oldPosts) return oldPosts;

                return {
                    ...oldPosts,
                    pages: oldPosts.pages.map(page => ({
                        ...page,
                        items: page.items.map(post => {
                            if(post.id !== postId) return post;

                            return {
                                ...post,
                                likedByMe: !post.likedByMe,
                                likesCount: post.likedByMe ? post.likesCount - 1 : post.likesCount + 1
                            }
                        })
                    }))
                }
            })

            queryClient.setQueryData<Post>(postQueryKey, (oldPost) => {
                if(!oldPost) return oldPost;

                return {
                    ...oldPost,
                    likedByMe: !oldPost.likedByMe,
                    likesCount: oldPost.likedByMe ? oldPost.likesCount - 1 : oldPost.likesCount + 1
                } 
            })

            return { previousPost, previousPosts }
        },
        onError: (err, postId, context) => {
            if(context?.previousPost) {
                queryClient.setQueryData(["posts", postId], context.previousPost)
            }
            if(context?.previousPosts) {
                queryClient.setQueryData(postsQueryKey, context.previousPosts)
            }
        },
        // сервер не знает про лайки
        // onSettled: () => {
        //     queryClient.invalidateQueries({ queryKey: postsQueryKey })
        // }
    }
)}