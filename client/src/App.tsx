import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import LoadingPage from "components/common/loading";
import routing from "components/app/routing";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "store";
import { useGetKeyQuery, useGetUserQuery } from "store/queries";
import { setUser, removeUser, setStripeKey, removeStripeKey } from "store/slices";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const dispatch = useAppDispatch();
    const { data: userData } = useGetUserQuery();
    const { data: getKeyData } = useGetKeyQuery();

    useEffect(() => {
        if (userData) {
            dispatch(setUser({ user: userData.user }));
        } else {
            dispatch(removeUser());
        }
    }, [userData?.user, dispatch]);
    useEffect(() => {
        if (getKeyData) {
            dispatch(setStripeKey({ stripeKey: getKeyData.stripeApiKey }));
        } else {
            dispatch(removeStripeKey());
        }
    }, [getKeyData?.stripeApiKey, dispatch]);

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
