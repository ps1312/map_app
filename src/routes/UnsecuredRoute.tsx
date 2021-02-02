import { Route, Redirect, RouteProps } from "react-router-dom";

interface UnsecuredRouteProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const UnsecuredRoute = ({ component, isLoggedIn }: UnsecuredRouteProps) => (
  !isLoggedIn ? <Route>{component}</Route> : <Redirect to="/" />
)

export default UnsecuredRoute;