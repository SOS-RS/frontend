import { useState, forwardRef } from 'react';
import { IScrollToTopButton } from './types';
import { cn } from '@/lib/utils';

const ScrollToTopButton = forwardRef<HTMLButtonElement, IScrollToTopButton>(
  ({ className = '', ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setIsVisible(true);
      } else if (scrolled <= 300) {
        setIsVisible(false);
      }
    };

    const scrollToTop = () => {
      console.log('scroll top');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    window.addEventListener('scroll', toggleVisibility);

    return (
      <div className={cn('fixed bottom-24 right-8 hidden md:block', className)}>
        {isVisible && (
          <button
            ref={ref}
            onClick={scrollToTop}
            className=" w-16 p-4 text-lg font-bold text-black bg-white border-2 border-black rounded-full shadow-lg hover:bg-black hover:text-white"
            {...rest}
          >
            ↑
          </button>
        )}
      </div>
    );
  }
);

export { ScrollToTopButton };
