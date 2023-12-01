import React, { useState, ReactElement } from "react";

type SelectBoxProps<T> = {
  children: ReactElement | ReactElement[];
  onChange: (value: T) => void;
};

function SelectBox<T>({ children, onChange }: SelectBoxProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as unknown as T;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <select value={String(selectedValue)} onChange={handleChange}>
      {children}
    </select>
  );
}

type OptionProps = {
  value: string;
  children: ReactElement | ReactElement[];
};

const Option: React.FC<OptionProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

SelectBox.Option = Option;

export default SelectBox;
