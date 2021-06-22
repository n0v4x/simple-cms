import classNames from "classnames"
import { CSSProperties, ReactNode, useEffect, useMemo } from "react"
import properties from "./properties";


interface ModuleLayoutProps extends ModuleProps<ModulePropsProperties<typeof properties>> {
}

const ModuleLayout = ({ children, properties, className, id }: ModuleLayoutProps) => {
  const style = useMemo(() => {
    const style: CSSProperties = {
      backgroundColor: properties.backgroundColor.color
    };

    return style;
  }, [properties]);

  return <div style={style} id={id} className={classNames("layout", className)}>
    {children}
  </div>
}

export default ModuleLayout;