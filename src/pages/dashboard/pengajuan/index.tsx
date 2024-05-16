import StatusPengajuanView from "@/components/Page/User/StatusPengajuanView";
import submissionService from "@/services/pengajuan";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const StatusPengajuanPage = () => {
  const [submission, setSubmission] = useState([]);
  const session: any = useSession();

  useEffect(() => {
    const getSubmissions = async () => {
      if (session.data?.accessToken && Object.keys(submission).length === 0) {
        const { data } = await submissionService.getSubmissionByUser(
          session.data?.accessToken
        );
        setSubmission(data.data);
      }
    };
    getSubmissions();
  }, [session, submission]);
  return <StatusPengajuanView submission={submission} />;
};

export default StatusPengajuanPage;
