import Option from "@/components/UI/Option";
import SelectOption from "@/components/UI/SelectOption";
import React from "react";

const daerahOptions = [
  { label: "Kota Bandung", value: "Kota Bandung" },
  { label: "Kabupaten Bandung", value: "Kabupaten Bandung" },
  { label: "Kabupaten Bandung Barat", value: "Kabupaten Bandung Barat" },
  { label: "Kota Banjar", value: "Kota Banjar" },
  { label: "Kabupaten Bekasi", value: "Kabupaten Bekasi" },
  { label: "Kota Bekasi", value: "Kota Bekasi" },
  { label: "Kabupaten Bogor", value: "Kabupaten Bogor" },
  { label: "Kota Bogor", value: "Kota Bogor" },
  { label: "Kabupaten Ciamis", value: "Kabupaten Ciamis" },
  { label: "Kabupaten Cirebon", value: "Kabupaten Cirebon" },
  { label: "Kota Cirebon", value: "Kota Cirebon" },
  { label: "Kabupaten Cianjur", value: "Kabupaten Cianjur" },
  { label: "Kabupaten Garut", value: "Kabupaten Garut" },
  { label: "Kabupaten Indramayu", value: "Kabupaten Indramayu" },
  { label: "Kabupaten Karawang", value: "Kabupaten Karawang" },
  { label: "Kabupaten Kuningan", value: "Kabupaten Kuningan" },
  { label: "Kabupaten Majalengka", value: "Kabupaten Majalengka" },
  { label: "Kabupaten Pangandaran", value: "Kabupaten Pangandaran" },
  { label: "Kabupaten Purwakarta", value: "Kabupaten Purwakarta" },
  { label: "Kabupaten Subang", value: "Kabupaten Subang" },
  { label: "Kabupaten Sukabumi", value: "Kabupaten Sukabumi" },
  { label: "Kabupaten Sumedang", value: "Kabupaten Sumedang" },
  { label: "Kota Sukabumi", value: "Kota Sukabumi" },
  { label: "Kabupaten Tasikmalaya", value: "Kabupaten Tasikmalaya" },
  { label: "Kota Tasikmalaya", value: "Kota Tasikmalaya" },
];

type propsTypes = {
  label?: string;
  name: string;
  title: string;
  defaultValue?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectOptionFragment = (props: propsTypes) => {
  const { label, name, title, defaultValue, onChange } = props;
  return (
    <SelectOption
      label={label}
      name={name}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {daerahOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </SelectOption>
  );
};

export default SelectOptionFragment;
