import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setVisibility] = useState(false);

  const scrollToTop = () => {
    const root = document.getElementById('root');
    if (!root) {
      return;
    }

    root.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.getElementById('root')?.addEventListener('scroll', (e) => {
    if (e.target === null) {
      return;
    }
    const CurrentScrollHeight = (e.target as HTMLElement).scrollTop;
    const WindowHeight = window.innerHeight;

    if (CurrentScrollHeight > WindowHeight / 2) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  });

  return (
    isVisible && (
      <button
        className="fixed bottom-6 right-6 z-[100] hidden h-12 w-12 items-center justify-center rounded-full bg-red-600/75 shadow-md shadow-slate-600/75 duration-300 ease-in-out hover:bg-red-700 focus:bg-red-700 sm:flex"
        onClick={scrollToTop}
      >
        <ArrowUp color="white" />
      </button>
    )
  );
};

export { BackToTop };
