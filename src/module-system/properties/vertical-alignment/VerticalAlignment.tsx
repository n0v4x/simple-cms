import Select from '@components/common/Select';
import React from 'react'
import { ModulePropertyData } from '.';

interface VerticalAlignmentProps extends ModulePropertyProps<ModulePropertyData> {

}
const verticalAlignmentItems = [
  {
    label: "none",
    value: "",
  },
  {
    label: "top",
    value: "flex-start"
  },
  {
    label: "bottom",
    value: "flex-end"
  },
  {
    label: "center",
    value: "center"
  }
];

const VerticalAlignment = ({ data, onChange }: VerticalAlignmentProps) => {
  const handleChange = (value: string) => {

    onChange(value);
  }

  return (
    <div className="module-property">
      <label className="module-property__item">
        <span className="module-property__item-label">

        </span>
        <Select options={verticalAlignmentItems} value={data} onChange={onChange} />
        {/* <select className="module-property__item-select" name="size" value={data} placeholder="unit" onChange={handleChange}>
          {verticalAlignmentItems.map(({ name, value }, i) => <option key={i} value={value}>{name}</option>)}
        </select> */}
      </label>
    </div>
  )
}

export default VerticalAlignment
