import { ChevronLeft } from 'lucide-react';

import { Header } from '@/components';

const ShelterItem = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Escola Rodrigo de Castro"
        startAdornment={<ChevronLeft size={20} />}
      />
      <div className="p-4 flex flex-col"></div>
    </div>
  );
};

export { ShelterItem };
