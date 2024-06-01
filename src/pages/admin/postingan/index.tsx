import PostAdminView from "@/components/Page/Admin/PostAdminView";
import postService from "@/services/post";
import React from "react";

const PostAdminPage = (props: any) => {
  const { posts } = props;
  
  return <PostAdminView posts={posts} />;
};

export default PostAdminPage;

export async function getServerSideProps() {
  const {data} = await postService.getPost();
  return {
    props: {
      posts: data.data,
    },
  };
}
