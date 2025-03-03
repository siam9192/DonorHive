import { Request, Response } from "express";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { sendSuccessResponse } from "../../utils/response";
import AuthServices from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Please check your email",
    data: result,
  });
});
const verifyRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.verifyRegistration(req.params.token);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Account registration successful",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: result,
  });
});



const AuthControllers  = {
    register,
    verifyRegistration,
    login
}

export default AuthControllers;