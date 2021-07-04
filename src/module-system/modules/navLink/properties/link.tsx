import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface BackgroundOverlayFields {
  href: string;
  label: string;
}

const fields: { name: keyof BackgroundOverlayFields, label: string, input: InputConfigType & { placeholder?: string } }[] = [
  {
    name: "label",
    label: "Label",
    input: {
      inputType: "text",
    }
  },
  {
    name: "href",
    label: "Href",
    input: {
      inputType: "text",
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

const config: Property<BackgroundOverlayFields> = {
  name: "Background overlay",
  defaultValue: {
    href: "",
    label: "Link"
  },
  component: Component
}


export default config;
