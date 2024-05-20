import { useState } from "react"

const BackToTop =() => {

    const [isVisible, setVisibility] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({top:0, behavior:"smooth"})

        console.log(window.scrollY)
    }

    window.addEventListener("scroll", () => {
        if ( window.innerHeight / 2 < window.scrollY) {
            setVisibility(true)
        } else {
            setVisibility(false)
        }
    })


return (isVisible && (
    <button 
    className=" fixed ease-in-out duration-300 hover:bg-red-800/100 bg-red-800/40 z-[100] right-10 bottom-10 w-12 h-12 rounded-full shadow-slate-500 font-bold shadow-md text-white select-none" 
    onClick={scrollToTop}
    >^</button>
));
}

export { BackToTop };