import { BurgerMenu, Header, LoadingScreen } from '@/components';
import WithTooltip from '@/components/ui/with-tooltip';
import { useSupporters } from '@/hooks';
import { Link } from 'react-router-dom';

const Supporters = () => {
  const { data: supporters, loading } = useSupporters();

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex h-screen flex-col items-center overflow-auto bg-gray-50">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="flex w-full max-w-5xl flex-col gap-4 p-4 pb-8">
        <h2 className="pt-4 text-4xl font-semibold !text-zinc-900">
          Apoiadores do projeto
        </h2>
        <div className="mt-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {supporters
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((supporter, idx) => (
              <Link key={idx} to={supporter.link}>
                <WithTooltip content={supporter.name}>
                  <div className="flex aspect-square w-full flex-col justify-between gap-2 rounded-md bg-white p-4 shadow-sm hover:cursor-pointer hover:border-text">
                    <div
                      style={{
                        backgroundImage: `url('${supporter.imageUrl}')`,
                      }}
                      className="w-full flex-1 bg-contain bg-center bg-no-repeat"
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
