import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import type { Comment } from '../../types/comment';

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].offerComments;
export const getFormDisabledStatus = (state: State): boolean => state[NameSpace.Comments].isFormDisabled;
export const getCommentsError = (state: State): boolean => state[NameSpace.Comments].commentsError;
export const getResponseStatus = (state: State): boolean => state[NameSpace.Comments].isResponse;

