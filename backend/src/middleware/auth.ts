import jwt from "jsonwebtoken";
import { Users } from "../modals/user";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHander, { ErrorHandlerClass } from "./error";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = (
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    ""
  ).replace(/^Bearer\s+/, "");

  if (!token) {
    return next(
      new ErrorHander("Please Login to access this resource", req, res, next)
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await Users.findById(decodedData.id);

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandlerClass(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
