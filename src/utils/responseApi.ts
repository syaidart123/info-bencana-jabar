import { NextApiResponse } from "next";

export const apiResponse = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({ status, statusCode, message, data });
};

export const apiResponseSuccess = (res: NextApiResponse, data: any = {}) => {
  apiResponse(res, true, 200, "success", data);
};
export const apiResponseFailed = (res: NextApiResponse) => {
  apiResponse(res, false, 400, "failed");
};

export const apiResponseNotFound = (res: NextApiResponse) => {
  apiResponse(res, false, 404, "not found");
};

export const apiResponseAccessDenied = (res: NextApiResponse) => {
  apiResponse(res, false, 403, "access denied");
};

export const apiResponseMethodNotAllowed = (res: NextApiResponse) => {
  apiResponse(res, false, 405, "method not allowed");
};
export const apiResponseInternalError = (res: NextApiResponse) => {
  apiResponse(res, false, 500, "internal server error");
};
