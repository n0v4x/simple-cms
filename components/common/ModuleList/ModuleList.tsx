import React, { ReactNode, useCallback } from 'react'
import { getModule } from 'modules';
import ModuleItem from '../ModuleItem';

interface ModuleListProps {
  onUpdate: (updatedState: ModuleData[]) => void;
  items: ModuleData["children"];
  children?: ReactNode;
  isEditorMode?: boolean;
}

const ModuleList = ({ onUpdate, items, isEditorMode }: ModuleListProps) => {
  if (!items) {
    return null;
  }

  const handleDelete = useCallback((moduleId: ModuleData["id"]) => {
    const withoutRemoved = items.filter(({ id }) => id !== moduleId);

    onUpdate(withoutRemoved)
  }, []);

  const handleAdd = useCallback(() => {
    const newModules: ModuleData = {
      id: Date.now(),
      type: "section"
    }

    onUpdate([...items, newModules]);
  }, []);

  const handleEdit = useCallback((moduleId: ModuleData["id"]) => {
    // const withoutRemoved = (modules as ModuleData[]).filter(({ id }) => id !== moduleId);

    // onEdit(withoutRemoved)
  }, []);

  const handleUpdate = (moduleId: ModuleData["id"]) => (modules: ModuleData[]) => {
    const updatedState = modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, modules }
      }
      return module;
    })

    onUpdate(updatedState)
  }

  return <>
    {items.map((moduleData) => {
      const module = getModule(moduleData.type);

      return module ? <ModuleItem
        isEditorMode={isEditorMode}
        key={moduleData.id}
        module={module}
        config={moduleData.config}
        onDelete={() => handleDelete(moduleData.id)}
        onAdd={handleAdd}
        onEdit={() => handleEdit(moduleData.id)}
      >
        <ModuleList
          isEditorMode={isEditorMode}
          onUpdate={handleUpdate(moduleData.id)}
          items={moduleData.children}
        />
      </ModuleItem> : null
    })}
  </>
}

export default ModuleList
