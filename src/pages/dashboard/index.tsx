import StatusPengajuanView from "@/components/Page/User/SubmissionUserView";
import React from "react";
import useSWR from "swr";
import fetcher from "@/lib/swr/fetcher";
import LoadingPage from "@/components/Layout/LoadingPage";
import Custom500 from "../500";

const DashboardUserPage = () => {
  const { data, error, isLoading } = useSWR("/api/user/submission", fetcher);

  if (error) return <Custom500 />;
  if (isLoading) return <LoadingPage />;

  return <StatusPengajuanView submissions={data} />;
};

export default DashboardUserPage;
