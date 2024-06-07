import Modal from "@/components/UI/Modal";
import React, { FormEvent, useContext, useState } from "react";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";
import Input from "@/components/UI/Input";
import SelectOption from "@/components/UI/SelectOption";
import Option from "@/components/UI/Option";
import aidService from "@/services/aid";
import formatRupiah from "@/utils/formatRupiah";

const ModalUpdateAid = (props: any) => {
  const { updatedAid, setUpdatedAid, setAidData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);
  const [aidCount, setAidCount] = useState(updatedAid.bantuan);

  const totalNominalAid = aidCount
  .map((item: any) => parseInt(item.nominal) || 0)  
  .reduce((total: any, item: any) => total + item, 0);  


  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const Bantuan = aidCount.map((item: any) => {
      return {
        lembaga: item.lembaga,
        jenisBantuan: item.jenisBantuan,
        namaBantuan: item.namaBantuan,
        nominal: parseInt(`${item.nominal}`),
      };
    });
    const data = {
      jenisBencana: form.jenisBencana.value,
      Status: form.status.value,
      daerah: form.daerah.value,
      lokasi: form.lokasi.value,
      bantuan: Bantuan,
    };

    const result = await aidService.updateAid(updatedAid.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedAid({});
      const { data } = await aidService.getAid();
      setAidData(data.data);
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

  const handleAid = (e: any, i: number, type: string) => {
    const newAidCount: any = [...aidCount];
    newAidCount[i][type] = e.target.value;
    setAidCount(newAidCount);
  };

  return (
    <>
      <Modal onClose={() => setUpdatedAid({})}>
        <p className="text-3xl font-bold my-2 ">Update Bantuan Bencana</p>
        <form onSubmit={handleUpdate}>
          <SelectOption
            name="jenisBencana"
            title="Pilih..."
            required
            label="Jenis Bencana"
            defaultValue={updatedAid.jenisBencana}
          >
            <Option value="Banjir">Banjir</Option>
            <Option value="Cuaca Ekstrem">Cuaca Ekstrem</Option>
            <Option value="Gempa Bumi">Gempa Bumi</Option>
            <Option value="Kebakaran">Kebakaran</Option>
            <Option value="Longsor">Longsor</Option>
            <Option value="Tsunami">Tsunami</Option>
          </SelectOption>
          <SelectOptionFragment
            label="Daerah"
            name="daerah"
            title="Pilih Daerah..."
            defaultValue={updatedAid.daerah}
          />
          <Input
            name="lokasi"
            label="Lokasi"
            placeholder="Lokasi"
            defaultValue={updatedAid.lokasi}
            type="text"
          />

          <div className="mt-5">
            <label htmlFor="bantuan" className="text-lg font-bold">
              Bantuan
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
                      defaultValue={bantuan.lembaga}
                      onChange={(e) => handleAid(e, i, "lembaga")}
                      required
                    >
                      <Option value="Human Initiative">Human Initiative</Option>
                      <Option value="IZI">IZI</Option>
                    </SelectOption>

                    <SelectOption
                      name="jenisBantuan"
                      title="Pilih..."
                      label="Jenis Bantuan"
                      defaultValue={bantuan.jenisBantuan}
                      onChange={(e) => handleAid(e, i, "jenisBantuan")}
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
                      defaultValue={bantuan.nominal}
                      type="number"
                      disabled={aidCount[i].jenisBantuan === "" ? true : false}
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
            <SelectOption name="status" title="Pilih..." label="Status" required defaultValue={updatedAid.Status}>
                <Option value="Diproses">Diproses</Option>
                <Option value="Selesai">Selesai</Option>
              </SelectOption>
            <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-md mt-5"
              >
              {isLoading ? "Loading...": "Kirim"}
            </button>
              </div>
             
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdateAid;
