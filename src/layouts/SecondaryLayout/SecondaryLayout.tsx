import { Header } from '@/components';
import { IHeader } from '@/components/Header/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

type ISecondaryLayout = {
  header: Pick<IHeader, 'title'>;
  onBackClick?: () => void;
  children: React.ReactNode;
};

const SecondaryLayout = ({
  header,
  onBackClick,
  children,
}: ISecondaryLayout) => {
  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
        title={header.title}
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => onBackClick?.()}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      {children}
    </div>
  );
};

export { SecondaryLayout };
