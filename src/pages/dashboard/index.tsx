import StatusPengajuanView from "@/components/Page/User/SubmissionUserView";
import serviceUser from "@/services/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DashboardUserPage = () => {
  const [submission, setSubmission] = useState([]);
  const session: any = useSession();

  const getSubmissions = async () => {
    if (session.data?.accessToken && Object.keys(submission).length === 0) {
      const { data } = await serviceUser.getSubmissionByUser();
      setSubmission(data.data);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, [session]);
  return <StatusPengajuanView submission={submission} />;
};

export default DashboardUserPage;
