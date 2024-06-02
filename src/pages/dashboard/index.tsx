import StatusPengajuanView from "@/components/Page/User/SubmissionUserView";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/swr/fetcher";

const DashboardUserPage = () => {
  const { data, error, isLoading } = useSWR("/api/user/submission", fetcher);

  if (error) return <div>Error loading submissions</div>;
  if (isLoading) return <div>Loading...</div>;

  return <StatusPengajuanView submissions={data} />;
};

export default DashboardUserPage;
