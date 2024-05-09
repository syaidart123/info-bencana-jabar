import { addSubmission } from "@/services/pengajuan/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          let data = req.body;
          await addSubmission(data, (status: boolean, result: any) => {
            if (status) {
              res
                .status(200)
                .json({
                  status: true,
                  statusCode: 200,
                  msg: "suksess",
                  data: { id: result.id },
                });
            }else{
              res.status(400).json({status:false,statusCode:400,msg:"failed",data:{},});
            }
          });
        }else{
          res.status(403).json({status:false,statusCode:403,msg:"Access Denied"})
        }
      }
    );
  } else if (req.method === "GET") {
    const Submissions = await retrieveData("submissions");
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          const data = Submissions.map((submission: any) => {
            return submission;
          });
          res
            .status(200)
            .json({ status: true, statusCode: 200, msg: "sukses", data });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, msg: "Access Danied" });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    res
      .status(200)
      .json({ status: true, statusCode: 200, msg: "sukses", data });
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("submissions", user[2], data, (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, msg: "suksess" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, msg: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, msg: "Access Denied" });
        }
        res.status(200).json({ status: true });
      }
    );
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("submissions", user[2], (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, msg: "suksess" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, msg: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, msg: "Access Denied" });
        }
        res.status(200).json({ status: true });
      }
    );
  } else {
    res
      .status(404)
      .json({ status: false, statusCode: 404, msg: "Method not found" });
  }
}
