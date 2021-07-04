import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface Fields {
  horizontal: string;
}

const fields: { name: keyof Fields, label: string, input: InputConfigType & { placeholder?: string } }[] = [
  {
    name: "horizontal",
    label: "Horizontal",
    input: {
      inputType: "select",
      options: [
        {
          value: "flex-start",
          label: "Left"
        },
        {
          value: "center",
          label: "Center"
        },
        {
          value: "flex-end",
          label: "Right"
        }
      ]
    }
  },
]

const Component = ({ name }: PropertyProps) => {
  const { register } = useFormContext();

  return <Property name={config.name} >
    {fields.map(field => {
      return <FromControl className="property__item" key={field.name} label={field.label}>
        <Input {...field.input} {...register(`${name}.${field.name}`)} />
      </FromControl>
    })}
  </Property>
}

const config: Property<Fields> = {
  name: "Align items",
  defaultValue: {
    horizontal: "left"
  },
  component: Component
}


export default config;
