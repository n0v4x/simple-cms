import { ReactNode } from "react";
import classNames from "classnames";

import { Trash } from "react-feather";


interface ModuleHierarchyItemProps {
  onDelete: () => void;
  onAdd: () => void;
  onEdit: () => void;
  module: Module;
  config?: ModuleData["config"],
  children?: ReactNode;
}

const ModuleHierarchyItem = ({ onDelete, onAdd, onEdit, module, config, children }: ModuleHierarchyItemProps) => {
  return <li className={classNames("module-hierarchy-item", `module-hierarchy-item--type-${module.type}`)}>
    <div className="module-hierarchy-item__header">
      <p className="module-hierarchy-item__name">{module.name}</p>
      <ul className="module-hierarchy-item__control-list list">
        <li className="module-hierarchy-item__control-item">
          <button onClick={onDelete} className="button">
            <Trash size="1em" />
          </button>
        </li>
      </ul>
    </div>
    {children ? <div className="module-hierarchy-item__body">
      {children}
    </div> : null}
    <button onClick={onAdd}>
      add
    </button>
  </li>
}

export default ModuleHierarchyItem;