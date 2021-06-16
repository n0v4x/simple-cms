import React, { memo, MutableRefObject, ReactNode, RefObject, useCallback } from 'react'
import ModuleHierarchyList from "./ModuleHierarchyList";

export interface ModuleHierarchyGeneralProps {
  // onSelect?: (id: ModuleData["id"]) => void;
  // onDelete?: (id: ModuleData["id"]) => void;
  // onAdd?: (id: ModuleData["id"]) => void;
  onAction: (action: {
    type: "select" | "delete" | "add",
    payload: {
      id: ModuleData["id"]
    }
  }) => void
}

interface ModuleHierarchyProps extends ModuleHierarchyGeneralProps {
  items: ModuleData[],
  selected?: ModuleData["id"];
}

const ModuleHierarchy = ({ items, ...generalProps }: ModuleHierarchyProps) => {
  if (items.length === 0) {
    return null;
  }

  return <nav className="module-hierarchy">
    <ModuleHierarchyList items={items} {...generalProps} />
  </nav>
}

export default ModuleHierarchy;
