import Modal from "@/components/UI/Modal";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import PieChart from "../../PieChart";
import formatRupiah from "@/utils/formatRupiah";
import TextInput from "../../TextInput";
import formatTanggal from "@/utils/formatTanggal";

ChartJS.register(Tooltip, Legend, ArcElement);

const ModalDetailPengajuan = (props: any) => {
  const { detailSubmission, setDetailSubmission } = props;

  const totalBantuan = detailSubmission.bantuan ? detailSubmission.bantuan.reduce((total:any,item:any)=> total + (item.nominal || 0), 0) : 0;


  const [isLoading, setIsLoading] = useState(false);
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
    if (detailSubmission) {
      const kerusakanLabels = Object.keys(detailSubmission.kerusakan);
      const labelkerusakan = kerusakanLabels.map((label: any) => {
        const jumlah = detailSubmission.kerusakan[label];
        return `${label} : ${jumlah} `;
      });
      const dataKerusakan = kerusakanLabels.map(
        (label: any) => detailSubmission.kerusakan[label]
      );

      const korbanLabels = Object.keys(detailSubmission.korban);
      const labelKorban = korbanLabels.map((label: any) => {
        const jumlah = detailSubmission.korban[label];
        return `${label} : ${jumlah} `;
      });
      const dataKorban = korbanLabels.map(
        (label: any) => detailSubmission.korban[label]
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
  }, [detailSubmission]);

  const option: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <>
      <Modal onClose={() => setDetailSubmission({})}>
        <form>
          <div className="flex flex-col">
            <p className="text-3xl font-semibold px-5 py-3">Detail Bencana</p>
            <hr />
            <div className="flex gap-5 flex-col items-start mt-5 mx-5 border p-5 bg-white rounded-md shadow-md">
              <div className="w-full xl:flex xl:justify-between xl:gap-7 py-5">
                <div className="xl:w-2/4 flex flex-col items-start  mb-5">
                  <Image
                    src={detailSubmission.image}
                    width={1000}
                    height={1000}
                    alt="foto"
                    className="rounded-md w-full border object-contain object-top"
                  />
                </div>
                <div className="xl:w-2/4">
                  <TextInput title="Nama Pelapor:">
                    {detailSubmission.namaPelapor}
                  </TextInput>
                  <TextInput title="Jenis Bencana:">
                    {detailSubmission.jenisBencana}
                  </TextInput>
                  <TextInput title="Deskripsi Kejadian:">
                    {detailSubmission.deskripsiKejadian}
                  </TextInput>
                  <TextInput title="Daerah:">
                    {detailSubmission.daerah}
                  </TextInput>
                  <TextInput title="Lokasi:">
                    {detailSubmission.lokasi}
                  </TextInput>
                  <TextInput title="Tanggal">
                    {formatTanggal(detailSubmission.tanggal)}
                  </TextInput>

                  <TextInput title="Taksiran Kerugian:">
                    {formatRupiah(detailSubmission.taksiranKerugian)}
                  </TextInput>
                  <TextInput title="Total Bantuan:">
                    {detailSubmission.bantuan ? formatRupiah(totalBantuan) : formatRupiah(0)}
                  </TextInput>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      defaultValue={detailSubmission.status}
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
              </div>
            </div>
            <div className="bg-white mx-5 shadow-md border rounded-md p-4 my-10">
              <p className="text-lg font-bold ">Grafik Kerusakan & Korban</p>
              <hr className="my-3" />
              <div className="flex flex-col xl:flex-row justify-center py-10 items-center gap-5">
                <div className="w-full lg:w-1/2 max-w-xs p-3 border rounded-md shadow-md">
                  <p className="text-xl text-center">Kerusakan</p>
                  <hr className="my-3" />
                  <PieChart data={kerusakan} option={option} />
                </div>
                <div className="w-full lg:w-1/2  max-w-xs p-3 border rounded-md shadow-md">
                  <p className="text-xl text-center">Korban</p>
                  <hr className="my-3" />
                  <PieChart data={korban} option={option} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalDetailPengajuan;
