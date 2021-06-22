import Navbar from "./Navbar";
import properties from "./properties";

const layout: Module = {
  id: "navbar",
  name: "Navbar",
  description: "Navbar",
  category: "layout",
  hasChildren: true,
  properties: properties,
  component: Navbar,
}

export default layout;