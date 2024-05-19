import { retrieveDataByUser } from "@/lib/firebase/service";
import {
  apiResponseFailed,
  apiResponseInternalError,
  apiResponseSuccess,
} from "@/utils/responseApi";
import { verify } from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: any) => {
      try {
        const Submissions: any = await retrieveDataByUser(
          "submissions",
          decoded.email
        );
        const data = Submissions.map((submission: any) => {
          return submission;
        });
        apiResponseSuccess(res, data);
      } catch (error) {
        apiResponseFailed(res);
      }
    });
  } else {
    apiResponseInternalError(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
