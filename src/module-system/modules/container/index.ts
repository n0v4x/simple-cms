import verticalAlignment from "@module-system/properties/vertical-alignment";
import width from "@module-system/properties/width";
import Container from "./Container";


const container: Module = {
  id: "container",
  name: "Container",
  category: "layout",
  description: "Container module",
  hasChildren: true,
  properties: [
    {
      id: "maxWidth",
      name: "Max width",
      description: "Max width of the module",
      property: width
    }
  ],
  component: Container,
}

export default container;