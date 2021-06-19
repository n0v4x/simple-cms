import React, { memo, MutableRefObject, ReactNode, RefObject, useCallback } from 'react'
import ModuleHierarchyList from "./ModuleHierarchyList";
import classNames from "classnames";

export interface ModuleHierarchyGeneralProps {
}

interface ModuleHierarchyProps extends ModuleHierarchyGeneralProps {
  items: ModuleData[],
  selected?: ModuleData | null,
  className?: string;
  onSelect: (id: ModuleData["id"]) => void;
  onDelete: (id: ModuleData["id"]) => void;
  onAdd: (id: ModuleData["id"]) => void;
}

const ModuleHierarchy = ({ items, className, ...generalProps }: ModuleHierarchyProps) => {
  if (items.length === 0) {
    return null;
  }

  return <nav className={classNames("module-hierarchy", className)}>
    <ModuleHierarchyList items={items} {...generalProps} />
  </nav>
}

export default ModuleHierarchy;
