import { useEffect, useState } from 'react';
import CardList from '../../components/card-list/card-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import Header from '../../components/header/header.tsx';
import Sorting from '../../components/sorting/sorting.tsx';
import MainPageEmpty from '../../components/main-empty/main-empty.tsx';

import { SortingType } from '../../types/sorting.ts';
import { OfferType } from '../../types/offer.ts';

import { CITIES } from '../../constants/city.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { getActiveCity, getActiveOfferId, getOffers } from '../../store/offers-data/selectors.ts';

function MainPage(): JSX.Element {

  const currentOfferList = useAppSelector(getOffers);
  const currentCity = useAppSelector(getActiveCity);
  const activeOfferId = useAppSelector(getActiveOfferId);

  const [activeSorting, setActiveSorting] = useState<SortingType>('Popular');
  const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);

  const currentCityData = CITIES.filter((city) => city.name === currentCity)[0];
  const currentCityOfferList: OfferType[] = currentOfferList.filter((offer) => offer.city.name === currentCity);

  useEffect(() => {
    if (activeOfferId !== null) {
      setActiveOffer(currentCityOfferList.filter((offer) => offer.id === activeOfferId)[0]);
    } else {
      setActiveOffer(null);
    }
  }, [activeOfferId, currentCityOfferList]);

  return (
    <div className="page page--gray page--main">
      <Header />
      {currentCityOfferList.length !== 0 ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOfferList.length} {currentCityOfferList.length > 1 ? 'places' : 'place'} to stay in {currentCity}</b>
                <Sorting activeSorting={activeSorting} onChange={(newSorting) => setActiveSorting(newSorting)}/>
                <CardList
                  offers={currentCityOfferList}
                  listProp={'cities__places-list'}
                  typeProp={'cities'}
                  tabsProp={'tabs__content'}
                  activeSorting={activeSorting}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" style={{backgroundImage: 'none'}}>
                  <Map
                    city={currentCityData}
                    offers={currentCityOfferList} selectedOffer={activeOffer} height={'814px'}
                    width={''}
                  />
                </section>
              </div>
            </div>
          </div>
        </main> :
        <MainPageEmpty city={currentCity}/>}
    </div>
  );
}

export default MainPage;
