import React, { ReactElement, ReactNode } from 'react'

interface PanelFooterProps {
  children?: ReactNode;
}

const PanelFooter = ({ children }: PanelFooterProps) => {
  return (
    <div className="panel__footer">
      {children}
    </div>
  )
}

export default PanelFooter
