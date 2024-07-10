import Image from "next/image";
import React, { useState } from "react";
import { Scaling } from "lucide-react";
import ModalDetailPengajuan from "./ModalDetailPengajuan";
import FilterSelect from "@/components/Fragment/filterSelect";
import Button from "@/components/UI/Button";
import Tabel from "@/components/UI/Tabel";

type propTypes = {
  dataSubmission: any;
  setDetailSubmission?: any;
};

const head = ["No", "Foto", "Jenis Bencana", "Daerah", "Status", "Detail"];

const TabelDetail = (props: propTypes) => {
  const { dataSubmission } = props;
  const [detailSubmission, setDetailSubmission] = useState({});
  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

  const filteredData = dataSubmission.filter((item: any) => {
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
      <main className="h-screen px-10">
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Data Bencana
          </p>
        </div>
        <FilterSelect
          className="mb-5 lg:w-1/2"
          setSelectedBencana={setSelectedBencana}
          setSelectedDaerah={setSelectedDaerah}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
        />
        <table className="min-w-full divide-y divide-gray-200"></table>
        <div className="flex w-full overflow-x-auto rounded-md border shadow-md">
          <Tabel head={head}>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((sub: any, index: number) => {
                  return (
                    <tr className="odd:bg-white even:bg-gray-100" key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        {index + 1}.
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        <Image
                          src={sub.image}
                          width={100}
                          height={100}
                          alt="foto"
                          className="max-h-20 rounded-lg object-cover shadow-lg"
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        {sub.jenisBencana}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                        {sub.daerah}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                        {sub.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-start text-sm font-medium">
                        <Button
                          type="button"
                          onClick={() => setDetailSubmission(sub)}
                        >
                          <div className="rounded-md bg-tertiary px-4 py-2 text-white">
                            <Scaling />
                          </div>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="whitespace-nowrap bg-white px-6 py-4 text-center text-sm text-gray-800"
                  >
                    <div className="flex flex-col items-center">
                      <Image
                        src={`/images/noData.png`}
                        alt="No Data"
                        width={400}
                        height={400}
                        className="rounded-lg object-cover"
                      />
                      <p className="py-3 text-lg font-semibold">
                        Tidak ada data bencana
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Tabel>
        </div>
      </main>
      {Object.keys(detailSubmission).length > 0 ? (
        <ModalDetailPengajuan
          setDetailSubmission={setDetailSubmission}
          detailSubmission={detailSubmission}
        />
      ) : null}
    </>
  );
};

export default TabelDetail;
