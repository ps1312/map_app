import HomePage from "../pages/Home/index.jsx"
import { CommentsLocalStore } from "../services/cache/CommentsLocalStore";
import { FavouritesLocalStore } from "../services/cache/FavouritesLocalStore";
import { UserLocalStore } from "../services/cache/UserLocalStore";

const makeUserLocalStore = () => new UserLocalStore();
const makeFavouritesLocalStore = () => new FavouritesLocalStore();
const makeCommentsLocalStore = () => new CommentsLocalStore();

export const makeHomePage = () => {
  return (
    <HomePage
      userCache={makeUserLocalStore()}
      favouritesCache={makeFavouritesLocalStore()}
      commentsCache={makeCommentsLocalStore()}
    />
  );
};