import React from 'react'
import ModuleHierarchyItem from "./ModuleHierarchyItem"
import { ModuleHierarchyGeneralProps } from "./ModuleHierarchy";

interface ModuleHierarchyListProps extends ModuleHierarchyGeneralProps {
  items: ModuleData[],
  parentId?: ModuleData["parentId"],
  level?: number,
  selected?: ModuleData | null,
  onSelect: (id: ModuleData["id"]) => void;
  onDelete: (id: ModuleData["id"]) => void;
  onAdd: (id: ModuleData["id"]) => void;
}

const ModuleHierarchyList = ({ items, parentId = 0, level = 0, selected, onAdd, onDelete, onSelect }: ModuleHierarchyListProps) => {
  const currentLevelItems = items.filter((item) => item.parentId === parentId)

  if (currentLevelItems.length === 0) {
    return null;
  }

  return (
    <ul className="module-hierarchy__list">
      {currentLevelItems.map((currentLevelItem) => {
        return <ModuleHierarchyItem
          level={level}
          item={currentLevelItem}
          key={currentLevelItem.id}
          isSelected={!!selected && selected.id === currentLevelItem.id}
          hasChildren={items.findIndex(child => child.parentId === currentLevelItem.id) !== -1}
          onAdd={() => onAdd(currentLevelItem.id)}
          onDelete={() => onDelete(currentLevelItem.id)}
          onSelect={() => onSelect(currentLevelItem.id)}
        >
          <ModuleHierarchyList
            items={items}
            level={level + 1}
            selected={selected}
            parentId={currentLevelItem.id}
            onAdd={onAdd}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        </ModuleHierarchyItem>
      })}
    </ul>
  )
}

export default ModuleHierarchyList
