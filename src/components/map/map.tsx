import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { CombinedOfferType, FullOfferType, OfferType } from '../../types/offer';
import { City } from '../../constants/city';

type MapProps = {
  city: City;
  offers: CombinedOfferType[];
  selectedOffer: OfferType | null | FullOfferType;
  height: string;
  width: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({city, offers, selectedOffer, height, width}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

        if (offer.location.latitude === selectedOffer?.location.latitude &&
        offer.location.longitude === selectedOffer?.location.longitude) {
          marker.setIcon(currentCustomIcon);
        }
      });

      map.flyTo(
        [
          city.lat,
          city.lng,
        ],
        city.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city]);

  return (
    <div style={{height: height, minHeight: '500px', width: width, maxWidth: '1144px', margin: '0 auto'}} ref={mapRef}></div>
  );
}

export default Map;
