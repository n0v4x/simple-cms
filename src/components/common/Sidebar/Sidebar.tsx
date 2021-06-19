import React, { ReactNode } from 'react'

import classNames from 'classnames'

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <div className={classNames("sidebar", className)}>
      <div className="sidebar__inner">
        {children}
      </div>
    </div>
  )
}

export default Sidebar
