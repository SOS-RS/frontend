import { Button } from '../ui/button';
import { Crosshair } from 'lucide-react';
import { POSITION_CLASSES, UserLocationControlProps } from './types';
import { useMap } from 'react-leaflet';

const UserLocationControl = (props: UserLocationControlProps) => {
  const map = useMap();
  const {
    position,
    location: { latitude, longitude },
    disabled,
  } = props;
  const positionClass = POSITION_CLASSES[position];

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-2 items-center"
          onClick={() => {
            if (latitude && longitude) {
              map.panTo([latitude, longitude]);
              map.setZoom(15);
            }
          }}
          disabled={disabled}
        >
          <Crosshair className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export { UserLocationControl };
