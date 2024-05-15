import { IShelterMapProps } from './types';

const ShelterMap = (props: IShelterMapProps) => {
  const encodedAddress = encodeURIComponent(props.address);

  return (
    <iframe
      height="600"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }
      &q=${encodedAddress}`}
    ></iframe>
  );
};

export { ShelterMap };
