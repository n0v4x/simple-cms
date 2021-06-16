import React, { ReactNode } from 'react'
import classNames from "classnames";

interface PanelProps {
  className?: string;
  children: ReactNode
}

const Panel = ({ className, children }: PanelProps) => {
  return (
    <div className={classNames("panel", className)}>
      <div className="panel__inner">
        <ul className="panel__section-list">
          {children}
        </ul>
      </div>
    </div>
  )
}

export default Panel
