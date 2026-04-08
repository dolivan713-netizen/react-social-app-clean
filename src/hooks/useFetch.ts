import { useState, useEffect } from "react"

export default function useFetch<T>(fn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        fn()
        .then((data) => setData(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, [fn])
    return {data, error, loading}
}
