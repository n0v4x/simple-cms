import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

export type FieldsType = string;

const Component = ({ name }: PropertyProps) => {
  const { register } = useFormContext();

  return <Property name={config.name} >
    <FromControl label="Height">
      <Input inputType="text" {...register(name)} />
    </FromControl>
  </Property>
}

const config: Property<FieldsType> = {
  name: "Height",
  defaultValue: "",
  component: Component
}


export default config;
