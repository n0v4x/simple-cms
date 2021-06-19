import Background from "./Background";

export interface ModulePropertyBackgroundData {
  size: "cover" | "container" | string;
  image: string;
  fixed: boolean;
}

const background: ModuleProperty<ModulePropertyBackgroundData> = {
  name: "Background",
  description: "Background of the module",
  component: Background,
  defaultData: {
    size: "",
    image: "",
    fixed: false
  }
}

export default background;
