import React from 'react'
import { TextProperties } from "."

interface TextProps extends ModuleProps<TextProperties> {

}

const Text = ({ properties, children }: TextProps) => {
  return (
    <div className="text">
      <div className="text__content" dangerouslySetInnerHTML={{ __html: properties.text.text }}>

      </div>
    </div>
  )
}

export default Text
