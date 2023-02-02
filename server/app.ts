import express from "express";
const app = express();

import { Locals } from "./express";
app.use(function (req, res, next) {
    res.typedLocals = res.locals as Locals;
    next();
});

const limit = "1000mb";
app.use(express.urlencoded({ extended: true, limit }));
app.use(express.json({ limit }));

import cors from "cors";
app.use(cors({ origin: true, credentials: true }));
// const whiteListedUrls = ["http://localhost:3000"];
// app.use(
//     cors({
//         credentials: true,
//         origin: function (origin, callBack) {
//             if (whiteListedUrls.indexOf(origin!) !== -1) {
//                 callBack(null, true);
//             } else {
//                 callBack(new Error("Not a white-listed domain"));
//             }
//         },
//         methods: ["GET", "PUT", "POST", "DELETE"],
//     })
// );

import cookieParser from "cookie-parser";
app.use(cookieParser());

import * as routes from "./routes";
app.use("/api/address", routes.address);
app.use("/api/auth", routes.auth);
app.use("/api/user", routes.user);
app.use("/api/product", routes.product);
app.use("/api/cart", routes.cart);
app.use("/api/order", routes.order);
app.use("/api/reviews", routes.reviews);
app.use("/api/payment", routes.payment);
app.use("/api/admin", routes.admin);
app.use("/api/misc", routes.misc);

// production deployment
// import { join } from "path";
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(join(__dirname, "../client", "build")));
//     app.get("*", (req, res) => {
//         res.sendFile(join(__dirname, "../client", "build", "index.html"));
//     });
// }

import { error } from "./middlewares";
app.use(error.invalidUrl);
app.use(error.errors);

export default app;
