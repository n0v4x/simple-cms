import React, { ReactNode } from 'react'
import classNames from "classnames";

interface ModalFooterProps {
  children?: ReactNode;
  className?: string;
}

const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={classNames("modal__footer", className)}>
      {children}
    </div>
  )
}

export default ModalFooter
