import React, { ReactNode } from "react";
import classNames from "classnames";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({ open, onClose, children, className }: ModalProps) => {
  return (
    <div className={classNames("modal", { "is-open": open }, className)}>
      <div className="modal__inner">
        <div className="modal__background" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
