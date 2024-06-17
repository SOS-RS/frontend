import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { className = '', ...rest } = props;

  return (
    <footer
      ref={ref}
      {...rest}
      className={cn(
        'md-p4 flex w-full flex-col flex-wrap items-center justify-center gap-3 bg-red-600 px-2 py-8 md:flex-row md:py-4',
        className,
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
      <span className="hidden text-white md:block">•</span>
      <span className="flex flex-nowrap items-center gap-2 text-white">
        Projeto Open Source disponível em{' '}
        <a
          className="flex underline hover:text-gray-300"
          href="https://github.com/SOS-RS"
          target="_blank"
        >
          Github
        </a>
        <Heart className="h-3 w-3 fill-white stroke-white" />
      </span>
    </footer>
  );
});

export { Footer };
