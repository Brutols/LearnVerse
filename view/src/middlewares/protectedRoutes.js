import {Outlet} from "react-router-dom";
import Homepage from "../pages/Homepage";


const useAuth = () => {
    return JSON.parse(localStorage.getItem('auth'));
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Homepage />;
}

export default ProtectedRoutes;