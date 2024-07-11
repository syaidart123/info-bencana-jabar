import FormBencana from "@/components/Layout/FormBencana";
import { ToasterContext } from "@/context/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import submissionService from "@/services/submission";
import { useSession } from "next-auth/react";
import React, { FormEvent, useContext, useState } from "react";

const PengajuanBencana = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | any>(null);
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  console.log(session);

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
      noTelp: form.noTelp.value,
      jenisBencana: form.jenisBencana.value,
      tanggal: form.tanggal.value,
      daerah: form.daerah.value,
      lokasi: form.lokasi.value,
      deskripsiKejadian: form.deskripsiKejadian.value,
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
      taksiranKerugian:
        parseInt(form.taksiranKerugian.value.replace(/\./g, "")) || 0,

      pengungsian: {
        lokasiPengungsian: form.lokasiPengungsian?.value,
        tenda: parseInt(form.jumlahTenda?.value) || 0,
        pengungsi: parseInt(form.jumlahPengungsi?.value) || 0,
      },
    };

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
    try {
      const result = await submissionService.addSubmission(data);

      if (result.status === 200) {
        uploadImage(result.data.data, form);
      } else {
        setIsLoading(false);
        setUploadedImage(null);
        setToaster({
          variant: "danger",
          message: "Laporan Gagal Dikirim",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setUploadedImage(null);
      setToaster({
        variant: "danger",
        message: "Gagal Dikirim. Pastikan semua data terisi dengan benar",
      });
    }
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];

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
            const result = await submissionService.updateSubmission(id, data);
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setToaster({
                variant: "success",
                message: "Laporan Berhasil Dikirim",
              });
            } else {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setToaster({
                variant: "danger",
                message: "Laporan Gagal Dikirim",
              });
            }
          } else {
            setIsLoading(false);
            setUploadedImage(null);
            setToaster({
              variant: "danger",
              message: "Ukuran file maksimal 1 MB",
            });
          }
        },
      );
    } else {
      setIsLoading(false);
      setUploadedImage(null);
      setToaster({
        variant: "danger",
        message: "Gambar harus di isi",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
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
