import { Link } from 'react-router-dom';
import { memo } from 'react';

import { OfferType } from '../../types/offer.ts';

import { useAppSelector } from '../../hooks/index.ts';
import { getFavorites } from '../../store/favorites-data/selectors.ts';
import getRatingWidth from '../../utils/rating-width.ts';
import BookmarkButtonSmall from '../bookmark-button-small/bookmark-button-small.tsx';

type CardProps = {
  offer: OfferType;
  onMouseEnter: (hoverCardId: string) => void;
  onMouseLeave: () => void;
  type: string;
};

function Card({offer, onMouseEnter, onMouseLeave, type}: CardProps): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  let isActive = false;
  if (favorites.filter((item) => item.id === offer.id).length === 0) {
    isActive = false;
  } else {
    isActive = true;
  }
  const ratingWidth = getRatingWidth(offer.rating);

  return (
    <article className={`${type}__card place-card`} onMouseLeave={() => onMouseLeave()} onMouseEnter={() => onMouseEnter(offer.id)}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${type}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButtonSmall id={offer.id} isActive={isActive}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type[0].toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}
const CardMemo = memo(Card);
export default CardMemo;
