import Layout from "./Layout";
import widthProperty from "@module-system/properties/width";

export interface LayoutProperties extends ModuleProperties {
  width: ModulePropertiesItem<typeof widthProperty>
}

const layout: Module<LayoutProperties> = {
  id: "layout",
  name: "Layout",
  description: "Layout module",
  category: "layout",
  properties: {
    width: {
      name: "Width",
      property: widthProperty
    }
  },
  component: Layout,
}

export default layout;