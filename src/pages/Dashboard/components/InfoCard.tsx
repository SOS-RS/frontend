import { Link } from 'react-router-dom';

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
      <p className="font-bold text-md">Disponibilidade dos abrigos</p>

      <div className="box-border border-2 rounded-xl ">
        <Link to={''}>
          <div className="w-full bg-green-300">
            Disponíveis {totalAvaliable}
          </div>
        </Link>
        <Link to={''}>
          <div className="bg-red-300">Lotados {totalCrowded}</div>
        </Link>
        <Link to={''}>
          <div className="bg-gray-300">Sem informação {totalNoInformation}</div>
        </Link>
      </div>
    </div>
  );
};

export { InfoCard };
