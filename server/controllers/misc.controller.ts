import { Request, Response, NextFunction } from "express";
import { createTransport } from "nodemailer";
import { catchAsyncErrors } from "../middlewares";
import { Cart, Product } from "../models";
import { IContactUs } from "../types";
import { ErrorHandler, validateEmail } from "../utils";

const requiredProductDetails = "_id name price ratings images category stock numberOfReviews";

export const homePage = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const keyboardProduct = await Product.findOne({ category: "keyboard" }).select(requiredProductDetails);
    const mouseProduct = await Product.findOne({ category: "mouse" }).select(requiredProductDetails);
    const mousePadProduct = await Product.findOne({ category: "mouse-pad" }).select(requiredProductDetails);
    const coolingPadProduct = await Product.findOne({ category: "cooling-pad" }).select(requiredProductDetails);
    const headsetProduct = await Product.findOne({ category: "headset" }).select(requiredProductDetails);

    const responseObj = [keyboardProduct, mousePadProduct, mouseProduct, coolingPadProduct, headsetProduct];

    res.status(200).json({ success: true, message: "Home products found successfully", responseObj });
});

export const cartLength = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await Cart.findOne({ user: res.typedLocals.user.id });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }
    const cartLength = cart.products.length;

    res.status(200).json({ success: true, message: "Fetched cart Items length successfully", cartLength });
});

export const receiveContactMessage = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, message, name, subject }: IContactUs = req.body;
    if (!email || !message || !name || !subject) {
        return next(new ErrorHandler("Please validate all the fields", 400));
    }
    if (!validateEmail(email)) {
        return next(new ErrorHandler("Invalid e-mail format", 400));
    }
    const transporter = createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
        },
    });

    const text: string = `
    A message from ${name.toUpperCase()}
    His subject of this email is ${subject.toUpperCase()}

    ${name} says
    ${message}

    E-mail : ${email}
    `;

    const mailOptions = {
        from: email,
        to: process.env.MAIL,
        subject: "CONTACT SUPPORT -- PACIFIO",
        text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Mail sent successfully, we will get back to you as soon as possible" });
});
