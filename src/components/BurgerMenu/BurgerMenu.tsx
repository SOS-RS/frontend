import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IBurgerMenu } from "./types";
import { forwardRef } from "react";
import { CircleHelp, CirclePlus, Link as LinkIcon, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const BurgerMenu = forwardRef<HTMLDivElement, IBurgerMenu>((props) => {
  return (
    <Sheet>
      <SheetTrigger><Menu color="white" className="ml-2 mr-2" /></SheetTrigger>
      <SheetContent side={"left"} style={{ marginTop: 56 }}>
        <SheetDescription className="ml-2 pt-7">
          <ul className="flex flex-col text-base">
            <Link to={"https://forms.gle/2S7L2gR529Dc8P3T9"} target="_blank" className="hover:font-semibold">
              <li className="inline-flex items-center mb-5"><CirclePlus className="mr-2" />Cadastrar Abrigo</li>
            </Link>
            <Link to={"https://www.instagram.com/reel/C613CfGuh4b"} target="_blank" className="hover:font-semibold">
              <li className="inline-flex items-center mb-5"><CircleHelp className="mr-2" />Como Ajudar</li>
            </Link>
          </ul>
          <div className="mt-5 text-sm text-gray-500">Links Úteis</div>
          <ul className="flex flex-col text-base">
            <Link to={"https://forms.gle/2S7L2gR529Dc8P3T9"} target="_blank" className="hover:font-semibold">
              <li className="inline-flex items-center mt-5"><LinkIcon className="mr-2" />Link Projeto Parceiro</li>
            </Link>
          </ul>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
});

export { BurgerMenu };
