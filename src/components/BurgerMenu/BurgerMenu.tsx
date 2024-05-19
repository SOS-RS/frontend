import { Fragment, useCallback, useContext, useState } from 'react';
import {
  CircleHelp,
  CirclePlus,
  DoorOpen,
  HeartHandshake,
  Info,
  LinkIcon,
} from 'lucide-react';
import { Squash as Hamburger } from 'hamburger-react'

import { SessionServices } from '@/service';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BurguerMenuItem } from './components';
import { Separator } from '../ui/separator';
import { SessionContext } from '@/contexts';
import { usePartners } from '@/hooks';

const BurgerMenu = () => {
  const { session } = useContext(SessionContext);
  const { data: partners } = usePartners();
  const [isOpen, setOpen] = useState(false)

  const logout = useCallback(() => {
    SessionServices.logout()
      .then(() => {
        localStorage.removeItem('token');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(`Erro ao realizar logout: ${err}`);
      });
  }, []);

  return (
    <Sheet modal={false} onOpenChange={() => setOpen(!isOpen)}>
      <SheetTrigger>
        <Hamburger color='#fff' size={20} toggled={isOpen}/>
      </SheetTrigger>
      <SheetContent side="left" className="pt-[30px] flex flex-col absolute top-[56px] h-screen">
        <div className="flex flex-col gap-4">
          {session && (
            <Fragment>
              <div className="inline-flex items-center text-semibold">
                Olá, {session.name}
              </div>
              <Separator />
            </Fragment>
          )}
          <BurguerMenuItem
            label="Sobre nós"
            link="/sobre-nos"
            icon={<Info className="w-5 h-5" />}
          />
          <BurguerMenuItem
            label="Cadastrar abrigo"
            link="https://forms.gle/2S7L2gR529Dc8P3T9"
            icon={<CirclePlus className="w-5 h-5" />}
          />
          <BurguerMenuItem
            label="Como Ajudar"
            link="https://www.instagram.com/reel/C613CfGuh4b"
            icon={<CircleHelp className="w-5 h-5" />}
          />
          <BurguerMenuItem
            label="Política de Privacidade"
            link="/politica-de-privacidade"
            icon={<Info className="w-5 h-5" />}
          />
          <BurguerMenuItem
            label="Apoiadores"
            link="/apoiadores"
            icon={<HeartHandshake className="w-5 h-5" />}
          />
          <Separator />
          {partners.length > 0 && (
            <Fragment>
              <span>Parcerias</span>
              {partners.map((partner, idx) => (
                <BurguerMenuItem
                  key={idx}
                  label={partner.name}
                  link={partner.link}
                  icon={<LinkIcon className="w-5 h-5" />}
                />
              ))}
            </Fragment>
          )}
        </div>
        {session && (
          <div className="mt-auto">
            <span
              className="inline-flex items-center hover:font-semibold cursor-pointer"
              onClick={logout}
            >
              <DoorOpen className="mr-2" /> Sair
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export { BurgerMenu };
