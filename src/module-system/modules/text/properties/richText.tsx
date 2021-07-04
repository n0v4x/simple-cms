import { FromControl } from '@components/common/Form';
import Property from '@components/common/Property';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export type FieldsType = string;// RawDraftContentState;

const Component = ({ name }: PropertyProps) => {
  const { control } = useFormContext();
  const [state, setState] = useState(control.defaultValuesRef.current["richText"]);

  useEffect(() => {
    setState(control.defaultValuesRef.current["richText"]);
  }, [control.defaultValuesRef.current["richText"]]);

  return <Property name={config.name} >
    <FromControl label="Editor">
      <Controller
        render={({ field: { value, onChange } }) => {
          return value !== undefined ? <JoditEditor value={state} onChange={(value) => { setState(value); onChange(value) }} /> : <></>
        }}
        name={name}
        control={control}
      />
    </FromControl>
  </Property>;
}

const config: Property<FieldsType> = {
  name: "Content",
  defaultValue: "",
  component: Component
}


export default config;
