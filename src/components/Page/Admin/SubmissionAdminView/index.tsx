import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import React, { useEffect, useState } from "react";
import ModalUpdatePengajuan from "./ModalUpdatePengajuan";
import { ClipboardPen, Trash2 } from "lucide-react";
import ModalDeletePengajuan from "./ModalDeletePengajuan";
import Image from "next/image";
import Tabel from "@/components/UI/Tabel";
import FilterSelect from "@/components/Fragment/filterSelect";

const head = ["No", "Foto", "Jenis Bencana", "Lokasi", "Status", "Aksi"];

const PengajuanView = (props: any) => {
  const { submission } = props;
  const [dataSubmission, setDataSubmission] = useState<any>(submission);
  const [deletedSubmission, setDeletedSubmission] = useState({});
  const [updatedSubmission, setUpdatedSubmission] = useState({});
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

  useEffect(() => {
    setDataSubmission(submission);
  }, [submission]);

  return (
    <div>
      <DashboardLayout type="Admin">
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
        <div>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-x-auto rounded-md border shadow-md">
                  <Tabel head={head}>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((sub: any, index: number) => {
                          return (
                            <tr
                              className="odd:bg-white even:bg-gray-100"
                              key={index}
                            >
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap rounded-md px-6 py-4 text-sm font-medium text-gray-800">
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
                                {sub.lokasi}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                                {sub.status}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    onClick={() => setUpdatedSubmission(sub)}
                                  >
                                    <div className="rounded-md bg-yellow-500 px-4 py-2 text-white">
                                      <ClipboardPen />
                                    </div>
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => setDeletedSubmission(sub)}
                                  >
                                    <div className="rounded-md bg-tertiary px-4 py-2 text-white">
                                      <Trash2 />
                                    </div>
                                  </Button>
                                </div>
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
                                Tidak ada Laporan
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Tabel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      {Object.keys(updatedSubmission).length > 0 ? (
        <ModalUpdatePengajuan
          updatedSubmission={updatedSubmission}
          setUpdatedSubmission={setUpdatedSubmission}
          setDataSubmission={setDataSubmission}
        />
      ) : null}
      {Object.keys(deletedSubmission).length > 0 ? (
        <ModalDeletePengajuan
          deletedSubmission={deletedSubmission}
          setDeletedSubmission={setDeletedSubmission}
          setDataSubmission={setDataSubmission}
        />
      ) : null}
    </div>
  );
};

export default PengajuanView;
