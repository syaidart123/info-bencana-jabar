import FilterSelect from "@/components/Fragment/filterSelect";
import BeritaPageView from "@/components/Page/Berita";
import postService from "@/services/post";
import Head from "next/head";
import React, { useState } from "react";

const BeritaPage = (props: any) => {
  const { postData } = props;

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

  const filteredData = postData.filter((item: any) => {
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
        <title>Info Bencana Jabar | Berita</title>
      </Head>
      <main className="min-h-screen">
        <div className="px-10">
          <div className="flex items-center justify-center lg:items-start lg:justify-start">
            <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
              Berita Kebencanaan
            </p>
          </div>
          <FilterSelect
            className="lg:w-1/2"
            setSelectedBencana={setSelectedBencana}
            setSelectedDaerah={setSelectedDaerah}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
          />
        </div>
        <BeritaPageView postData={postData} />
      </main>
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
