import SelectOptionFragment from "@/components/Fragment/OptionDaerah";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import InputField from "@/components/UI/InputField";
import InputFile from "@/components/UI/InputFile";
import InputGroup from "@/components/UI/InputGroup";
import Option from "@/components/UI/Option";
import SelectOption from "@/components/UI/SelectOption";
import React, { useState } from "react";

type propTypes = {
  handleSubmit: any;
  setUploadedImage: any;
  uploadedImage: any;
  isLoading: any;
};

const FormBencana = (props: propTypes) => {
  const { handleSubmit, setUploadedImage, uploadedImage, isLoading } = props;
  const [jenisBencana, setJenisBencana] = useState("");

  return (
    <div className="flex flex-col bg-white xl:w-2/4 w-11/12  border border-t-4 border-t-blue-600 shadow-sm rounded-xl">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 pb-5">
          Form Pengajuan Bencana
        </h3>
        <form onSubmit={handleSubmit}>
          <Input
            name="namaPelapor"
            placeholder="Masukan nama pelapor"
            type="text"
            label="Nama Pelapor"
            required
          />
          <Input name="noTelp" placeholder="Masukan No. Telp" type="number" label="No. Telp" required />
          <SelectOption
            label="Jenis Bencana"
            name="jenisBencana"
            title="Pilih Jenis Bencana..."
            onChange={(e: any) => setJenisBencana(e.target.value)}
          >
            <Option value="Banjir">Banjir</Option>
            <Option value="Cuaca Ekstrem">Cuaca Ekstrem</Option>
            <Option value="Gempa Bumi">Gempa Bumi</Option>
            <Option value="Kebakaran">Kebakaran</Option>
            <Option value="Longsor">Longsor</Option>
            <Option value="Tsunami">Tsunami</Option>
          </SelectOption>

          <Input name="tanggal" label="Tanggal" type="date" required />
          <SelectOptionFragment label="Daerah" name="daerah" title="Pilih Daerah..."  />
          <Input
            name="lokasi"
            placeholder="Masukan lokasi"
            type="text"
            label="Lokasi Bencana"
            required
          />
          
          <div className="mt-3">
            <label htmlFor="deskripsiKejadian" className="block text-sm font-medium mb-2">
              Deskripsi Kejadian
            </label>
            <textarea
              id="deskripsiKejadian"
              name="deskripsiKejadian"
              required
              className="py-3 px-4 block w-full border-gray-200 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none "
              rows={3}
              placeholder="Masukan deskripsi singkat terkait kejadian"
            ></textarea>
          </div>

          <InputGroup name="Kerusakan" title="Kerusakan">
            <InputField
              name="rumah"
              type="number"
              titleName="Rumah"
              placeholder="Jumlah kerusakan rumah"
            />

            <InputField
              name="rumahTerendam"
              type="number"
              titleName="Rumah Terendam "
              placeholder="Jumlah kerusakan rumah terendam"
              disabled={jenisBencana !== "Banjir"}
            />
            <InputField
              name="fasilitasUmum"
              type="number"
              titleName="Fasilitas Umum"
              placeholder="Jumlah kerusakan fasilitas umum"
            />
          </InputGroup>

          <InputGroup name="Korban" title="Korban">
            <InputField
              name="meninggal"
              type="number"
              titleName="Meninggal"
              placeholder="Jumlah korban meninggal"
            />
            <InputField
              name="hilang"
              type="number"
              titleName="Hilang"
              placeholder="Jumlah korban hilang"
            />
            <InputField
              name="terluka"
              type="number"
              titleName="Terluka"
              placeholder="Jumlah korban terluka"
            />
          </InputGroup>

          <Input name="taksiranKerugian" type="number" label="Taksiran Kerugian" placeholder="Masukan nominal kerugian *1000000" />

          <InputGroup name="Pengungsian" title="Pengungsian">
            <InputField
              name="lokasiPengungsian"
              type="text"
              titleName="Lokasi Pengungsian"
              placeholder="Masukan lokasi pengungsian"
            />
            <InputField
              name="jumlahTenda"
              type="number"
              titleName="Tenda"
              placeholder="Jumlah tenda"
            />
            <InputField
              name="jumlahPengungsi"
              type="number"
              titleName="Pengungsi"
              placeholder="Jumlah Pengungsi"
            />
          </InputGroup>

          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            required
          />
          <Button type="submit" className="p-5 bg-sky-600 text-white my-5">
            {isLoading ? "Loading..." : "Kirim"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormBencana;
