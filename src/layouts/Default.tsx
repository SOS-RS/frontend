import { Header, Footer } from '@/components';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { ArrowUp, LogOutIcon } from 'lucide-react';
import { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  const {
    loading: loadingSession,
    refreshSession,
    session,
  } = useContext(SessionContext);

  const contentContaineRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (contentContaineRef.current) {
      contentContaineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen max-h-screen overflow-y-hidden">
      <Header
        title="SOS Rio Grande do Sul"
        endAdornment={
          <div className="flex gap-2 items-center">
            {session && (
              <h3 className="text-gray-300 font-thin">
                Bem vindo, {session.name}
              </h3>
            )}
            {session && (
              <Button
                loading={loadingSession}
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  refreshSession();
                }}
                className="disabled:bg-red-500 hover:bg-red-400"
              >
                <LogOutIcon size={20} className="stroke-white" />
              </Button>
            )}
          </div>
        }
      />

      <button
        className="fixed bottom-24 md:bottom-20 right-4 md:right-8 size-12 md:size-14 rounded-full bg-red-600 flex items-center justify-center opacity-30 hover:opacity-100 transition-all duration-200 z-50"
        onClick={scrollToTop}
      >
        <ArrowUp className="stroke-white" />
      </button>

      <main className="h-full min-h-full overflow-y-auto">
        <div ref={contentContaineRef} className="container mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
