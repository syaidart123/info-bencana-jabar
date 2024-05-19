import { signUp } from "@/services/auth/service";
import {
  apiResponseFailed,
  apiResponseMethodNotAllowed,
  apiResponseSuccess,
} from "@/utils/responseApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        apiResponseSuccess(res);
      } else {
        apiResponseFailed(res);
      }
    });
  } else {
    apiResponseMethodNotAllowed(res);
  }
}
