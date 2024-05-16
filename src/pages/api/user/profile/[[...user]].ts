import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1] || "";    
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const profile: any = await retrieveDataById("users", decoded.id);
            if (profile) {
              profile.id = decoded.id;
              res.status(200).json({
                status: true,
                statusCode: 200,
                msg: "success",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                msg: "not found",
                data: {},
              });
            }
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              msg: "Access Denied",
              data: {},
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const { user }: any = req.query;
    const token: any = req.headers.authorization?.split(" ")[1] || "";
    res
      .status(200)
      .json({ status: true, statusCode: 200, msg: "success", data: data });
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData("users", user[0], data, (status: boolean) => {
            if (status) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, msg: "success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, msg: "failled" });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            msg: "Access Denied",
          });
        }
        res.status(200).json({ status: true });
      }
    );
  }
}
