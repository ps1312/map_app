import ProfilePage from "../pages/Profile";
import { UserLocalStore } from "../services/cache/UserLocalStore";
import { FetchHTTPClient } from "../services/http/FetchHTTPClient";
import { RemoteGetUserProfile } from "../services/profile/RemoteGetUserProfile";

export const makeRemoteGetUserProfile = () => {
  const fetch = window.fetch.bind(window);
  const url = new URL("https://reqres.in/api/users?per_page=20");
  const client = new FetchHTTPClient(fetch);
  return new RemoteGetUserProfile(url, client);
};

export const makeUserLocalStore = () => new UserLocalStore();

export const makeProfilePage = () => {
  return (
    <ProfilePage
      loader={makeRemoteGetUserProfile()}
    />
  );
};