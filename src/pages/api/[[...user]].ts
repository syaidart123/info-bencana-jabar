import { addSubmission } from "@/services/submission/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import {
  apiResponseFailed,
  apiResponseMethodNotAllowed,
  apiResponseSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    verify(req, res, false, async () => {
      let data = req.body;
      await addSubmission(data, (status: boolean, result: any) => {
        if (status) {
          apiResponseSuccess(res, result.id);
        } else {
          apiResponseFailed(res);
        }
      });
    });
  } else {
    apiResponseMethodNotAllowed(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
