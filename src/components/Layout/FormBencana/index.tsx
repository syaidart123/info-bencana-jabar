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
    <div className="flex w-11/12 flex-col rounded-xl border border-t-4 border-t-blue-600 bg-white shadow-sm xl:w-2/4">
      <div className="p-4 md:p-5">
        <h3 className="inline-block bg-gradient-to-l from-sky-400 to-sky-800 bg-clip-text py-5 text-2xl font-bold text-transparent">
          Form Laporan Bencana
        </h3>
        <form onSubmit={handleSubmit}>
          <Input
            name="namaPelapor"
            placeholder="Masukan nama pelapor"
            type="text"
            label="Nama Pelapor"
            required
          />
          <Input
            name="noTelp"
            placeholder="Masukan No. Telp"
            type="number"
            label="No. Telp"
            required
          />
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
          <SelectOptionFragment
            label="Daerah"
            name="daerah"
            title="Pilih Daerah..."
          />
          <Input
            name="lokasi"
            placeholder="Masukan lokasi"
            type="text"
            label="Lokasi Bencana"
            required
          />

          <div className="mt-3">
            <label
              htmlFor="deskripsiKejadian"
              className="mb-2 block text-sm font-medium"
            >
              Deskripsi Kejadian
            </label>
            <textarea
              id="deskripsiKejadian"
              name="deskripsiKejadian"
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50"
              rows={3}
              placeholder="Masukan deskripsi singkat terkait kejadian"
            ></textarea>
          </div>

          <InputGroup name="Kerusakan" title="Kerusakan">
            <InputField
              name="rumah"
              type="number"
              titleName="Rumah"
              placeholder="Masukan jumlah"
            />

            <InputField
              name="rumahTerendam"
              type="number"
              titleName="Rumah Terendam "
              placeholder="Masukan jumlah"
              disabled={jenisBencana !== "Banjir"}
            />
            <InputField
              name="fasilitasUmum"
              type="number"
              titleName="Fasilitas Umum"
              placeholder="Masukan jumlah"
            />
          </InputGroup>

          <InputGroup name="Korban" title="Korban">
            <InputField
              name="meninggal"
              type="number"
              titleName="Meninggal"
              placeholder="Masukan jumlah"
            />
            <InputField
              name="hilang"
              type="number"
              titleName="Hilang"
              placeholder="Masukan jumlah"
            />
            <InputField
              name="terluka"
              type="number"
              titleName="Terluka"
              placeholder="Masukan jumlah"
            />
          </InputGroup>

          <Input
            name="taksiranKerugian"
            type="number"
            label="Taksiran Kerugian"
            placeholder="Masukan nominal kerugian *1000000"
          />

          <InputGroup name="Pengungsian" title="Pengungsian">
            <InputField
              name="lokasiPengungsian"
              type="text"
              titleName="Lokasi Pengungsian"
              placeholder="Masukan lokasi"
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
          <Button type="submit" className="my-5 bg-sky-600 p-5 text-white">
            {isLoading ? "Loading..." : "Kirim"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormBencana;
