import Modal from "@/components/UI/Modal";
import React, { FormEvent, useContext, useState } from "react";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";
import Input from "@/components/UI/Input";
import postService from "@/services/post";
import Image from "next/image";
import InputFile from "@/components/UI/InputFile";
import { uploadFile } from "@/lib/firebase/service";
import SelectOption from "@/components/UI/SelectOption";
import Option from "@/components/UI/Option";

const ModalUpdatePost = (props: any) => {
  const { updatedPost, setUpdatedPost, setPostData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [PostCount, setPostCount] = useState(updatedPost.bantuan);

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedPost.image,
  ) => {
    const data = {
      title: form.judul.value,
      daerah: form.daerah.value,
      jenisBencana: form.jenisBencana.value,
      tanggal: form.tanggal.value,
      deskripsi: form.desc.value,
      image: newImageURL,
    };

    const result = await postService.updatePost(updatedPost.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedPost(false);
      const { data } = await postService.getPost();
      setPostData(data.data);
      setToaster({
        variant: "success",
        message: "Postingan Berhasil Di Update",
      });
    } else {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedPost(false);
      setToaster({
        variant: "danger",
        message: "Postingan Gagal Di Update",
      });
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
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
      const newName = "post." + file.name.split(".")[1];
      uploadFile(
        updatedPost.id,
        file,
        newName,
        "posts",
        (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Gagal Upload Gambar",
            });
          }
        },
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <>
      <Modal onClose={() => setUpdatedPost({})}>
        <p className="my-2 text-3xl font-bold">Update Postingan</p>
        <form onSubmit={handleUpdate}>
          <Input
            name="judul"
            type="text"
            label="Judul"
            placeholder="Masukan Judul"
            defaultValue={updatedPost.title}
            required
          />
          <SelectOption
            label="Jenis Bencana"
            name="jenisBencana"
            title="Pilih Jenis Bencana..."
            defaultValue={updatedPost.jenisBencana}
          >
            <Option value="Banjir">Banjir</Option>
            <Option value="Cuaca Ekstrem">Cuaca Ekstrem</Option>
            <Option value="Gempa Bumi">Gempa Bumi</Option>
            <Option value="Kebakaran">Kebakaran</Option>
            <Option value="Longsor">Longsor</Option>
            <Option value="Tsunami">Tsunami</Option>
          </SelectOption>
          <SelectOptionFragment
            label="Daerah"
            name="daerah"
            title="Pilih Daerah..."
            defaultValue={updatedPost.daerah}
          />
          <Input
            name="tanggal"
            type="date"
            label="Tanggal"
            defaultValue={updatedPost.tanggal}
            required
          />

          <div className="mt-3">
            <label htmlFor="desc" className="mb-2 block text-sm font-medium">
              Deskripsi
            </label>
            <textarea
              id="desc"
              name="desc"
              defaultValue={updatedPost.deskripsi}
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50"
              rows={15}
              placeholder="Masukan Deskripsi..."
            ></textarea>
          </div>
          <div className="my-3 flex items-center gap-4">
            <Image
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : updatedPost.image
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
          <Button type="submit" className="bg-sky-600 p-5 text-white">
            {isLoading ? "Loading..." : "Update Postingan"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdatePost;
