import PengajuanView from "@/components/Page/Admin/SubmissionAdminView";
import submissionService from "@/services/submission";
import React from "react";

const PengajuanPage = (props:any) => {
  const { submission } = props;
  return <PengajuanView submission={submission} />;
};

export default PengajuanPage;

export async function getServerSideProps() {
  const { data } = await submissionService.getSubmission();
  return {
    props: {
      submission: data.data,
    },
  };
}
