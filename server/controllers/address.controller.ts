import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares";
import { ErrorHandler } from "../utils";
import { Address } from "../models";
import { IAddAddress } from "../types";

export const addAddress = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const { city, country, location, phoneNumber, pincode, state }: IAddAddress = req.body;
    if (!city || !country || !location || !phoneNumber || !pincode || !state) {
        return next(new ErrorHandler("Please validate all the fields", 400));
    }

    const address = await Address.create({ city, country, location, phoneNumber, pincode, state, user: res.typedLocals.user.id });
    if (!address) {
        return next(new ErrorHandler("Unable to create address, internal server error", 500));
    }

    res.status(201).json({ success: true, message: "Added address successfully", address });
});

export const updateAddress = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { city, country, location, phoneNumber, pincode, state }: IAddAddress = req.body;
    let address = await Address.findById(id);
    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }

    address.location = location;
    address.city = city;
    address.country = country;
    address.phoneNumber = phoneNumber;
    address.pincode = pincode;
    address.state = state;

    await address.save();
    res.status(200).json({ success: true, message: "Updated address successfully", address });
});

export const getAllAddress = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const user = res.typedLocals.user.id;
    const addresses = await Address.find({ user });

    res.status(200).json({ success: true, message: "Fetched all addresses successfully", addresses });
});

export const getOneAddress = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }

    res.status(200).json({ success: true, message: "Found address successfully", address });
});

export const deleteAddress = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }

    await address.remove();
    res.status(200).json({ success: true, message: "Deleted address successfully" });
});
