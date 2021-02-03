import HomePage from "../pages/Home/index.jsx"
import { FavouritesLocalStore } from "../services/cache/FavouritesLocalStore";

const makeFavouritesLocalStore = () => new FavouritesLocalStore();

export const makeHomePage = () => {
  return (
    <HomePage favouritesCache={makeFavouritesLocalStore()} />
  );
};