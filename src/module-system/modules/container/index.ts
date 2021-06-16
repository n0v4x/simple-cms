import Container from "./Container";

export interface ContainerProperties extends ModuleProperties {

}

const layout: Module<ContainerProperties> = {
  id: "container",
  name: "Container",
  category: "test",
  description: "Container module",
  component: Container,
}

export default layout;