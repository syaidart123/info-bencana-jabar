import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  addData,
  deleteData,
  retrieveData,
  updateData,
} from "@/lib/firebase/service";
import {
  apiResponseFailed,
  apiResponseInternalError,
  apiResponseMethodNotAllowed,
  apiResponseSuccess,
} from "@/utils/responseApi";
import { verify } from "@/utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const Submissions: any = await retrieveData("submissions");
      const data = Submissions.map((submission: any) => {
        return submission;
      });
      apiResponseSuccess(res, data);
    } catch (error) {
      apiResponseInternalError(res);
    }
  } else if (req.method === "POST") {
    verify(req, res, false, async () => {
      let data = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();
      data.status = "Terkirim";
      await addData("submissions", data, (status: boolean, result: any) => {
        if (status) {
          apiResponseSuccess(res, result.id);
        } else {
          apiResponseFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async (decoded: any) => {
      const { submission }: any = req.query;
      const { data } = req.body;
      console.log(submission);
      if (decoded) {
        await updateData(
          "submissions",
          submission[0],
          data,
          (status: boolean) => {
            if (status) {
              apiResponseSuccess(res);
            } else {
              apiResponseFailed(res);
            }
          }
        );
      }
    });
  } else if (req.method === "DELETE") {
    const { submission }: any = req.query;
    verify(req, res, false, async () => {
      await deleteData("submissions", submission[0], (result: boolean) => {
        if (result) {
          apiResponseSuccess(res);
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
