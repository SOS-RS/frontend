import { SearchX } from 'lucide-react';

const NoFoundSearch = () => {
  return (
    <article className="flex flex-col justify-center items-center text-center p-8 gap-2">
      <SearchX size={64} className="text-[#677183]" />

      <h2 className="text-[#2f2f2f] font-semibold text-[18px]">
        A sua busca não encontrou nenhum resultado{' '}
      </h2>

      <h3 className="font-medium text-[#677183] text-[14px]">
        Verifique os termos buscados e tente novamente
      </h3>
    </article>
  );
};

export { NoFoundSearch };
