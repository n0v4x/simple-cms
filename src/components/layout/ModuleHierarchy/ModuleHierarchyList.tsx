import React from 'react'
import ModuleHierarchyItem from "./ModuleHierarchyItem"
import { ModuleHierarchyGeneralProps } from "./ModuleHierarchy";

interface ModuleHierarchyListProps extends ModuleHierarchyGeneralProps {
  items: ModuleData[],
  parentId?: ModuleData["parentId"],
  level?: number,
  selected?: ModuleData["id"]
}

const ModuleHierarchyList = ({ items, parentId = 0, level = 0, selected, onAction }: ModuleHierarchyListProps) => {
  const currentLevelItems = items.filter((item) => item.parentId === parentId)

  return (
    <ul className="module-hierarchy__list">
      {currentLevelItems.map((currentLevelItem) => {
        return <ModuleHierarchyItem
          level={level}
          item={currentLevelItem}
          key={currentLevelItem.id}
          isSelected={selected === currentLevelItem.id}
          hasChildren={items.findIndex(child => child.parentId === currentLevelItem.id) !== -1}
          onAction={onAction}
        >
          <ModuleHierarchyList
            items={items}
            level={level + 1}
            selected={selected}

            parentId={currentLevelItem.id}
            onAction={onAction}
          />
        </ModuleHierarchyItem>
      })}
    </ul>
  )
}

export default ModuleHierarchyList
