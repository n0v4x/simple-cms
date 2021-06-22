import classNames from 'classnames'
import React, { ReactNode } from 'react'

interface FromControlProps {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

const FromControl = ({ label, className, error, children }: FromControlProps) => {
  const content = <div className="form-control__content">
    {children}
  </div>

  return (
    <div className={classNames("form-control", className)}>
      { label ? <label className="form-control__main">
        <p className="form-control__label">
          {label}
        </p>
        {content}
      </label> : content}
      <div className="form-control__error">
        {error}
      </div>
    </div>
  )
}

export default FromControl
