import React, { Fragment, useEffect, useState } from 'react';
import { CircleAlert, ListFilter, Loader } from 'lucide-react';

import {
  Alert,
  NoFoundSearch,
  SearchInput,
  ShelterListItem,
} from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IShelterListViewProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MarkerData } from '../../types';
import { LatLngExpression } from 'leaflet';
import { Map } from '@/components/Map';
import { UserLocationControl } from '@/components/UserLocationControl';
import { CircleMarker, Marker, Popup } from 'react-leaflet';

const ShelterListView = React.forwardRef<HTMLDivElement, IShelterListViewProps>(
  (props, ref) => {
    const {
      count,
      data,
      loading = false,
      searchValue = '',
      hasMoreItems = false,
      onSearchValueChange,
      onFetchMoreData,
      onSelectShelter,
      className = '',
      onOpenModal,
      onClearSearch,
      ...rest
    } = props;

    const { location, success, metersToPixels } = useGeolocation();
    const [searchParams] = useSearchParams();
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [userMarker, setUserMarker] = useState<MarkerData | null>();
    const [mapCenter, setMapCenter] = useState<LatLngExpression>([
      -30.033081, -51.256996,
    ]);
    const [mapZoom, setMapZoom] = useState<number>(9);

    useEffect(() => {
      const { latitude, longitude, accuracy } = location;
      if (latitude && longitude) {
        setUserMarker({
          position: [latitude, longitude],
          label: 'Você está aqui',
          accuracy: metersToPixels(accuracy ?? 1, latitude, mapZoom),
        });

        if (success) {
          setMapCenter([latitude, longitude]);
          setMapZoom(15);
        }
      }
    }, [success, location]);

    useEffect(() => {
      if (data.length) {
        const markers: MarkerData[] = data
          .filter((value) => value.latitude && value.longitude)
          .map((value) => ({
            position: [
              parseFloat(value.latitude!),
              parseFloat(value.longitude!),
            ],
            label: value.name,
          }));
        setMarkers(markers);
      }
    }, [data]);

    return (
      <div className={cn(className, 'flex flex-col gap-2')}>
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Abrigos disponíveis ({count})
        </h1>
        <Alert
          description="Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações."
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
        <SearchInput
          value={searchValue}
          onChange={(ev) =>
            onSearchValueChange
              ? onSearchValueChange(ev.target.value ?? '')
              : undefined
          }
        />
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center text-blue-500 hover:text-blue-600 active:text-blue-700"
            onClick={onOpenModal}
          >
            <ListFilter className="h-5 w-5 stroke-blue-500" />
            Filtros
          </Button>
          {searchParams.toString() && (
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-2 items-center text-blue-500 hover:text-blue-600 active:text-blue-700"
              onClick={onClearSearch}
            >
              <CircleAlert className="h-5 w-5 stroke-blue-500" />
              Limpar Filtros
            </Button>
          )}
        </div>
        <main ref={ref} className="flex flex-col gap-4" {...rest}>
          {loading ? (
            <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
          ) : data.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              <div>
                <Map center={mapCenter} zoom={mapZoom}>
                  <UserLocationControl
                    position="topright"
                    location={location}
                    disabled={!location.latitude || !location.longitude}
                  />
                  {markers.map((v) => (
                    <Marker position={v.position}>
                      <Popup>{v.label}</Popup>
                    </Marker>
                  ))}
                  {userMarker?.position ? (
                    <Fragment>
                      <Marker position={userMarker.position}>
                        <Popup>{userMarker.label}</Popup>
                      </Marker>
                      <CircleMarker
                        center={userMarker.position}
                        radius={userMarker.accuracy ?? 1}
                      />
                    </Fragment>
                  ) : null}
                </Map>
              </div>
              {data.map((s, idx) => (
                <ShelterListItem
                  key={idx}
                  data={s}
                  onClick={() =>
                    onSelectShelter ? onSelectShelter(s) : undefined
                  }
                />
              ))}
              {hasMoreItems ? (
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700"
                  size="sm"
                  loading={loading}
                  onClick={onFetchMoreData}
                >
                  Carregar mais
                </Button>
              ) : (
                <p className="text-muted-foreground font-semibold">
                  Não há mais registros
                </p>
              )}
            </Fragment>
          )}
        </main>
      </div>
    );
  }
);

export { ShelterListView };
