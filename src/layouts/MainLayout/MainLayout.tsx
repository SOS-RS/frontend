import { Footer, Header } from '@/components';
import { IHeader } from '@/components/Header/types';

type IMainLayout = {
  children: React.ReactNode;
  header: Pick<IHeader, 'title' | 'startAdornment' | 'endAdornment'>;
};
const MainLayout = ({ header, children }: IMainLayout) => {
  return (
    <div className="flex flex-col h-screen items-center">
      <Header {...header} />
      {children}
      <Footer />
    </div>
  );
};

export { MainLayout };
