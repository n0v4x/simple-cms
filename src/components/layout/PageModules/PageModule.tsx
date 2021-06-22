import { MouseEventHandler, ReactNode } from "react";
import useModule from "@hooks/useModule";
import { useModuleProperties } from "@hooks/useModuleProperties";

interface PageModule {
  data: ModuleData;
  children?: ReactNode;
}

const PageModule = ({ data, children }: PageModule) => {
  const module = useModule(data.module.id);

  if (!module) {
    return null;
  }

  const properties = useModuleProperties(data);
  const Component = module.component;

  return <Component properties={properties}>
    {children}
  </Component>
}

export default PageModule;