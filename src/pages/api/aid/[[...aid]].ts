import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import {
  apiResponseFailed,
  apiResponseMethodNotAllowed,
  apiResponseSuccess,
} from "@/utils/responseApi";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("aids");
    apiResponseSuccess(res, data);
  } else if (req.method === "POST") {
    verify(req, res, true, async () => {
      let data = req.body;
      data.Status = "Diproses";
      data.created_at = new Date();
      data.updated_at = new Date();

      await addData("aids", data, (status: boolean, result: any) => {
        if (status) {
          apiResponseSuccess(res, { id: result.id });
        } else {
          apiResponseFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { aid }: any = req.query;
      const { data } = req.body;
      await updateData("aids", aid[0], data, (status: boolean) => {
        if (status) {
          apiResponseSuccess(res);
        } else {
          apiResponseFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { aid }: any = req.query;
      await deleteData("aids", aid[0], (result: boolean) => {
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
