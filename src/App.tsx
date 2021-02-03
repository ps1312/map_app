import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, RouteComponentProps } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import UnsecuredRoute from "./routes/UnsecuredRoute";
import HomePage from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import { makeRegistrationPage } from "./factories/RegistrationFactories";

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
            component={RegistrationPage}
          />

          <PrivateRoute
            path="/"
            component={(props: RouteComponentProps) => (
              <div>
                <span>nav bar</span>
                <HomePage {...props} />
              </div>
            )}
          />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
