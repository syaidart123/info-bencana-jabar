import TabelDetail from "@/components/Fragment/TabelDetail";
import submissionService from "@/services/submission";
import Head from "next/head";
import React from "react";

const PageDataBencana = (props: any) => {
  const { submission } = props;
  return (
    <>
      <Head>
        <title>Info Bencana Jabar | Data Bencana</title>
      </Head>
      <TabelDetail dataSubmission={submission} />;
    </>
  );
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
