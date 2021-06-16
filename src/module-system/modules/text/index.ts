import background from "@module-system/properties/background";
import text from "@module-system/properties/text";
import Text from './Text';

export interface TextProperties extends ModuleProperties {
  text: ModulePropertiesItem<typeof text>
}

const layout: Module<TextProperties> = {
  id: "text",
  name: "Text",
  description: "Text",
  category: "text",
  properties: {
    text: {
      name: "Text",
      description: "Text",
      property: text
    },
  },
  component: Text,
}

export default layout;