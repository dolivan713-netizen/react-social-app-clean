import { useRef, useEffect } from "react"

export default function useObserver(callBack) {
    const observerRef = useRef(null)
    
    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                callBack()
            }
        })

        return () => {
            observerRef.current?.disconnect()
        }
    }, [callBack])

    const observe = (element) => {
        if (!element) return 
        observerRef.current?.observe(element)
    }
    return observe
}
