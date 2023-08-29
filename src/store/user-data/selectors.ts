import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { AuthorizationStatus, UserData } from '../../types/authorization';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): UserData => state[NameSpace.User].user;
export const getAuthPendingStatus = (state: State): boolean => state[NameSpace.User].authPendingStatus;
