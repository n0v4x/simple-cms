import Container from "@components/common/Container";
import Layout from "@components/common/Layout";
import Section from "@components/common/Section";

const layout: Module = {
  type: "layout",
  name: "Layout",
  description: "Layout module",
  category: "layout",
  Component: Layout,
  controller: {
    color: "#ffad94"
  }
}

const section: Module = {
  type: "section",
  name: "Section",
  description: "Section module",
  category: "layout",
  Component: Section,
  controller: {
    color: "#eaff94"
  }
}
const container: Module = {
  type: "container",
  name: "Container",
  category: "test",
  description: "Container module",
  Component: Container,
  controller: {
    color: "#eaff94"
  }
}

export const moduleMap = {
  [layout.type]: layout,
  [section.type]: section,
  [container.type]: container
}

export const getModule = (type: Module["type"]) => {
  return moduleMap[type];
}

export default moduleMap;