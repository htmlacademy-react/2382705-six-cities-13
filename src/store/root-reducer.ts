import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants/store';

import { userData } from './user-data/user-data';
import { offerData } from './offer-data/offer-data';
import { offersData } from './offers-data/offers-data';
import { nearbyData } from './nearby-data/nearby-data';
import { favoritesData } from './favorites-data/favorites-data';
import { commentsData } from './comments-data/comments-data';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.NearbyOffers]: nearbyData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
});
