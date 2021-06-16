import { ReactNode } from "react";
import classNames from "classnames";

interface ModuleItemProps {
  data: ModuleData,
  children?: ReactNode;
  isEditorMode?: boolean;
}

const ModuleItem = ({ data, children, isEditorMode }: ModuleItemProps) => {
  // const module = useModule(data.module.id);

  // if (!module) {
  //   return null;
  // }

  // const Component = module.component;

  // if (!isEditorMode) {
  //   return <Component properties={data.module.properties}>
  //     {children}
  //   </Component>
  // }

  // return <div className={classNames("module", `module--type-${module.id}`)}>
  //   <div className="module__inner">
  //     <header className="module__header">
  //       <p className="module__title">
  //         {module.name}
  //       </p>
  //     </header>
  //     <div className="module__body">
  //       <Component properties={data.module.properties}>
  //         {children}
  //       </Component>
  //     </div>
  //   </div>
  // </div>

  return null
}

export default ModuleItem;