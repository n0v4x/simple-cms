import React from 'react'
import { ModulePropertyHeightData } from "."

interface ModulePropertyHeightProps extends ModulePropertyProps<ModulePropertyHeightData> {
}

const ModulePropertyHeight = ({ data, onChange }: ModulePropertyHeightProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="module-property">
      <input name="height" type="text" placeholder="Height" value={data} onChange={handleChange} />
    </div>
  )
}

export default ModulePropertyHeight
