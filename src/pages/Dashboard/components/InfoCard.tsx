import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface IInfoCard {
  totalAvaliable: number;
  totalCrowded: number;
  totalNoInformation: number;
}

const InfoCard = ({
  totalAvaliable,
  totalCrowded,
  totalNoInformation,
}: IInfoCard) => {
  const cardClass =
    'flex flex-col gap-2 justify-center text-center w-64 h-auto box-border border-2 rounded-xl border-gray-200 p-5';
  return (
    <div className={cardClass}>
      <p className="text-md font-bold">Disponibilidade dos abrigos</p>

      <div className="box-border rounded-xl border-2">
        <Link to={'/?search=&shelterStatus%5B0%5D=available'}>
          <div className="flex justify-between bg-green-300 pl-2">
            Disponíveis {totalAvaliable} <ChevronRight />
          </div>
        </Link>
        <Link to={'/?search=&shelterStatus%5B0%5D=unavailable'}>
          <div className="flex justify-between bg-red-300 pl-2">
            Lotados {totalCrowded} <ChevronRight />
          </div>
        </Link>
        <Link to={'/?search=&shelterStatus%5B0%5D=waiting'}>
          <div className="flex justify-between bg-gray-300 pl-2">
            Sem informação {totalNoInformation} <ChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export { InfoCard };
