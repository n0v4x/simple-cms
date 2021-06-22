import React, { forwardRef, Ref } from 'react'
import classNames from 'classnames'

export interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  // ref: Ref<CheckboxRef>
}

export type CheckboxRef = HTMLInputElement;

const Checkbox = ({ className, ...inputProps }: CheckboxProps, ref: Ref<CheckboxRef>) => {
  return (
    <label className={classNames("checkbox", className)}>
      <input type="checkbox" ref={ref} className="checkbox__input" {...inputProps} />
      <span className="checkbox__checkmark" />
    </label>
  )
}

export default forwardRef<CheckboxRef, CheckboxProps>(Checkbox);
