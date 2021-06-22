import verticalAlignment from "@module-system/properties/vertical-alignment";
import width from "@module-system/properties/width";
import Container from "./Container";

import properties from "./properties";

const container: Module = {
  id: "container",
  name: "Container",
  category: "layout",
  description: "Container module",
  hasChildren: true,
  properties,
  component: Container,
}

export default container;