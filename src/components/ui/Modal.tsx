import { useState } from "react";
import { Button, Group, Modal as MantineModal, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { NewPost, PropsModal } from "../../types/post";
import { postService } from "../../services/postService";

export default function Modal({ isOpen, onClose }: PropsModal ) {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');

    const {
        mutate: mutateCreatePost,
        isError,
        isPending,
    } = useMutation({
        mutationFn: postService.createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            setTitle('')
            setBody('');
            setError('');
            onClose()
        }
    })

    function handleAdd() {
        if (!title.trim() || !body.trim()) {
            setError('Fill in all fields');
            return;
        }

        const newPost: NewPost = {
            id: Date.now(),
            title,
            body
        }

        mutateCreatePost(newPost);
    }

    return (
        <MantineModal opened={isOpen} onClose={onClose} title="Create post" centered>
            <Stack>
                <TextInput
                    label="Title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />

                <Textarea
                    label="Body"
                    placeholder="Body"
                    autosize
                    minRows={3}
                    value={body}
                    onChange={(e) => setBody(e.currentTarget.value)}
                />

                {error && <Text c="red" size="sm">{error}</Text>}
                {isError && <Text c="red" size="sm">Error create post</Text>}

                <Group justify="flex-end">
                    <Button variant="default" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} loading={isPending}>
                        Add post
                    </Button>
                </Group>
            </Stack>
        </MantineModal>
    )
}
