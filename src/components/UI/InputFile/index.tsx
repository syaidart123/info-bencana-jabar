import { Upload } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
type propsTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: propsTypes) => {
  const { uploadedImage, name, setUploadedImage } = props;
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mt-3 bg-slate-100 float-left w-full flex flex-col justify-center items-center gap-5 p-5 cursor-pointer mb-5 rounded-md"
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>Pilih gambar</p>
            <Upload className="w-8 h-8 "/>
            <p>
              Ukuran file maksimal <b>1MB</b>
            </p>
          </>
        )}
      </label>
      <input
        className="opacity-0 absolute z-1"
        type="file"
        name={name}
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
};

export default InputFile;
