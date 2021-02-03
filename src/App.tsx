import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import UnsecuredRoute from "./routes/UnsecuredRoute";
import HomePage from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import { RemoteUserRegister } from "./services/register/RemoteUserRegister";
import { FetchHTTPClient } from "./services/http/FetchHTTPClient";
import { UserLocalStore } from "./services/cache/UserLocalStore";

const makeRemoteRegistration = () => {
  const fetch = window.fetch.bind(window);
  const url = new URL("https://reqres.in/api/register")
  const client = new FetchHTTPClient(fetch)
  return new RemoteUserRegister(url, client)
}

const makeUserLocalStore = () => new UserLocalStore()

const makeRegistrationPage = () => {
  return <RegistrationPage registration={makeRemoteRegistration()} cache={makeUserLocalStore()} />
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <UnsecuredRoute path="/register" component={() => makeRegistrationPage()}/>
          <UnsecuredRoute path="/login" component={RegistrationPage}/>
          <PrivateRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
