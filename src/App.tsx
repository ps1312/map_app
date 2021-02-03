import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import UnsecuredRoute from "./routes/UnsecuredRoute";
import { makeRegistrationPage } from "./factories/RegistrationFactories";
import { makeLoginPage } from "./factories/LoginFactories";
import { makeNavBarComponent } from "./factories/NavBar";
import { makeProfilePage } from "./factories/ProfileFactories";
import { makeHomePage } from "./factories/HomeFactories";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <UnsecuredRoute
            path="/register"
            component={() => makeRegistrationPage()}
          />

          <UnsecuredRoute
            path="/login"
            component={() => makeLoginPage()}
          />

          <PrivateRoute
            path="/profile"
            component={() => (
              <>
                {makeNavBarComponent()}
                {makeProfilePage()}
              </>
            )}
          />

          <PrivateRoute
            path="/"
            component={() => (
              <>
                {makeNavBarComponent()}
                {makeHomePage()}
              </>
            )}
          />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
