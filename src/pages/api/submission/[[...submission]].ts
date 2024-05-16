import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataByUser,
  updateData,
} from "@/lib/firebase/service";

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
            try {
              const Submissions: any = await retrieveDataByUser("submissions", decoded.email);              
              const data = Submissions.map((submission: any) => {
                return submission;
              });
              res.status(200).json({ status: true, statusCode: 200, msg: "Success", data });
            } catch (error) {
              console.error('Error fetching user submissions:', error);
              res.status(500).json({ status: false, statusCode: 500, msg: "Internal server error" });
            }
          } else {
            res.status(403).json({ status: false, statusCode: 403, msg: "Access Denied" });
          }
        }
      );
    } else {
      try {
        const Submissions: any = await retrieveData("submissions");
        const data = Submissions.map((submission: any) => {
          return submission;
        });
        res.status(200).json({ status: true, statusCode: 200, msg: "Success", data });
      } catch (error) {
        console.error('Error fetching all submissions:', error);
        res.status(500).json({ status: false, statusCode: 500, msg: "Internal server error" });
      }
    }
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          let data = req.body;
          data.created_at = new Date();
          data.updated_at = new Date();
          data.status = "Terkirim";
          await addData("submissions", data, (status: boolean, result: any) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                msg: "suksess",
                data: { id: result.id },
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                msg: "failed",
                data: {},
              });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, msg: "Access Denied" });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { submission }: any = req.query;
    console.log(submission);
    
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { data } = req.body;
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData(
            "submissions",
            submission[0],
            data,
            (status: boolean) => {
              if (status) {
                res
                  .status(200)
                  .json({ status: true, statusCode: 200, msg: "sukses" });
              } else {
                res
                  .status(400)
                  .json({ status: false, statusCode: 400, msg: "failed" });
              }
            }
          );
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, msg: "Access Denied" });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { submission }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await deleteData("submissions", submission[0], (result: boolean) => {
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
  }
}
