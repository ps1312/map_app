import RegistrationPage from "../pages/Registration";
import { UserLocalStore } from "../services/cache/UserLocalStore";
import { FetchHTTPClient } from "../services/http/FetchHTTPClient";
import { RemoteUserRegister } from "../services/register/RemoteUserRegister";

export const makeRemoteRegistration = () => {
  const fetch = window.fetch.bind(window);
  const url = new URL("https://reqres.in/api/register");
  const client = new FetchHTTPClient(fetch);
  return new RemoteUserRegister(url, client);
};

export const makeUserLocalStore = () => new UserLocalStore();

export const makeRegistrationPage = () => {
  return (
    <RegistrationPage
      registration={makeRemoteRegistration()}
      cache={makeUserLocalStore()}
    />
  );
};