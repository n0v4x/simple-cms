import React from 'react'

interface Props {
  checked: boolean;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ onChange, checked, name }: Props) => {
  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox__input" name={name} onChange={onChange} checked={checked} />
      <span className="checkbox__checkmark" />
    </label>
  )
}

export default Checkbox
