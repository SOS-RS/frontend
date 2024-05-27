import { Cookie } from "lucide-react"
import { useState } from "react"

const CookiesWarning = () => {
  const [BoxVisibility, setBoxVisibility] = useState(!localStorage.getItem("cache:/partners?") ? false : true)
  // the logic above seeks a cached key on the user browser.
  // if we do not find a cached item, there is a high likelyhood that we are dealing with a new user.
  // so we show this banner.
  //
  // otherwise its an old user.
  //




  return (BoxVisibility &&
    <div className=" absolute flex flex-col justify-evenly bg-white shadow-lg  shadow-slate-800 border-2 rounded-t-lg z-20 w-full sm:w-96 h-48 bottom-0 pl-8 pt-2 px-4 mx-auto sm:right-16">

      <h2 className="flex font-bold align-bottom gap-2 text-lg items-center"> Nós usamos cookies <Cookie /> </h2>

      <main className="text-sm pb-4 text-slate-600">
        Usamos cookies para segurança e melhor experiência de utilização.
        Ao navegar você aceita a nossa <a className="font-bold underline hover:text-slate-700"
          href="/politica-de-privacidade">política de privacidade</a>.
      </main>

      <button
        className="bg-red-600 text-white hover:bg-red-700 rounded-full p-3 w-64 self-center  "
        onClick={() => { setBoxVisibility(false) }} >
        Aceito
      </button>

    </div>)
}

export { CookiesWarning }

