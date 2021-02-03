import NavBar from "../routes/NavBar";
import { UserLocalStore } from "../services/cache/UserLocalStore";

const makeUserLocalStore = () => new UserLocalStore();

export const makeNavBarComponent = () => {
  return (
    <NavBar cache={makeUserLocalStore()} />
  );
};