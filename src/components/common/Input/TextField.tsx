import classNames from 'classnames'
import React, { forwardRef, Ref } from 'react'

export interface TextFieldProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  // ref: Ref<TextFieldRef>
}

export type TextFieldRef = HTMLInputElement;

const TextField = ({ className, ...inputProps }: TextFieldProps, ref: Ref<TextFieldRef>) => {
  return (
    <input ref={ref} className={classNames("input", className)} {...inputProps} />
  )
}

export default forwardRef<TextFieldRef, TextFieldProps>(TextField)
