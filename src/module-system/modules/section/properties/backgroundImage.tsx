import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface BackgroundImagePropertiesFields {
  src: string;
  attachment: "fixed" | "";
  size: string;
}

const fields: { name: keyof BackgroundImagePropertiesFields, label: string, input: InputConfigType & { placeholder?: string } }[] = [
  {
    name: "src",
    label: "Url",
    input: {
      inputType: "text",
      placeholder: "/example.jpg"
    }
  },
  {
    name: "size",
    label: "Size",
    input: {
      inputType: "select",
      options: [{ value: "", label: "None" }, { value: "cover", label: "cover" }, { value: "contain", label: "Contain" }]
    }
  },
  {
    name: "attachment",
    label: "Attachment",
    input: {
      inputType: "select",
      options: [{ value: "", label: "None" }, { value: "fixed", label: "Fixed" }]
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

const config: Property<BackgroundImagePropertiesFields> = {
  name: "Background image",
  defaultValue: {
    src: "",
    attachment: "",
    size: ""
  },
  component: Component
}


export default config;
