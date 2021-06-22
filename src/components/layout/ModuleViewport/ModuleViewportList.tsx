import React, { ReactNode } from 'react'
import ModuleViewportItem from './ModuleViewportItem';
import { ModuleViewportGeneralProps } from './ModuleViewport';

interface ModuleViewportListProps extends ModuleViewportGeneralProps {
  items: ModuleData[];
  parentId: ModuleData["parentId"];
  level: number;
  selected?: ModuleData["id"] | null
}

const ModuleViewportList = ({ items, parentId, level, showModulesBoundaries, selected, ...generalProps }: ModuleViewportListProps) => {
  const currentLevelItems = items.filter((item) => item.parentId === parentId)

  if (currentLevelItems.length === 0) {
    return null;
  }

  return <>
    {currentLevelItems.map((currentLevelItem) => {
      return <ModuleViewportItem
        key={currentLevelItem.id}
        item={currentLevelItem}
        level={level}
        isSelected={!!selected && selected === currentLevelItem.id}
        showModulesBoundaries={showModulesBoundaries}
        hasChildren={items.findIndex(child => child.parentId === currentLevelItem.id) !== -1}
        {...generalProps}
      >
        <ModuleViewportList
          level={level + 1}
          items={items}
          parentId={currentLevelItem.id}
          selected={selected}
          showModulesBoundaries={showModulesBoundaries}
          {...generalProps}
        />
      </ModuleViewportItem>
    })}
  </>
}

export default ModuleViewportList
