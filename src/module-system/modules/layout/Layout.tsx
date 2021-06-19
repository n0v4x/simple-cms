import classNames from "classnames"
import { ReactNode } from "react"


interface ModuleLayoutProps extends ModuleProps<{

}> {
}

const ModuleLayout = ({ children, properties, className, id }: ModuleLayoutProps) => {
  return <div id={id} className={classNames("layout", className)}>
    {children}
  </div>
}

export default ModuleLayout;