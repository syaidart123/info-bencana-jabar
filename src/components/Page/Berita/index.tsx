import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import FilterSelect from "@/components/Fragment/filterSelect";
import Image from "next/image";

type propTypes = {
  postData: any;
  setDetailSubmission?: any;
};

const BeritaPageView = (props: propTypes) => {
  const { postData } = props;

  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

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
    <div className="min-h-svh px-10 pb-20">
      <div className="flex items-center justify-center lg:items-start lg:justify-start">
        <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
          Berita Kebencanaan
        </p>
      </div>
      <div className="mb-5 lg:w-1/2">
        <FilterSelect
          setSelectedBencana={setSelectedBencana}
          setSelectedDaerah={setSelectedDaerah}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
        />
      </div>

      {filteredData.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-y-14">
          {filteredData.map((post: any) => (
            <Link
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
              href={`/berita/${post.id}`}
            >
              <Card post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-70vh rounded-md border py-10">
          <div className="flex flex-col items-center">
            <Image
              src={`/images/noData.png`}
              alt="No Data"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
            <p className="py-3 text-lg font-semibold">Tidak ada Postingan</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeritaPageView;
