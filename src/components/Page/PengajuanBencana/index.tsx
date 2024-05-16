import FormBencana from "@/components/Layout/FormBencana";
import { ToasterContext } from "@/context/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import submissionService from "@/services/pengajuan";
import { useSession } from "next-auth/react";
import React, { FormEvent, useContext, useState } from "react";

const PengajuanBencana = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | any>(null);

  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    console.log(file);

    if (file) {
      const newName = "submission." + file.name.split(".")[1];
      uploadFile(
        id,
        file,
        newName,
        "submission",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await submissionService.updateSubmission(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setToaster({
                variant: "success",
                message: "Pengajuan Berhasil Dikirim",
              });
            } else {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setToaster({
                variant: "danger",
                message: "Pengajuan Gagal Dikirim",
              });
            }
          } else {
            setIsLoading(false);

            setToaster({
              variant: "danger",
              message: "Ukuran file maksimal 1 MB",
            });
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Gambar tidak ada",
      });
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form: any = e.target as HTMLFormElement;
    const data = {
      user: {
        email: session.data?.user.email,
        fullname: session.data?.user.fullname,
      },
      namaPelapor: form.namaPelapor.value,
      jenisBencana: form.jenisBencana.value,
      tanggal: form.tanggal.value,
      daerah: form.daerah.value,
      lokasi: form.lokasi.value,
      penyebab: form.penyebab.value,
      image: "",
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
        tenda: parseInt(form.jumlahTenda?.value) || 0,
        pengungsi: parseInt(form.jumlahPengungsi?.value) || 0,
      },
    };

    if (uploadedImage && uploadedImage.size >= 1000000) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Ukuran file maksimal 1 MB",
      });
      return; // Menghentikan eksekusi jika ukuran file melebihi 1 MB
    }

    const result = await submissionService.addSubmission(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Pengajuan Gagal Dikirim",
      });
    }
  };
  return (
    <div className=" py-10 flex justify-center items-center ">
      <FormBencana
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
    </div>
  );
};
export default PengajuanBencana;
