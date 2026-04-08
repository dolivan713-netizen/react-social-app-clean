import { useState, useEffect } from "react"

export default function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debouncedValue
}