import { CSSProperties, useMemo } from "react"
import classNames from "classnames";

import properties from "./properties";

interface Container extends ModuleProps<ModulePropsProperties<typeof properties>> {
}

const Container = ({ children, properties, className, id }: Container) => {
  const style: CSSProperties = useMemo(() => {
    return {
      maxWidth: properties.maxWidth
    }
  }, [properties]);

  return <div id={id} style={style} className={classNames("container", className)}>
    {children}
  </div>
}

export default Container;