import {
  EmailIcon,
  EmailShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramShareButton,
  TelegramIcon,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import { Label } from '../ui/label';
import { Card } from '../ui/card';

const Share = () => {
  const sharedUrl = String(window?.location);
  if (!sharedUrl) return null;

  const shareButtons = [
    { Component: WhatsappShareButton, Icon: WhatsappIcon },
    { Component: EmailShareButton, Icon: EmailIcon },
    { Component: TwitterShareButton, Icon: TwitterIcon },
    { Component: TelegramShareButton, Icon: TelegramIcon },
    { Component: InstapaperShareButton, Icon: InstapaperIcon },
    { Component: LinkedinShareButton, Icon: LinkedinIcon },
  ];

  return (
    <div className="p-4">
      <Card className="flex flex-col gap-4 p-4 w-80">
        <Label>Compartilhar</Label>
        <div className="flex gap-4">
          {shareButtons.map(({ Component, Icon }, index) => (
            <Component key={index} url={sharedUrl}>
              <Icon size={32} round />
            </Component>
          ))}
        </div>
      </Card>
    </div>
  );
};

export { Share };
