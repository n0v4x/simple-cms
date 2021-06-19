import classNames from 'classnames'
import React, { forwardRef, Ref } from 'react'

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

type InputRef = HTMLInputElement;


const Input = ({ className, ...inputProps }: InputProps, ref: Ref<InputRef>) => {
  return (
    <input ref={ref} className={classNames("input", className)} {...inputProps} />
  )
}

export default forwardRef<InputRef, InputProps>(Input)
