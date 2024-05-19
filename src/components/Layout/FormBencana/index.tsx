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
          <SelectOption label="Daerah" name="daerah" title="Pilih Daerah...">
            <Option value="Kota Bandung">Kota Bandung</Option>
            <Option value="Kabupaten Bandung">Kabupaten Bandung</Option>
            <Option value="Kabupaten Bandung Barat">
              Kabupaten Bandung Barat
            </Option>
            <Option value="Kota Banjar">Kota Banjar</Option>
            <Option value="Kabupaten Bekasi">Kabupaten Bekasi</Option>
            <Option value="Kota Bekasi">Kota Bekasi</Option>
            <Option value="Kabupaten Bogor">Kabupaten Bogor</Option>
            <Option value="Kota Bogor">Kota Bogor</Option>
            <Option value="Kabupaten Ciamis">Kabupaten Ciamis</Option>
            <Option value="Kabupaten Cirebon">Kabupaten Cirebon</Option>
            <Option value="Kota Cirebon">Kota Cirebon</Option>
            <Option value="Kabupaten Cianjur">Kabupaten Cianjur</Option>
            <Option value="Kota Cimahi">Kota Cimahi</Option>
            <Option value="Kota Depok">Kota Depok</Option>
            <Option value="Kabupaten Garut">Kabupaten Garut</Option>
            <Option value="Kabupaten Indramayu">Kabupaten Indramayu</Option>
            <Option value="Kabupaten Karawang">Kabupaten Karawang</Option>
            <Option value="Kabupaten Kuningan">Kabupaten Kuningan</Option>
            <Option value="Kabupaten Majalengka">Kabupaten Majalengka</Option>
            <Option value="Kabupaten Pangandaran">Kabupaten Pangandaran</Option>
            <Option value="Kabupaten Purwakarta">Kabupaten Purwakarta</Option>
            <Option value="Kabupaten Subang">Kabupaten Subang</Option>
            <Option value="Kabupaten Sukabumi">Kabupaten Sukabumi</Option>
            <Option value="Kabupaten Sumedang">Kabupaten Sumedang</Option>
            <Option value="Kota Sukabumi">Kota Sukabumi</Option>
            <Option value="Kabupaten Tasikmalaya">Kabupaten Tasikmalaya</Option>
            <Option value="Kota Tasikmalaya">Kota Tasikmalaya</Option>
          </SelectOption>
          <Input
            name="lokasi"
            placeholder="Masukan lokasi"
            type="text"
            label="Lokasi Bencana"
            required
          />
          <Input
            name="penyebab"
            type="text"
            placeholder="Penyebab terjadi bencana"
            label="Penyebab"
          />

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
