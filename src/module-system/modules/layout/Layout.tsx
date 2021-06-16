import { ReactNode } from "react"
import { LayoutProperties } from ".";


interface ModuleLayoutProps extends ModuleProps<LayoutProperties> {
}

const ModuleLayout = ({ children, properties }: ModuleLayoutProps) => {
  return <div className="layout">
    {children}
  </div>
}

export default ModuleLayout;