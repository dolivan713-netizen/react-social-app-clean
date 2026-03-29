import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onCreate, postsNum } ) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

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
    }, [!isOpen, onClose])

    if (!isOpen) return null

    function handleAdd() {
        onCreate({
            id: postsNum + 1,
            title,
            body 
        })
        setTitle('')
        setBody('')
        onClose()
    }

    return (
        <div
            style={overlayStyle}
            onClick={onClose}
        >
            <div
                style={modalStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Craete Post</h2>

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
                <button onClick={() => {handleAdd()}}>Add Task</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const modalStyle = {
  background: 'rgba(2, 1, 1, 1)',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px'
}