import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'

interface PanelBodyProps {
  children: ReactNode;
  className?: string;
}

const PanelBody = ({ children, className }: PanelBodyProps) => {
  return (
    <div className={classNames("panel__body", className)}>
      {children}
    </div>
  )
}

export default PanelBody
