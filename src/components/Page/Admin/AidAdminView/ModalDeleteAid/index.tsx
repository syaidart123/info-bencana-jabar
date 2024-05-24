import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import React, { useContext, useState } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import aidService from "@/services/aid";
const ModalDeleteAid = (props: any) => {
  const { deletedAid, setDeletedAid, setAidData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const result = await aidService.deleteAid(deletedAid.id);

    if (result.status === 200) {
      setIsLoading(false);

      setDeletedAid({});
      const { data } = await aidService.getAid();
      setAidData(data.data);
      setToaster({
        variant: "success",
        message: "Pengajuan Berhasil Dihapus",
      });
    } else {
      setIsLoading(false);
      setDeletedAid({});
      setToaster({
        variant: "danger",
        message: "Pengajuan Gagal Di Hapus",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedAid({})}>
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
          onClick={() => setDeletedAid({})}
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

export default ModalDeleteAid;
