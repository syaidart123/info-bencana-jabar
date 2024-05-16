import { Upload } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
type propsTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  required?:boolean
};

const InputFile = (props: propsTypes) => {
  const { uploadedImage, name, setUploadedImage,required } = props;
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mt-3 bg-slate-100 float-left w-full flex flex-col justify-center items-center gap-5 p-5 cursor-pointer rounded-md"
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>Pilih Gambar</p>
            <Upload className="w-8 h-8"/>
            <p>
              Ukuran file maksimal <b>1MB</b>
            </p>
          </>
        )}
      </label>
      <input
        className="opacity-0 z-[-1]"
        required={required}
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
