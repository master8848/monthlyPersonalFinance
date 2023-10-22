import jwt from "jsonwebtoken";
import { Users } from "../modals/user";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHander from "./error";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = (
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    ""
  ).replace(/^Bearer\s+/, "");

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await Users.findById(decodedData.id);

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
