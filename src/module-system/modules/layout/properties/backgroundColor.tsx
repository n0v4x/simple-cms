import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface BackgroundColorFields {
  color: string;
}

const fields: { name: keyof BackgroundColorFields, label: string, input: InputConfigType & { placeholder?: string } }[] = [
  {
    name: "color",
    label: "Color",
    input: {
      inputType: "color",
    }
  },
]

const Component = ({ name }: PropertyProps) => {
  const { register } = useFormContext();

  return <Property name={config.name}>
    {fields.map(field => {
      return <FromControl className="property__item" key={field.name} label={field.label}>
        <Input {...field.input} {...register(`${name}.${field.name}`)} />
      </FromControl>
    })}
  </Property>
}

const config: Property<BackgroundColorFields> = {
  name: "Background color",
  defaultValue: {
    color: "#ffffff",
  },
  component: Component
}


export default config;
