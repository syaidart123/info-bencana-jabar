import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import submissionService from "@/services/submission";
import React, { useContext, useState } from "react";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";
import serviceUser from "@/services/user";

const ModalDeletePengajuan = (props: any) => {
  const { deletedSubmission, setDeletedSubmission, setDataSubmission } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const result = await submissionService.deleteSubmission(
      deletedSubmission.id,
    );
    if (result.status === 200) {
      setIsLoading(false);
      if (deletedSubmission.image) {
        deleteFile(
          `/images/submission/${deletedSubmission.id}/${
            deletedSubmission.image?.split("%2F")[3].split("?")[0]
          }`,
          async (status: boolean) => {
            if (status) {
              setToaster({
                variant: "success",
                message: "Laporan Berhasil Dihapus",
              });
              setDeletedSubmission({});
              const { data } = await serviceUser.getSubmissionByUser();
              setDataSubmission(data.data);
            }
          },
        );
      } else {
        setDeletedSubmission({});
        setToaster({
          variant: "success",
          message: "Laporan Berhasil Dihapus",
        });
        const { data } = await serviceUser.getSubmissionByUser();
        setDataSubmission(data.data);
      }
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Gagal Menghapus Laporan",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedSubmission({})}>
      <p className="mb-3">Yakin Mau dihapus?</p>
      <div className="flex gap-5">
        <Button
          type="button"
          onClick={() => handleDelete()}
          className="mt-3 px-5"
        >
          <p className="w-full rounded-md bg-red-500 px-8 py-2 text-white hover:bg-red-600">
            {isLoading ? "Loading..." : "Delete"}
          </p>
        </Button>

        <Button
          type="button"
          onClick={() => setDeletedSubmission({})}
          className="mt-3 px-5"
        >
          <p className="w-full rounded-md border px-8 py-2 hover:bg-gray-100">
            Cencel
          </p>
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeletePengajuan;
