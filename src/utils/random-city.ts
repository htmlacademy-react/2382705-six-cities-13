import type { City } from '../constants/city';

const getRandomCity = (cities: City[]): string => {
  const randomIndex = (Math.floor(Math.random() * cities.length));
  return cities[randomIndex].name;
};

export default getRandomCity;
