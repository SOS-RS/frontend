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
  X,
} from 'lucide-react';

import { SessionServices } from '@/service';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BurguerMenuItem } from './components';
import { Separator } from '../ui/separator';
import { SessionContext } from '@/contexts';
import { usePartners } from '@/hooks';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';

const MENU_ITEMS = [
  {
    label: 'Sobre nós',
    link: '/sobre-nos',
    icon: <Info className="w-5 h-5" />,
  },
  {
    label: 'Cadastrar abrigo',
    link: 'https://forms.gle/2S7L2gR529Dc8P3T9',
    icon: <CirclePlus className="w-5 h-5" />,
    openExternal: true,
  },
  {
    label: 'Canal de Denúncias',
    link: 'https://contatoseguro.com.br/sos_rs',
    icon: <ShieldAlert className="w-5 h-5" />,
    openExternal: true,
  },
  {
    label: 'Como Ajudar',
    link: 'https://www.instagram.com/reel/C613CfGuh4b',
    icon: <CircleHelp className="w-5 h-5" />,
    openExternal: true,
  },
  {
    label: 'Política de Privacidade',
    link: '/politica-de-privacidade',
    icon: <Info className="w-5 h-5" />,
  },
  {
    label: 'Apoiadores',
    link: '/apoiadores',
    icon: <HeartHandshake className="w-5 h-5" />,
  },
];

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
      <SheetContent side="left" className="pt-[96px] flex flex-col z-[90]">
        <DialogFooter className="absolute top-16 right-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <X className="stroke-muted-foreground" />
            </Button>
          </DialogClose>
        </DialogFooter>
        <div className="flex flex-col gap-4">
          {session && (
            <Fragment>
              <div className="inline-flex items-center text-semibold">
                Olá, {session.name}
              </div>
              <Separator />
            </Fragment>
          )}
          {MENU_ITEMS.map((item) => (
            <BurguerMenuItem
              key={item.label}
              label={item.label}
              link={item.link}
              icon={item.icon}
              openExternal={item.openExternal}
            />
          ))}
          <Separator />
          {partners.length > 0 && (
            <Fragment>
              <span>Parcerias</span>
              {partners.map((partner) => (
                <BurguerMenuItem
                  key={partner.id}
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
