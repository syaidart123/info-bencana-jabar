import DashboardAdminView from "@/components/Page/Admin/DashboardAdminView";
import postService from "@/services/post";
import submissionService from "@/services/submission";
import Head from "next/head";
import React from "react";

const DashboardAdmin = ({ submission, post }: any) => {
  return (
    <>
      <Head>
        <title>Dashboard Admin</title>
      </Head>
      <DashboardAdminView submission={submission} post={post} />
    </>
  );
};
export default DashboardAdmin;

export async function getServerSideProps() {
  const { data } = await submissionService.getSubmission();
  const post = await postService.getPost();
  return {
    props: {
      submission: data.data,
      post: post.data.data,
    },
  };
}
