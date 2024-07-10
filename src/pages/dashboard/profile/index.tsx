import LoadingPage from "@/components/Layout/LoadingPage";
import ProfileUserView from "@/components/Page/User/ProfileUserView";
import fetcher from "@/lib/swr/fetcher";
import Custom500 from "@/pages/500";
import React from "react";
import useSWR from "swr";

const ProfileUserPage = () => {
  const { data, error, isLoading } = useSWR("/api/user/profile", fetcher);
  if (error) return <Custom500 />;
  if (isLoading) return <LoadingPage />;
  return <ProfileUserView bio={data} />;
};

export default ProfileUserPage;
