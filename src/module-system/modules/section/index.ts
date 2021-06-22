import background from "@module-system/properties/background";
import height from "@module-system/properties/height";
import verticalAlignment from "@module-system/properties/vertical-alignment"
import Section from "./Section";
import properties from "./properties";

// export interface SectionProperties extends ModuleProperties {
//   background: typeof background
//   height: typeof height
// }

const layout: Module = {
  id: "section",
  name: "Section",
  description: "Section module",
  category: "layout",
  hasChildren: true,
  properties: properties,
  component: Section,
}

export default layout;