import classNames from 'classnames'
import React, { forwardRef, Ref } from 'react'

export interface RangeProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  // ref: Ref<RangeRef>
}

export type RangeRef = HTMLInputElement;

const Range = ({ className, ...inputProps }: RangeProps, ref: Ref<RangeRef>) => {
  return <input ref={ref} className={classNames("input", className)} {...inputProps} type="range" />
}

export default forwardRef<RangeRef, RangeProps>(Range)
