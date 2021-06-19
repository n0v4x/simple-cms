import Height from "./Height";

export type ModulePropertyHeightData = string;

const height: ModuleProperty<ModulePropertyHeightData> = {
  name: "Height",
  description: "Height of the module",
  component: Height,
  defaultData: ""
}

export default height;