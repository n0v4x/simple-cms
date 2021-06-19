import Text from "./Text";

export type ModulePropertyTextData = string;

const text: ModuleProperty<ModulePropertyTextData> = {
  name: "Text",
  description: "Text of the module",
  component: Text,
  defaultData: ""
}

export default text;
