import Text from "./Text";

export interface ModulePropertyTextData {
  text: string;
}

export default {
  name: "Text",
  description: "Text of the module",
  component: Text,
  defaultData: {
    text: ""
  }
} as ModuleProperty<ModulePropertyTextData>
