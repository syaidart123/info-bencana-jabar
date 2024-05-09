import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import submissionService from "@/services/pengajuan";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import PieChart from "@/components/UI/PieChart";
import BarChart from "@/components/UI/BarChart";
import { Doughnut } from "react-chartjs-2";

const ModalUpdatePengajuan = (props: any) => {
  const { updatedSubmission, setUpdatedSubmission, setDataSubmission } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const [korban, setKorban] = useState<any>({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });
  const [kerusakan, setKerusakan] = useState<any>({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });

  useEffect(() => {
    if (updatedSubmission) {
      const kerusakanLabels = Object.keys(updatedSubmission.kerusakan);
      const labelkerusakan = kerusakanLabels.map((label: any) => {
        const jumlah = updatedSubmission.kerusakan[label];
        return `${label} : ${jumlah} `;
      });
      const dataKerusakan = kerusakanLabels.map(
        (label: any) => updatedSubmission.kerusakan[label]
      );

      const korbanLabels = Object.keys(updatedSubmission.korban);
      const labelKorban = korbanLabels.map((label: any) => {
        const jumlah = updatedSubmission.korban[label];
        return `${label} : ${jumlah} `;
      });
      const dataKorban = korbanLabels.map(
        (label: any) => updatedSubmission.korban[label]
      );
      setKerusakan({
        labels: labelkerusakan,
        datasets: [
          {
            label: "Kerusakan",
            data: dataKerusakan,
            backgroundColor: [
              "rgba(153, 102, 255, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            hoverOffset: 4,
          },
        ],
      });
      setKorban({
        labels: labelKorban,
        datasets: [
          {
            label: "Korban",
            data: dataKorban,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [updatedSubmission]);


 

  const option: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };
  
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      status: form.status.value,
    };
    
    const result = await submissionService.updateSubmission(
      updatedSubmission.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedSubmission({});
      const { data } = await submissionService.getSubmission(
      );
      setDataSubmission(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal onClose={() => setUpdatedSubmission({})}>
      <form>
          <div className="flex flex-col">
           <p className="text-3xl font-semibold px-5 py-3">Detail Bencana</p>
            <hr />
            <div className="flex gap-5 flex-col items-start mt-5 mx-5 border p-5 bg-white rounded-md shadow-md">
                <Image
                  src={updatedSubmission.image}
                  width={500}
                  height={500}
                  alt="foto"
                  className="mb-5 rounded-md w-full h-full object-cover "
                />
                <div className=" w-full md:flex md:justify-between xl:gap-10">
                  <div className="xl:w-2/4">
                    <div className="mb-4">

                  <p className="text-sm font-medium text-gray-700">
                    Nama Pelapor:
                  </p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.namaPelapor}
                  </p>
                  </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    Jenis Bencana:
                  </p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.jenisBencana}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Penyebab:</p>
                  <p className="text-md font-medium">
                    {updatedSubmission.penyebab}
                  </p>
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    defaultValue={updatedSubmission.status}
                    className="border py-3 px-4 mt-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    disabled
                  >
                    <option disabled>Status...</option>
                    <option value="Terkirim">Terkirim</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
                  </div>
               <div className="xl:w-2/4">
               <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Daerah:</p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.daerah}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Lokasi:</p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.lokasi}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    Lokasi Pengungsian:
                  </p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.pengungsian.lokasiPengungsian}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    Jumlah Tenda:
                  </p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.pengungsian.tenda}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    Jumlah Pengungsi:
                  </p>
                  <p className="text-lg font-semibold">
                    {updatedSubmission.pengungsian.pengungsi}
                  </p>
                </div>
                
               </div>
                </div>
                </div>
            <div className="bg-white mx-5 shadow-md border rounded-md p-4 my-10">
              <p className="text-lg font-bold ">Grafik Kerusakan</p>
              <hr className="my-5" />

              <div className="flex justify-center py-5 items-center gap-3">
                <div className="w-1/2 max-w-xs p-3 border rounded-md shadow-md">
                  <p className="text-xl text-center border-b-2">Kerusakan</p>
                  <PieChart data={kerusakan} option={option} />
                </div>
                <div className="w-1/2 max-w-xs p-3 border rounded-md shadow-md">
                  <p className="text-xl text-center border-b-2">Korban</p>
                  {/* <PieChart data={korban} option={option} /> */}
                  <Doughnut data={korban} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdatePengajuan;
