import layout from "./layout";
import section from "./section";
import container from "./container";
import header from "./header";
import navLink from "./navLink";
import navbar from "./navbar";
import text from "./text";

export const moduleLibrary: { [key: string]: Module } = {}

export const registerModules = (modules: Module[]) => {
  modules.forEach(module => {
    if (module.id in modules) {
      throw Error(`Module with id "${module.id}" already exists`);
    }

    moduleLibrary[module.id] = module;
  })
}

export const getModule = (id: Module["id"]): Module | undefined => {
  return moduleLibrary[id];
}

registerModules([layout, section, container, header, navLink, navbar, text]);

export default moduleLibrary;