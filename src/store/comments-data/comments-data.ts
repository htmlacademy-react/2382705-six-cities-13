import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants/store';
import { addCommentAction, fetchOfferCommentsAction } from '../api-actions';
import { Comment } from '../../types/comment';

const initialState: {
  offerComments: Comment[];
  isFormDisabled: boolean;
  commentsError: boolean;
  isResponse: boolean;
} = {
  offerComments: [],
  isFormDisabled: false,
  commentsError: false,
  isResponse: false
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.offerComments = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.offerComments.unshift(action.payload);
        state.isFormDisabled = false;
        state.commentsError = false;
        state.isResponse = true;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isFormDisabled = true;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.commentsError = true;
        state.isFormDisabled = false;
        state.isResponse = true;
      });
  }
});
