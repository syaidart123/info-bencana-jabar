// import { addSubmission } from "@/services/submission/service";
// import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";
// import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
// import { verify } from "@/utils/verifyToken";
// import {
//   apiResponseFailed,
//   apiResponseMethodNotAllowed,
//   apiResponseSuccess,
// } from "@/utils/responseApi";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     verify(req, res, false, async () => {
//       let data = req.body;
//       await addSubmission(data, (status: boolean, result: any) => {
//         if (status) {
//           apiResponseSuccess(res, result.id);
//         } else {
//           apiResponseFailed(res);
//         }
//       });
//     });
//   } else if (req.method === "GET") {
//     verify(req, res, false, async () => {
//       const Submissions = await retrieveData("submissions");
//       const data = Submissions.map((submission: any) => {
//         return submission;
//       });
//       apiResponseSuccess(res, data);
//     });
//   } else if (req.method === "PUT") {
//     verify(req, res, true, async () => {
//       const { data } = req.body;
//       const { user }: any = req.query;
//       await updateData("submissions", user[2], data, (result: boolean) => {
//         if (result) {
//           apiResponseSuccess(res);
//         } else {
//           apiResponseFailed(res);
//         }
//       });
//     });
//   } else if (req.method === "DELETE") {
//     const { user }: any = req.query;
//     verify(req, res, true, async () => {
//       await deleteData("submissions", user[2], (result: boolean) => {
//         if (result) {
//           apiResponseSuccess(res);
//         } else {
//           apiResponseFailed(res);
//         }
//       });
//     });
//   } else {
//     apiResponseMethodNotAllowed(res);
//   }
// }

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };
