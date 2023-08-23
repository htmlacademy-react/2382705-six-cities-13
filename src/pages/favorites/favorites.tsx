import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { fetchFavoritesAction } from '../../store/api-actions.ts';
import { OfferType } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import { getFavorites } from '../../store/favorites-data/selectors.ts';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';
import BookmarkButtonSmall from '../../components/bookmark-button-small/bookmark-button-small.tsx';
import getRatingWidth from '../../utils/rating-width.ts';

function Favorites(): JSX.Element {
  const favorites: OfferType[] = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoritesAction());
  });
  const favoritesList: OfferType['city']['name'][] = [];
  favorites.map((favorite) => {
    if (!favoritesList.includes(favorite.city.name)) {
      favoritesList.push(favorite.city.name);
    }
  });

  return (
    favorites.length !== 0 ?
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favoritesList.map((favoriteCityName, favoriteCityId) => {
                  const keyValue = `${favoriteCityId}-favoriteCity`;
                  return (
                    <li className="favorites__locations-items" key={keyValue}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{favoriteCityName}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favorites.map((favorite, favoriteId) => {
                          if (favorite.city.name === favoriteCityName) {
                            const keyNewValue = `${favoriteId}-favorite`;
                            const ratingWidth = getRatingWidth(favorite.rating);
                            return (
                              <article className="favorites__card place-card" key={keyNewValue}>
                                {favorite.isPremium &&
                                  <div className="place-card__mark">
                                    <span>Premium</span>
                                  </div>}
                                <div className="favorites__image-wrapper place-card__image-wrapper">
                                  <a href="#">
                                    <img className="place-card__image" src={favorite.previewImage} width="150" height="110" alt="Place image" />
                                  </a>
                                </div>
                                <div className="favorites__card-info place-card__info">
                                  <div className="place-card__price-wrapper">
                                    <div className="place-card__price">
                                      <b className="place-card__price-value">&euro;{favorite.price}</b>
                                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                                    </div>
                                    <BookmarkButtonSmall id={favorite.id} isActive/>
                                  </div>
                                  <div className="place-card__rating rating">
                                    <div className="place-card__stars rating__stars">
                                      <span style={{width: ratingWidth}}></span>
                                      <span className="visually-hidden">Rating</span>
                                    </div>
                                  </div>
                                  <h2 className="place-card__name">
                                    <a href="#">{favorite.title}</a>
                                  </h2>
                                  <p className="place-card__type">{favorite.type}</p>
                                </div>
                              </article>
                            );
                          }
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div> :
      <FavoritesEmpty />
  );
}

export default Favorites;
