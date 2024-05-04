import {Outlet} from "react-router-dom";
import Homepage from "../pages/Homepage";
import { useSelector } from "react-redux";
import { user } from "../Reducers/navReducer/navReducer";


const useAuth = () => {
    return JSON.parse(localStorage.getItem('auth'));
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    const loggedUser = useSelector(user);
    const userIsAdmin = loggedUser.role === 'admin';
    return isAuth && userIsAdmin ? <Outlet /> : <Homepage />;
}

export default ProtectedRoutes;