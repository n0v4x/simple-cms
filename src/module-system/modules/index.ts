import layout from "./layout";
import section from "./section";
import container from "./container";
import text from "./text";

export const moduleMap: {
  [key: string]: Module<any>
} = {
  [layout.id]: layout,
  [section.id]: section,
  [container.id]: container,
  [text.id]: text
}

export const registerModule = (module: Module) => {
  if (module.id in moduleMap) {
    throw Error(`Module with id "${module.id}" already exists`);
  }

  moduleMap[module.id] = module;
}

export const getModule = (id: Module["id"]) => {
  return moduleMap[id];
}

export default moduleMap;