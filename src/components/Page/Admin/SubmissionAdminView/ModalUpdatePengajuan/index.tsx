import Modal from "@/components/UI/Modal";
import submissionService from "@/services/submission";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import PieChart from "@/components/UI/PieChart";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";
import formatRupiah from "@/utils/formatRupiah";
import Input from "@/components/UI/Input";
import SelectOption from "@/components/UI/SelectOption";
import Option from "@/components/UI/Option";
import TextInput from "@/components/UI/TextInput";
import formatTanggal from "@/utils/formatTanggal";

const ModalUpdatePengajuan = (props: any) => {
  const { updatedSubmission, setUpdatedSubmission, setDataSubmission } = props;  
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);
  const [aidCount, setAidCount] = useState(updatedSubmission.bantuan || [
    { lembaga: "", jenisBantuan: "", namaBantuan: "", nominal: 0 },
  ]);

  
  const totalBantuan = updatedSubmission.bantuan ? updatedSubmission.bantuan.reduce((total:any,item:any)=> total + (item.nominal || 0), 0) : 0;

  const totalNominalAid = aidCount
  .map((item: any) => parseInt(item.nominal) || 0)  
  .reduce((total: any, item: any) => total + item, 0);  
  
  const handleAid = (e: any, i: number, type: string) => {
    const newAidCount: any = [...aidCount];
    newAidCount[i][type] = e.target.value;
    setAidCount(newAidCount);
  };


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
    const Bantuan = aidCount.map((item: any) => {
      return{
        lembaga: item.lembaga,
        jenisBantuan: item.jenisBantuan,
        namaBantuan: item.namaBantuan,
        nominal: parseInt(`${item.nominal}`),
      }
    })
    const data = {
      status: form.status.value,
      bantuan: Bantuan,
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
              <div className="xl:w-2/4 flex flex-col items-start  mb-5">
                  <Image
                    src={updatedSubmission.image}
                    width={1000}
                    height={1000}
                    alt="foto"
                    className="rounded-md w-full border object-contain object-top"
                  />
                </div>
                <div className="xl:w-2/4">
                <TextInput title="Nama Pelapor:">
                    {updatedSubmission.namaPelapor}
                  </TextInput>
                  <TextInput title="Jenis Bencana:">
                    {updatedSubmission.jenisBencana}
                  </TextInput>
                  <TextInput title="Deskripsi Kejadian:">
                    {updatedSubmission.deskripsiKejadian}
                  </TextInput>
                  <TextInput title="Daerah:">
                    {updatedSubmission.daerah}
                  </TextInput>
                  <TextInput title="Lokasi:">
                    {updatedSubmission.lokasi}
                  </TextInput>
                  <TextInput title="Tanggal">
                    {formatTanggal(updatedSubmission.tanggal)}
                  </TextInput>
                  <TextInput title="Taksiran Kerugian:">
                    {formatRupiah(updatedSubmission.taksiranKerugian)}
                  </TextInput>
                  <TextInput title="Total Bantuan:">
                    {updatedSubmission.bantuan ? formatRupiah(totalBantuan) : formatRupiah(0)}
                  </TextInput>
                  <TextInput title="Jumlah Tenda:">
                    {updatedSubmission.pengungsian.tenda}
                  </TextInput>
                  <TextInput title="Jumlah Pengungsi:">
                    {updatedSubmission.pengungsian.pengungsi}
                  </TextInput>
                 

                  {/* <div className="mb-4 w-full">
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
                  </div> */}
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
            <div className="bg-white mx-5 shadow-md border rounded-md p-4 my-10">
              {/* <p className="text-lg font-bold ">Bantuan</p>
              <hr className="my-3" /> */}
              <div className="mt-5">
            <label htmlFor="bantuan" className="text-lg font-bold">
            <p></p> Tambahkan Bantuan
            </label>
            {aidCount.map(
              (
                bantuan: {
                  lembaga: string;
                  jenisBantuan: string;
                  namaBantuan: string;
                  nominal: number;
                },
                i: number
              ) => (
                <div key={i}>
                  <div className="grid grid-cols-4 gap-4">
                    <SelectOption
                      name="lembaga"
                      title="Pilih..."
                      label="Lembaga"
                      onChange={(e) => handleAid(e, i, "lembaga")}
                      defaultValue={bantuan.lembaga}
                      required
                    >
                      <Option value="Human Initiative">Human Initiative</Option>
                      <Option value="IZI">IZI</Option>
                    </SelectOption>

                    <SelectOption
                      name="jenisBantuan"
                      title="Pilih..."
                      label="Jenis Bantuan"
                      onChange={(e) => handleAid(e, i, "jenisBantuan")}
                      defaultValue={bantuan.jenisBantuan}
                      required
                    >
                      <Option value="Rupiah">Rupiah</Option>
                      <Option value="Barang">Barang</Option>
                    </SelectOption>
                    <Input
                      name="namaBantuan"
                      label="Nama Bantuan"
                      placeholder="Nama Bantuan"
                      defaultValue={bantuan.namaBantuan}
                      type="text"
                      onChange={(e) => handleAid(e, i, "namaBantuan")}
                    />
                   
                    <Input
                      name="nominal"
                      label="Nominal"
                      placeholder="Nominal"
                      type="number"
                      defaultValue={bantuan.nominal}
                      disabled={bantuan.jenisBantuan === "" ? true : false}
                      onChange={(e) => handleAid(e, i, "nominal")}
                      required
                    />
                  </div>
                </div>
              )
            )}
          </div>
              <div className="flex justify-between items-center">
            <Button
              type="button"
              className={"my-2"}
              onClick={() =>
                setAidCount([
                  ...aidCount,
                  {
                    lembaga: "",
                    jenisBantuan: "",
                    namaBantuan: "",
                    nominal: 0,
                  },
                ])
              }
            >
              <span className="bg-sky-500 rounded-md text-white py-2 px-4">
                Tambah Bantuan
              </span>
            </Button>
            <p className="text-md font-bold">Total Nominal : {formatRupiah(totalNominalAid)}</p>
            </div>
            <div className="mt-5">
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
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdatePengajuan;
