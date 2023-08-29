export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type FullOfferType = Omit<OfferType & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}, 'previewImage'>;

export type CombinedOfferType = OfferType | FullOfferType;
