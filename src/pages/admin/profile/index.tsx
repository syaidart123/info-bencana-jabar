import ProfileAdminView from "@/components/Page/Admin/ProfileAdminView";
import fetcher from "@/lib/swr/fetcher";
import React from "react";
import useSWR from "swr";

const ProfilePage = () => {
  const { data, error, isLoading } = useSWR("/api/user/profile", fetcher);
  if (error) return <div>Error loading submissions</div>;
  if (isLoading) return <div>Loading...</div>;

  return <ProfileAdminView bio={data} />;
};

export default ProfilePage;
