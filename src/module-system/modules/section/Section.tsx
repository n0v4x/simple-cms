import background, { ModulePropertyBackgroundData } from "@module-system/properties/background";
import { CSSProperties, ReactNode } from "react"
import { SectionProperties } from ".";


interface SectionProps extends ModuleProps<SectionProperties> {

}

const Section = ({ children, properties }: SectionProps) => {
  // const style = properties ? properties.background
  let style: CSSProperties = {};

  if (properties) {
    const { image, size, fixed } = properties.background;
    const { height } = properties.height;

    style = {
      height,
      backgroundAttachment: fixed ? "fixed" : "",
      backgroundSize: size,
      backgroundImage: `url(${image})`
    }
  }

  return <div style={style as CSSProperties} className="section">
    {children}
  </div>
}

export default Section;