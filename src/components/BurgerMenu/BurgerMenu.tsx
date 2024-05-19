import { Fragment, useCallback, useContext } from 'react';
import {
  CircleHelp,
  CirclePlus,
  DoorOpen,
  HeartHandshake,
  Info,
  LinkIcon,
  Menu,
  ShieldAlert,
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
        <Menu color="white" className="mx-2" />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col pt-[96px]">
        <div className="flex flex-col gap-4">
          {session && (
            <Fragment>
              <div className="text-semibold inline-flex items-center">
                Olá, {session.name}
              </div>
              <Separator />
            </Fragment>
          )}
          <BurguerMenuItem
            label="Sobre nós"
            link="/sobre-nos"
            icon={<Info className="size-5" />}
          />
          <BurguerMenuItem
            label="Cadastrar abrigo"
            link="https://forms.gle/2S7L2gR529Dc8P3T9"
            icon={<CirclePlus className="size-5" />}
            openExternal={true}
          />
          <BurguerMenuItem
            label="Canal de Denúncias"
            link="https://contatoseguro.com.br/sos_rs"
            icon={<ShieldAlert className="size-5" />}
            openExternal={true}
          />
          <BurguerMenuItem
            label="Como Ajudar"
            link="https://www.instagram.com/reel/C613CfGuh4b"
            icon={<CircleHelp className="size-5" />}
            openExternal={true}
          />
          <BurguerMenuItem
            label="Política de Privacidade"
            link="/politica-de-privacidade"
            icon={<Info className="size-5" />}
          />
          <BurguerMenuItem
            label="Apoiadores"
            link="/apoiadores"
            icon={<HeartHandshake className="size-5" />}
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
                  icon={<LinkIcon className="size-4" />}
                />
              ))}
            </Fragment>
          )}
        </div>
        {session && (
          <div className="mt-auto">
            <span
              className="inline-flex cursor-pointer items-center hover:font-semibold"
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
