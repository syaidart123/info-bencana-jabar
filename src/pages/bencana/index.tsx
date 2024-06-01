import Tabel from "@/components/UI/Tabel";
import submissionService from "@/services/submission";
import React from "react";

const PageDataBencana = (props: any) => {
  const { submission } = props;  
  return <Tabel dataSubmission={submission} />;
};

export default PageDataBencana;

export async function getServerSideProps() {
  const { data } = await submissionService.getSubmission();
  return {
    props: {
      submission: data.data,
    },
  };
}
