import { ReactNode } from "react"
import { ContainerProperties } from ".";


interface Container extends ModuleProps<ContainerProperties> {
}

const Container = ({ children }: Container) => {
  return <div className="container">
    {children}
  </div>
}

export default Container;