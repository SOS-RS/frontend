import { Footer, Header } from '@/components';

type MainLayoutProps = {
  children: React.ReactNode;
  header: {
    title: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };
};
const MainLayout = ({ header, children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col h-screen items-center">
      <Header {...header} />
      {children}
      <Footer />
    </div>
  );
};

export { MainLayout };
