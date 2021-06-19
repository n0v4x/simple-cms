import React, { useState } from 'react'
import { ModulePropertyWidthData } from '.';

const units = ["", "px", "%", "em", "rem"];

interface ModulePropertyWidthProps extends ModulePropertyProps<ModulePropertyWidthData> {
}

const ModulePropertyWidth = ({ data, onChange }: ModulePropertyWidthProps) => {
  // const [unit, setUnit] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  // const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setUnit(e.target.value);
  // }

  return (
    <div className="module-property">
      <input name="value" type="text" placeholder="Value" value={data} onChange={handleChange} />
      {/* <select value={unit} placeholder="unit" onChange={handleUnitChange}>
        {units.map((unit, i) => <option key={i} value={unit}>{unit}</option>)}
      </select> */}
    </div>
  )
}

export default ModulePropertyWidth
