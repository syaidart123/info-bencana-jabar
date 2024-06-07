import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputField from "@/components/UI/InputField";
import InputGroup from "@/components/UI/InputGroup";
import Option from "@/components/UI/Option";
import submissionService from "@/services/submission";
import { useSession } from "next-auth/react";
import React, { FormEvent, useContext, useState } from "react";
import SelectOption from "@/components/UI/SelectOption";
import InputFile from "@/components/UI/InputFile";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";
import serviceUser from "@/services/user";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";

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
      noTelp: form.noTelp.value.replace(/\./g, "") || 0,
      jenisBencana: form.jenisBencana.value,
      tanggal: form.tanggal.value,
      daerah: form.daerah.value,
      lokasi: form.lokasi.value,
      deskripsiKejadian: form.deskripsiKejadian.value,
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
      taksiranKerugian: parseInt(
        form.taksiranKerugian.value.replace(/\./g, "")
      ),
      pengungsian: {
        lokasiPengungsian: form.lokasiPengungsian?.value,
        tenda: parseInt(form.tenda?.value) || 0,
        pengungsi: parseInt(form.pengungsi?.value) || 0,
      },
    };
    const result = await submissionService.updateSubmission(
      updatedSubmission.id,
      data
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedSubmission(false);
      const { data } = await serviceUser.getSubmissionByUser();
      setDataSubmission(data.data);
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
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setIsLoading(false);
        setUploadedImage(null);
        setToaster({
          variant: "danger",
          message:
            "Ekstensi file tidak sesuai. Hanya jpg, jpeg dan png yang diizinkan.",
        });
        return;
      }

      if (file.size >= 1000000) {
        setIsLoading(false);
        setUploadedImage(null);
        setToaster({
          variant: "danger",
          message: "Ukuran file maksimal 1 MB",
        });
        return;
      }
    }

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
            setUploadedImage(null);
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
          <Input
            name="noTelp"
            type="number"
            label="No. Telp"
            required
            defaultValue={updatedSubmission?.noTelp}
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
          <SelectOptionFragment
            label="Daerah"
            name="daerah"
            title="Pilih Daerah..."
            defaultValue={updatedSubmission?.daerah}
          />
          <Input
            name="lokasi"
            placeholder="Masukan lokasi"
            type="text"
            label="Lokasi Bencana"
            defaultValue={updatedSubmission?.lokasi}
            required
          />
          <div className="mt-3">
            <label
              htmlFor="deskripsiKejadian"
              className="block text-sm font-medium mb-2"
            >
              Deskripsi Kejadian
            </label>
            <textarea
              id="deskripsiKejadian"
              name="deskripsiKejadian"
              defaultValue={updatedSubmission?.deskripsiKejadian}
              required
              className="py-3 px-4 block w-full border-gray-200 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none "
              rows={3}
              placeholder="Masukan deskripsi singkat terkait kejadian"
            ></textarea>
          </div>
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

          <Input
            name="taksiranKerugian"
            type="number"
            defaultValue={updatedSubmission.taksiranKerugian}
            label="Taksiran Kerugian"
            placeholder="Masukan nominal kerugian *1000000"
          />

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
              className=" w-[15%] aspect-square h-auto rounded-md bg-slate-200 flex justify-center items-center"
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
