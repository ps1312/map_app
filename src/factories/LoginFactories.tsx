import LoginPage from "../pages/Login";
import { UserLocalStore } from "../services/cache/UserLocalStore";
import { FetchHTTPClient } from "../services/http/FetchHTTPClient";
import { RemoteUserLogin } from "../services/login/RemoteUserLogin";

const makeRemoteAuthentication = () => {
  const fetch = window.fetch.bind(window);
  const url = new URL("https://reqres.in/api/login");
  const client = new FetchHTTPClient(fetch);
  return new RemoteUserLogin(url, client);
};

const makeUserLocalStore = () => new UserLocalStore();

export const makeLoginPage = () => {
  return (
    <LoginPage
      authentication={makeRemoteAuthentication()}
      cache={makeUserLocalStore()}
    />
  );
};