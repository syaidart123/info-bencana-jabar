import BeritaPageView from "@/components/Page/Berita";
import postService from "@/services/post";
import Head from "next/head";
import React from "react";

const BeritaPage = (props: any) => {
  const { postData } = props;

  return (
    <>
      <Head>
        <title>Info Bencana Jabar | Berita</title>
      </Head>
      <BeritaPageView postData={postData} />;
    </>
  );
};

export default BeritaPage;

export async function getServerSideProps() {
  const { data } = await postService.getPost();
  return {
    props: {
      postData: data.data,
    },
  };
}
