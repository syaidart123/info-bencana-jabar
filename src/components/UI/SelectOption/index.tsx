import React, { useState, useEffect } from "react";
import Button from "../Button";
import { XIcon } from "lucide-react";

type PropsTypes = {
  label?: string;
  name: string;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  id?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

const SelectOption = (props: PropsTypes) => {
  const {
    label,
    name,
    title,
    children,
    disabled,
    onChange,
    id,
    defaultValue,
    required,
  } = props;
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const handleReset = () => {
    setSelectedValue("");
    if (onChange) {
      const event = {
        target: { value: "" },
      };
      onChange(event as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className="mb-2 mt-3 block text-sm font-medium text-gray-900">
      {label}
      <div className="relative">
        <select
          name={name}
          value={selectedValue}
          disabled={disabled}
          onChange={handleChange}
          defaultValue={defaultValue}
          required={required}
          id={id}
          className="mt-3 block w-full truncate rounded-lg border border-gray-200 p-2.5 text-sm shadow-sm disabled:pointer-events-none disabled:opacity-50"
        >
          <option value="" disabled>
            {title}
          </option>
          {children}
        </select>
        {selectedValue && (
          <Button
            type="button"
            onClick={handleReset}
            className="absolute inset-y-0 right-0 mr-3 flex items-center px-5 text-gray-500"
          >
            <XIcon width={20} height={20} />
          </Button>
        )}
      </div>
    </label>
  );
};

export default SelectOption;
