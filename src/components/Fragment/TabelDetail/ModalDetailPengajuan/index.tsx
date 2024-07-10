import Modal from "@/components/UI/Modal";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import formatRupiah from "@/utils/formatRupiah";
import formatTanggal from "@/utils/formatTanggal";
import TextInput from "@/components/UI/TextInput";
import PieChart from "@/components/UI/PieChart";

ChartJS.register(Tooltip, Legend, ArcElement);

const ModalDetailPengajuan = (props: any) => {
  const { detailSubmission, setDetailSubmission } = props;

  const totalBantuan = detailSubmission.bantuan
    ? detailSubmission.bantuan.reduce(
        (total: any, item: any) => total + (item.nominal || 0),
        0,
      )
    : 0;

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
        (label: any) => detailSubmission.kerusakan[label],
      );

      const korbanLabels = Object.keys(detailSubmission.korban);
      const labelKorban = korbanLabels.map((label: any) => {
        const jumlah = detailSubmission.korban[label];
        return `${label} : ${jumlah} `;
      });
      const dataKorban = korbanLabels.map(
        (label: any) => detailSubmission.korban[label],
      );
      setKerusakan({
        labels: labelkerusakan,
        datasets: [
          {
            label: "Kerusakan",
            data: dataKerusakan,
            backgroundColor: [
              "rgba(230, 57, 70, 0.7)",
              "rgba(69, 123, 157, 0.7)",
              "rgba(168, 218, 220, 0.7)",
            ],
            hoverBackgroundColor: ["#E63946", "#457b9d", "#A8DADC"],
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
              "rgba(230, 57, 70, 0.7)",
              "rgba(69, 123, 157, 0.7)",
              "rgba(168, 218, 220, 0.7)",
            ],
            hoverBackgroundColor: ["#E63946", "#457b9d", "#A8DADC"],
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
            <p className="px-5 py-5 text-3xl font-bold text-primary">
              Detail Bencana
            </p>
            <hr className="my-5 md:my-3" />
            <div className="mx-5 flex flex-col items-start gap-5 rounded-md border bg-white p-5 shadow-md">
              <div className="w-full md:flex md:gap-7 lg:justify-between">
                <div className="mb-5 flex flex-col items-start md:w-2/4">
                  <Image
                    src={detailSubmission.image}
                    width={1000}
                    height={1000}
                    alt="foto"
                    className="w-full rounded-md border object-contain object-top"
                  />
                </div>
                <div className="md:w-2/4">
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
                    {detailSubmission.bantuan
                      ? formatRupiah(totalBantuan)
                      : formatRupiah(0)}
                  </TextInput>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      defaultValue={detailSubmission.status}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
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
            <div className="mx-5 my-10 rounded-md border bg-white p-4 shadow-md">
              <p className="text-lg font-bold">Grafik Kerusakan & Korban</p>
              <hr className="my-3" />
              <div className="flex flex-col gap-5 py-5 md:flex-row md:gap-2">
                <div className="w-full rounded-md border p-4 shadow-md md:w-1/2">
                  <p className="text-center text-xl">Kerusakan</p>
                  <hr className="my-3" />
                  <PieChart data={kerusakan} option={option} />
                </div>
                <div className="w-full rounded-md border p-4 shadow-md md:w-1/2">
                  <p className="text-center text-xl">Korban</p>
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
