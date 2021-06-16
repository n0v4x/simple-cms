import background from "@module-system/properties/background";
import height from "@module-system/properties/height";
import Section from "./Section";

export interface SectionProperties extends ModuleProperties {
  background: ModulePropertiesItem<typeof background>
  height: ModulePropertiesItem<typeof height>
}

const layout: Module<SectionProperties> = {
  id: "section",
  name: "Section",
  description: "Section module",
  category: "layout",
  properties: {
    background: {
      name: "Background",
      description: "Background",
      property: background
    },
    height: {
      name: "Height",
      property: height
    }
  },
  component: Section,
}

export default layout;