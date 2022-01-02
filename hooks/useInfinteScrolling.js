import {useCallback, useRef} from "react";

function useInfinteScrolling(loading, loadedItems, hasMore, setOffset) {

    const observer = useRef();
    const loadOnIntersectRef = useCallback(node => {
            if (loading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setOffset(loadedItems.length)
                }
            })
            if (node) observer.current.observe(node);
        }
    );

    return {loadOnIntersectRef}
}

export default useInfinteScrolling
