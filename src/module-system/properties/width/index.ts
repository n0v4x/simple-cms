import PropertyWidth from "./PropertyWidth";

export type ModulePropertyWidthData = string

const width: ModuleProperty<ModulePropertyWidthData> = {
  name: "Width",
  description: "Width of the module",
  component: PropertyWidth,
  defaultData: ""
}

export default width;