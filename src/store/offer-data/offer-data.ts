import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants/store';
import { fetchFullOfferAction } from '../api-actions';
import { FullOfferType } from '../../types/offer';

const initialState: {
  offer: FullOfferType | null;
  noSuchOfferFound: string;
} = {
  offer: null,
  noSuchOfferFound: 'unknown'
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    resetOfferFoundStatus(state) {
      state.noSuchOfferFound = 'unknown';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.noSuchOfferFound = 'false';
      })
      .addCase(fetchFullOfferAction.pending, (state) => {
        state.noSuchOfferFound = 'unknown';
      })
      .addCase(fetchFullOfferAction.rejected, (state) => {
        state.noSuchOfferFound = 'true';
      });
  }
});

export const { resetOfferFoundStatus } = offerData.actions;
