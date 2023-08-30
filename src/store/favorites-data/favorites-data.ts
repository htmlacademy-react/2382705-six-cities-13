import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants/store';
import { addFavoritesAction, deleteFavoritesAction, fetchFavoritesAction } from '../api-actions';
import { OfferType } from '../../types/offer';

const initialState: {
  favorites: OfferType[];
} = {
  favorites: [],
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(addFavoritesAction.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(deleteFavoritesAction.fulfilled, (state, action) => {
        const removingOffer = action.payload;
        state.favorites = state.favorites.filter((offer) => offer.id !== removingOffer.id);
      });
  }
});

export const { clearFavorites } = favoritesData.actions;
