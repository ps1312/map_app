import { Route, Redirect, RouteProps } from "react-router-dom";

import { UserLocalStore } from "../services/cache/UserLocalStore";

const UnsecuredRoute = (props: RouteProps) => {
  const isLoggedIn = new UserLocalStore().retrieve() !== null
  return !isLoggedIn ? <Route {...props} component={props.component} /> : <Redirect to="/" />
}

export default UnsecuredRoute;