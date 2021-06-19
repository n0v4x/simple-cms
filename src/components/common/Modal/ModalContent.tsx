import React, { ReactNode } from 'react'
import classNames from "classnames";

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={classNames("modal__content", className)}>
      {children}
    </div>
  )
}

export default ModalContent
