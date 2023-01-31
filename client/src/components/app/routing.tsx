import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { HeaderAndFooterLayout, HeaderLayout } from "components/common/layout";
import routes from "./routes";
import { IsAdmin, IsAuthenticated, PublicRoutes } from "components/features/protectedRoutes";
import * as Components from "./lazyImports";

const routing = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<HeaderAndFooterLayout />}>
                <Route path={routes.home} element={<Components.HomePage />} />
                <Route path={routes.about} element={<Components.AboutPage />} />
                <Route path={routes.contact} element={<Components.ContactPage />} />
                <Route path={routes.allProducts} element={<Components.AllProducts />} />
                <Route path={routes.viewProduct} element={<Components.ViewProduct />} />
                <Route element={<IsAuthenticated />}>
                    <Route path={routes.cart} element={<Components.Cart />} />
                    <Route path={routes.addAddress} element={<Components.Address />} />
                    <Route path={routes.updateAddress} element={<Components.Address />} />
                    <Route path={routes.shipping} element={<Components.Shipping />} />
                    <Route path={routes.confirmOrder} element={<Components.ConfirmOrder />} />
                    <Route path={routes.orders} element={<Components.Orders />} />
                    <Route path={routes.viewOrder} element={<Components.ViewOrder />} />
                    <Route path={routes.account} element={<Components.UserProfile />} />
                    <Route path={routes.payment} element={<Components.Payment />} />
                </Route>
            </Route>
            <Route element={<IsAdmin />}>
                <Route element={<HeaderLayout />}>
                    <Route path={routes.adminDashboard} element={<Components.AdminDashboard />} />
                    <Route path={routes.adminCreateProduct} element={<Components.AdminCreateProduct />} />
                    <Route path={routes.adminUpdateProduct} element={<Components.AdminUpdateProduct />} />
                    <Route path={routes.adminSeeAllProducts} element={<Components.AdminSeeAllProducts />} />
                    <Route path={routes.adminOutOfStockProducts} element={<Components.AdminOutOfStockProducts />} />
                    <Route path={routes.adminSeeAllOrders} element={<Components.AdminSeeAllOrders />} />
                    <Route path={routes.adminViewOrder} element={<Components.AdminViewOrder />} />
                    <Route path={routes.adminSeeAllUsers} element={<Components.AdminSeeAllUsers />} />
                    <Route path={routes.adminViewUser} element={<Components.AdminViewUser />} />
                </Route>
            </Route>
            <Route element={<PublicRoutes />}>
                <Route path={routes.signup} element={<Components.SignupPage />} />
                <Route path={routes.login} element={<Components.LoginPage />} />
                <Route path={routes.forgotPassword} element={<Components.ForgotPassword />} />
                <Route path={routes.resetPassword} element={<Components.ResetPassword />} />
            </Route>
            <Route element={<IsAuthenticated />}>
                <Route path={routes.changePassword} element={<Components.ChangePassword />} />
                <Route path={routes.updateProfile} element={<Components.UpdateProfile />} />
            </Route>
            <Route path={routes.orderSuccess} element={<Components.OrderSuccess />} />
            <Route path={routes.orderFailure} element={<Components.OrderFailure />} />
            <Route path={routes.accountDeleted} element={<Components.AccountDeleted />} />
            <Route path="*" element={<Components.ErrorPage />} />
        </Route>
    )
);

export default routing;
