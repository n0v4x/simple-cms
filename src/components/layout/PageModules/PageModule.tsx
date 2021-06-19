import { MouseEventHandler, ReactNode } from "react";
import useModule from "@hooks/useModule";

interface PageModule {
  data: ModuleData;
  children?: ReactNode;
}

const PageModule = ({ data, children }: PageModule) => {
  const module = useModule(data.module.id);

  if (!module) {
    return null;
  }

  const Component = module.component;

  return <Component properties={data.module.properties}>
    {children}
  </Component>
}

export default PageModule;