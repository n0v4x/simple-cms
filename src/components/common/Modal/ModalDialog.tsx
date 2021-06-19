import React, { ReactNode } from 'react'
import classNames from "classnames";

interface ModalDialogProps {
  children?: ReactNode;
  className?: string;
}

const ModalDialog = ({ children, className }: ModalDialogProps) => {
  return (
    <div className={classNames("modal__dialog", className)}>
      {children}
    </div>
  )
}

export default ModalDialog
