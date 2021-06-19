import React, { ReactNode } from 'react'

interface FromControlProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

const FromControl = ({ label, error, children }: FromControlProps) => {
  const content = <div className="form-control__content">
    {children}
  </div>

  return (
    <div className="form-control">
      { label ? <label className="form-control__main">
        <p className="form-control__label">
          {label}
        </p>
        {content}
      </label> : content}
      { error && <div className="form-control__error">
        {error}
      </div>}
    </div>
  )
}

export default FromControl
