import LoadingPage from "@/components/Layout/LoadingPage";
import ProfileAdminView from "@/components/Page/Admin/ProfileAdminView";
import fetcher from "@/lib/swr/fetcher";
import Custom500 from "@/pages/500";
import Head from "next/head";
import React from "react";
import useSWR from "swr";

const ProfilePage = () => {
  const { data, error, isLoading } = useSWR("/api/user/profile", fetcher);

  if (error) return <Custom500 />;
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Info Bencana Jabar | Profile </title>
      </Head>
      <ProfileAdminView bio={data} />
    </>
  );
};

export default ProfilePage;
