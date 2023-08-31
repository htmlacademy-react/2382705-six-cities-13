import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants/store';
import { fetchNearbyOffersAction } from '../api-actions';
import { OfferType } from '../../types/offer';

const initialState: {
  nearbyOffers: OfferType[];
} = {
  nearbyOffers: []
};

export const nearbyData = createSlice({
  name: NameSpace.NearbyOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});
