import { signUp } from "@/services/auth/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, statusCode: 200, msg: "suksess" });
      } else {
        res.status(400).json({ status: false, statusCode: 400, msg: "failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, msg: "Method not Allow" });
  }
}
