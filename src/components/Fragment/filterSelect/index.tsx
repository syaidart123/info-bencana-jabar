import Option from '@/components/UI/Option';
import SelectOption from '@/components/UI/SelectOption';
import React from 'react'

type propsTypes = {
    setSelectedBencana: any
    setSelectedDaerah: any
    
}

const FilterSelect = (props :propsTypes) => {
    const {setSelectedBencana,setSelectedDaerah}=props
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
        </div>
    
  )
}

export default FilterSelect;