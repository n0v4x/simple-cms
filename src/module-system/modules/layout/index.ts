import Layout from "./Layout";
import properties from "./properties";

const layout: Module = {
  id: "layout",
  name: "Layout",
  description: "Layout module",
  category: "layout",
  hasChildren: true,
  properties,
  component: Layout,
}

export default layout;