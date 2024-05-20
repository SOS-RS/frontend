import { useState } from "react"

const BackToTop =() => {

    const [isVisible, setVisibility] = useState(true)

    const scrollToTop = () => {
        window.scrollTo(0,0)

        console.log("click!")
    }

    const toggleVisibility = () => {
        if (window.scrollY >= window.innerHeight) {
            setVisibility(true)
        } else {
            setVisibility(false)
        }

        console.log("scrooled")
    }


return (isVisible && (
    <button 
    className=" absolute bg-red-800/60 z-[100] right-10 bottom-10 w-12 h-12 rounded-full shadow-slate-500 font-bold shadow-md text-white select-none" 
    onClick={scrollToTop} 
    onScroll={toggleVisibility}
    
    
    >^</button>
));
}

export { BackToTop };