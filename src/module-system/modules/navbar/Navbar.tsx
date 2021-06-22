import background, { ModulePropertyBackgroundData } from "@module-system/properties/background";
import { CSSProperties, ReactNode, useEffect, useMemo } from "react"
import classNames from "classnames";
import properties from "./properties";


interface SectionProps extends ModuleProps<ModulePropsProperties<typeof properties>> {

}

const Section = ({ children, properties, className, id }: SectionProps) => {
  const styles = useMemo(() => {
    const { src, size, attachment } = properties.backgroundImage;

    const container: CSSProperties = {
      backgroundImage: `url(${src})`,
      backgroundSize: size,
      backgroundAttachment: attachment,
    }

    const overlay: CSSProperties = {
      opacity: 1 - properties.backgroundOverlay.opacity,
      backgroundColor: properties.backgroundOverlay.color
    }

    return {
      container,
      overlay
    }
  }, [properties]);


  return <div id={id} style={styles.container} className={classNames("section", className)}>
    <div style={styles.overlay} className="overlay" />
    {children}
  </div>
}

export default Section;