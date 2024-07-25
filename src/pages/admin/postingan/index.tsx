import FilterSelect from "@/components/Fragment/filterSelect";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PostAdminView from "@/components/Page/Admin/PostAdminView";
import postService from "@/services/post";
import Head from "next/head";
import React, { useState } from "react";

const PostAdminPage = (props: any) => {
  const { posts } = props;
  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

  const filteredData = posts.filter((item: any) => {
    const itemDate = new Date(item.tanggal);
    const matchesBencana = selectedBencana
      ? item.jenisBencana === selectedBencana
      : true;
    const matchesDaerah = selectedDaerah
      ? item.daerah === selectedDaerah
      : true;
    const matchesStartDate = startDate ? itemDate >= startDate : true;
    const matchesEndDate = endDate ? itemDate <= endDate : true;

    return (
      matchesBencana && matchesDaerah && matchesStartDate && matchesEndDate
    );
  });
  return (
    <>
      <Head>
        <title>Info Bencana Jabar | Postingan</title>
      </Head>
      {/* <DashboardLayout type="Admin"> */}

      <PostAdminView posts={filteredData}>
        <div className="flex">
          <p className="my-3 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Postingan Bencana
          </p>
        </div>
        <div className="lg:w-1/2">
          <FilterSelect
            setSelectedBencana={setSelectedBencana}
            setSelectedDaerah={setSelectedDaerah}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
          />
        </div>
      </PostAdminView>
      {/* </DashboardLayout> */}
    </>
  );
};

export default PostAdminPage;

export async function getServerSideProps() {
  const { data } = await postService.getPost();
  return {
    props: {
      posts: data.data,
    },
  };
}
