import Modal from "@/components/UI/Modal";
import submissionService from "@/services/submission";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";
import { Aid } from "@/types/aid.type";
import Input from "@/components/UI/Input";
import SelectOption from "@/components/UI/SelectOption";
import Option from "@/components/UI/Option";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";
import aidService from "@/services/aid";

type propsTypes = {
  setModalAddAid: Dispatch<SetStateAction<boolean>>;
  setAidData: Dispatch<SetStateAction<Aid[]>>;
};

const ModalAddAid = (props: propsTypes) => {
  const { setModalAddAid, setAidData } = props;
  
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);
  const [aidCount, setAidCount] = useState([
    { lembaga: "", jenisBantuan: "", namaBantuan: "", qty: 0, nominal: 0 },
  ]);

  // const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {

  //   e.preventDefault();
  //   setIsLoading(true);
  //   const form = e.target as HTMLFormElement;
  //   const data = {
  //     status: form.status.value,
  //   };

  //   const result = await submissionService.updateSubmission(
  //     updatedSubmission.id,
  //     data
  //   );
  //   if (result.status === 200) {
  //     setIsLoading(false);
  //     setUpdatedSubmission({});
  //     const { data } = await submissionService.getSubmission();
  //     setDataSubmission(data.data);
  //     setToaster({
  //       variant: "success",
  //       message: "Pengajuan Berhasil Di Update",
  //     });
  //   } else {
  //     setIsLoading(false);
  //     setToaster({
  //       variant: "danger",
  //       message: "Pengajuan Gagal Di Update",
  //     });
  //   }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const bantuan = aidCount.map((item: any) => {
      return {
        lembaga: item.lembaga,
        jenisBantuan: item.jenisBantuan,
        namaBantuan: item.namaBantuan,
        qty: parseInt(`${item.qty}`),
        nominal: parseInt(`${item.nominal}`),
      };
    });

    const data = {
      jenisBencana: form.jenisBencana.value,
      daerah: form.daerah.value,
      lokasi: form.lokasi.value,
      bantuan: bantuan,
    };

    const result = await aidService.addAid(data);

    if (result.status === 200) {
      setIsLoading(false);
      setModalAddAid(false);
      const { data } = await aidService.getAid();
      setAidData(data.data);
      setAidCount([
        { lembaga: "", jenisBantuan: "", namaBantuan: "", qty: 0, nominal: 0 },
      ]);
      
      setToaster({
        variant: "success",
        message: "Bantuan Berhasil Di Tambahkan",
      });
    } else {
      setIsLoading(false);
      setModalAddAid(false);
      setAidCount([
        { lembaga: "", jenisBantuan: "", namaBantuan: "", qty: 0, nominal: 0 },
      ]);
      setToaster({
        variant: "danger",
        message: "Bantuan Gagal Di Tambahkan",
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
      <Modal onClose={() => setModalAddAid(false)}>
        <p className="text-3xl font-bold">Buat Bantuan</p>
        <form onSubmit={handleSubmit}>
          <SelectOption
            name="jenisBencana"
            title="Pilih..."
            required
            label="Jenis Bencana"
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
          />
          <Input
            name="lokasi"
            label="Lokasi"
            placeholder="Lokasi"
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
                  qty: number;
                  nominal: number;
                },
                i: number
              ) => (
                <div key={i}>
                  <div className="grid grid-cols-5 gap-4">
                    <SelectOption
                      name="lembaga"
                      title="Pilih..."
                      label="Lembaga"
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
                      type="text"
                      onChange={(e) => handleAid(e, i, "namaBantuan")}
                    />
                    <Input
                      name="qty"
                      label="Qty"
                      placeholder="Qty"
                      type="number"
                      onChange={(e) => handleAid(e, i, "qty")}
                      disabled={
                        bantuan.jenisBantuan === "Rupiah" ||
                        bantuan.jenisBantuan === ""
                      }
                      required={
                        bantuan.jenisBantuan === "Rupiah" ||
                        bantuan.jenisBantuan === ""
                      }
                    />
                    <Input
                      name="nominal"
                      label="Nominal"
                      placeholder="Nominal"
                      type="number"
                      onChange={(e) => handleAid(e, i, "nominal")}
                      disabled={
                        bantuan.jenisBantuan === "Barang" ||
                        bantuan.jenisBantuan === ""
                      }
                      required={
                        bantuan.jenisBantuan === "Barang" ||
                        bantuan.jenisBantuan === ""
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col items-start">
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
                    qty: 0,
                    nominal: 0,
                  },
                ])
              }
            >
              <span className="bg-sky-500 rounded-md text-white py-2 px-4">
                Tambah Bantuan
              </span>
            </Button>

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

export default ModalAddAid;
