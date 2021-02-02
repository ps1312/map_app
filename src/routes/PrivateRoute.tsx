import { Route, RouteProps, Redirect } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute = ({ component, isLoggedIn }: PrivateRouteProps) => (
  isLoggedIn ? <Route>{component}</Route> : <Redirect to="/login" />
)

export default PrivateRoute;