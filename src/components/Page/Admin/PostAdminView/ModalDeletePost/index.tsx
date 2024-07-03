import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import React, { useContext, useState } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import postService from "@/services/post";
import { deleteFile } from "@/lib/firebase/service";
const ModalDeletePost = (props: any) => {
  const { deletedPost, setDeletedPost, setPostData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const result = await postService.deletePost(deletedPost.id);

    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/posts/${deletedPost.id}/${
          deletedPost.image?.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setDeletedPost({});
            const { data } = await postService.getPost();
            setPostData(data.data);
            setToaster({
              variant: "success",
              message: "Postingan Berhasil Dihapus",
            });
          }
        },
      );
    } else {
      setIsLoading(false);
      setDeletedPost({});
      setToaster({
        variant: "danger",
        message: "Postingan Gagal Di Hapus",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedPost({})}>
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
          onClick={() => setDeletedPost({})}
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

export default ModalDeletePost;
