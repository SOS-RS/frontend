import { useState } from "react"

const BackToTop =() => {

    const [isVisible, setVisibility] = useState(false)

    const scrollToTop = () => {
        let root = document.getElementById('root')
        if (!root) {return}

        root.scrollTo({top:0, behavior:"smooth"})
        
    }

    document.getElementById("root")?.addEventListener('scroll', (e) => {
        let CurrentScrollHeight = e.target.scrollTop
        let WindowHeight = window.innerHeight

        if ( CurrentScrollHeight > WindowHeight / 2) {
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
