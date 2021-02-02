import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { UserLocalStore } from "./services/cache/UserLocalStore";
import PrivateRoute from "./routes/PrivateRoute";
import UnsecuredRoute from "./routes/UnsecuredRoute";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  const isLoggedIn = new UserLocalStore().retrieve() !== null

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <UnsecuredRoute isLoggedIn={isLoggedIn} path="/login" component={LoginPage}/>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/" component={HomePage} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
