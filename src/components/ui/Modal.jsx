import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onCreate, } ) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isOpen) return
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    function handleAdd() {
        if (!title.trim() || !body.trim()) {
            setError('Fill in all fields');
            return;
        }
        onCreate({
            id: Date.now(),
            title: title.trim(),
            body: body.trim(),
        })
        setTitle('')
        setBody('')
        setError('')
        onClose()
    }

    return (
        <div
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Create Post</h2>

                <input 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input type="text"
                    placeholder="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                {error && <p>{error}</p>}

                <button onClick={() => {handleAdd}}>Add Post</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}