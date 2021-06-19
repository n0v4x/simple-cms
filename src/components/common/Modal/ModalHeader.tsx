import React, { ReactNode } from 'react'
import { X } from "react-feather";
import classNames from "classnames";

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  className?: string;
}

const ModalHeader = ({ title, subtitle, onClose, className }: ModalHeaderProps) => {
  return (
    <div className={classNames("modal__header", className)}>
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
