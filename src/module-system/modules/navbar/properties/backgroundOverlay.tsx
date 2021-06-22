import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface BackgroundOverlayFields {
  color: string;
  opacity: number;
}

const fields: { name: keyof BackgroundOverlayFields, label: string, input: InputConfigType & { placeholder?: string } }[] = [
  {
    name: "color",
    label: "Color",
    input: {
      inputType: "color",
    }
  },
  {
    name: "opacity",
    label: "Opacity",
    input: {
      inputType: "range",
      min: 0,
      max: 1,
      step: 0.05
    }
  }
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

const config: Property<BackgroundOverlayFields> = {
  name: "Background overlay",
  defaultValue: {
    color: "#000000",
    opacity: 1
  },
  component: Component
}


export default config;
