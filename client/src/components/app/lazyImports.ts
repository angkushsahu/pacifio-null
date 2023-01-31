import { lazy } from "react";

// random routes
export const HomePage = lazy(() => import("components/common/home"));
export const AboutPage = lazy(() => import("components/common/about"));
export const ErrorPage = lazy(() => import("components/common/error"));
export const ContactPage = lazy(() => import("components/common/contact"));
export const AccountDeleted = lazy(() => import("components/common/deleteAccountPrompt"));
// auth pages
export const SignupPage = lazy(() => import("components/features/auth/signup"));
export const LoginPage = lazy(() => import("components/features/auth/login"));
export const ForgotPassword = lazy(() => import("components/features/auth/forgotPassword"));
export const ResetPassword = lazy(() => import("components/features/auth/resetPassword"));
export const ChangePassword = lazy(() => import("components/features/auth/changePassword"));
export const UpdateProfile = lazy(() => import("components/features/auth/updateProfile"));
// product pages
export const AllProducts = lazy(() => import("components/features/products/allProducts"));
export const ViewProduct = lazy(() => import("components/features/products/viewProduct"));
// order pages
export const OrderSuccess = lazy(() => import("components/common/orderSuccessAndFailure/success"));
export const OrderFailure = lazy(() => import("components/common/orderSuccessAndFailure/failure"));
export const Cart = lazy(() => import("components/features/order/cart"));
export const Address = lazy(() => import("components/features/order/address"));
export const Shipping = lazy(() => import("components/features/order/shipping"));
export const ConfirmOrder = lazy(() => import("components/features/order/confirmOrder"));
export const Payment = lazy(() => import("components/features/order/payment"));
export const Orders = lazy(() => import("components/features/order/orders"));
export const ViewOrder = lazy(() => import("components/features/order/viewOrder"));
// user pages
export const UserProfile = lazy(() => import("components/features/user"));
// admin pages
export const AdminDashboard = lazy(() => import("components/features/admin/stats"));
export const AdminCreateProduct = lazy(() => import("components/features/admin/newProduct"));
export const AdminUpdateProduct = lazy(() => import("components/features/admin/updateProduct"));
export const AdminSeeAllProducts = lazy(() => import("components/features/admin/products"));
export const AdminOutOfStockProducts = lazy(() => import("components/features/admin/outOfStock"));
export const AdminSeeAllOrders = lazy(() => import("components/features/admin/orders"));
export const AdminViewOrder = lazy(() => import("components/features/admin/viewOrder"));
export const AdminSeeAllUsers = lazy(() => import("components/features/admin/users"));
export const AdminViewUser = lazy(() => import("components/features/admin/viewUser"));
