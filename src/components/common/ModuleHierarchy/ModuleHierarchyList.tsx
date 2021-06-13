import { getModule } from 'modules';
import React, { ReactNode, useCallback } from 'react'
import ModuleHierarchyItem from "./ModuleHierarchyItem";

interface ModuleHierarchyListProps {
  onUpdate: (updatedState: ModuleData[]) => void;
  items: ModuleData["children"];
  children?: ReactNode;
}

const ModuleHierarchyList = ({ onUpdate, items }: ModuleHierarchyListProps) => {
  if (!items) {
    return null;
  }

  const handleDelete = (moduleId: ModuleData["id"]) => {
    const itemsWithoutDeleted = items.filter(({ id }) => id !== moduleId);

    onUpdate(itemsWithoutDeleted)
  }

  const handleAdd = (moduleId: ModuleData["id"]) => {
    const itemsWithNewAdded = items.map(module => {
      if (module.id === moduleId) {
        const newModule: ModuleData = {
          id: Date.now(),
          type: "section"
        }

        const children = module.children ? [...module.children, newModule] : [newModule];

        return { ...module, children }
      }
      return module;
    })

    onUpdate(itemsWithNewAdded)
  }

  const handleEdit = useCallback((moduleId: ModuleData["id"]) => {
    // const withoutRemoved = (modules as ModuleData[]).filter(({ id }) => id !== moduleId);

    // onEdit(withoutRemoved)
  }, []);

  const handleUpdate = (moduleId: ModuleData["id"]) => (children: ModuleData[]) => {
    const updatedState = items.map(module => {
      if (module.id === moduleId) {
        return { ...module, children }
      }
      return module;
    })

    onUpdate(updatedState)
  }

  return <ul className="module-hierarchy__list">
    {items.map((moduleData) => {
      const module = getModule(moduleData.type);

      return module ? <ModuleHierarchyItem
        key={moduleData.id}
        module={module}
        config={moduleData.config}
        onDelete={() => handleDelete(moduleData.id)}
        onAdd={() => handleAdd(moduleData.id)}
        onEdit={() => handleEdit(moduleData.id)}
      >
        <ModuleHierarchyList
          onUpdate={handleUpdate(moduleData.id)}
          items={moduleData.children}
        />
      </ModuleHierarchyItem> : null
    })}
  </ul>
}

export default ModuleHierarchyList
