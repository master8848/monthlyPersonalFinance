// const ErrorHander = require("../utils/errorhandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const User = require("../models/userModel");
// const sendToken = require("../utils/jwtToken");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");

import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHander, { ErrorHandlerClass } from "../middleware/error";
import { Users } from "../modals/user";
import { sendToken } from "../utils/jwtToken";
import { sendEmail } from "../utils/sendEmail";
import crypto from "crypto";

// Register a User
const CredientialsInvalid = "Invalid email or password";
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorHandlerClass("Please Enter Email & Password", 400));
  }

  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    console.log("no user founf");
    next(new ErrorHandlerClass(CredientialsInvalid, 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    next(new ErrorHandlerClass(CredientialsInvalid, 401));
  }

  sendToken(user, 200, res);
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    next(new ErrorHandlerClass("User not found", 401));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    next(new ErrorHandlerClass(error.message, 500));
  }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    next(
      new ErrorHandlerClass(
        "Reset Password Token is invalid or has been expired",
        401
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    next(new ErrorHandlerClass("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    next(new ErrorHandlerClass("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    next(new ErrorHandlerClass("Passwords does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  try {
    await Users.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    next(new ErrorHandlerClass(e, 500));
  }
});

export const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await Users.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    next(
      new ErrorHandlerClass(
        `User does not exist with Id: ${req.params.id}`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await Users.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    next(
      new ErrorHandlerClass(
        `User does not exist with Id: ${req.params.id}`,
        400
      )
    );
  }

  await Users.deleteOne({ _id: user.id });

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
