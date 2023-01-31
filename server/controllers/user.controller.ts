import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Address, Cart } from "../models";
import { IUpdateUser } from "../types";
import { cloudinaryConfig, ErrorHandler, validateEmail } from "../utils";

export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "User found successfully",
        user: res.typedLocals.user.getUser(),
    });
});

export const changePassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { password }: { password: string } = req.body;
    if (!password) {
        return next(new ErrorHandler("Please enter a password to reset", 400));
    }

    const user = res.typedLocals.user;
    user.password = password;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
});

export const userLogout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("pacifioToken");
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});

export const deleteUserAccount = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const user = res.typedLocals.user;
    if (user.publicUrl) {
        await cloudinaryConfig.uploader.destroy(user.publicUrl);
    }
    await Cart.deleteOne({ user: user.id });
    await Address.deleteMany({ user: user.id });
    res.clearCookie("pacifioToken");
    await user.delete();

    res.status(200).json({ success: true, message: "User account deleted successfully" });
});

export const updateUserDetails = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const { name, email, avatar, deleteAvatar }: IUpdateUser = req.body;
    const user = res.typedLocals.user;

    let condition = false;
    if (name && user.name !== name) {
        user.name = name;
        condition = true;
    }
    if (email && user.email !== email) {
        if (!validateEmail(email)) {
            return next(new ErrorHandler("Invalid e-mail format", 400));
        }
        user.email = email;
        condition = true;
    }

    if (avatar) {
        if (user.publicUrl) {
            await cloudinaryConfig.uploader.destroy(user.publicUrl);
        }
        const uploadImage = await cloudinaryConfig.uploader.upload(avatar, {
            folder: "pacifio/users",
            use_filename: true,
        });
        user.pic = uploadImage.secure_url;
        user.publicUrl = uploadImage.public_id;
        condition = true;
    }
    if (deleteAvatar && user.publicUrl) {
        await cloudinaryConfig.uploader.destroy(user.publicUrl);
        user.pic = "";
        user.publicUrl = "";
        condition = true;
    }

    if (condition) {
        await user.save();
        return res.status(200).json({
            success: true,
            user: user.getUser(),
            message: "Updated user details successfully",
        });
    }
    res.status(200).json({ success: true, message: "Nothing to update" });
});
