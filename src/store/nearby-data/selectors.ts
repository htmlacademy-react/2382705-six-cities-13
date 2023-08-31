import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getNearbyOffers = (state: State): OfferType[] => state[NameSpace.NearbyOffers].nearbyOffers;
