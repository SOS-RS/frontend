import { Loader } from 'lucide-react';
import { cva } from 'class-variance-authority';

import { ILoadingScreen } from './types';

const LoadingScreen = (props: ILoadingScreen) => {
  const { variant = 'full', className, ...rest } = props;

  const variants = cva(
    'z-50 flex min-h-screen w-full items-center justify-center bg-zinc-800 opacity-60',
    {
      variants: {
        variant: {
          full: 'absolute inset-0',
          content: 'w-full',
        },
      },
      defaultVariants: {
        variant: 'full',
      },
    }
  );

  return (
    <div {...rest} className={variants({ className, variant })}>
      <Loader className="h-15 w-15 animate-spin stroke-white" />
    </div>
  );
};

export { LoadingScreen };
