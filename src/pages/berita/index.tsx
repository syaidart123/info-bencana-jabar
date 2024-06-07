import BeritaPageView from "@/components/Page/Berita";
import postService from "@/services/post";
import React from "react";

const BeritaPage = (props: any) => {
  const { posts } = props;

  return <BeritaPageView posts={posts}/>;
};

export default BeritaPage;

export async function getServerSideProps() {
  const {data} = await postService.getPost();
  return {
    props: {
      posts: data.data,
    },
  };
}

