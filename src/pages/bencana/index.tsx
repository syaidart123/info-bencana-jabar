import FilterSelect from "@/components/Fragment/filterSelect";
import TabelDetail from "@/components/Fragment/TabelDetail";
import Pagination from "@/components/UI/Pagination";
import submissionService from "@/services/submission";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type propsTypes = {
  searchParams: [key: string] | string | string[] | undefined;
  submission: any;
};

const PageDataBencana = (props: propsTypes) => {
  const { submission } = props;

  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

  const filteredData = submission.filter((item: any) => {
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
        <title>Info Bencana Jabar | Data Bencana</title>
      </Head>
      <main className="min-h-screen">
        <div className="px-10">
          <div className="flex items-center justify-center lg:items-start lg:justify-start">
            <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
              Data Bencana
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
        <TabelDetail dataSubmission={filteredData} />
      </main>
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
