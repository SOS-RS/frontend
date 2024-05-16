import { Fragment, useCallback, useContext } from 'react';
import {
  CircleHelp,
  CirclePlus,
  DoorOpen,
  Info,
  LinkIcon,
  Menu,
} from 'lucide-react';

import { SessionServices } from '@/service';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BurguerMenuItem } from './components';
import { Separator } from '../ui/separator';
import { SessionContext } from '@/contexts';
import { usePartners } from '@/hooks';

const BurgerMenu = () => {
  const { session } = useContext(SessionContext);
  const { data: partners } = usePartners();

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
    <Sheet>
      <SheetTrigger>
        <Menu color="white" className="ml-2 mr-2" />
      </SheetTrigger>
      <SheetContent side="left" className="pt-[96px] flex flex-col">
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
            link="/sobre"
            icon={<Info className="w-4 h-4" />}
          />
          <BurguerMenuItem
            label="Cadastrar abrigo"
            link="https://forms.gle/2S7L2gR529Dc8P3T9"
            icon={<CirclePlus className="w-4 h-4" />}
          />
          <BurguerMenuItem
            label="Como Ajudar"
            link="https://www.instagram.com/reel/C613CfGuh4b"
            icon={<CircleHelp className="w-4 h-4" />}
          />
          <BurguerMenuItem
            label="Política de Privacidade"
            link="/politica-privacidade"
            icon={<Info className="w-4 h-4" />}
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
                  icon={<LinkIcon className="w-4 h-4" />}
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
