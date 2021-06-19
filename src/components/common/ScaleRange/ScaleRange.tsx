import React from 'react'
import { ZoomOut, ZoomIn } from "react-feather";

interface ScaleRangeProps {
  onChange: (scale: number) => void;
  min?: number;
  max?: number;
  step?: number;
  value: number;
}

const ScaleRange = ({ onChange, min = 0.5, max = 1, step = 0.05, value }: ScaleRangeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value);
  }

  // const zoomIn = () => {
  //   onChange()
  // }

  return (
    <div className="scale-range">
      <div className="scale-range__left">
        <button className="button">
          <ZoomOut size={"1em"} />
        </button>
      </div>

      <div className="scale-range__content">
        <input className="scale-range__slider" type="range" min={min} max={max} step={step} value={value} onChange={handleChange} />
      </div>

      <div className="scale-range__right">
        <button className="button">
          <ZoomIn size={"1em"} />
        </button>
      </div>
    </div>
  )
}

export default ScaleRange
