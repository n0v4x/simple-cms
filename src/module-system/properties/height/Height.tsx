import React from 'react'
import { ModulePropertyHeightData } from "."

interface ModulePropertyHeightProps extends ModulePropertyProps<ModulePropertyHeightData> {
}

const ModulePropertyHeight = ({ data, onChange }: ModulePropertyHeightProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    })
  }

  return (
    <div className="module-property">
      <input name="height" type="text" placeholder="Height" value={data.height} onChange={handleChange} />
    </div>
  )
}

export default ModulePropertyHeight
