import React, { forwardRef, Ref } from 'react'
import classNames from "classnames";

export interface SelectProps extends Omit<React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "ref"> {
  // ref: Ref<SelectRef>,
  options: { value: SelectProps["value"], label: string }[];
}

export type SelectRef = HTMLSelectElement;

const Select = ({ options, className, ...selectProps }: SelectProps, ref: Ref<SelectRef>) => {
  return (
    <select
      ref={ref}
      className={classNames("select", className)}
      {...selectProps}
    >
      {options.map(({ label, value }, i) => (
        <option key={i} value={value}>{label}</option>
      ))}
    </select>
  )
}

export default forwardRef<SelectRef, SelectProps>(Select)
