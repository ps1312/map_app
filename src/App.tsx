import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import UnsecuredRoute from "./routes/UnsecuredRoute";
import HomePage from "./pages/Home";
import RegistrationPage from "./pages/Registration";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <UnsecuredRoute path="/register" component={RegistrationPage}/>
          <UnsecuredRoute path="/login" component={RegistrationPage}/>
          <PrivateRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
