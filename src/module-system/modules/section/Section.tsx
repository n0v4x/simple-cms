import background, { ModulePropertyBackgroundData } from "@module-system/properties/background";
import { CSSProperties, ReactNode } from "react"
import classNames from "classnames";

interface SectionProps extends ModuleProps<{
  background?: {
    image: string,
    size: string,
    fixed: boolean
  },
  height?: string
}> {

}

const Section = ({ children, properties, className, id }: SectionProps) => {
  let style: CSSProperties = {};

  if (properties) {
    const { image, size, fixed } = properties.background || {};

    style = {
      height: properties.height,
      backgroundAttachment: fixed ? "fixed" : "",
      backgroundSize: size,
      backgroundImage: image ? `url(${image})` : ""
    }
  }

  return <div id={id} style={style as CSSProperties} className={classNames("section", className)}>
    {children}
  </div>
}

export default Section;