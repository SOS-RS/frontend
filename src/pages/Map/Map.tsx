import { ChevronLeft, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header, VerifiedBadge } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelters } from '@/hooks';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { getAvailabilityProps } from '@/lib/utils';

const MapComponent = () => {
  const navigate = useNavigate();
  const { allSheltersData  } = useShelters({getAllShelters: true});
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
    
  }, [])


  return (


    <div className="flex flex-col h-screen items-center">
      <Header
        title="Mapa de abrigos"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="p-4 flex flex-col max-w-5xl w-full gap-3 items-start h-full">
        <p>Abrigos com coordenadas cadastradas</p>
        <MapContainer 
          center={userLocation || [-29.89020757796022, -51.14125020208303]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Você está aqui</Popup>
              </Marker>
            )}
            {allSheltersData?.map((item) => {
              const shelterItemProps = getAvailabilityProps(item.capacity, item.shelteredPeople);
              if (item.latitude && item.longitude) {
                return (
                  <Marker key={item.id} position={[parseFloat(item.latitude), parseFloat(item.longitude)]}>
                    <Popup>
                      <div className='flex flex-col gap-4 p-1' >
                        <div>
                          <div className='font-semibold'>{item.name}</div>
                          {item.address}
                        </div>
                        <div aria-label='ete'>
                          {item.petFriendly && <PawPrint size={20}/>}
                          {item.verified && <VerifiedBadge />}
                        </div>
                        <div className={shelterItemProps.className}>
                          {shelterItemProps.availability}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
        </MapContainer>
      </div>
    </div>
  );
};

export { MapComponent };
