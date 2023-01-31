import routes from "components/app/routes";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "store";

const PublicRoutes = () => {
    const { user, auth } = useAppSelector((state) => state.authSlice);
    return auth && user ? <Navigate to={routes.home} replace={true} /> : <Outlet />;
};

export default PublicRoutes;
