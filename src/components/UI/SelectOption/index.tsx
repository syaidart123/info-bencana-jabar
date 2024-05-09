import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { XIcon } from 'lucide-react';

type PropsTypes = {
    label?: string;
    name: string;
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
    id?:string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectOption = (props: PropsTypes) => {
    const { label, name, title, children, disabled, onChange, id, defaultValue } = props;
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue]);

    const handleReset = () => {
        setSelectedValue('');
        if (onChange) {
            const event = {
                target: { value: '' },
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
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-3">
            {label}
            <div className="relative">
                <select
                    name={name}
                    value={selectedValue}
                    disabled={disabled}
                    onChange={handleChange}
                    defaultValue={defaultValue}
                    id={id}
                    className="border py-3 px-4 pe-9 mt-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                    <option value="" disabled>
                        {title}
                    </option>
                    {children}
                </select>
                {/* Tombol "x" untuk mereset nilai */}
                {selectedValue && (
                    <Button
                        type="button"
                        onClick={handleReset}
                        className="absolute inset-y-0 right-0 px-5 mr-3 flex items-center text-gray-500"
                    >
                        <XIcon width={20} height={20}/>
                    </Button>
                )}
            </div>
        </label>
    );
};

export default SelectOption;
