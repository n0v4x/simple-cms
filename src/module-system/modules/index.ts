import layout from "./layout";
import section from "./section";
import container from "./container";
import text from "./text";

export const modules: {
  [key: string]: Module
} = {
  [layout.id]: layout,
  [section.id]: section,
  [container.id]: container,
  [text.id]: text
}

export const registerModule = (module: Module) => {
  if (module.id in modules) {
    throw Error(`Module with id "${module.id}" already exists`);
  }

  modules[module.id] = module;
}

export const getModule = (id: Module["id"]) => {
  return modules[id];
}

export default modules;