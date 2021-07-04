import NavLink from "./NavLink";
import properties from "./properties";

const navLink: Module = {
  id: "nav-link",
  name: "NavLink",
  description: "Navigation link",
  category: "layout",
  hasChildren: false,
  properties: properties,
  component: NavLink,
}

export default navLink;