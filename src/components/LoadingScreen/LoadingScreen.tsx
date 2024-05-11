import { Loader } from 'lucide-react';
import { cva } from 'class-variance-authority';

import { ILoadingScreen } from './types';

const LoadingScreen = (props: ILoadingScreen) => {
  const { variant = 'full', className, ...rest } = props;

  const variants = cva(
    'bg-zinc-800 opacity-60 w-full flex items-center justify-center min-h-screen z-50',
    {
      variants: {
        variant: {
          full: 'absolute top-0 right-0 bottom-0 left-0',
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
      <Loader className="animate-spin h-15 w-15 stroke-white" />
    </div>
  );
};

export { LoadingScreen };
