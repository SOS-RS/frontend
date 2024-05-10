import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <div className="w-full flex-col md:flex-row py-4 md:py-4 px-2 md-p4 flex gap-3 justify-center flex-wrap items-center bg-red-600">
      <p className="text-white text-xs md:text-sm">
        Para cadastrar novos abrigos clique{' '}
        <a
          href="https://forms.gle/2S7L2gR529Dc8P3T9"
          className="underline hover:text-gray-300"
          target="_blank"
        >
          aqui
        </a>
      </p>
      <span className="text-white hidden md:block">•</span>
      <p className="text-white flex flex-nowrap gap-2 items-center text-xs md:text-sm">
        Projeto Open Source disponível em{' '}
        <a
          className="underline hover:text-gray-300 flex"
          href="https://github.com/SOS-RS"
          target="_blank"
        >
          Github
        </a>
        <Heart className="h-3 w-3 stroke-white fill-white" />
      </p>
    </div>
  );
}
