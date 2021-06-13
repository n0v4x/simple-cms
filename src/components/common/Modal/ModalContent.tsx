import React, { ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
}

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div className="modal__content">
      {children}
    </div>
  )
}

export default ModalContent
