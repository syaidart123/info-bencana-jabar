import Modal from "@/components/UI/Modal";
import submissionService from "@/services/submission";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Button from "@/components/UI/Button";
import { ToasterContext } from "@/context/ToasterContext";
import SelectOptionFragment from "@/components/Fragment/OptionDaerah";
import Input from "@/components/UI/Input";
import SelectOption from "@/components/UI/SelectOption";
import Option from "@/components/UI/Option";
import aidService from "@/services/aid";
import postService from "@/services/post";
import Image from "next/image";
import InputFile from "@/components/UI/InputFile";
import { uploadFile } from "@/lib/firebase/service";

const ModalUpdatePost = (props: any) => {
  const { updatedPost, setUpdatedPost, setPostData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [PostCount, setPostCount] = useState(updatedPost.bantuan);


  const updateProduct = async (
    form: any,
    newImageURL: string = updatedPost.image
  ) => {
    const data = {
      title: form.judul.value,
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
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setIsLoading(false);
        setUploadedImage(null);
        setToaster({
          variant: "danger",
          message:
            "Ekstensi file tidak sesuai. Hanya jpg, jpeg, png, dan pdf yang diizinkan.",
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
        }
      );
    } else {
      updateProduct(form);
    }
  };

  const handlePost = (e: any, i: number, type: string) => {
    const newPostCount: any = [...PostCount];
    newPostCount[i][type] = e.target.value;
    setPostCount(newPostCount);
  };

  return (
    <>
      <Modal onClose={() => setUpdatedPost({})}>
        <p className="text-3xl font-bold my-2 ">Update Postingan</p>
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
            name="jenisBencana"
            title="Pilih..."
            defaultValue={updatedPost.jenisBencana}
            required
            label="Jenis Bencana"
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
            type="date"
            label="Tanggal"
            defaultValue={updatedPost.tanggal}
            required
          />

          <div className="mt-3">
            <label htmlFor="desc" className="block text-sm font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              id="desc"
              name="desc"
              defaultValue={updatedPost.deskripsi}
              required
              className="py-3 px-4 block w-full border-gray-200 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none "
              rows={3}
              placeholder="Masukan Deskripsi..."
            ></textarea>
          </div>
          <div className="flex items-center gap-4 my-3">
            <Image
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : updatedPost.image
              }
              alt="image"
              width={200}
              height={200}
              className=" w-[15%] aspect-square h-auto rounded-md bg-slate-200 flex justify-center items-center"
            />
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
          <Button type="submit" className="p-5 bg-sky-600 text-white">
            {isLoading ? "Loading..." : "Update Postingan"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdatePost;
