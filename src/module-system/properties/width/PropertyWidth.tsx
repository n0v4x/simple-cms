import React from 'react'

const units = ["px", "%", "em", "rem"];

interface ModulePropertyWidthProps extends ModulePropertyProps<{
  value: number,
  unit: string
}> {
}

const ModulePropertyWidth = ({ data, onChange }: ModulePropertyWidthProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === "value" ? parseInt(value) : value
    })
  }

  return (
    <div className="module-property">
      <input name="value" type="number" placeholder="width" value={data.value} onChange={handleChange} />
      <select name="unit" value={data.unit} placeholder="unit" onChange={handleChange}>
        {units.map((unit, i) => <option key={i} value={unit}>{unit}</option>)}
      </select>
    </div>
  )
}

export default ModulePropertyWidth
