import background from "@module-system/properties/background";
import height from "@module-system/properties/height";
import verticalAlignment from "@module-system/properties/vertical-alignment"
import Section from "./Section";

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
  properties: [
    {
      id: "background",
      name: "Background",
      property: background
    },
    {
      id: "height",
      name: "Height",
      property: height
    }
  ],
  component: Section,
}

export default layout;