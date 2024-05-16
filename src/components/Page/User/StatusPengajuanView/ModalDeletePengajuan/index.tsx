import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import submissionService from "@/services/pengajuan";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";

const ModalDeletePengajuan = (props: any) => {
  const { deletedSubmission, setDeletedSubmission, setDataSubmission } = props;
  const session: any = useSession();
  console.log(deletedSubmission);

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const result = await submissionService.deleteSubmission(
      deletedSubmission.id,
      session.data?.accessToken
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
                message: "Pengajuan Berhasil Dihapus",
              });
              setDeletedSubmission({});
              const { data } = await submissionService.getSubmissionByUser(
                session.data?.accessToken
              );
              setDataSubmission(data.data);
            }
          }
        );
      }else{
        setDeletedSubmission({});
        setToaster({
          variant:"success",
          message:"Pengajuan Berhasil Dihapus"
        })
        const { data } = await submissionService.getSubmissionByUser(
          session.data?.accessToken
        );
        setDataSubmission(data.data);
      }
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Gagal Menghapus Pengajuan",
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
          <p className="text-white bg-red-500 rounded-md w-full py-2 px-8 hover:bg-red-600">
            {isLoading ? "Loading..." : "Delete"}
          </p>
        </Button>

        <Button
          type="button"
          onClick={() => setDeletedSubmission({})}
          className=" mt-3 px-5"
        >
          <p className="border rounded-md w-full py-2 px-8 hover:bg-gray-100">
            Cencel
          </p>
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeletePengajuan;
