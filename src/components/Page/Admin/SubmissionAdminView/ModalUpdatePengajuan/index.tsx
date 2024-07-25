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
  const [aidCount, setAidCount] = useState(
    updatedSubmission.bantuan || [
      { lembaga: "", jenisBantuan: "", namaBantuan: "", qty: 0, nominal: 0 },
    ],
  );

  const totalBantuan = updatedSubmission.bantuan
    ? updatedSubmission.bantuan.reduce(
        (total: any, item: any) => total + (item.nominal || 0),
        0,
      )
    : 0;

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
        (label: any) => updatedSubmission.kerusakan[label],
      );

      const korbanLabels = Object.keys(updatedSubmission.korban);
      const labelKorban = korbanLabels.map((label: any) => {
        const jumlah = updatedSubmission.korban[label];
        return `${label} : ${jumlah} `;
      });
      const dataKorban = korbanLabels.map(
        (label: any) => updatedSubmission.korban[label],
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
      return {
        lembaga: item.lembaga,
        jenisBantuan: item.jenisBantuan,
        namaBantuan: item.namaBantuan,
        qty: parseInt(`${item.qty}`),
        nominal: parseInt(`${item.nominal}`),
      };
    });
    const data = {
      status: form.status.value,
      bantuan: Bantuan,
    };

    const result = await submissionService.updateSubmission(
      updatedSubmission.id,
      data,
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedSubmission({});
      const { data } = await submissionService.getSubmission();
      setDataSubmission(data.data);
      setToaster({
        variant: "success",
        message: "Laporan Berhasil Di Update",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Laporan Gagal Di Update",
      });
    }
  };

  return (
    <>
      <Modal onClose={() => setUpdatedSubmission({})}>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col">
            <div className="flex items-center justify-center lg:items-start lg:justify-start">
              <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
                Update Laporan Bencana
              </p>
            </div>
            <hr className="my-5 md:my-2" />
            <div className="mx-5 flex flex-col items-start gap-5 rounded-md border bg-white p-5 shadow-md">
              <div className="w-full md:flex md:gap-7 lg:justify-between">
                <div className="mb-5 flex flex-col items-start md:w-2/4">
                  <Image
                    src={updatedSubmission.image}
                    width={1000}
                    height={1000}
                    alt="foto"
                    className="w-full rounded-md border object-contain object-top"
                  />
                </div>
                <div className="md:w-2/4">
                  <TextInput title="Nama Pelapor:">
                    {updatedSubmission.namaPelapor}
                  </TextInput>
                  <TextInput title="No. Telp:">
                    {updatedSubmission.noTelp}
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
                    {updatedSubmission.bantuan
                      ? formatRupiah(totalBantuan)
                      : formatRupiah(0)}
                  </TextInput>
                  <TextInput title="Jumlah Tenda:">
                    {updatedSubmission.pengungsian.tenda}
                  </TextInput>
                  <TextInput title="Jumlah Pengungsi:">
                    {updatedSubmission.pengungsian.pengungsi}
                  </TextInput>
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
            <div className="mx-5 my-10 rounded-md border bg-white p-4 shadow-md">
              <p className="text-lg font-bold">Kebutuhan Yang Diperlukan</p>
              <hr className="my-3" />
              {updatedSubmission.kebutuhan.map(
                (
                  kebutuhan: { namaKebutuhan: string; qty: number },
                  i: number,
                ) => (
                  <div className="mb-4 grid grid-cols-2 gap-4" key={i}>
                    <Input
                      name="namaKebutuhan"
                      label="Nama Kebutuhan"
                      placeholder="Nama Kebutuhan"
                      disabled
                      type="text"
                      defaultValue={kebutuhan.namaKebutuhan}
                    />
                    <Input
                      name="qty"
                      label="Qty"
                      placeholder="Qty"
                      defaultValue={kebutuhan.qty}
                      disabled
                      type="number"
                    />
                  </div>
                ),
              )}
            </div>
            <div className="mx-5 my-10 rounded-md border bg-white p-4 shadow-md">
              <div className="mt-5">
                <label htmlFor="bantuan" className="text-lg font-bold">
                  <p>Tambahkan Bantuan</p>
                </label>
                {aidCount.map(
                  (
                    bantuan: {
                      lembaga: string;
                      jenisBantuan: string;
                      namaBantuan: string;
                      qty: number;
                      nominal: number;
                    },
                    i: number,
                  ) => (
                    <div key={i}>
                      <div className="mb-4 grid grid-cols-2 gap-4 border-t-2 md:grid-cols-3 lg:grid-cols-5">
                        <SelectOption
                          name="lembaga"
                          title="Pilih..."
                          label="Lembaga"
                          onChange={(e) => handleAid(e, i, "lembaga")}
                          defaultValue={bantuan.lembaga}
                          required
                        >
                          <Option value="Al Hilal">Al Hilal</Option>
                          <Option value="Dompet Dhuafa">Dompet Dhuafa</Option>
                          <Option value="DT Peduli">DT Peduli</Option>
                          <Option value="Human Initiative">
                            Human Initiative
                          </Option>
                          <Option value="IZI">IZI</Option>
                          <Option value="MDMC">MDMC</Option>
                          <Option value="Rumah Zakat">Rumah Zakat</Option>
                          <Option value="Relawan Nusantara">
                            Relawan Nusantara
                          </Option>
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
                          name="qty"
                          label="Qty"
                          placeholder="Qty"
                          defaultValue={bantuan.qty}
                          onChange={(e) => handleAid(e, i, "qty")}
                          disabled={
                            bantuan.jenisBantuan === "Rupiah" ||
                            bantuan.jenisBantuan === ""
                              ? true
                              : false
                          }
                          type="number"
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
                  ),
                )}
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  className={"my-2 text-xs sm:text-sm"}
                  disabled={aidCount.length > 19 ? true : false}
                  onClick={() =>
                    setAidCount([
                      ...aidCount,
                      {
                        lembaga: "",
                        jenisBantuan: "",
                        namaBantuan: "",
                        qty: 0,
                        nominal: 0,
                      },
                    ])
                  }
                >
                  <span className="rounded-md bg-primary px-4 py-2 text-white">
                    Tambah
                  </span>
                </Button>
                <p className="text-sm font-bold md:text-base">
                  Total Nominal : {formatRupiah(totalNominalAid)}
                </p>
              </div>
              <div className="mt-5">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    defaultValue={updatedSubmission.status}
                    name="status"
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
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
                    className={`${isLoading ? "cursor-not-allowed" : ""} w-full bg-primary text-white`}
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
