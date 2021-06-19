import Checkbox from '@components/common/Checkbox';
import React from 'react'
import { ModulePropertyBackgroundData } from '.';


interface BackgroundProps extends ModulePropertyProps<ModulePropertyBackgroundData> {
}

const Background = ({ data, onChange }: BackgroundProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({
      ...data,
      [name]: name === "fixed" ? !data.fixed : value
    })
  }

  return (
    <div className="module-property">
      <label className="module-property__item">
        <span className="module-property__item-label">
          Url
        </span>
        <input className="module-property__item-input" name="image" type="text" placeholder="background image" value={data.image} onChange={handleChange} />
      </label>
      <label className="module-property__item">
        <span className="module-property__item-label">
          Size
        </span>
        <select className="module-property__item-select select" name="size" value={data.size} placeholder="unit" onChange={handleChange}>
          {["", "cover", "contain"].map((unit, i) => <option key={i} value={unit}>{unit}</option>)}
        </select>
      </label>
      <label className="module-property__item module-property__item--horizontal">
        <span className="module-property__item-label">
          Fixed
        </span>
        <Checkbox name="fixed" checked={data.fixed} onChange={handleChange} />
        {/* <input className="module-property__item-input" name="fixed" type="checkbox" checked={data.fixed} onChange={handleChange} /> */}
      </label>
    </div>
  )
}

export default Background
