import React, { ReactNode } from 'react'
import { X } from "react-feather";

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

const ModalHeader = ({ title, subtitle, onClose }: ModalHeaderProps) => {
  return (
    <div className="modal__header">
      <h2 className="modal__title">
        {title}
      </h2>
      <p className="modal__subtitle">
        {subtitle}
      </p>
      <button className="modal__close-button button" onClick={onClose}>
        <X />
      </button>
    </div>
  )
}

export default ModalHeader
