import Section from "./Section";
import properties from "./properties";

const section: Module = {
  id: "section",
  name: "Section",
  description: "Section module",
  category: "layout",
  hasChildren: true,
  properties: properties,
  component: Section,
}

export default section;