import { ReactNode } from "react";
import classNames from "classnames";

interface ModuleItemProps {
  onDelete: () => void;
  onAdd: () => void;
  onEdit: () => void;
  module: Module;
  config?: ModuleData["config"],
  children?: ReactNode;
  isEditorMode?: boolean;
}

const ModuleItem = ({ onDelete, onAdd, onEdit, module, config, children, isEditorMode }: ModuleItemProps) => {
  const { Component } = module;

  if (!isEditorMode) {
    return <Component {...config}>
      {children}
    </Component>
  }

  return <div className={classNames("module", `module--type-${module.type}`)}>
    <header className="module__header">
      <p className="module__title">
        {module.name}
      </p>
    </header>
    <div className="module__body">
      <Component {...config}>
        {children}
      </Component>
    </div>
  </div>
}

export default ModuleItem;