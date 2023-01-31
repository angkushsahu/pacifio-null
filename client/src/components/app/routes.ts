const routes = {
    // random routes
    home: "/",
    about: "/about",
    contact: "/contact",
    accountDeleted: "/account-deleted",
    // authentication routes
    signup: "/signup",
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password/:id",
    changePassword: "/change-password",
    updateProfile: "/update-profile",
    // user action routes
    account: "/user/account",
    // product routes
    allProducts: "/products",
    productType: "/products?type=",
    viewProduct: "/product/:productId",
    // order routes
    cart: "/cart",
    addAddress: "/address/add",
    updateAddress: "/address/:id/update",
    shipping: "/shipping",
    confirmOrder: "/order/confirm",
    payment: "/payment",
    orders: "/orders",
    viewOrder: "/order/:id",
    orderSuccess: "/order/success",
    orderFailure: "/order/failure",
    // admin routes
    adminDashboard: "/admin/stats",
    adminCreateProduct: "/admin/product/create",
    adminUpdateProduct: "/admin/product/update/:id",
    adminSeeAllProducts: "/admin/products",
    adminOutOfStockProducts: "/admin/products/out-of-stock",
    adminSeeAllOrders: "/admin/orders",
    adminViewOrder: "/admin/order/:id",
    adminSeeAllUsers: "/admin/users",
    adminViewUser: "/admin/user/:id",
};

export default routes;
