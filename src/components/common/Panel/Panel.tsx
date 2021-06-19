import React, { ReactNode } from 'react'
import classNames from "classnames";

interface PanelSectionProps {
  children: ReactNode;
  className?: string;
}

const PanelSection = ({ children, className }: PanelSectionProps) => {
  return (
    <div className={classNames("panel", className)}>
      {children}
    </div>
  )
}

export default PanelSection
