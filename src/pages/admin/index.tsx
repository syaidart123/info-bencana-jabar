import DashboardAdminView from "@/components/Page/Admin/DashboardAdminView";
import postService from "@/services/post";
import submissionService from "@/services/submission";
import React from "react";

const DashboardAdmin = ({ submission, post }: any) => {
  return (
    <div>
      <DashboardAdminView submission={submission} post={post} />
    </div>
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
