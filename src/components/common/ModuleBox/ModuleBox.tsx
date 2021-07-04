import classNames from 'classnames'
import React from 'react'

interface ModuleBoxProps {
  className?: string;
  module: Module;
  isSelected?: boolean;
}

const ModuleBox = ({ module, className, isSelected }: ModuleBoxProps) => {
  return (
    <div className={classNames("module-box", className, { "is-selected": isSelected })}>
      <div className="module-box__header">
        {module.name}
      </div>
      <div className="module-box__inner" />
    </div>
  )
}

export default ModuleBox
