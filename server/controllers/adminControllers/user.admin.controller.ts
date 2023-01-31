import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares";
import { User } from "../../models";
import { IUserRole } from "../../types";
import { ApiFeatures, ErrorHandler } from "../../utils";

export const getAllUsers = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 10; // original value --> 10

    const apiFeatures = new ApiFeatures(User.find().select("name email role pic _id"), req.query).searchUsers().filterUsers();
    const filteredUsers = await apiFeatures.query.clone();
    const paginatedQuery = apiFeatures.pagination(resultPerPage);
    const users = await paginatedQuery.query;
    const numberOfUsers = filteredUsers.length;

    res.status(200).json({
        success: true,
        message: "Fetched all products",
        numberOfUsers,
        resultPerPage,
        users,
    });
});

export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({ success: true, message: "User found successfully", user: user.getUser() });
});

export const updateUserRoles = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { role }: { role: IUserRole } = req.body;
    const { id } = req.params;
    if (res.typedLocals.user.id === id) {
        return next(new ErrorHandler("You cannot update your role", 404));
    }

    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (role !== "admin" && role !== "super-admin" && role !== "user") {
        return next(new ErrorHandler("Invalid role assignment", 400));
    }

    if ((res.typedLocals.user.role === "admin" && user.role === "super-admin") || (res.typedLocals.user.role === "admin" && role === "super-admin")) {
        return next(new ErrorHandler("You are not authorized to perform this action", 400));
    }

    user.role = role;
    await user.save();
    res.status(200).json({ success: true, message: "Updated user role successfully", user: user.getUser() });
});
