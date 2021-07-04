import NavBar from "./NavBar";
import properties from "./properties";

const navbar: Module = {
  id: "navbar",
  name: "Navbar",
  description: "Navigation bar",
  category: "layout",
  hasChildren: true,
  properties: properties,
  component: NavBar,
}

export default navbar;