import routes from "components/app/routes";
import LoadingPage from "components/common/loading";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUserQuery } from "store/queries";

const IsAdmin = () => {
    const { data: userData, isLoading } = useGetUserQuery();
    if (isLoading) {
        return <LoadingPage />;
    } else if (userData?.success && userData.user && (userData.user.role === "admin" || userData.user.role === "super-admin")) {
        return <Outlet />;
    } else {
        return <Navigate to={routes.login} replace={true} />;
    }
};

export default IsAdmin;
