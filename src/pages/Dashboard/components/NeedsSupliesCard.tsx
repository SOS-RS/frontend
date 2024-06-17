import { ISuppliesCategories } from '@/hooks/useDashboard/types';
import { Link } from 'react-router-dom';

export interface INeedsSupliesCard {
  catergories?: ISuppliesCategories[];
}

const NeedsSuppliesCard = ({ catergories }: INeedsSupliesCard) => {
  const cardClass =
    'flex flex-col justify-between text-center w-56 h-auto box-border border-2 rounded-xl border-gray-200';
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {catergories?.map((categorie) => (
        <div className={cardClass}>
          <Link
            to={`/?search=&supplyCategoryIds%5B0%5D=${categorie.categoryId}`}
          >
            <p className="text-md px-2 py-8 font-bold">
              {categorie.categoryName}
            </p>
          </Link>

          <div className="box-border flex rounded-xl border-2">
            <div className="flex h-10 w-full items-center justify-center border-r-2">
              <Link to={'/?search=&priority=100'}>
                <p className="text-center text-red-300">
                  {categorie.priority100}
                </p>
              </Link>
            </div>

            <div className="flex h-10 w-full items-center justify-center border-r-2">
              <Link to={'/?search=&priority=10'}>
                <p className="text-center text-orange-300">
                  {categorie.priority10}
                </p>
              </Link>
            </div>

            <div className="flex h-10 w-full items-center justify-center">
              <Link to={'/?search=&priority=1'}>
                <p className="text-center text-green-300">
                  {categorie.priority1}
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { NeedsSuppliesCard };
