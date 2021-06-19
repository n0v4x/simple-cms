import React, { ReactElement, ReactNode } from 'react'

interface PanelHeaderProps {
  children?: ReactNode;
}

const PanelHeader = ({ children }: PanelHeaderProps) => {
  return (
    <div className="panel__header">
      {children}
    </div>
  )
}

export default PanelHeader
