export const findChildrenModules = <T extends any>(modules: ModuleData[], id: ModuleData["id"], returnCb?: (module: ModuleData, i: number) => T) => {
  const result: T[] = [];
  const parentIds: ModuleData["id"][] = [id];

  modules.forEach((module, i) => {
    if (parentIds.indexOf(module.parentId) !== -1) {
      parentIds.push(module.id);

      result.push(returnCb ? returnCb(module, i) : (module as T));
    }
  });

  return result;
}
