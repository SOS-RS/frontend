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
import clsx from 'clsx';

import { SessionServices } from '@/service';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BurguerMenuItem } from './components';
import { Separator } from '../ui/separator';
import { SessionContext } from '@/contexts';
import { usePartners } from '@/hooks';
import { ToggleThemeButton } from '@/components';

const BurgerMenu = (props: IBurgerMenu) => {
	const { session } = props;
	const partnerLinks: IPartnerLink[] = [];
	const logout = () => {
		localStorage.removeItem('token');
		window.location.href = '/';
	};
  const {theme}= useTheme()
	return (
		<Sheet>
			<SheetTrigger>
				<Menu color='white' className='ml-2 mr-2' />
			</SheetTrigger>
			<SheetContent side={'left'} className='pt-[96px] flex flex-col'>
				<div className='flex'>
					<ul className='flex flex-col text-base'>
						{session ? (
							<li className='inline-flex items-center mb-5'>
								<User className='mr-2' />
								Olá, {session.name}
							</li>
						) : (
							<Link to={'/entrar'} className='hover:font-semibold'>
								<li className='inline-flex items-center mb-5'>
									<DoorClosed className='mr-2' />
									Entrar
								</li>
							</Link>
						)}
						<Link
							to={'https://forms.gle/2S7L2gR529Dc8P3T9'}
							target='_blank'
							className='hover:font-semibold'
						>
							<li className='inline-flex items-center mb-5'>
								<CirclePlus className='mr-2' />
								Cadastrar Abrigo
							</li>
						</Link>
						<Link
							to={'https://www.instagram.com/reel/C613CfGuh4b'}
							target='_blank'
							className='hover:font-semibold'
						>
							<li className='inline-flex items-center mb-5'>
								<CircleHelp className='mr-2' />
								Como Ajudar
							</li>
						</Link>
            <li className='inline-flex items-center mb-5 gap-2'>
              <ToggleThemeButton /> 
              Mudar Tema
            </li>
					</ul>
          

					{!!partnerLinks.length && (
						<>
							<div className='mt-5 text-sm text-gray-500'>Links Úteis</div>
							<ul className='flex flex-col text-base'>
								{partnerLinks.map((link, index) => (
									<Link
										key={index}
										to={link.url}
										target='_blank'
										className='hover:font-semibold'
									>
										<li className='inline-flex items-center mt-5'>
											<LinkIcon className='mr-2' />
											{link.name}
										</li>
									</Link>
								))}
							</ul>
						</>
					)}
				</div>
				{session && (
					<div className='mt-auto mb-8'>
						<span
							className='inline-flex items-center hover:font-semibold cursor-pointer'
							onClick={logout}
						>
							<DoorOpen className='mr-2' /> Sair
						</span>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};

export { BurgerMenu };
