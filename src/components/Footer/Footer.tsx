import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { className = '', ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        'flex w-full flex-col md:flex-row py-8 md:py-4 px-2 md-p4 gap-3 justify-center flex-wrap items-center bg-red-600',
        className
      )}
    >
      <p className="text-white">
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
      <span className="text-white flex flex-nowrap gap-2 items-center">
        Projeto Open Source disponível em{' '}
        <a
          className="underline hover:text-gray-300 flex"
          href="https://github.com/SOS-RS"
          target="_blank"
        >
          Github
        </a>
        <Heart className="h-3 w-3 stroke-white fill-white" />
      </span>
    </div>
  );
});

export { Footer };
