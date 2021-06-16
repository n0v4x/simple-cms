import React from 'react'
import { ModulePropertyBackgroundData } from '.';


interface BackgroundProps extends ModulePropertyProps<ModulePropertyBackgroundData> {
}

const Background = ({ data, onChange }: BackgroundProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({
      ...data,
      [name]: value
    })
  }

  return (
    <div className="module-property">
      <input name="image" type="text" placeholder="background image" value={data.image} onChange={handleChange} />
      <select name="size" value={data.size} placeholder="unit" onChange={handleChange}>
        {["cover", "contain"].map((unit, i) => <option key={i} value={unit}>{unit}</option>)}
      </select>
      <input name="fixed" type="checkbox" checked={data.fixed} />
    </div>
  )
}

export default Background
