import background from "@module-system/properties/background";
import text from "@module-system/properties/text";
import verticalAlignment from "@module-system/properties/vertical-alignment";
import Text from './Text';
import properties from "./properties";

const layout: Module = {
  id: "text",
  name: "Text",
  description: "Text",
  category: "text",
  hasChildren: false,
  properties,
  component: Text,
}

export default layout;