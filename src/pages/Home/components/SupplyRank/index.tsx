import { Chip } from '@/components';
import { useSupplyRank } from '@/hooks/useSupplyRank/useSupplyRank';
import { Loader } from 'lucide-react';

export const SupplyRank = () => {
  const { data: supplyRankRows, loading } = useSupplyRank();

  console.log(supplyRankRows)
  return (
    <div className="my-2">
      <h2 className="text-[#2f2f2f] font-semibold text-xl">
        Confira quais itens os abrigos mais necessitam:
      </h2>
      {loading ? (
        <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
      ) : (
        <div className="flex gap-2 flex-wrap">
          {supplyRankRows.map((rankRow, idx) => (
            <Chip
              className={'bg-light-red'}
              key={idx}
              label={`${rankRow.name} (${rankRow.amount})`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
