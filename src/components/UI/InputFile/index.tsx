import { Upload } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
type propsTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  required?: boolean;
};

const InputFile = (props: propsTypes) => {
  const { uploadedImage, name, setUploadedImage, required } = props;
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="float-left mt-3 flex w-full cursor-pointer flex-col items-center justify-center gap-5 rounded-md bg-slate-100 p-5"
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>Pilih Gambar</p>
            <Upload className="h-8 w-8" />
            <p>
              Ukuran file maksimal <b>1MB</b>
            </p>
          </>
        )}
      </label>
      <input
        className="z-[-1] opacity-0"
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
