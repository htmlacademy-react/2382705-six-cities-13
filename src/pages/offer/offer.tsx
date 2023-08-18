import CommentForm from '../../components/comment-form/comment-form.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FullOfferType, OfferType } from '../../types/offer.ts';
import ReviewList from '../../components/review-list/review-list.tsx';
import Map from '../../components/map/map.tsx';
import { CITIES } from '../../constants/city.ts';
import { useAppSelector } from '../../hooks/index.ts';
import CardList from '../../components/card-list/card-list.tsx';
import { store } from '../../store/index.ts';
import { fetchFullOfferAction, fetchNearbyOffersAction, fetchOfferCommentsAction } from '../../store/api-actions.ts';
import { Comment } from '../../types/comment.ts';
import Header from '../../components/header/header.tsx';
import { getOffer } from '../../store/offer-data/selectors.ts';
import { getNearbyOffers } from '../../store/nearby-data/selectors.ts';
import { getComments } from '../../store/comments-data/selectors.ts';
import { getActiveCity } from '../../store/offers-data/selectors.ts';
import BookmarkButtonBig from '../../components/bookmark-button-big/bookmark-button-big.tsx';
import { getFavorites } from '../../store/favorites-data/selectors.ts';

function Offer(): JSX.Element {
  const {id} = useParams();
  const currentOffer: FullOfferType | null = useAppSelector(getOffer);
  const nearbyOffers: OfferType[] = useAppSelector(getNearbyOffers);
  const currentOfferComments: Comment[] = useAppSelector(getComments);
  const currentCity = useAppSelector(getActiveCity);
  const currentCityData = CITIES.filter((city) => city.name === currentCity)[0];
  const favorites = useAppSelector(getFavorites);
  let isActive = false;
  if (favorites.filter((item) => item.id === currentOffer?.id).length === 0) {
    isActive = false;
  } else {
    isActive = true;
  }

  useEffect(() => {
    store.dispatch(fetchFullOfferAction(id));
    store.dispatch(fetchNearbyOffersAction(id));
    store.dispatch(fetchOfferCommentsAction(id));
  }, [id]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.map((image, imageId) => {
                const keyValue = `${imageId}-image`;
                return (
                  <div className="offer__image-wrapper" key={keyValue}>
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer?.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> :
                null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
                </h1>
                <BookmarkButtonBig id={currentOffer?.id} isActive={isActive} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '60%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer?.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer?.goods.map((good, goodId) => {
                    const keyValue = `${goodId}-amenity`;
                    return (
                      <li className="offer__inside-item" key={keyValue}>
                        {good}
                      </li>
                    );
                  }
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer?.host.name}
                  </span>
                  {currentOffer?.host.isPro &&
                    <span className="offer__user-status">
                      Pro
                    </span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentOfferComments.length}</span></h2>
                <ReviewList comments={currentOfferComments} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Map city={currentCityData} offers={nearbyOffers} selectedOffer={null} height={'579px'} width={'1144px'} />
              </div>
            </div>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList
              offers={nearbyOffers}
              listProp={'near-places__list'}
              typeProp={'near-places'}
              tabsProp={'null'}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
