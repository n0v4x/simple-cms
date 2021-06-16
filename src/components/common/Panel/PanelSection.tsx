import React, { ReactNode } from 'react'
import classNames from "classnames";

interface PanelSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const PanelSection = ({ title, children, className }: PanelSectionProps) => {
  return (
    <li className={classNames("panel__section", className)}>
      <div className="panel__section-header">
        <span className="panel__section-title">
          {title}
        </span>
      </div>
      <div className="panel__section-body">
        {children}
      </div>
    </li>
  )
}

export default PanelSection
