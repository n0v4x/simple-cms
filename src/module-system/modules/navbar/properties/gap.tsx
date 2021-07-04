import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'



const Component = ({ name }: PropertyProps) => {
  const { register } = useFormContext();

  return <Property name={config.name} >
    <Input inputType="text" {...register(name)} />
  </Property>
}

const config: Property<string> = {
  name: "Gap",
  defaultValue: "",
  component: Component
}


export default config;
