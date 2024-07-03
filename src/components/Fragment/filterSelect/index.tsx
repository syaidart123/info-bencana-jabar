import InputField from "@/components/UI/InputField";
import Option from "@/components/UI/Option";
import SelectOption from "@/components/UI/SelectOption";
import React from "react";
import SelectOptionFragment from "../OptionDaerah";

type propsTypes = {
  setSelectedBencana: any;
  setSelectedDaerah: any;
  setSelectedStartDate?: any;
  setSelectedEndDate?: any;
  className?: string;
};

const FilterSelect = (props: propsTypes) => {
  const {
    setSelectedBencana,
    setSelectedDaerah,
    setSelectedStartDate,
    setSelectedEndDate,
    className,
  } = props;
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEndDate(e.target.value);
  };

  return (
    <div className={`${className} flex flex-col-reverse gap-2 md:flex-row`}>
      <div className="mt-1 flex flex-col md:w-1/2">
        <InputField
          name="startDate"
          titleName="Tanggal Awal"
          type="date"
          onChange={handleStartDateChange}
        />
        <InputField
          name="endDate"
          titleName="Tanggal Akhir"
          type="date"
          onChange={handleEndDateChange}
        />
      </div>
      <div className="md:block md:w-1/2 md:flex-col md:gap-0">
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
        <SelectOptionFragment
          name="daerah"
          title="Pilih Daerah..."
          onChange={(e: any) => setSelectedDaerah(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterSelect;
