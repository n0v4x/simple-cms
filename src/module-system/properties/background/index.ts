import Background from "./Background";

export interface ModulePropertyBackgroundData {
  size: "cover" | "container" | string;
  image: string;
  fixed: boolean;
}

export default {
  name: "Background",
  description: "Background of the module",
  component: Background,
  defaultData: {
    size: "",
    image: ""
  }
} as ModuleProperty<ModulePropertyBackgroundData>
