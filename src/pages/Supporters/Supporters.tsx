import { BurgerMenu, Header, LoadingScreen } from '@/components';
import WithTooltip from '@/components/ui/with-tooltip';
import { useSupporters } from '@/hooks';
import { Link } from 'react-router-dom';

const Supporters = () => {
  const { data: supporters, loading } = useSupporters();

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col h-screen items-center bg-gray-50 overflow-auto">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="flex flex-col gap-4 p-4 max-w-5xl pb-8 w-full">
        <h2 className="text-4xl pt-4 font-semibold !text-zinc-900">
          Apoiadores do projeto
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 md:gap-8 mt-8">
          {supporters
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((supporter, idx) => (
              <Link key={idx} to={supporter.link}>
                <WithTooltip content={supporter.name}>
                  <div className="bg-white flex flex-col gap-2 w-full aspect-square p-4 justify-between shadow-sm rounded-md hover:border-text hover:cursor-pointer">
                    <div
                      style={{
                        backgroundImage: `url('${supporter.imageUrl}')`,
                      }}
                      className="flex-1 bg-center w-full bg-contain bg-no-repeat"
                    />
                  </div>
                </WithTooltip>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export { Supporters };
