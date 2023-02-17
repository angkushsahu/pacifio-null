import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import LoadingPage from "components/common/loading";
import routing from "components/app/routing";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "store";
import { useGetUserQuery } from "store/queries";
import { setUser, removeUser } from "store/slices";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const App = () => {
    const dispatch = useAppDispatch();
    const { data: userData } = useGetUserQuery();

    useEffect(() => {
        if (userData) {
            dispatch(setUser({ user: userData.user }));
        } else {
            dispatch(removeUser());
        }
    }, [userData?.user, dispatch, userData]);

    return (
        <div className="root">
            <Suspense fallback={<LoadingPage />}>
                <RouterProvider router={routing} />
            </Suspense>
            <ToastContainer position="top-center" theme="dark" />
        </div>
    );
};

export default App;
