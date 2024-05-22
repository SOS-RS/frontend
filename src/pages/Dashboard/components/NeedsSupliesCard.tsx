import { ISuppliesCategories } from '@/hooks/useDashboard/types';

export interface INeedsSupliesCard {
  catergories?: ISuppliesCategories[];
}

const NeedsSuppliesCard = ({ catergories }: INeedsSupliesCard) => {
  const cardClass =
    'flex flex-col justify-between text-center w-56 h-auto box-border border-2 rounded-xl border-gray-200';
  return (
    <div className="grid gap-4 grid-cols-4 p-6">
      {catergories?.map((categorie) => (
        <div className={cardClass}>
          <p className="font-bold text-md py-8  px-2">{categorie.name}</p>

          <div className="flex box-border border-2 rounded-xl">
            <div className="w-full h-10">
              <p className="text-center text-green-300">
                {categorie.sheltersRequesting.length}
              </p>
            </div>

            <div className="w-full bg-red-300 h-10">120</div>

            <div className="w-full bg-gray-300 h-10">
              {categorie.sheltersWithSupplies.length}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { NeedsSuppliesCard };
