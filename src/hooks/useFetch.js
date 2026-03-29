import { useState, useEffect } from "react"

export default function useFetch(fn) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fn()
        .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        } return response.json()})
        .then(data => setData(data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
    }, [fn])
    return {data, error, loading}
}
