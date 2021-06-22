import { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { InputConfigType } from '@components/common/Input/Input';
import Property from '@components/common/Property';
import React from 'react'
import { useFormContext } from 'react-hook-form'

type Fields = string;


const Component = ({ name }: PropertyProps) => {
  const { register } = useFormContext();

  return <Property name={config.name}>
    <FromControl>
      <Input inputType="text" {...register(name)} />
    </FromControl>
  </Property>
}

const config: Property<Fields> = {
  name: "Max width",
  defaultValue: "auto",
  component: Component
}


export default config;
