import { useRef, useEffect, useCallback } from "react"

export default function useObserver(callback: () => void) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const currentElementRef = useRef<Element | null>(null);

    useEffect(() => { 
        observerRef.current = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];

            if (firstEntry?.isIntersecting) {
                callback();
            }
        });
        
        return () => {
            observerRef.current?.disconnect();
        };
    }, [callback]);

    const observe = useCallback((element: Element | null) => {
        if (!observerRef.current) return;

        if (currentElementRef.current) {
            observerRef.current.unobserve(currentElementRef.current);
        }

        if (element) {
            observerRef.current.observe(element);
            currentElementRef.current = element;
        }
    }, []);

    return observe;
}
