import { SearchX } from 'lucide-react';

const NoFoundSearch = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
      <SearchX size={64} className="text-[#677183]" />

      <h1 className="text-[18px] font-semibold text-[#2f2f2f]">
        A sua busca não encontrou nenhum resultado{' '}
      </h1>

      <h1 className="text-[14px] font-medium text-[#677183]">
        Verifique os termos buscados e tente novamente
      </h1>
    </div>
  );
};

export { NoFoundSearch };
