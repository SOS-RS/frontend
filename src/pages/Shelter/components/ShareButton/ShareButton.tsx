import { useRef } from 'react';
import { Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ShareButton() {
  const urlRef = useRef(null);

  const copyToClipboard = () => {
    urlRef.current.select();
    document.execCommand('copy');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Share2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Compartilhar</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Button variant="outline" onClick={copyToClipboard}>
              <Label htmlFor="url" className="text-right">
                Copiar link
              </Label>
            </Button>
            <Input
              id="url"
              defaultValue={window.location.href}
              className="col-span-2"
              readOnly={true}
              ref={urlRef}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <a
              href={`https://wa.me/?text=${window.location.href}`}
              target="_blank"
            >
              <Button>WhatsApp</Button>
            </a>
            <a
              href={`https://telegram.me/share/url?url=${window.location.href}`}
              target="_blank"
            >
              <Button>Telegram</Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
