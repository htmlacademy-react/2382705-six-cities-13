import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../constants/marker-url';
import useMap from '../../hooks/use-map';
import {City} from '../../mocks/city.ts';
import {OfferType} from '../../mocks/offers';
import 'leaflet/dist/leaflet.css';

type MapProps ={
  city: City;
  offers: OfferType[];
  selectedOffer: OfferType | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map ({city, offers, selectedOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.lat,
          lng: offer.lng,
        });

        marker.setIcon(selectedOffer !== undefined && offer.name === selectedOffer.name ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return(() => {
        map.removeLayer(markerLayer);
      });
    }
  }, [map, offers, selectedOffer]);

  return <div style={{height: '814px', width: '512px'}} ref={mapRef}></div>;
}

export default Map;