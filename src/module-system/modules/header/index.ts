import Navbar from "./Header";
import properties from "./properties";

const header: Module = {
  id: "header",
  name: "Header",
  description: "Header",
  category: "layout",
  hasChildren: true,
  properties: properties,
  component: Navbar,
}


export default header;