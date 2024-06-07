import Modal from "@/components/UI/Modal";
import submissionService from "@/services/submission";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";
import Input from "@/components/UI/Input";
import SelectOption from "@/components/UI/SelectOption";
import Option from "@/components/UI/Option";
import { Post } from "@/types/post.type";
import postService from "@/services/post";
import InputFile from "@/components/UI/InputFile";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";

type propsTypes = {
  setModalAddPost: Dispatch<SetStateAction<boolean>>;
  setPostData: Dispatch<SetStateAction<Post[]>>;
};

const ModalAddPost = (props: propsTypes) => {
  const { setModalAddPost, setPostData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [PostCount, setPostCount] = useState([
    { lembaga: "", jenisBantuan: "", namaBantuan: "", qty: 0, nominal: 0 },
  ]);

  const uploadImage = async (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "post." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "posts",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await postService.updatePost(id, data);
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddPost(false);
              const { data } = await postService.getPost();
              setPostData(data.data);
              setToaster({
                variant: "success",
                message: "Postingan Berhasil Di Tambah",
              });
            } else {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddPost(false);
              setToaster({
                variant: "danger",
                message: "Postingan Gagal Di Tambah",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Postingan Gagal Di Tambah",
            });
          }
        }
      );
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      title: form.judul.value,
      daerah: form.daerah.value,
      tanggal: form.tanggal.value,
      deskripsi: form.desc.value,
      image: "",
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
      const result = await postService.addPost(data);

      if (result.status === 200) {
        uploadImage(result.data.data.id, form);
      } else {
        setIsLoading(false);
        setUploadedImage(null);
        setToaster({
          variant: "danger",
          message: "Postingan Gagal Di Tambah",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setUploadedImage(null);
      setToaster({
        variant: "danger",
        message: "Postingan Gagal Di Tambah",
      });
    }
  };

  const handlePost = (e: any, i: number, type: string) => {
    const newPostCount: any = [...PostCount];
    newPostCount[i][type] = e.target.value;
    setPostCount(newPostCount);
  };

  return (
    <>
      <Modal onClose={() => setModalAddPost(false)}>
        <p className="text-3xl font-bold">Buat Postingan</p>
        <form onSubmit={handleSubmit}>
          <Input
            name="judul"
            type="text"
            label="Judul"
            placeholder="Masukan Judul"
            required
          />
         <SelectOptionFragment label="Daerah" name="daerah" title="Pilih..." />
          <Input name="tanggal" type="date" label="Tanggal" required />

          <div className="mt-3">
            <label htmlFor="desc" className="block text-sm font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              id="desc"
              name="desc"
              required
              className="py-3 px-4 block w-full border-gray-200 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none "
              rows={15}
              placeholder="Masukan Deskripsi..."
            ></textarea>
          </div>
          <div className="flex items-center gap-4 my-3">
            {uploadedImage ? (
              <Image
                src={URL.createObjectURL(uploadedImage)}
                alt="image"
                width={200}
                height={200}
                className=" w-[15%] aspect-square h-auto rounded-md bg-slate-200 flex justify-center items-center"
              />
            ) : (
              <div className="w-[15%] aspect-square h-auto rounded-md bg-slate-200 flex justify-center items-center">
                No Image
              </div>
            )}
            <InputFile
              name="image"
              required
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
          <Button type="submit" className="p-5 bg-sky-600 text-white">
            {isLoading ? "Loading..." : "Buat Postingan"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalAddPost;
