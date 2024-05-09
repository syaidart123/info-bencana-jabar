import FormBencana from "@/components/Layout/FormBencana";
import { uploadFile } from "@/lib/firebase/service";
import submissionService from "@/services/pengajuan";
import { Submission } from "@/types/submission.type";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const PengajuanBencana = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionData, setSubmissionData] = useState<Submission[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "submission." + file.name.split(".")[1];
    if (file) {
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
              const { data } = await submissionService.getSubmission();
              setSubmissionData(data.data);
            } else {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
            }
          } else {
            setIsLoading(false);
          }
        }
      );
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

    const result = await submissionService.addSubmission(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      uploadImage(result.data.data.id, form);
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
