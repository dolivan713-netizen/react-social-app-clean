import { useState, useEffect } from "react"

export default function useFetch(fn) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        fn()
        .then(data => setData(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [fn])
    return {data, error, loading}
}