import { getModule } from "@module-system/modules";
import { useMemo } from "react"

const useModule = (moduleId: Module["id"] | undefined) => {
  const module = useMemo(() => {
    if (moduleId === undefined) {
      return undefined;
    }

    const result = getModule(moduleId);

    return result;
  }, [moduleId]);

  return module;
}

export default useModule;