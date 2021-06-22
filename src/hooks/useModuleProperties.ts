import { cloneDeep } from "lodash";
import { useMemo } from "react";
import useModule from "./useModule";

export const useModuleProperties = (moduleData?: ModuleData) => {
  const module = useModule(moduleData?.module.id);

  const result = useMemo(() => {
    const result: { [key: string]: any } = {};

    // console.log(moduleData, module);

    if (moduleData && module && module.properties) {
      for (const propertyId in module.properties) {
        const moduleProperties = moduleData.module.properties;
        const value = cloneDeep(
          moduleProperties && moduleProperties[propertyId] !== undefined
            ? moduleProperties[propertyId]
            : module.properties[propertyId].defaultValue
        );

        result[propertyId] = value;
      }
    }

    return result;
  }, [moduleData]);

  return result;
}