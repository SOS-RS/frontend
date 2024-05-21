import { useState } from "react"
import { ArrowUp } from "lucide-react"


const BackToTop =() => {

    const [isVisible, setVisibility] = useState(false)

    const scrollToTop = () => {
        let root = document.getElementById('root')
        if (!root) {return}

        root.scrollTo({top:0, behavior:"smooth"})
        
    }

    document.getElementById("root")?.addEventListener('scroll', (e) => {
        if (e.target === null) {return}
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
    className=" fixed ease-in-out hidden sm:flex justify-center items-center duration-300 
    bg-red-600/75 focus:bg-red-700 hover:bg-red-700 z-[100] shadow-slate-600/75
    right-6 bottom-6 rounded-full shadow-md
    w-12 h-12 "
    onClick={scrollToTop}
    ><ArrowUp color="white" /></button>
));
}

export { BackToTop };
