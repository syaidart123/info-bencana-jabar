import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputField from "@/components/UI/InputField";
import InputGroup from "@/components/UI/InputGroup";
import Option from "@/components/UI/Option";
import submissionService from "@/services/submission";
import React, { FormEvent, useContext, useState } from "react";
import SelectOption from "@/components/UI/SelectOption";
import InputFile from "@/components/UI/InputFile";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";
import serviceUser from "@/services/user";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";
import { useSession } from "next-auth/react";

const ModalUpdatePengajuan = (props: any) => {
  const { updatedSubmission, setUpdatedSubmission, setDataSubmission } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [jenisBencana, setJenisBencana] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  const [kebutuhan, setKebutuhan] = useState(
    updatedSubmission.kebutuhan || [{ namaKebutuhan: "", qty: 0 }],
  );

  const handleKebutuhan = (e: any, i: number, type: string) => {
    if (kebutuhan.length > 10) {
      setToaster({
        variant: "danger",
        message: "Maksimal 10 kebutuhan",
      });
      return;
    }
    const newKebutuhan: any = [...kebutuhan];
    newKebutuhan[i][type] = e.target.value;
    setKebutuhan(newKebutuhan);
  };
  const updateSubmission = async (
    form: any,
    newImageURL: string = updatedSubmission.image,
  ) => {
    const kebutuhanBencana = kebutuhan.map((item: any) => {
      return {
        namaKebutuhan: item.namaKebutuhan,
        qty: parseInt(`${item.qty}`),
      };
    });
    const data = {
      user: {
        email: session.data?.user.email,
        fullname: session.data?.user.fullname,
      },
      kebutuhan: kebutuhanBencana,
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
        form.taksiranKerugian.value.replace(/\./g, ""),
      ),
      pengungsian: {
        lokasiPengungsian: form.lokasiPengungsian?.value,
        tenda: parseInt(form.tenda?.value) || 0,
        pengungsi: parseInt(form.pengungsi?.value) || 0,
      },
    };
    const result = await submissionService.updateSubmission(
      updatedSubmission.id,
      data,
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
        message: "Laporan Berhasil Diupdate",
      });
    } else {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedSubmission(false);
      setToaster({
        variant: "danger",
        message: "laporan Gagal Diupdate",
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
        },
      );
    } else {
      updateSubmission(form);
    }
  };

  return (
    <>
      <Modal onClose={() => setUpdatedSubmission(false)}>
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Update Laporan
          </p>
        </div>
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
              className="mb-2 block text-sm font-medium"
            >
              Deskripsi Kejadian
            </label>
            <textarea
              id="deskripsiKejadian"
              name="deskripsiKejadian"
              defaultValue={updatedSubmission?.deskripsiKejadian}
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50"
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
          <div className="mt-5">
            <label htmlFor="kebutuhan" className="text-lg font-bold">
              <p>Kebutuhan Yang Diperlukan</p>
            </label>
            {kebutuhan.map(
              (
                kebutuhan: {
                  namaKebutuhan: string;
                  qty: number;
                },
                i: number,
              ) => (
                <div key={i}>
                  <div className="mb-4 grid grid-cols-2 gap-4 border-t-2">
                    <Input
                      name="namaKebutuhan"
                      label="Nama Kebutuhan"
                      placeholder="Nama Kebutuhan"
                      defaultValue={kebutuhan.namaKebutuhan}
                      type="text"
                      onChange={(e) => handleKebutuhan(e, i, "namaKebutuhan")}
                    />
                    <Input
                      name="qty"
                      label="Qty"
                      placeholder="Qty"
                      defaultValue={kebutuhan.qty}
                      onChange={(e) => handleKebutuhan(e, i, "qty")}
                      disabled={kebutuhan.namaKebutuhan === "" ? true : false}
                      type="number"
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
              disabled={kebutuhan.length > 9 ? true : false}
              onClick={() =>
                setKebutuhan([
                  ...kebutuhan,
                  {
                    namaKebutuhan: "",
                    qty: 0,
                  },
                ])
              }
            >
              <span className="rounded-md bg-primary px-4 py-2 text-white">
                Tambah
              </span>
            </Button>
          </div>

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

          <div className="my-3 flex items-center gap-4">
            <Image
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : updatedSubmission.image
              }
              alt="image"
              width={200}
              height={200}
              className="flex aspect-square h-auto w-[15%] items-center justify-center rounded-md bg-slate-200"
            />
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
          <Button
            type="submit"
            className={`bg-primary p-5 text-white ${isLoading && "cursor-not-allowed"}`}
          >
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdatePengajuan;
