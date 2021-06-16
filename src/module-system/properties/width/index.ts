import PropertyWidth from "./PropertyWidth";

interface ModulePropertyWidthData {
  value: number;
  unit: string;
}

export default {
  name: "Width",
  description: "Width of the module",
  component: PropertyWidth,
  defaultData: {
    value: 0,
    unit: "px"
  }
} as ModuleProperty<ModulePropertyWidthData>
