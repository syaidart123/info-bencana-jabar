import Option from '@/components/UI/Option';
import SelectOption from '@/components/UI/SelectOption';
import React from 'react'

type propsTypes = {
    setSelectedBencana: any
    setSelectedDaerah: any
    setSelectedStartDate?: any
    setSelectedEndDate?: any
    
}

const FilterSelect = (props :propsTypes) => {
    const {setSelectedBencana,setSelectedDaerah,setSelectedStartDate,setSelectedEndDate}=props
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedStartDate(e.target.value);
    };
  
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedEndDate(e.target.value);
    };
    



  return (
        <div className="flex justify-start gap-10 items-center mb-5">
          <SelectOption
            name="jenisBencana"
            title="Pilih Jenis Bencana..."
            onChange={(e: any) => {
              setSelectedBencana(e.target.value);
            }}
          >
            <Option value="Banjir">Banjir</Option>
            <Option value="Cuaca Ekstrem">Cuaca Ekstrem</Option>
            <Option value="Gempa Bumi">Gempa Bumi</Option>
            <Option value="Kebakaran">Kebakaran</Option>
            <Option value="Longsor">Longsor</Option>
            <Option value="Tsunami">Tsunami</Option>
          </SelectOption>
          <SelectOption
            name="daerah"
            title="Pilih Daerah..."
            onChange={(e: any) => setSelectedDaerah(e.target.value)}
          >
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

          {/* <SelectOption
        name="daerah"
        title="Pilih Daerah..."
        onChange={(e: any) => setSelectedDaerah(e.target.value)}
      >
        {/* ... Options lainnya */}
      {/* </SelectOption> */} 

      {/* Input tipe number untuk memilih Tahun */}
        {/* Input Tipe Date untuk Tanggal Awal */}
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-3">
          Tanggal Awal
          <input
            type="date"
            onChange={handleStartDateChange}
            className="border py-3 px-4 pe-9 mt-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
      </div>

      {/* Input Tipe Date untuk Tanggal Akhir */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-3">
          Tanggal Akhir
          <input
            type="date"
            onChange={handleEndDateChange}
            className="border py-3 px-4 pe-9 mt-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
      </div>
        </div>
    
  )
}

export default FilterSelect;