import Tabel from "@/components/UI/Tabel";
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
      <Tabel dataSubmission={submission} />;
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
