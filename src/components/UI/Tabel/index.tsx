import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import { Scaling } from "lucide-react";
import ModalDetailPengajuan from "./ModalDetailPengajuan";
import FilterSelect from "@/components/Fragment/filterSelect";

type propTypes = {
  dataSubmission: any;
  setDetailSubmission?: any;
};

const Tabel = (props: propTypes) => {
  const { dataSubmission } = props;
  const [detailSubmission, setDetailSubmission] = useState({});
  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  // Convert string dates to Date objects for comparison
  const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

  const filteredData = dataSubmission.filter((item: any) => {
    const itemDate = new Date(item.tanggal); // Convert the item's date to a Date object
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
      <main className="px-10 h-screen">
        <p className="text-2xl my-10 mx-3">Data Bencana</p>
        <FilterSelect
          className="w-full lg:w-1/2"
          setSelectedBencana={setSelectedBencana}
          setSelectedDaerah={setSelectedDaerah}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
        />
        <div className="flex w-full">
          <table className="w-3/6 min-w-full divide-y divide-gray-200">
            <thead className="bg-sky-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                >
                  Foto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                >
                  Jenis bencana
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                >
                  Daerah
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-end text-xs font-medium text-white uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((sub: any, index: number) => {
                return (
                  <tr className="odd:bg-white even:bg-gray-100" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      <Image
                        src={sub.image}
                        width={100}
                        height={100}
                        alt="foto"
                        className="rounded-lg shadow-lg max-h-20 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      {sub.jenisBencana}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.daerah}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <Button
                        type="button"
                        onClick={() => setDetailSubmission(sub)}
                      >
                        <div className="bg-sky-500 px-4 py-2 rounded-md text-white ">
                          <Scaling />
                        </div>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default Tabel;
