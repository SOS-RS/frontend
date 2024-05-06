import { useEffect, useState } from 'react';
import { RotateCw, CircleAlert, Search, Loader } from 'lucide-react';

import { Alert, Header, ShelterListItem } from '@/components';
import { Input } from '@/components/ui/input';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';

const alertDescription =
  'Você pode consultar a lista de abrigos disponíveis e os itens que necessitam de doações.';

const Home = () => {
  const { data: shelters, loading, refresh } = useShelters();
  const [searchValue, setSearchValue] = useState<string>('');
  const [, setSearch] = useThrottle<string>(
    '',
    {
      throttle: 400,
      callback: (v) => {
        refresh({
          params: {
            search: `address:contains:${v},name:contains:${v}`,
            or: 'true',
          },
        });
      },
    },
    []
  );

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue, setSearch]);

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="SOS Rio Grande do Sul"
        endAdornment={
          <Button
            loading={loading}
            variant="ghost"
            size="sm"
            onClick={() => refresh()}
            className="disabled:bg-red-500 hover:bg-red-400"
          >
            <RotateCw size={20} className="stroke-white" />
          </Button>
        }
      />
      <div className="p-5 gap-3 flex flex-col w-full max-w-5xl">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Abrigos disponíveis
        </h1>
        <Alert
          description={alertDescription}
          startAdornment={<CircleAlert size={20} />}
        />
        <div className="relative">
          <Input
            placeholder="Buscar por abrigo ou endereço"
            className="h-[48px] text-sm font-medium text-[#8C94A4] pl-10 pr-4"
            onChange={(ev) => setSearchValue(ev.target.value)}
            value={searchValue}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search name="search" size="20" className="text-gray-400" />
          </div>
        </div>
        {/* <div className="[&_svg]:stroke-blue-500">
          <Button variant="ghost" size="sm" className="flex gap-2 items-center">
            <ListFilter className="h-5 w-5" />
            <h1 className="font-semibold text-[16px] text-blue-500">
              {' '}
              Filtros{' '}
            </h1>
          </Button>
        </div> */}
        <main className="flex flex-col gap-4 overflow-y-auto">
          {loading ? (
            <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
          ) : (
            shelters.results.map((s, idx) => (
              <ShelterListItem key={idx} data={s} />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export { Home };
