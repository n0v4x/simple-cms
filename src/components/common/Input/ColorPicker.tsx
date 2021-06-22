import classNames from 'classnames'
import React, { forwardRef, Ref } from 'react'

export interface ColorPickerProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  // ref: Ref<ColorPickerRef>
}

export type ColorPickerRef = HTMLInputElement;

const ColorPicker = ({ className, ...inputProps }: ColorPickerProps, ref: Ref<ColorPickerRef>) => {
  return (
    <input ref={ref} className={classNames("color-picker", className)} {...inputProps} type="color" />
  )
}

export default forwardRef<ColorPickerRef, ColorPickerProps>(ColorPicker)
