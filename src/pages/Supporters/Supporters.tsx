import { BurgerMenu, Header, LoadingScreen } from '@/components';
import { useSupporters } from '@/hooks';

const Supporters = () => {
  const { data: supporters, loading } = useSupporters();

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col h-screen items-center">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="flex flex-col gap-4 p-4 max-w-4xl pb-8 w-full">
        <h3 className="text-4xl font-semibold">Apoiadores do projeto</h3>
        <div className="flex flex-wrap">
          {supporters.map((supporter, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-4 w-full max-w-[30%] max-h-64 aspect-square border-2 border-border rounded-md hover:bg-zinc-200"
            >
              <h3 className="font-medium">{supporter.name}</h3>
              <div
                style={{ backgroundImage: `url('${supporter.imageUrl}')` }}
                className="bg-center h-full w-full bg-contain bg-no-repeat"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Supporters };
