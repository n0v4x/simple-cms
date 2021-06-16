import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// import JoditEditor from "jodit-react";

import { ModulePropertyTextData } from "."

interface ModulePropertyHeightProps extends ModulePropertyProps<ModulePropertyTextData> {
}

const ModulePropertyHeight = ({ data, onChange }: ModulePropertyHeightProps) => {
  console.log(data);
  const handleChange = (text: string) => {
    onChange({
      text
    })
  }

  return <div className="module-property">
    <JoditEditor value={data.text} onChange={handleChange} />
  </div>
}

export default ModulePropertyHeight
