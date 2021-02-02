import { Route, RouteProps, Redirect } from "react-router-dom";

import { UserLocalStore } from "../services/cache/UserLocalStore";

const PrivateRoute = (props: RouteProps) => {
  const isLoggedIn = new UserLocalStore().retrieve() !== null
  return isLoggedIn ? <Route {...props} component={props.component} /> : <Redirect to="/login" />
}

export default PrivateRoute;