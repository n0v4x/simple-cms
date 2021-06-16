import React, { useMemo } from 'react'

interface ModulePropertyListProps {
  data: ModuleDataProperties,
  properties: ModuleProperties,
  onChange: (updatedData: ModuleDataProperties) => void
}

const ModulePropertyList = ({ data, properties, onChange }: ModulePropertyListProps) => {
  const handlePropertyChange = (id: string) => (value: any) => {
    onChange({
      ...data,
      [id]: value
    })
  }

  return <ul className="module-property-list list">
    {Object.entries(properties).map(([id, propertyData], i) => {
      const PropertyComponent = propertyData.property.component;

      return <li key={i} className="module-property-list__item">
        <div className="module-property-list__item-header">
          {propertyData.name}
        </div>
        <div className="module-property-list__item-body">
          <PropertyComponent data={data[id] || propertyData.property.defaultData} onChange={handlePropertyChange(id)} />
        </div>
      </li>
    })}
  </ul>
}

export default ModulePropertyList
