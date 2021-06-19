import { CSSProperties, useMemo } from "react"
import classNames from "classnames";

interface Container extends ModuleProps<{
  maxWidth: string
}> {
}

const Container = ({ children, properties, className, id }: Container) => {
  const style: CSSProperties = useMemo(() => {
    return {
      maxWidth: properties?.maxWidth
    }
  }, [properties]);

  return <div id={id} style={style} className={classNames("container", className)}>
    {children}
  </div>
}

export default Container;