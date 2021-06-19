import Property from "./VerticalAlignment";

export type ModulePropertyData = string

const verticalAlignment: ModuleProperty<ModulePropertyData> = {
  name: "Vertical alignment",
  description: "Align items inside module",
  component: Property,
  defaultData: ""
}

export default verticalAlignment;