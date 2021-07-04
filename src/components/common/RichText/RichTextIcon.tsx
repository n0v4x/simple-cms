import classNames from 'classnames'
import React, { forwardRef, ReactNode, Ref } from 'react'
import { css } from 'styled-components'

interface RichTextIconProps {
  className?: string;
  children?: ReactNode;
}

const RichTextIcon = ({ children, className }: RichTextIconProps, ref: Ref<HTMLSpanElement>) => {
  return (
    <span
      ref={ref}
      className={className}
    >
      {children}
    </span>
  )
}


export default forwardRef<HTMLSpanElement, RichTextIconProps>(RichTextIcon)
