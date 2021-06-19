import useModule from '@hooks/useModule'
import React, { useMemo } from 'react'

interface ModulePropertiesProps {
  moduleData: ModuleData,
  onChange: (moduleData: ModuleData) => void
}

const ModuleProperties = ({ moduleData, onChange }: ModulePropertiesProps) => {
  const module = useModule(moduleData.module.id);

  if (!module || !module.properties) {
    return null;
  }

  const handlePropertyChange = (id: string) => (data: any) => {
    const newModuleData: ModuleData = {
      ...moduleData,
      module: {
        ...moduleData.module,
        properties: {
          ...moduleData.module.properties,
          [id]: data
        }
      }
    }

    onChange(newModuleData);
  }

  const moduleProperties = moduleData.module.properties || {};

  return <nav className="module-properties">
    <ul className="module-properties__property-list list">
      {module.properties.map(({ property, id, name, description }, i) => {
        const PropertyComponent = property.component;

        return <li key={i} className="module-properties__property">
          <div className="module-properties__property-header">
            <p className="module-properties__property-name">
              {name || property.name}
            </p>
            {description || property.description ? <p className="module-properties__property-description">
              {description || property.description}
            </p> : null}
          </div>
          <div className="module-property__property-body">
            <PropertyComponent data={moduleProperties[id] ? moduleProperties[id] : property.defaultData} onChange={handlePropertyChange(id)} />
          </div>
        </li>
      })}
    </ul>
  </nav>
}

export default ModuleProperties