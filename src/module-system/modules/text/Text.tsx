import React, { CSSProperties, useMemo } from 'react'
import classNames from "classnames";

interface TextProps extends ModuleProps<{
  text: string,
  verticalAlignment: string
}> {

}

const Text = ({ properties, className, id }: TextProps) => {
  const style: CSSProperties = {
    justifyContent: properties?.verticalAlignment
  }
  // console.log(properties);

  return (
    <>
      <div id={id} style={style} className={classNames("text", className)}>
        <div className="text__content" dangerouslySetInnerHTML={{ __html: properties ? properties.text : "" }} />
      </div>

      <style jsx>{`
      .text {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `}</style>
    </>
  )
}

export default Text
