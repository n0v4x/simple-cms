import React, { ReactNode } from 'react'
import PageModule from './PageModule';

interface PageModulesProps {
  data: ModuleData[];
  parentId?: ModuleData["parentId"];
  level?: number;
}

const PageModules = ({ data, parentId = 0, level = 0 }: PageModulesProps) => {
  const currentLevelItems = data.filter((item) => item.parentId === parentId)

  if (currentLevelItems.length === 0) {
    return null;
  }

  return <>
    {currentLevelItems.map((currentLevelItem) => {
      return <PageModule
        key={currentLevelItem.id}
        data={currentLevelItem}
      >
        <PageModules
          level={level + 1}
          data={data}
          parentId={currentLevelItem.id}
        />
      </PageModule>
    })}
  </>
}

export default PageModules
