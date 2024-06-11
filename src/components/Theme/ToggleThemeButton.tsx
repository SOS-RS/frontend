import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/contexts/ThemeProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ToggleThemeButton = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center cursor-pointer [&_svg]:stroke-zinc-500 hover:font-semibold">
          <Sun className="mr-2 w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="mr-2 absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
          <div>
            Mudar tema
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Padrão do Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ToggleThemeButton }
