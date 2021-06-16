import React, { ReactNode } from 'react'
import ModuleItem from '../ModuleItem';

interface ModuleListProps {
  items: ModuleData[];
  children?: ReactNode;
  isEditorMode?: boolean;
}

const ModuleList = ({ items, isEditorMode }: ModuleListProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  // return <>
  //   {items.map((item) => {
  //     return <ModuleItem
  //       isEditorMode={isEditorMode}
  //       key={item.id}
  //       data={item}
  //     >
  //       <ModuleList
  //         isEditorMode={isEditorMode}
  //         items={item.children}
  //       />
  //     </ModuleItem>
  //   })}
  // </>
}

export default ModuleList
