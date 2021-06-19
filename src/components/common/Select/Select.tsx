import React, { ChangeEvent, useCallback } from 'react'
import classNames from "classnames";

interface SelectProps {
  options: { value: SelectProps["value"], label: SelectProps["value"] }[];
  name?: string;
  value: string;
  onChange: (value: SelectProps["value"]) => void;
  className?: string;
}

const Select = ({ options, value, onChange, name, className }: SelectProps) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }, []);

  return (
    <select
      className={classNames("select", className)}
      name={name}
      value={value}
      onChange={handleChange}
    >
      {options.map(({ label, value }, i) => (
        <option key={i} value={value}>{label}</option>
      ))}
    </select>
  )
}

export default Select
