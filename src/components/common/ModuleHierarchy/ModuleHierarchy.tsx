import React, { ReactNode, useCallback } from 'react'

import ModuleHierarchyList from './ModuleHierarchyList';

interface ModuleHierarchyProps {
  onUpdate: (updatedState: ModuleData[]) => void;
  items: ModuleData["children"];
}

const ModuleHierarchy = ({ onUpdate, items }: ModuleHierarchyProps) => {
  return <div className="module-hierarchy">
    <ModuleHierarchyList onUpdate={onUpdate} items={items} />
  </div>
}

export default ModuleHierarchy
