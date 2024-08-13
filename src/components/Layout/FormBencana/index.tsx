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
  kebutuhan: any;
  setKebutuhan: any;
  handleKebutuhan: any;
};

const FormBencana = (props: propTypes) => {
  const {
    handleSubmit,
    setUploadedImage,
    uploadedImage,
    isLoading,
    kebutuhan,
    handleKebutuhan,
    setKebutuhan,
  } = props;
  const [jenisBencana, setJenisBencana] = useState("");

  return (
    <div className="flex w-11/12 flex-col rounded-xl border border-t-4 border-t-primary bg-white shadow-sm xl:w-2/4">
      <div className="p-4 md:p-5">
        <h3 className="inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text py-5 text-2xl font-bold text-transparent">
          Form Laporan Bencana
        </h3>
        <form onSubmit={handleSubmit}>
          <Input
            name="namaPelapor"
            placeholder="Masukan nama pelapor"
            type="text"
            label="Nama Pelapor"
            minLength={3}
            maxLength={50}
            required
          />
          <Input
            name="noTelp"
            placeholder="Masukan nomor telepon..."
            type="number"
            label="No. Telp"
            required
            minLength={10}
            maxLength={13}
          />
          <SelectOption
            label="Jenis Bencana"
            name="jenisBencana"
            title="Pilih Jenis Bencana..."
            onChange={(e: any) => setJenisBencana(e.target.value)}
            required
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
            required
          />
          <Input
            name="lokasi"
            placeholder="Masukan lokasi"
            type="text"
            label="Lokasi Bencana"
            minLength={3}
            maxLength={50}
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
              maxLength={300}
              placeholder="Masukan deskripsi singkat terkait kejadian"
            ></textarea>
          </div>

          <InputGroup name="Kerusakan" title="Kerusakan">
            <InputField
              name="rumah"
              type="number"
              titleName="Rumah"
              placeholder="Masukan jumlah"
              maxLength={5}
            />

            <InputField
              name="rumahTerendam"
              type="number"
              titleName="Rumah Terendam "
              placeholder="Masukan jumlah"
              disabled={jenisBencana !== "Banjir"}
              maxLength={5}
            />
            <InputField
              name="fasilitasUmum"
              type="number"
              titleName="Fasilitas Umum"
              placeholder="Masukan jumlah"
              maxLength={5}
            />
          </InputGroup>

          <InputGroup name="Korban" title="Korban">
            <InputField
              name="meninggal"
              type="number"
              titleName="Meninggal"
              placeholder="Masukan jumlah"
              maxLength={5}
            />
            <InputField
              name="hilang"
              type="number"
              titleName="Hilang"
              placeholder="Masukan jumlah"
              maxLength={5}
            />
            <InputField
              name="terluka"
              type="number"
              titleName="Terluka"
              placeholder="Masukan jumlah"
              maxLength={5}
            />
          </InputGroup>

          <div className="mt-5">
            <label htmlFor="kebutuhan" className="text-lg font-bold">
              <p>Kebutuhan Yang Diperlukan</p>
            </label>
            {kebutuhan.map(
              (
                kebutuhan: {
                  namaKebutuhan: string;
                  qty: number;
                },
                i: number,
              ) => (
                <div key={i}>
                  <div className="mb-4 grid grid-cols-2 gap-4 border-t-2">
                    <Input
                      name="namaKebutuhan"
                      label="Nama Kebutuhan"
                      placeholder="Nama Kebutuhan"
                      type="text"
                      onChange={(e) => handleKebutuhan(e, i, "namaKebutuhan")}
                      maxLength={50}
                    />
                    <Input
                      name="qty"
                      label="Qty"
                      placeholder="Qty"
                      onChange={(e) => handleKebutuhan(e, i, "qty")}
                      disabled={kebutuhan.namaKebutuhan === "" ? true : false}
                      type="number"
                      maxLength={5}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              className={"my-2 text-xs sm:text-sm"}
              disabled={kebutuhan.length > 9 ? true : false}
              onClick={() =>
                setKebutuhan([
                  ...kebutuhan,
                  {
                    namaKebutuhan: "",
                    qty: 0,
                  },
                ])
              }
            >
              <span className="rounded-md bg-primary px-4 py-2 text-white">
                Tambah
              </span>
            </Button>
          </div>

          <Input
            name="taksiranKerugian"
            type="number"
            label="Taksiran Kerugian"
            placeholder="Masukan nominal kerugian *1000000"
            minLength={4}
            maxLength={9}
            required
          />

          <InputGroup name="Pengungsian" title="Pengungsian">
            <InputField
              name="lokasiPengungsian"
              type="text"
              titleName="Lokasi Pengungsian"
              placeholder="Masukan lokasi"
              maxLength={50}
            />
            <InputField
              name="jumlahTenda"
              type="number"
              titleName="Tenda"
              placeholder="Jumlah tenda"
              maxLength={5}
            />
            <InputField
              name="jumlahPengungsi"
              type="number"
              titleName="Pengungsi"
              placeholder="Jumlah Pengungsi"
              maxLength={5}
            />
          </InputGroup>

          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            required
          />
          <Button
            type="submit"
            className={`hover:bg-dark ${isLoading && "cursor-not-allowed"} my-5 bg-primary p-5 text-white`}
          >
            {isLoading ? "Loading..." : "Kirim"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormBencana;
