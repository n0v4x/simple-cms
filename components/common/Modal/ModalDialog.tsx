import React, { ReactNode } from 'react'

interface ModalDialogProps {
  children?: ReactNode
}

const ModalDialog = ({ children }: ModalDialogProps) => {
  return (
    <div className="modal__dialog">
      {children}
    </div>
  )
}

export default ModalDialog
