import React, { ReactNode } from 'react'
import ModuleViewportList from "./ModuleViewportList";

export interface ModuleViewportGeneralProps {
  showModulesBoundaries?: boolean;
  onSelect?: (moduleData: ModuleData) => void
}

interface ModuleViewportProps extends ModuleViewportGeneralProps {
  items: ModuleData[];
  selected?: ModuleData["id"];
}

const ModuleViewport = ({ items, ...generalProps }: ModuleViewportProps) => {
  if (items.length === 0) {
    return null;
  }

  return <div className="module-viewport">
    <ModuleViewportList level={0} parentId={0} items={items} {...generalProps} />
  </div>
}

export default ModuleViewport
