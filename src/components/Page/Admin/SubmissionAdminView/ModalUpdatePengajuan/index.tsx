import Modal from "@/components/UI/Modal";
import submissionService from "@/services/submission";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import PieChart from "@/components/UI/PieChart";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";

const ModalUpdatePengajuan = (props: any) => {
  const { updatedSubmission, setUpdatedSubmission, setDataSubmission } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);
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
        position: "bottom",
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
      data
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedSubmission({});
      const { data } = await submissionService.getSubmission();
      setDataSubmission(data.data);
      setToaster({
        variant: "success",
        message: "Pengajuan Berhasil Di Update",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Pengajuan Gagal Di Update",
      });
    }
  };

  return (
    <>
      <Modal onClose={() => setUpdatedSubmission({})}>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col">
            <p className="text-xl xl:text-3xl font-semibold px-5 py-2">
              Update Pengajuan Bencana
            </p>
            <hr className="my-5 xl:my-2 " />
            <div className="flex gap-5 flex-col items-start mx-5 border p-5 bg-white rounded-md shadow-md">
              <div className="w-full xl:flex xl:justify-between xl:gap-7">
                <div className="xl:w-2/4 border flex items-center justify-center shadow-md mb-5 rounded-md">
                  <Image
                    src={updatedSubmission.image}
                    width={800}
                    height={800}
                    alt="foto"
                    className="rounded-md w-full h-full object-cover object-center"
                  />
                </div>
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
                    <p className="text-sm font-medium text-gray-700">
                      Penyebab:
                    </p>
                    <p className="text-md font-medium">
                      {updatedSubmission.penyebab}
                    </p>
                  </div>
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

                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      defaultValue={updatedSubmission.status}
                      name="status"
                      className="border py-3 px-4 mt-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <option disabled>Status...</option>
                      <option value="Terkirim">Terkirim</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-sky-500 text-white"
                    >
                      {isLoading ? "Loading..." : "Update"}
                    </Button>
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

export default ModalUpdatePengajuan;
