import { SearchX } from 'lucide-react';

const NoFoundSearch = () => {
  return (
    <div className='dark:flex dark:flex-col dark:justify-center dark:items-center dark:text-center p-8 gap-2'>
      <SearchX size={64} className='text-[#677183] dark:text-[#99a7b3]' />

      <h1 className='font-semibold text-[#2f2f2f] dark:text-[#c0c0c0] text-[18px]'>
        A sua busca não encontrou nenhum resultado{' '}
      </h1>

      <h1 className='font-medium text-[#677183] dark:text-[#b3b3b3] text-[14px]'>
        Verifique os termos buscados e tente novamente
      </h1>
    </div>
  );
};

export { NoFoundSearch };
