import { Route, Router, redirect } from "react-router-dom";
import AuthentificationService from "./services/authentification-service.ts";


const PrivateRoute = ( {element: Component , ...rest} ) => {
    
    <Route {...rest} render = { (props) => {
        const isAuthenticated = AuthentificationService.isAuthenticated;

        if (!isAuthenticated) {
            return <redirect to={ {pathname: "/login"} }/>
        }

        return <Component {...props}/>
    }
    } />
}

export default PrivateRoute;