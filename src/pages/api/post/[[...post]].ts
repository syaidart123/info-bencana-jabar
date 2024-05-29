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
    const { post } = req.query;
    if (post && post[0]) {
      const data = await retrieveDataById("posts", post[0]);
      apiResponseSuccess(res, data);
    } else {
      const data = await retrieveData("posts");
      apiResponseSuccess(res, data);
    }
  } else if (req.method === "POST") {
    verify(req, res, true, async () => {
      let data = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();
      await addData("posts", data, (status: boolean, result: any) => {
        if (status) {
          apiResponseSuccess(res, { id: result.id });
        } else {
          apiResponseFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { post }: any = req.query;
      const { data } = req.body;
      await updateData("posts", post[0], data, (status: boolean) => {
        if (status) {
          apiResponseSuccess(res);
        } else {
          apiResponseFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { post }: any = req.query;
      await deleteData("posts", post[0], (result: boolean) => {
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
