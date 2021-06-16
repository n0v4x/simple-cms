import Height from "./Height";

export interface ModulePropertyHeightData {
  height: string;
}

export default {
  name: "Height",
  description: "Height of the module",
  component: Height,
  defaultData: {
    height: ""
  }
} as ModuleProperty<ModulePropertyHeightData>
