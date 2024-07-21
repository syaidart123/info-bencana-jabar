import FilterSelect from "@/components/Fragment/filterSelect";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PengajuanView from "@/components/Page/Admin/SubmissionAdminView";
import submissionService from "@/services/submission";
import Head from "next/head";
import React, { useState } from "react";

const PengajuanPage = (props: any) => {
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
        <title>Info Bencana Jabar | Laporan</title>
      </Head>
      <div>
        <DashboardLayout type="Admin">
          <div>
            <div className="flex">
              <p className="my-3 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
                Laporan Bencana
              </p>
            </div>
            <FilterSelect
              className="mb-5 lg:w-1/2"
              setSelectedBencana={setSelectedBencana}
              setSelectedDaerah={setSelectedDaerah}
              setSelectedStartDate={setSelectedStartDate}
              setSelectedEndDate={setSelectedEndDate}
            />
          </div>
          <PengajuanView submission={filteredData} />
        </DashboardLayout>
      </div>
    </>
  );
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
