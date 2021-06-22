import classNames from 'classnames'
import React, { ReactNode } from 'react'

interface PropertyProps {
  name: string;
  children?: ReactNode;
  className?: string;
}

const Property = ({ name, children, className }: PropertyProps) => {
  return <div className={classNames("property", className)}>
    <div className="property__header">
      <p className="property__title">{name}</p>
    </div>
    <div className="property__body">
      {children}
    </div>
  </div>
}

export default Property
