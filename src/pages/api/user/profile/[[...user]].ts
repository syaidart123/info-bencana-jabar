import { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import {
  apiResponseFailed,
  apiResponseMethodNotAllowed,
  apiResponseSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: any) => {
      const profile: any = await retrieveDataById("users", decoded.id);
      if (profile) {
        profile.id = decoded.id;
        apiResponseSuccess(res, profile);
      } else {
        apiResponseFailed(res);
      }
    });
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const { user }: any = req.query;
    verify(req, res, false, async (decoded: any) => {
      if (decoded) {
        await updateData("users", user[0], data, (status: boolean) => {
          if (status) {
            apiResponseSuccess(res);
          } else {
            apiResponseFailed(res);
          }
        });
      }
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
