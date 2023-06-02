import {useState, useEffect} from 'react'

const useOnScreen = (ref) => {
    const [isIntersectin, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        )

        if(ref.current){
            observer.observe(ref.current)
        }
    }, [])

    return isIntersectin
}


export default useOnScreen