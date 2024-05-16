import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputField from "@/components/UI/InputField";
import InputGroup from "@/components/UI/InputGroup";
import Option from "@/components/UI/Option";
import submissionService from "@/services/pengajuan";
import { useSession } from "next-auth/react";
import React, { FormEvent, useContext, useState } from "react";
import SelectOption from "@/components/UI/SelectOption";
import InputFile from "@/components/UI/InputFile";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";

const ModalUpdatePengajuan = (props: any) => {
  const { updatedSubmission, setUpdatedSubmission, setDataSubmission } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [jenisBencana, setJenisBencana] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();
  const { setToaster } = useContext(ToasterContext);

  const updateSubmission = async (
    form: any,
    newImageURL: string = updatedSubmission.image
  ) => {
    const data = {
      namaPelapor: form.namaPelapor.value,
      jenisBencana: form.jenisBencana.value,
      tanggal: form.tanggal.value,
      daerah: form.daerah.value,
      lokasi: form.lokasi.value,
      penyebab: form.penyebab.value,
      image: newImageURL,
      kerusakan: {
        rumah: parseInt(form.rumah.value) || 0,
        rumahTerendam: parseInt(form.rumahTerendam.value) || 0,
        fasilitasUmum: parseInt(form.fasilitasUmum.value) || 0,
      },
      korban: {
        meninggal: parseInt(form.meninggal.value) || 0,
        hilang: parseInt(form.hilang.value) || 0,
        terluka: parseInt(form.terluka.value) || 0,
      },

      pengungsian: {
        lokasiPengungsian: form.lokasiPengungsian?.value,
        tenda: parseInt(form.tenda?.value) || 0,
        pengungsi: parseInt(form.pengungsi?.value) || 0,
      },
    };
    const result = await submissionService.updateSubmission(
      updatedSubmission.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedSubmission(false);
      const { data } = await submissionService.getSubmission();
      const userSubmission = data.data.filter(
        (item: any) => item.user.email === session.data?.user.email
      );
      setDataSubmission(userSubmission);
      setToaster({
        variant: "success",
        message: "Pengajuan Berhasil Diupdate",
      });
    } else {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedSubmission(false);
      setToaster({
        variant: "danger",
        message: "Pengajuan Gagal Diupdate",
      });
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form: any = e.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "submission." + file.name.split(".")[1];
      uploadFile(
        updatedSubmission.id,
        file,
        newName,
        "submission",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateSubmission(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Maksimal ukuran file 1 MB",
            });
          }
        }
      );
    } else {
      updateSubmission(form);
    }
  };

  return (
    <>
      <Modal onClose={() => setUpdatedSubmission(false)}>
        <p className="text-3xl font-bold mb-5 ">Update Pengajuan</p>
        <form onSubmit={handleUpdate}>
          <Input
            name="namaPelapor"
            placeholder="Masukan nama pelapor"
            type="text"
            label="Nama Pelapor"
            required
            defaultValue={updatedSubmission?.namaPelapor}
          />
          <SelectOption
            label="Jenis Bencana"
            name="jenisBencana"
            title="Pilih Jenis Bencana..."
            onChange={(e: any) => setJenisBencana(e.target.value)}
            defaultValue={updatedSubmission?.jenisBencana}
          >
            <Option value="Banjir">Banjir</Option>
            <Option value="Cuaca Ekstrem">Cuaca Ekstrem</Option>
            <Option value="Gempa Bumi">Gempa Bumi</Option>
            <Option value="Kebakaran">Kebakaran</Option>
            <Option value="Longsor">Longsor</Option>
            <Option value="Tsunami">Tsunami</Option>
          </SelectOption>

          <Input
            name="tanggal"
            label="Tanggal"
            type="date"
            required
            defaultValue={updatedSubmission?.tanggal}
          />
          <SelectOption
            label="Daerah"
            name="daerah"
            defaultValue={updatedSubmission?.daerah}
            title="Pilih Daerah..."
          >
            <Option value="Kota Bandung">Kota Bandung</Option>
            <Option value="Kabupaten Bandung">Kabupaten Bandung</Option>
            <Option value="Kabupaten Bandung Barat">
              Kabupaten Bandung Barat
            </Option>
            <Option value="Kota Banjar">Kota Banjar</Option>
            <Option value="Kabupaten Bekasi">Kabupaten Bekasi</Option>
            <Option value="Kota Bekasi">Kota Bekasi</Option>
            <Option value="Kabupaten Bogor">Kabupaten Bogor</Option>
            <Option value="Kota Bogor">Kota Bogor</Option>
            <Option value="Kabupaten Ciamis">Kabupaten Ciamis</Option>
            <Option value="Kabupaten Cirebon">Kabupaten Cirebon</Option>
            <Option value="Kota Cirebon">Kota Cirebon</Option>
            <Option value="Kabupaten Cianjur">Kabupaten Cianjur</Option>
            <Option value="Kota Cimahi">Kota Cimahi</Option>
            <Option value="Kota Depok">Kota Depok</Option>
            <Option value="Kabupaten Garut">Kabupaten Garut</Option>
            <Option value="Kabupaten Indramayu">Kabupaten Indramayu</Option>
            <Option value="Kabupaten Karawang">Kabupaten Karawang</Option>
            <Option value="Kabupaten Kuningan">Kabupaten Kuningan</Option>
            <Option value="Kabupaten Majalengka">Kabupaten Majalengka</Option>
            <Option value="Kabupaten Pangandaran">Kabupaten Pangandaran</Option>
            <Option value="Kabupaten Purwakarta">Kabupaten Purwakarta</Option>
            <Option value="Kabupaten Subang">Kabupaten Subang</Option>
            <Option value="Kabupaten Sukabumi">Kabupaten Sukabumi</Option>
            <Option value="Kabupaten Sumedang">Kabupaten Sumedang</Option>
            <Option value="Kota Sukabumi">Kota Sukabumi</Option>
            <Option value="Kabupaten Tasikmalaya">Kabupaten Tasikmalaya</Option>
            <Option value="Kota Tasikmalaya">Kota Tasikmalaya</Option>
          </SelectOption>
          <Input
            name="lokasi"
            placeholder="Masukan lokasi"
            type="text"
            label="Lokasi Bencana"
            defaultValue={updatedSubmission?.lokasi}
            required
          />
          <Input
            name="penyebab"
            type="text"
            placeholder="Penyebab terjadi bencana"
            label="Penyebab"
            defaultValue={updatedSubmission?.penyebab}
          />

          <InputGroup name="Kerusakan" title="Kerusakan">
            <InputField
              name="rumah"
              type="number"
              titleName="Rumah"
              placeholder="Jumlah kerusakan rumah"
              defaultValue={updatedSubmission?.kerusakan.rumah}
            />

            <InputField
              name="rumahTerendam"
              type="number"
              titleName="Rumah Terendam "
              placeholder="Jumlah kerusakan rumah terendam"
              disabled={
                updatedSubmission.jenisBencana !== "Banjir" &&
                jenisBencana !== "Banjir"
              }
              defaultValue={updatedSubmission?.kerusakan.rumahTerendam}
            />
            <InputField
              name="fasilitasUmum"
              type="number"
              titleName="Fasilitas Umum"
              placeholder="Jumlah kerusakan fasilitas umum"
              defaultValue={updatedSubmission?.kerusakan.fasilitasUmum}
            />
          </InputGroup>

          <InputGroup name="Korban" title="Korban">
            <InputField
              name="meninggal"
              type="number"
              titleName="Meninggal"
              placeholder="Jumlah korban meninggal"
              defaultValue={updatedSubmission?.korban.meninggal}
            />
            <InputField
              name="hilang"
              type="number"
              titleName="Hilang"
              placeholder="Jumlah korban hilang"
              defaultValue={updatedSubmission?.korban.hilang}
            />
            <InputField
              name="terluka"
              type="number"
              titleName="Terluka"
              placeholder="Jumlah korban terluka"
              defaultValue={updatedSubmission?.korban.terluka}
            />
          </InputGroup>

          <InputGroup name="Pengungsian" title="Pengungsian">
            <InputField
              name="lokasiPengungsian"
              type="text"
              titleName="Lokasi Pengungsian"
              placeholder="Masukan lokasi pengungsian"
              defaultValue={updatedSubmission?.pengungsian.lokasiPengungsian}
            />
            <InputField
              name="tenda"
              type="number"
              titleName="Tenda"
              placeholder="Jumlah tenda"
              defaultValue={updatedSubmission?.pengungsian.tenda}
            />
            <InputField
              name="pengungsi"
              type="number"
              titleName="Pengungsi"
              placeholder="Jumlah Pengungsi"
              defaultValue={updatedSubmission?.pengungsian.pengungsi}
            />
          </InputGroup>

          <div className="flex items-center gap-4 my-3">
            <Image
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : updatedSubmission.image
              }
              alt="image"
              width={200}
              height={200}
              className=" w-[15%] aspect-square h-auto rounded-md bg-slate-200 flex justify-center items-center "
            />
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
          <Button type="submit" className="p-5 bg-sky-600 text-white">
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdatePengajuan;
